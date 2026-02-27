import { heroModel1 as img1, heroModel2 as img2 } from "../assets";
import { motion } from "motion/react";
import { GravityGrid } from "./GravityGrid";
import { Link } from "react-router-dom";

function ModelLabel({ label, href, position }: { label: string; href: string; position: "left" | "right" }) {
  const isLeft = position === "left";
  return (
    <div className={`absolute ${isLeft ? "left-0 -top-10" : "right-0 -top-10"} flex items-center gap-0 z-20`}>
      {isLeft ? (
        <>
          <Link
            to={href}
            className="bg-black text-[#F4F4EB] px-4 py-1.5 rounded-full flex items-center gap-2 border-2 border-white hover:bg-[#FF7A00] hover:text-black transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-[#FF7A00]" />
            <span className="font-['VT323'] text-lg tracking-wide uppercase leading-none pt-0.5">{label}</span>
          </Link>
          <div className="relative w-12 h-[1px] bg-black">
            <div className="absolute w-2 h-2 bg-black rounded-full top-1/2 transform -translate-y-1/2 -right-1" />
          </div>
        </>
      ) : (
        <>
          <div className="relative w-12 h-[1px] bg-black">
            <div className="absolute w-2 h-2 bg-black rounded-full top-1/2 transform -translate-y-1/2 -left-1" />
          </div>
          <Link
            to={href}
            className="bg-black text-[#F4F4EB] px-4 py-1.5 rounded-full flex items-center gap-2 border-2 border-white hover:bg-[#FF7A00] hover:text-black transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-[#FF7A00]" />
            <span className="font-['VT323'] text-lg tracking-wide uppercase leading-none pt-0.5">{label}</span>
          </Link>
        </>
      )}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-between bg-[#E2F16B] overflow-hidden pt-24 pb-20 border-b-4 border-black">
      <GravityGrid amplitude={24} radius={400} cellSize={40} color="#000" opacity={0.18} className="z-[1]" />
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] mix-blend-overlay z-[2]" />

      {/* Title Area */}
      <div className="z-10 text-center max-w-5xl px-4 relative w-full flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Lab identifier */}
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="font-['VT323'] text-2xl md:text-3xl tracking-widest uppercase text-black/60">U.TOP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
            <span className="font-['VT323'] text-2xl md:text-3xl tracking-widest uppercase text-black/60">UF</span>
          </div>

          <h1 className="font-['VT323'] text-5xl md:text-7xl lg:text-[8rem] text-black uppercase leading-[0.85] tracking-tight select-none mb-6">
            Urban Technology
          </h1>
          <p className="font-['VT323'] text-2xl md:text-3xl lg:text-4xl text-black/70 uppercase tracking-wider leading-snug max-w-3xl mx-auto">
            for Human &ndash; Computer &ndash;<br className="hidden md:block" /> Environment Interaction
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 font-mono text-sm md:text-base text-black/60 max-w-xl mx-auto"
        >
          Connecting People, Technology and Places for Better Cities
        </motion.p>
      </div>

      {/* Floating Models */}
      <div className="z-10 relative w-full max-w-5xl px-8 md:px-16 flex justify-between items-end mt-8 mb-8">
        {/* Left Model: VR Headset */}
        <motion.div
          className="relative w-40 md:w-56 lg:w-64 aspect-square"
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <ModelLabel label="Urban VR" href="/highlights/vr" position="left" />
          <img 
            src={img1} 
            alt="VR Headset" 
            className="w-full h-full object-contain filter contrast-125"
          />
        </motion.div>

        {/* Right Model: BCI / Glasses */}
        <motion.div
          className="relative w-40 md:w-56 lg:w-64 aspect-square"
          animate={{ y: [12, -12, 12] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        >
          <ModelLabel label="Urban Sensing" href="/highlights/urban" position="right" />
          <img 
            src={img2} 
            alt="Brain Computer Interface" 
            className="w-full h-full object-contain filter contrast-125"
          />
        </motion.div>
      </div>
      
      {/* Bottom Ticker Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black flex items-center overflow-hidden border-t-4 border-white pointer-events-none z-30">
        <motion.div 
          className="flex gap-8 whitespace-nowrap text-[#E2F16B] font-['VT323'] text-2xl uppercase tracking-widest"
          animate={{ x: "-50%" }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
           {[...Array(20)].map((_, i) => (
             <span key={i} className="mx-8">Urban Sensing /// Urban HCI /// Urban AI /// Observation & Practice</span>
           ))}
        </motion.div>
      </div>
    </section>
  );
}
