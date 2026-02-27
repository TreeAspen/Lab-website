import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
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
    <section id="pillars" className="bg-black text-white py-20 px-4 md:px-12 overflow-hidden relative border-t-4 border-white">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 39.5 L0.5 10.5 A10 10 0 0 1 10.5 0.5 L29.5 0.5 A10 10 0 0 1 39.5 10.5 L39.5 39.5 Z' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
           <div className="bg-[#E2F16B] text-black px-3 py-1 font-['VT323'] text-lg">{" >>> "}</div>
           <h2 className="font-['VT323'] text-5xl md:text-6xl uppercase tracking-widest">Research Pillars</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabs */}
          <div className="w-full md:w-1/4 flex flex-col gap-2">
            {pillars.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 text-left text-lg uppercase transition-all duration-300
                  ${activeTab === tab.id 
                    ? "bg-[#FF7A00] text-black translate-x-4" 
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                style={{ clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)" }}
              >
                <span className="font-mono text-xs block mb-0.5 opacity-60">{tab.num}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Card */}
          <div className="w-full md:w-3/4 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#fcfcea] text-black p-6 rounded-lg border-2 border-white relative"
              >
                <div className="bg-[#eef093] h-64 md:h-80 w-full mb-6 relative overflow-hidden rounded-md border-2 border-black">
                   <img 
                      src={imgVR} 
                      alt={active.label}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                   />
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {active.tags.map((tag, i) => (
                    <span key={i} className="bg-[#E2F16B] border border-black px-3 py-1 rounded-full text-xs uppercase">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl uppercase mb-3">
                  {active.label}
                </h3>
                <p className="font-mono text-sm mb-4 leading-relaxed max-w-2xl">
                  {active.summary}
                </p>
                <p className="font-mono text-sm mb-6 leading-relaxed max-w-2xl text-black/60">
                  {active.focus}
                </p>

                <Link 
                  to={`/highlights/${activeTab}`}
                  className="inline-flex items-center gap-2 uppercase hover:underline group"
                >
                  <span>View Our Work</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Research + Practice callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 border-l-4 border-[#FF7A00] pl-6 max-w-3xl"
        >
          <h3 className="font-['VT323'] text-3xl uppercase tracking-wider text-[#E2F16B] mb-3">
            Research + Practice
          </h3>
          <p className="font-mono text-sm text-white/70 leading-relaxed">
            We believe our work only matters if it lands. At U.TOP Lab, we don't just theorize; we co-create 
            live pilots with local communities and people to test ideas in the real world. Ultimately, our goal 
            is to turn "urban tech" into tangible improvements — democratizing urban intelligence to create genuine public value.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
