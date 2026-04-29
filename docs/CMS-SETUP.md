# CMS 接入指南（管理员看，一次性配置）

本网站的 News 模块已经接入 [Decap CMS](https://decapcms.org/)，部署完成后，
管理员只需访问 **`https://utoplab.net/admin/`**，使用 GitHub 账号登录即可在网页上编辑、新增、删除新闻。

## 整体架构

```
管理员浏览器
   │
   ▼
https://utoplab.net/admin/      ← 静态 HTML，加载 Decap CMS
   │
   ├─ GitHub 登录 → Cloudflare Worker (OAuth 代理)  ← 你需要部署一次
   │
   └─ 编辑保存 → 直接 commit 到 GitHub repo (TreeAspen/Lab-website)
                    │
                    └─ GitHub Pages 自动重新构建并部署 → 网站更新
```

GitHub Pages 没有后端，没法直接做 GitHub OAuth 回调，所以需要一个外部 OAuth 代理。
这里用 **Cloudflare Workers** —— 完全免费、不需要信用卡。

---

## 一、注册 GitHub OAuth App（5 分钟）

1. 打开 https://github.com/settings/developers
2. 点 **New OAuth App**
3. 填写：
   - **Application name**: `U.TOP Lab CMS`
   - **Homepage URL**: `https://utoplab.net`
   - **Authorization callback URL**: `https://helloworld.sy4254.workers.dev/callback`
     （当前 Worker 地址；如果以后换了 Worker，记得回这里同步改）
4. 创建完成后，记下两个值：
   - **Client ID**：公开值
   - **Client Secret**：点 "Generate a new client secret"，**只显示一次，立即复制保存**

---

## 二、部署 Cloudflare Workers OAuth 代理（10 分钟）

### 2.1 注册 Cloudflare（如已有账号跳过）
https://dash.cloudflare.com/sign-up（免费、邮箱即可）

### 2.2 创建 Worker
1. 登录 Cloudflare Dashboard → 左侧 **Workers & Pages** → **Create application** → **Create Worker**
2. 名字随便起，比如 `utoplab-cms-auth`，点 Deploy
3. 部署后点 **Edit code**，把默认代码全删了，粘贴下面这段：

```js
// Decap CMS GitHub OAuth proxy for Cloudflare Workers
// 注意：新版 Workers (ES module 格式) 的环境变量必须从 fetch 的第二个参数 env 取，
// 不能当全局变量用，否则会报 "OAUTH_CLIENT_ID is not defined"。
const SCOPE = "repo,user";

export default {
  async fetch(request, env) {
    const CLIENT_ID = env.OAUTH_CLIENT_ID;
    const CLIENT_SECRET = env.OAUTH_CLIENT_SECRET;
    const url = new URL(request.url);

    // Step 1: redirect user to GitHub
    if (url.pathname === "/auth") {
      const redirect = `${url.origin}/callback`;
      const ghUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${redirect}`;
      return Response.redirect(ghUrl, 302);
    }

    // Step 2: GitHub redirects back here with ?code=...
    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
      });
      const data = await tokenRes.json();
      const status = data.access_token ? "success" : "error";
      const payload = data.access_token
        ? { token: data.access_token, provider: "github" }
        : { message: data.error || "no token" };

      // Decap CMS expects this exact postMessage format
      const html = `<!doctype html><html><body><script>
        (function() {
          function send(msg) {
            window.opener && window.opener.postMessage(msg, "*");
          }
          window.addEventListener("message", function(e) {
            if (e.data === "authorizing:github") {
              send("authorization:github:${status}:${JSON.stringify(payload).replace(/"/g, '\\"')}");
            }
          }, false);
          send("authorizing:github");
        })();
      </script></body></html>`;
      return new Response(html, { headers: { "Content-Type": "text/html" } });
    }

    return new Response("U.TOP CMS auth proxy", { status: 200 });
  },
};
```

4. 点 **Save and deploy**
5. 在 Worker 页面 → **Settings** → **Variables and Secrets** → **Add variable**：
   - 添加 `OAUTH_CLIENT_ID`，值 = 刚才记下的 Client ID（普通 plaintext）
   - 添加 `OAUTH_CLIENT_SECRET`，值 = 刚才记下的 Client Secret（**点 Encrypt 选 Secret**）
6. 复制 Worker 的 URL（当前为 `https://helloworld.sy4254.workers.dev`）

### 2.3 回 GitHub 改 OAuth App callback
回到 https://github.com/settings/developers → 你刚建的 OAuth App，把 **Authorization callback URL** 改成：
```
https://helloworld.sy4254.workers.dev/callback
```
保存。

---

## 三、把 Worker URL 写进网站配置

编辑 [public/admin/config.yml](../public/admin/config.yml)，找到 `base_url` 这一行，
改成你的 Worker 真实地址。当前已配置为：

```yaml
base_url: https://helloworld.sy4254.workers.dev
```

如果以后换了 Worker（比如重命名为 `utoplab-cms-auth`），改这里即可。
改完提交、推送，等 GitHub Pages 重新部署完（约 1–2 分钟）。

> 同时记得回 GitHub OAuth App 把 **Authorization callback URL** 改为对应的
> `https://<worker-host>/callback`，否则登录会 redirect_uri mismatch。

---

## 四、添加管理员

在 GitHub repo `TreeAspen/Lab-website` → **Settings** → **Collaborators** → **Add people**，
邀请要给编辑权限的人。被邀请者接受后，就能用自己的 GitHub 账号登录 CMS 编辑内容。

> **重要：** Decap CMS 的"权限"完全等价于 GitHub repo 的写权限。要撤销某人的编辑权限，
> 只需在 GitHub Collaborators 里把他移除。

---

## 五、日常使用

1. 访问 **https://utoplab.net/admin/**
2. 用 GitHub 账号登录
3. 左侧能看到 **新闻 (News)** 集合
4. 点击右上角 **Quick add** 或具体新闻条目编辑
5. 编辑完点 **Save** → **Publish now**（或走 draft → review 流程，取决于 `publish_mode`）
6. Decap 自动 commit 到 main 分支，GitHub Pages 触发重新部署，约 1–2 分钟后线上可见

### 字段说明
- **ID**：必须唯一，新建时填一个比现有最大值更大的整数
- **URL 名称 (slug)**：发布后**不要修改**，否则旧链接会失效
- **首页弹窗 / 详情页头图 / 正文媒体**：三个媒体位独立配置；可上传 png/jpg/mp4
- **正文段落**：每段一行，会渲染为段落
- **详细章节**：长文的分章节内容，每个章节可配多张图

---

## 六、内容文件结构（开发者参考）

```
content/news/                ← 新闻内容文件，每条一个 .json
├── 1-vr-flood-risk.json
├── 2-codesignai.json
└── 3-vr-greenery.json

public/uploads/news/         ← 媒体文件，CMS 上传到这里
├── *.png / *.jpg / *.mp4

public/admin/                ← Decap CMS 入口
├── index.html
└── config.yml               ← 改字段定义只需改这里

src/app/data/news.ts         ← 在构建时读取所有 content/news/*.json
```

新增字段：在 `config.yml` 加字段，并在 `src/app/data/news.ts` 的 `NewsItem` 类型里加对应字段，
然后在 `News.tsx` 或 `NewsDetailPage.tsx` 里使用即可。
