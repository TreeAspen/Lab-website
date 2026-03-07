import { useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { newsFeature as img3, newsImages } from "../assets";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { Link } from "react-router-dom";

const newsItems = [
  {
    id: 1,
    title: "Latest Publication: VR Study on Flood Risk Response",
    desc: "Our latest research published in IJDRR leverages Virtual Reality to simulate urban floods, uncovering how human responses shift across different contexts.",
    detail: "The study reveals that people are significantly more sensitive to flood risks when in a car than on the street, especially at night. It also highlights how self-efficacy, warning sirens, and socioeconomic factors critically shape emergency evacuation behaviors.",
    externalLink: "https://doi.org/10.1016/j.ijdrr.2025.105956", // 👈 指向官方 DOI 链接
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
    title: "On-going User Test: VR & Body Sensing for Urban Stress",
    desc: "We are transitioning into the full data collection phase for our immersive VR study exploring how urban visual elements mitigate stress. ",
    detail: "Using VR headsets paired with EEG and EDA biosensors, participants explore 360° panoramic scenes of New York City[cite: 11, 14]. We measure physiological responses across different urban typologies—such as traffic corridors and waterfronts—where the Green View Index (GVI) has been normalized using Generative AI[cite: 14, 15, 59]. Sessions include setup, baseline measurements, and four 3-minute VR exposures to help us develop data-driven urban design guidelines[cite: 159, 162, 261]."
  }
];

export function News() {
  const [activeId, setActiveId] = useState<number | null>(1); // 👈 默认展开第一条新发表的论文
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
                    <h3 className="font-['VT323'] text-2xl md:text-3xl">{item.title}</h3>
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
                          <p className="text-sm font-mono mb-2 font-bold">{item.desc}</p>
                          <p className="text-sm font-mono opacity-80 mb-5 leading-relaxed">
                            {item.detail}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-[#ff6b00] border-2 border-black rounded-full uppercase text-sm tracking-wider cursor-pointer transition-all duration-150 group hover:bg-[#E2F16B] hover:text-black"
                          >
                            {/* 👇 核心逻辑：如果有外部链接，使用 a 标签；否则使用 React Router 的 Link */}
                            {item.externalLink ? (
                              <a 
                                href={item.externalLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-2"
                              >
                                <span className="font-['VT323'] text-base tracking-widest">
                                  Read Paper
                                </span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                              </a>
                            ) : (
                              <Link to={`/news/${item.id}`} className="flex items-center gap-2">
                                <span className="font-['VT323'] text-base tracking-widest">
                                  Learn More
                                </span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                              </Link>
                            )}
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

        {/* Image Collage (保留你原有的超酷视差动画) */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-[400px] md:h-[500px] bg-[#eef093] rounded-3xl border-2 border-black overflow-hidden flex items-center justify-center sticky top-24"
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
            {activeId && (
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