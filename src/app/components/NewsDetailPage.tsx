import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { newsDetailData } from "../data/projects";

// 🌟 导入同样的资源文件
import { news1Img, vrVideo, vrPoster } from "../assets";

// 🌟 保持映射同步
const newsMedia: Record<number, { type: 'image' | 'video', src: string }> = {
  1: { type: 'image', src: news1Img },
  2: { type: 'video', src: vrVideo },
  3: { type: 'image', src: vrPoster }
};

export function NewsDetailPage() {
  const { id } = useParams();
  const newsId = Number(id);
  const news = newsDetailData.find((n) => n.id === newsId);

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

  // 当前新闻对应的媒体
  const currentMedia = newsMedia[newsId] || { type: 'image', src: news.heroImage };

  return (
    <div className="bg-[#F4F4EB] min-h-screen pt-20">
      {/* ─── Back Navigation ───────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-['VT323'] text-lg uppercase tracking-wide hover:text-[#FF7A00] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to News</span>
        </Link>
      </div>

      {/* ─── Hero Image (顶部装饰) ────── */}
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
                <span className="w-3 h-3 rounded-full bg-[#FF7A00] border border-white/20" />
                <span className="w-3 h-3 rounded-full bg-[#E2F16B] border border-white/20" />
                <span className="w-3 h-3 rounded-full bg-white/30 border border-white/20" />
              </div>
              <span className="font-['VT323'] text-white/60 text-sm tracking-wider ml-2">
                NEWS_{String(news.id).padStart(3, "0")}.dat
              </span>
            </div>
            <span className="font-mono text-white/40 text-xs">{news.date}</span>
          </div>

          <div className="relative h-[200px] md:h-[300px] overflow-hidden bg-black">
             {/* 顶部 Hero 仅作为背景装饰，保持一定的暗度 */}
            {currentMedia.type === 'video' ? (
              <video src={currentMedia.src} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50" />
            ) : (
              <img src={currentMedia.src} alt={news.title} className="w-full h-full object-cover opacity-50" />
            )}
            <div className="absolute inset-0 pointer-events-none opacity-[0.1]" style={{ backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)" }} />
          </div>
        </div>
      </motion.div>

      {/* ─── Article Content ───────────────────────── */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-4xl mx-auto px-4 md:px-8 mt-10"
      >
        <div className="flex gap-2 flex-wrap mb-6">
          {news.tags.map((tag, i) => (
            <span key={i} className="bg-[#E2F16B] border-2 border-black px-4 py-1 rounded-full font-['VT323'] text-base uppercase tracking-wider">
              <Tag className="w-3 h-3 inline mr-1" />
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-['VT323'] text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.95] mb-6">
          {news.title}
        </h1>

        <div className="flex items-center gap-6 mb-10 pb-6 border-b-4 border-black">
          <div className="flex items-center gap-2 font-mono text-sm text-gray-600">
            <Clock className="w-4 h-4" /> {news.date}
          </div>
          <div className="flex items-center gap-2 font-mono text-sm text-gray-600">
            <User className="w-4 h-4" /> {news.author}
          </div>
        </div>

        {/* 文字内容 */}
        <div className="space-y-6 mb-10">
          {news.content.map((paragraph, i) => (
            <p key={i} className="font-mono text-base leading-relaxed text-gray-800">
              {paragraph}
            </p>
          ))}
        </div>

        {/* 🌟 核心修改区：直接在正文中嵌入图像/视频展示 🌟 */}
        <div className="my-12 rounded-2xl overflow-hidden border-4 border-black bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {currentMedia.type === 'video' ? (
            <div className="flex flex-col">
              <video 
                src={currentMedia.src} 
                controls 
                autoPlay 
                loop 
                muted 
                className="w-full h-auto"
              />
              <div className="bg-black p-3 text-center border-t border-white/10">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
                  Live_Project_Demonstration.mp4
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <img 
                src={currentMedia.src} 
                alt="Project Feature" 
                className="w-full h-auto"
              />
              <div className="bg-black p-3 text-center border-t border-white/10">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
                  Technical_Visual_Asset.png
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-6 md:p-8 mb-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-8 bg-[#FF7A00]" />
            <h3 className="font-['VT323'] text-2xl uppercase tracking-wider">Research Notes</h3>
          </div>
          <p className="font-mono text-sm text-gray-600">
            This asset serves as critical evidence for the ongoing research within the U.TOP Lab. 
            For further technical specifications or collaboration inquiries, please reach out via our team contact links.
          </p>
        </div>
      </motion.article>

      {/* ─── Related News ──────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-12 mb-20">
        <h3 className="font-['VT323'] text-2xl uppercase tracking-wider mb-6 flex items-center gap-2">
          <span className="text-[#FF7A00]">///</span> More News
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newsDetailData
            .filter((n) => n.id !== news.id)
            .map((item) => {
              const itemMedia = newsMedia[item.id] || { type: 'image', src: item.heroImage };
              return (
                <Link key={item.id} to={`/news/${item.id}`} className="group bg-white border-2 border-black rounded-xl overflow-hidden transition-all">
                  <div className="h-32 overflow-hidden bg-black">
                    {itemMedia.type === 'video' ? (
                      <video src={itemMedia.src} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <img src={itemMedia.src} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-xs text-gray-500 mb-1">{item.date}</p>
                    <h4 className="font-['VT323'] text-xl uppercase group-hover:text-[#FF7A00] transition-colors">{item.title}</h4>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}