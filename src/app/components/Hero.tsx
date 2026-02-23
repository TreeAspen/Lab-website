import { heroModel1 as img1, heroModel2 as img2 } from "../assets";
import { motion } from "motion/react";
import { GravityGrid } from "./GravityGrid";

function ModelLabel({ label, position }: { label: string; position: "left" | "right" }) {
  const isLeft = position === "left";
  return (
    <div className={`absolute ${isLeft ? "left-0 -top-10" : "right-0 -top-10"} flex items-center gap-0 pointer-events-none z-20`}>
      {isLeft ? (
        <>
          {/* Label Capsule on the left */}
          <div className="bg-black text-[#F4F4EB] px-4 py-1.5 rounded-full flex items-center gap-2 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <div className="w-2 h-2 rounded-full bg-[#FF7A00]" />
            <span className="font-['VT323'] text-lg tracking-wide uppercase leading-none pt-0.5">{label}</span>
          </div>
          {/* Connector Line */}
          <div className="relative w-12 h-[1px] bg-black">
            <div className="absolute w-2 h-2 bg-black rounded-full top-1/2 transform -translate-y-1/2 -right-1" />
          </div>
        </>
      ) : (
        <>
          {/* Connector Line */}
          <div className="relative w-12 h-[1px] bg-black">
            <div className="absolute w-2 h-2 bg-black rounded-full top-1/2 transform -translate-y-1/2 -left-1" />
          </div>
          {/* Label Capsule on the right */}
          <div className="bg-black text-[#F4F4EB] px-4 py-1.5 rounded-full flex items-center gap-2 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <div className="w-2 h-2 rounded-full bg-[#FF7A00]" />
            <span className="font-['VT323'] text-lg tracking-wide uppercase leading-none pt-0.5">{label}</span>
          </div>
        </>
      )}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-between bg-[#E2F16B] overflow-hidden pt-24 pb-20 border-b-4 border-black">
      {/* Pure CSS Grid Background */}
      {/* Replaced by GravityGrid below */}

      {/* Gravity-distorted Grid Background — wide gentle warp */}
      <GravityGrid amplitude={24} radius={400} cellSize={40} color="#000" opacity={0.18} className="z-[1]" />
      
      {/* Decorative Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] mix-blend-overlay z-[2]" />

      {/* Title Area */}
      <div className="z-10 text-center max-w-7xl px-4 relative w-full flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-['VT323'] text-7xl md:text-8xl lg:text-[9rem] text-black uppercase leading-[0.8] tracking-tight drop-shadow-[4px_4px_0px_rgba(255,255,255,1)] select-none">
            Urban Technology,<br/>
            Observation & Practice
          </h1>
        </motion.div>
      </div>

      {/* Floating Models — below the title, no overlap */}
      <div className="z-10 relative w-full max-w-5xl px-8 md:px-16 flex justify-between items-end mt-8 mb-8">
        {/* Left Model: VR Headset */}
        <motion.div
          className="relative w-40 md:w-56 lg:w-64 aspect-square"
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <ModelLabel label="TEXT" position="left" />
          <img 
            src={img1} 
            alt="VR Headset" 
            className="w-full h-full object-contain drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] filter contrast-125"
          />
        </motion.div>

        {/* Right Model: BCI / Glasses */}
        <motion.div
          className="relative w-40 md:w-56 lg:w-64 aspect-square"
          animate={{ y: [12, -12, 12] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        >
          <ModelLabel label="TEXT" position="right" />
          <img 
            src={img2} 
            alt="Brain Computer Interface" 
            className="w-full h-full object-contain drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] filter contrast-125"
          />
        </motion.div>
      </div>
      
      {/* Bottom Decorative Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black flex items-center overflow-hidden border-t-4 border-white pointer-events-none z-30">
        <motion.div 
          className="flex gap-8 whitespace-nowrap text-[#E2F16B] font-['VT323'] text-2xl uppercase tracking-widest"
          animate={{ x: "-50%" }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
           {[...Array(20)].map((_, i) => (
             <span key={i} className="mx-8">System Online /// Grid Active /// Observation Mode</span>
           ))}
        </motion.div>
      </div>
    </section>
  );
}