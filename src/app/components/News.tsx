import { useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { newsFeature as img3 } from "../assets";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { Link } from "react-router-dom";
import { newsItems } from "../data/news";

export function News() {
  const [activeId, setActiveId] = useState<number | null>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const popupX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const popupY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const cityX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const cityY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(nx * 18);  
    mouseY.set(ny * 12);  
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleToggle = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="news" className="bg-[#fcfcea] py-16 px-4 md:px-12 border-t-4 border-black">
      <div className="text-center mb-12">
        <h2 className="font-['VT323'] text-5xl md:text-6xl mb-4 uppercase">News</h2>
        <p className="font-mono text-sm uppercase tracking-widest text-gray-600">
          Latest updates from the lab
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* ─── 左侧：新闻列表 ────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {newsItems.map((item) => {
            const isActive = activeId === item.id;
            const itemMedia = item.homeMedia;

            return (
              <div key={item.id} className="relative">
                <div
                  onClick={() => handleToggle(item.id)}
                  className={`block p-5 md:p-6 border-2 border-black rounded-3xl transition-all duration-300 relative overflow-hidden cursor-pointer ${
                    isActive
                      ? "bg-[#ff6b00] text-black"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-['VT323'] text-2xl md:text-3xl leading-none">{item.title}</h3>
                    <div
                      className={`w-6 h-6 shrink-0 ml-4 rounded-full border-2 border-black flex items-center justify-center transition-colors duration-300 ${
                        isActive ? "bg-black" : "bg-transparent"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          isActive ? "bg-[#ff6b00]" : "bg-black"
                        }`}
                      />
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t border-black/30">
                          
                          {/* 移动端内置媒体显示 */}
                          {itemMedia && (
                            <div className="block md:hidden w-full aspect-video rounded-xl border-2 border-black overflow-hidden mb-4 bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                              {itemMedia.type === 'video' ? (
                                <video src={itemMedia.src} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90" />
                              ) : (
                                <img src={itemMedia.src} alt={item.title} className="w-full h-full object-cover opacity-90" />
                              )}
                            </div>
                          )}

                          <p className="text-sm md:text-base font-mono mb-2 font-bold leading-snug">{item.desc}</p>
                          <p className="text-xs md:text-sm font-mono opacity-80 mb-5 leading-relaxed">
                            {item.detail}
                          </p>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="inline-flex items-center gap-2 bg-black text-[#ff6b00] border-2 border-black rounded-full uppercase text-sm tracking-wider cursor-pointer transition-all duration-150 group hover:bg-[#E2F16B] hover:text-black w-full justify-center md:w-auto overflow-hidden"
                          >
                            {item.externalLink ? (
                              <a 
                                href={item.externalLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-2 px-5 py-2.5 w-full h-full justify-center"
                              >
                                <span className="font-['VT323'] text-base tracking-widest">
                                  Read Paper
                                </span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                              </a>
                            ) : (
                              /* 🌟 核心修改 2：这里的 to 从 item.id 改为 item.slug */
                              <Link to={`/news/${item.slug}`} className="flex items-center gap-2 px-5 py-2.5 w-full h-full justify-center">
                                <span className="font-['VT323'] text-base tracking-widest">
                                  Learn More
                                </span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                              </Link>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── 右侧：Image Collage 保持不变 ──────────────────────────── */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-[400px] md:h-[500px] bg-[#eef093] rounded-3xl border-2 border-black overflow-hidden hidden md:flex items-center justify-center sticky top-24"
        >
          <div className="absolute inset-0 opacity-20" 
               style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

          <motion.img 
            src={img3} 
            alt="City Model" 
            className="relative z-10 w-[85%] h-auto object-contain" 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ x: cityX, y: cityY }}
          />

          <AnimatePresence mode="wait">
            {(() => {
              const activeItem = newsItems.find((n) => n.id === activeId);
              const activeMedia = activeItem?.homeMedia;
              if (!activeId || !activeMedia) return null;
              return (
              <motion.div
                key={activeId}
                initial={{ scale: 0.3, opacity: 0, y: 60 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.3, opacity: 0, y: 60 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ x: popupX, y: popupY }}
                className="absolute z-20 w-[78%] rounded-xl border-2 border-black bg-white overflow-hidden shadow-2xl"
              >
                <div className="flex items-center justify-between px-3 py-2 bg-black text-white border-b-2 border-black">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#ff6b00]" />
                      <span className="w-3 h-3 rounded-full bg-[#E2F16B]" />
                      <span className="w-3 h-3 rounded-full bg-white/30" />
                    </div>
                    <span className="font-['VT323'] text-sm tracking-wider ml-2 opacity-70">
                      NEWS_{String(activeId).padStart(2, "0")}.exe
                    </span>
                  </div>
                  <X className="w-3.5 h-3.5 opacity-50" />
                </div>

                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                  {activeMedia.type === 'video' ? (
                    <motion.video
                      key={`vid-${activeId}`}
                      src={activeMedia.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-80"
                      initial={{ scale: 1.15 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  ) : (
                    <motion.img
                      key={`img-${activeId}`}
                      src={activeMedia.src}
                      alt={`News ${activeId}`}
                      className="w-full h-full object-cover opacity-80"
                      initial={{ scale: 1.15 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  )}
                  
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)",
                    }}
                  />
                </div>
              </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}