import { useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { newsFeature as img3, newsImages } from "../assets";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { Link } from "react-router-dom";

const newsItems = [
  {
    id: 1,
    title: "Latest Publication: New Paper on Urban Exposure & Health",
    desc: "Our latest research published in Environment & Planning B explores the relationship between urban spatial exposure and mental health outcomes.",
    detail:
      "Using wearable sensors and mobile data from 2,400 participants, we quantified daily exposure to green space, noise, and air quality across three neighborhoods.",
  },
  {
    id: 2,
    title: "Tools Release: AI for Citizen Science — Demo Available",
    desc: "We've released a demo of our AI-powered citizen science toolkit, enabling communities to participate in urban data collection.",
    detail:
      "The platform uses conversational AI to guide non-expert users through environmental monitoring tasks. Early testing with community groups showed 89% task completion rates.",
  },
  {
    id: 3,
    title: "On-going User Test: Urban VR Planning Experience",
    desc: "We are currently recruiting participants for our immersive VR urban planning user study.",
    detail:
      "Participants will experience proposed neighborhood changes in VR and provide feedback through our interactive evaluation system. The study is open to residents aged 18+.",
  },
];

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

  return (
    <section id="news" className="bg-[#fcfcea] py-20 px-4 md:px-12 border-t-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="bg-black text-[#E2F16B] px-3 py-1 font-['VT323'] text-xl uppercase tracking-wider">
            News /// Updates
          </div>
          <div className="flex-1 h-[2px] bg-black/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* News List */}
          <div className="flex flex-col gap-6">
            {newsItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <div key={item.id} className="relative">
                  <div
                    onClick={() => setActiveId(item.id)}
                    className={`block p-6 border-2 border-black transition-all duration-300 relative overflow-hidden cursor-pointer ${
                      isActive ? "bg-[#ff6b00] text-black" : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      {/* 标题统一为像素体 VT323 */}
                      <h3 className={`font-['VT323'] text-2xl md:text-3xl leading-tight transition-colors ${isActive ? "text-black" : "text-black/80"}`}>
                        {item.title}
                      </h3>
                      <div className={`mt-2 w-6 h-6 border-2 border-black flex items-center justify-center shrink-0 ${isActive ? "bg-black" : "bg-transparent"}`}>
                        {isActive && <div className="w-2 h-2 bg-[#ff6b00]" />}
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-black/20">
                            <p className="font-['VT323'] text-lg mb-4 opacity-90">{item.desc}</p>
                            <Link 
                              to={`/news/${item.id}`}
                              className="inline-flex items-center gap-2 bg-black text-[#F4F4EB] px-4 py-2 font-['VT323'] text-lg uppercase hover:bg-white hover:text-black border-2 border-black transition-all"
                            >
                              <span>Learn More</span>
                              <ArrowRight size={18} />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Image Container */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[500px] bg-[#eef093] border-4 border-black overflow-hidden flex items-center justify-center p-8"
          >
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '24px 24px'}}></div>

            <motion.img 
              src={img3} 
              alt="City Model" 
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]" 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ x: cityX, y: cityY }}
            />

            <AnimatePresence mode="wait">
              {activeId && (
                <motion.div
                  key={activeId}
                  initial={{ scale: 0.8, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 30 }}
                  style={{ x: popupX, y: popupY }}
                  className="absolute z-20 w-[85%] border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex items-center justify-between px-3 py-2 bg-black text-white">
                    <span className="font-['VT323'] text-sm tracking-widest uppercase">
                      Data_Visualizer_v1.0.exe
                    </span>
                    <X className="w-4 h-4 cursor-pointer" onClick={() => setActiveId(null)} />
                  </div>
                  <div className="aspect-video overflow-hidden relative">
                    <img src={newsImages[activeId]} alt="News" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}