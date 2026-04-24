import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { newsDetailData } from "../data/projects";

// 🌟 1. 导入所有相关的资源文件
import { news1Img, vrVideo, UrbanAIHead, videoStretched, vrFinalPoster } from "../assets";

/**
 * 🌟 核心修改：精细化媒体配置
 * 为每个项目指定 [头图] 和 [正文展示图] 及其类型
 */
const newsMediaConfig: Record<number, { 
  hero: string, 
  heroType: 'image' | 'video',
  content: string, 
  contentType: 'image' | 'video' 
}> = {
  1: { 
    hero: news1Img, heroType: 'image', 
    content: news1Img, contentType: 'image' 
  },
  // News 2 (codesignai): 头图用 media 2 (UrbanAIHead), 正文用 media 4 (vrVideo)
  2: { 
    hero: UrbanAIHead, heroType: 'image', 
    content: vrVideo, contentType: 'video' 
  },
  // News 3 (vrgreencallforusers): 头图用 videoStretched, 正文用 vrPoster
  3: { 
    hero: videoStretched, heroType: 'video', 
    content: vrFinalPoster, contentType: 'image'
  }
};

export function NewsDetailPage() {
  const { id } = useParams();

  // 🌟 建立名称（Slug）与 原始 ID 的映射
  const slugMap: Record<string, number> = {
    "codesignai": 2,
    "vr-urban-stress-study": 3,
    "vrgreencallforusers": 3,
  };

  // 如果 id 是名称，则转为 ID 数字；否则直接转数字
  const newsId = slugMap[id || ""] || Number(id);
  const news = newsDetailData.find((n) => n.id === newsId);

  // 错误处理
  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4EB]">
        <div className="text-center">
          <h1 className="font-['VT323'] text-6xl text-[#FF7A00] mb-4">
            NEWS NOT FOUND
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-['VT323'] text-xl bg-black text-[#E2F16B] px-6 py-3 hover:bg-[#FF7A00] hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Return to Grid
          </Link>
        </div>
      </div>
    );
  }

  // 获取该新闻对应的媒体配置
  const media = newsMediaConfig[newsId] || { 
    hero: news.heroImage, heroType: 'image', 
    content: news.heroImage, contentType: 'image' 
  };

  return (
    <div className="bg-[#F4F4EB] min-h-screen pt-20">
      {/* ─── 返回导航 ───────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-['VT323'] text-lg uppercase tracking-wide hover:text-[#FF7A00] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to News</span>
        </Link>
      </div>

      {/* ─── 顶部 Hero Media (装饰窗) ────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 md:px-8"
      >
        <div className="rounded-xl overflow-hidden border-4 border-black">
          <div className="bg-black px-4 py-2.5 flex items-center justify-between border-b-2 border-white/20">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF7A00]" />
                <span className="w-3 h-3 rounded-full bg-[#E2F16B]" />
                <span className="w-3 h-3 rounded-full bg-white/30" />
              </div>
              <span className="font-['VT323'] text-white/60 text-sm tracking-wider ml-2">
                NEWS_{String(news.id).padStart(3, "0")}.dat
              </span>
            </div>
            <span className="font-mono text-white/40 text-xs">
              {news.date}
            </span>
          </div>

          <div className="relative h-[200px] md:h-[300px] overflow-hidden bg-black">
            {/* 这里的 media.hero 是根据 config 选取的头图 */}
            {media.heroType === 'video' ? (
              <video
                src={media.hero}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-60"
              />
            ) : (
              <img
                src={media.hero}
                alt={news.title}
                className="w-full h-full object-cover opacity-60"
              />
            )}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.1]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* ─── 正文内容 ───────────────────────── */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-4xl mx-auto px-4 md:px-8 mt-10"
      >
        <div className="flex gap-2 flex-wrap mb-6">
          {news.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-[#E2F16B] border-2 border-black px-4 py-1 rounded-full font-['VT323'] text-base uppercase tracking-wider"
            >
              <Tag className="w-3 h-3 inline mr-1" />
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-['VT323'] text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.95] mb-3">
          {news.title}
        </h1>

        {(news as any).subtitle && (
          <p className="font-['VT323'] text-2xl md:text-3xl text-gray-500 uppercase leading-tight mb-6">
            {(news as any).subtitle}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 pb-6 border-b-4 border-black">
          <div className="flex items-center gap-2 font-mono text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            {news.date}
          </div>
          <div className="flex items-center gap-2 font-mono text-sm text-gray-600">
            <User className="w-4 h-4" />
            {news.author}
          </div>
          {(news as any).sponsor && (
            <div className="font-mono text-sm text-gray-600">
              <span className="text-gray-400">Sponsor: </span>{(news as any).sponsor}
            </div>
          )}
          {(news as any).mentors && (
            <div className="font-mono text-sm text-gray-600">
              <span className="text-gray-400">Faculty Mentors: </span>{(news as any).mentors}
            </div>
          )}
        </div>

        <div className="space-y-6 mb-10">
          {news.content.map((paragraph, i) => (
            <p key={i} className="font-mono text-base leading-relaxed text-gray-800">
              {paragraph}
            </p>
          ))}
        </div>

        {(news as any).sections && (news as any).sections.length > 0 && (
          <div className="space-y-8 mb-12">
            {((news as any).sections as { heading: string; body: string; images?: string[] }[]).map((section, i) => (
              <div key={i} className="bg-white border-2 border-black rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-[#FF7A00] flex-shrink-0" />
                  <h2 className="font-['VT323'] text-2xl uppercase tracking-wider">{section.heading}</h2>
                </div>
                <div className="space-y-3">
                  {section.body.split('\n').map((line, j) =>
                    line.trim() === '' ? null : (
                      <p key={j} className={`font-mono text-sm leading-relaxed ${line.startsWith('•') ? 'pl-4 text-gray-700' : 'text-gray-800'}`}>
                        {line}
                      </p>
                    )
                  )}
                </div>
                {section.images && section.images.map((src, j) => (
                  <img
                    key={j}
                    src={src}
                    alt={`${section.heading} ${j + 1}`}
                    className="w-full h-auto mt-6 rounded-lg"
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="my-12 rounded-2xl overflow-hidden border-4 border-black bg-black">
          {media.contentType === 'video' ? (
            <div className="flex flex-col">
              <video src={media.content} controls autoPlay loop muted className="w-full h-auto" />
              <div className="bg-black p-3 text-center border-t border-white/10">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
                  LIVE_DEMONSTRATION_FEED.mp4
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <img src={media.content} alt="Research Poster" className="w-full h-auto" />
              <div className="bg-black p-3 text-center border-t border-white/10">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
                  RESEARCH_POSTER.png
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mb-20" />
      </motion.article>

      {/* ─── 更多新闻 ──────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-12 mb-20">
        <h3 className="font-['VT323'] text-2xl uppercase tracking-wider mb-6 flex items-center gap-2">
          <span className="text-[#FF7A00]">///</span> More News
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newsDetailData
            .filter((n) => n.id !== news.id)
            .map((item) => {
              // 底部卡片预览图统一使用各配置中的 hero 图
              const itemMedia = newsMediaConfig[item.id] || { hero: item.heroImage, heroType: 'image' };
              
              return (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="group bg-white border-2 border-black rounded-xl overflow-hidden transition-all"
                >
                  <div className="h-32 overflow-hidden bg-black">
                    {itemMedia.heroType === 'video' ? (
                      <video
                        src={itemMedia.hero}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <img
                        src={itemMedia.hero}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-xs text-gray-500 mb-1">
                      {item.date}
                    </p>
                    <h4 className="font-['VT323'] text-xl uppercase group-hover:text-[#FF7A00] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}