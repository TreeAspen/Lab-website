import { createHashRouter, Outlet, Link } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Brief } from "./components/Brief";
import { News } from "./components/News";
import { Highlights } from "./components/Highlights";
import { OurWork } from "./components/OurWork";
import { Achievements } from "./components/Achievements";
import { Collaborators } from "./components/Collaborators";
import { Footer } from "./components/Footer";
import { ProjectDetailPage } from "./components/ProjectDetailPage";
import { NewsDetailPage } from "./components/NewsDetailPage";
import { HighlightDetailPage } from "./components/HighlightDetailPage";
import { TeamPage } from "./components/TeamPage";
import { TeamMemberDetailPage } from "./components/TeamMemberDetailPage";

// 👇 新增：导入滚动到顶部的监听组件
import { ScrollToTop } from "./components/ScrollToTop";

/**
 * 布局组件：全局脚手架
 */
function Layout() {
  return (
    /* 👇 核心修改 1：全局应用 font-mono，实现打字机/代码终端质感 */
    <div className="min-h-screen bg-[#F4F4EB] font-mono text-black selection:bg-[#FF7A00] selection:text-white">
      
      <ScrollToTop />
      
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

/**
 * 首页组件：组件顺序：Hero -> Brief -> Highlights -> News -> ...
 */
function HomePage() {
  return (
    <>
      <Hero />
      <Brief />
      <Highlights />
      <News />
      <OurWork />
      <Achievements />
      <Collaborators />
    </>
  );
}

/**
 * 路由定义：Hash 模式是 GitHub Pages 的终极避雷针
 */
export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { 
        index: true, 
        Component: HomePage 
      },
      { 
        path: "projects/:slug", 
        Component: ProjectDetailPage 
      },
      { 
        path: "news/:id", 
        Component: NewsDetailPage 
      },
      { 
        path: "highlights/:id", 
        Component: HighlightDetailPage 
      },
      {
        path: "team",
        Component: TeamPage
      },
      {
        path: "team/:id",
        Component: TeamMemberDetailPage
      },
      /* 404 页面：硬核赛博设计风格 */
      { 
        path: "*", 
        Component: () => (
          <div className="flex flex-col items-center justify-center py-32 px-4 text-center min-h-[70vh]">
            <h1 className="font-['VT323'] text-[10rem] md:text-[12rem] leading-none text-[#FF7A00] mb-4">
              404
            </h1>
            <div className="font-['VT323'] text-2xl md:text-3xl mb-12 uppercase tracking-widest bg-black text-[#E2F16B] px-6 py-2 inline-block">
              System Error /// Sector Not Found
            </div>
            <p className="max-w-md text-lg mb-10 font-mono border-l-4 border-black pl-4 text-left mx-auto">
              The requested data sector could not be located in the grid. 
              The coordinates may be invalid or the observation target has moved.
            </p>
            <Link 
              to="/"
              className="group relative inline-flex items-center gap-3 bg-black text-[#F4F4EB] px-8 py-4 font-['VT323'] text-2xl uppercase tracking-wide border-2 border-transparent hover:bg-[#E2F16B] hover:text-black hover:border-black transition-all"
            >
              <span>Return to Grid</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ) 
      },
    ],
  },
]);