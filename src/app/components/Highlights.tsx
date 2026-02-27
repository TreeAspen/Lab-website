import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Terminal } from "lucide-react";
import { highlightsVR as imgVR } from "../assets";
import { Link } from "react-router-dom";

const pillars = [
  {
    id: "urban",
    label: "Urban Sensing",
    num: "Pillar 1",
    summary:
      "To understand the city, we first need to measure it. We deploy sensor-based measurements that capture urban life at every level. By combining mobile data, wearables, and computer vision, we move beyond static maps to track the \"pulse\" of daily life.",
    focus:
      "Our work specifically focuses on urban exposure, quantifying how things like environmental stress and spatial design affect our mental and physical health.",
    tags: ["IoT", "Wearables", "Computer Vision", "Exposure"],
  },
  {
    id: "hci",
    label: "Urban HCI & Immersive Systems",
    num: "Pillar 2",
    summary:
      "If sensing is about measuring, the next step is making that data legible and actionable. We develop urban HCI systems — integrating immersive VR, photogrammetry, and 3D interfaces — that allow people to literally step into future urban realities.",
    focus:
      "By turning complex \"what-if\" scenarios into playful, interactive experiences, we move beyond dry planning toward a more human-centered process.",
    tags: ["VR", "Photogrammetry", "3D", "Interaction"],
  },
  {
    id: "ai",
    label: "Urban AI & Responsive Systems",
    num: "Pillar 3",
    summary:
      "If sensing measures the city and HCI lets us see it, our final pillar is about making the city respond. We build AI agents and conversational systems to bridge complex urban data with the daily lives of citizens.",
    focus:
      "Our urban systems are not merely efficient — they are traceable, intuitive, and deeply responsive to human needs.",
    tags: ["AI Agents", "Chatbot", "NLP", "Responsive"],
  },
];

export function Highlights() {
  const [activeTab, setActiveTab] = useState("urban");
  const active = pillars.find((p) => p.id === activeTab)!;

  return (
    <section id="research" className="bg-black text-[#F4F4EB] py-24 px-4 md:px-12 overflow-hidden relative border-t-4 border-white">
      {/* 装饰性网格背景 */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 39.5 L0.5 10.5 A10 10 0 0 1 10.5 0.5 L29.5 0.5 A10 10 0 0 1 39.5 10.5 L39.5 39.5 Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 顶部标题区：Research + Practice */}
        <div className="mb-16">
          <div className="flex items-center gap-3 text-[#E2F16B] mb-6">
            <Terminal size={24} />
            <span className="font-['VT323'] text-2xl tracking-widest uppercase">
              Core Framework
            </span>
          </div>
          
          <h2 className="font-['VT323'] text-6xl md:text-8xl uppercase tracking-tighter mb-8 leading-none">
            Research <span className="text-[#FF7A00]">+</span> Practice
          </h2>
          
          <p className="font-['VT323'] text-xl md:text-2xl text-white/80 max-w-4xl leading-relaxed border-l-8 border-[#FF7A00] pl-8 py-2">
            We believe our work only matters if it lands. At U.TOP Lab, we don't just theorize; we co-create live pilots with local communities and people to test ideas in the real world. Ultimately, our goal is to turn "urban tech" into tangible improvements — democratizing urban intelligence to create genuine public value.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* 左侧 Pillar 导航 */}
          <div className="flex lg:flex-col gap-3 lg:w-1/3 overflow-x-auto pb-4 lg:pb-0">
            {pillars.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-8 py-5 text-left transition-all duration-300 border-l-4 whitespace-nowrap lg:whitespace-normal
                  ${activeTab === tab.id 
                    ? "bg-[#E2F16B] text-black border-[#FF7A00] translate-x-2" 
                    : "bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-white"
                  }`}
              >
                <span className="font-mono text-xs block mb-1 opacity-60 uppercase">{tab.num}</span>
                <span className="font-['VT323'] text-2xl md:text-3xl uppercase tracking-wider">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* 右侧内容展示区 */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#fcfcea] text-black p-8 md:p-12 border-4 border-[#E2F16B] relative"
              >
                {/* 装饰性角标 */}
                <div className="absolute top-4 right-4 font-['VT323'] text-[#FF7A00] text-xl">
                  [ MODULE_0{pillars.findIndex(p => p.id === activeTab) + 1} ]
                </div>

                <div className="bg-black h-64 md:h-80 w-full mb-8 relative overflow-hidden border-2 border-black">
                   <img 
                      src={imgVR} 
                      alt={active.label}
                      className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                   />
                   <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%]" />
                </div>

                <div className="flex gap-2 mb-6 flex-wrap">
                  {active.tags.map((tag, i) => (
                    <span key={i} className="bg-[#E2F16B] border-2 border-black px-4 py-1 font-['VT323'] text-sm uppercase">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-['VT323'] text-4xl md:text-5xl uppercase mb-6 leading-tight">
                  {active.label}
                </h3>
                
                <p className="font-sans text-lg mb-4 leading-relaxed max-w-2xl text-black/90">
                  {active.summary}
                </p>
                <p className="font-sans text-base mb-10 leading-relaxed max-w-2xl text-black/60 italic">
                  {active.focus}
                </p>

                <Link 
                  to={`/highlights/${activeTab}`}
                  className="inline-flex items-center gap-3 bg-black text-[#F4F4EB] px-8 py-4 font-['VT323'] text-2xl uppercase tracking-widest hover:bg-[#FF7A00] transition-colors group"
                >
                  <span>View Full Research</span>
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}