import { useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { newsFeature as img3, newsImages } from "../assets";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { Link } from "react-router-dom"; // 👈 帮你把这里改对了，防止打包报错！

const newsItems = [
  {
    id: 1,
    title: "Latest Publication: New Paper on Urban Exposure & Health",
    desc: "Our latest research published in Environment & Planning B explores the relationship between urban spatial exposure and mental health outcomes.",
    detail:
      "Using wearable sensors and mobile data from 2,400 participants, we quantified daily exposure to green space, noise, and air quality across three neighborhoods. The findings reveal significant correlations between spatial design and self-reported wellbeing, offering new evidence for health-centered urban planning.",
  },
  {
    id: 2,
    title: "Tools Release: AI for Citizen Science — Demo Available",
    desc: "We've released a demo of our AI-powered citizen science toolkit, enabling communities to participate in urban data collection.",
    detail:
      "The platform uses conversational AI to guide non-expert users through environmental monitoring tasks. Early testing with community groups in Gainesville showed 89% task completion rates. Watch the demo video on our project page to see it in action.",
  },
  {
    id: 3,
    title: "On-going User Test: Urban VR Planning Experience",
    desc: "We are currently recruiting participants for our immersive VR urban planning user study.",
    detail:
      "Participants will experience proposed neighborhood changes in VR and provide feedback through our interactive evaluation system. The study is open to all residents aged 18+. Sessions last approximately 45 minutes at our lab in Gainesville. Contact us to schedule your session.",
  },
];

export function News() {
  const [activeId, setActiveId] = useState<number | null>(2);
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw motion values for mouse offset
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for the popup
  const popupX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const popupY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Lighter parallax for city model
  const cityX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const cityY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Normalize to -1 ~ 1
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(nx * 18);   // popup shifts ±18px
    mouseY.set(ny * 12);   // popup shifts ±12px
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
        {/* News List */}
        <div className="flex flex-col gap-4">
          {newsItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <div key={item.id} className="relative">
                <div
                  onClick={() => handleToggle(item.id)}
                  className={`block p-6 border-2 border-black rounded-3xl transition-all duration-300 relative overflow-hidden cursor-pointer ${
                    isActive
                      ? "bg-[#ff6b00] text-black"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    {/* 仅在此处修改了字体样式 */}
                    <h3 className="font-['VT323'] text-2xl md:text-3xl">{item.title}</h3>
                    {/* 完全保留你原版的圆形展开按钮 */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 border-black flex items-center justify-center transition-colors duration-300 ${
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
                          <p className="text-sm font-mono mb-2">{item.desc}</p>
                          <p className="text-sm font-mono opacity-80 mb-5">
                            {item.detail}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-[#ff6b00] border-2 border-black rounded-full uppercase text-sm tracking-wider cursor-pointer transition-all duration-150 group"
                          >
                            <Link to={`/news/${item.id}`} className="flex items-center gap-2">
                              <span className="font-['VT323'] text-base tracking-widest">
                                Learn More
                              </span>
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Image Collage */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-[400px] md:h-[500px] bg-[#eef093] rounded-3xl border-2 border-black overflow-hidden flex items-center justify-center"
        >
             {/* Abstract Grid background for the image container */}
            <div className="absolute inset-0 opacity-20" 
                 style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

            {/* City model - base layer */}
            <motion.img 
              src={img3} 
              alt="City Model" 
              className="relative z-10 w-[85%] h-auto object-contain" 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ x: cityX, y: cityY }}
            />

            {/* Popup window overlay for active news item */}
            <AnimatePresence mode="wait">
              {activeId && (
                <motion.div
                  key={activeId}
                  initial={{ scale: 0.3, opacity: 0, y: 60 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.3, opacity: 0, y: 60 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ x: popupX, y: popupY }}
                  className="absolute z-20 w-[78%] rounded-xl border-2 border-black bg-white overflow-hidden"
                >
                  {/* Window title bar */}
                  <div className="flex items-center justify-between px-3 py-2 bg-black text-white border-b-2 border-black">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#ff6b00] border border-white/20" />
                        <span className="w-3 h-3 rounded-full bg-[#E2F16B] border border-white/20" />
                        <span className="w-3 h-3 rounded-full bg-white/30 border border-white/20" />
                      </div>
                      <span className="font-['VT323'] text-sm tracking-wider ml-2 opacity-70">
                        NEWS_{String(activeId).padStart(2, "0")}.exe
                      </span>
                    </div>
                    <X className="w-3.5 h-3.5 opacity-50" />
                  </div>
                  {/* Window content - image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <motion.img
                      key={`img-${activeId}`}
                      src={newsImages[activeId]}
                      alt={`News ${activeId}`}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.15 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    {/* Scanline overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-[0.04]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </div>
    </section>
  );
}