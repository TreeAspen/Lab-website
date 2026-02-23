import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { highlightsVR as imgVR } from "../assets";

const tabs = [
  { id: "urban", label: "Urban Sensing" },
  { id: "vr", label: "Virtual Reality" },
  { id: "hci", label: "HCI" },
  { id: "ai", label: "AI" },
];

export function Highlights() {
  const [activeTab, setActiveTab] = useState("vr");

  return (
    <section className="bg-black text-white py-20 px-4 md:px-12 overflow-hidden relative border-t-4 border-white">
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
           <div className="bg-[#faff71] text-black px-2 py-1 font-bold">{" >>> "}</div>
           <h2 className="font-['VT323'] text-5xl md:text-6xl uppercase tracking-widest">Highlights</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabs */}
          <div className="w-full md:w-1/4 flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 text-left font-bold text-lg uppercase transition-all duration-300 clip-path-polygon 
                  ${activeTab === tab.id 
                    ? "bg-[#ff6b00] text-black translate-x-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" 
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                style={{ clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)" }}
              >
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
                className="bg-[#fcfcea] text-black p-6 rounded-lg shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] border-2 border-white relative"
              >
                <div className="bg-[#eef093] h-64 md:h-80 w-full mb-6 relative overflow-hidden rounded-md border-2 border-black">
                   <img 
                      src={imgVR} 
                      alt="VR Experience" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                   />
                   
                   {/* "New" Badge */}
                   <div className="absolute bottom-[-20px] right-[-20px] z-20">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <Star className="w-24 h-24 text-[#ff6b00] fill-[#ff6b00] animate-spin-slow absolute" strokeWidth={1} />
                        <span className="relative z-10 font-bold text-black rotate-[-15deg] text-xl">New</span>
                      </div>
                   </div>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {["TEXT TEXT", "TEXT TEXT", "TEXT TEXT"].map((tag, i) => (
                    <span key={i} className="bg-[#faff71] border border-black px-3 py-1 rounded-full text-xs font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold uppercase mb-2">
                  {tabs.find(t => t.id === activeTab)?.label} Project
                </h3>
                <p className="font-mono text-sm mb-6 leading-relaxed max-w-2xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <button className="flex items-center gap-2 font-bold uppercase hover:underline group">
                  Learn More 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}