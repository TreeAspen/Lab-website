import { 
  heroModel1 as img1, 
  heroModel2 as img2, 
  heroModel3 as img3, 
  heroModel4 as img4 
} from "../assets";
import { motion } from "motion/react";
import { GravityGrid } from "./GravityGrid";
import { Link } from "react-router-dom";

/**
 * 通用浮动容器：只保留上下呼吸浮动，去除鼠标视差
 */
function FloatingModule({
  children,
  delay = 0,
  duration = 3,
  amplitude = 12,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  amplitude?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute z-20 ${className}`}
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * 赛博胶囊按键：黑底 + 黄/橙圆点交互
 */
function ModernLabel({ label, href }: { label: string; href: string }) {
  return (
    <Link
      to={href}
      className="group relative flex items-center h-12 bg-[#1C1C13] rounded-full pl-2 pr-8 hover:bg-[#FF7A00] transition-colors duration-300 border-2 border-transparent shadow-lg"
    >
      {/* 外部黄色大圆圈 */}
      <div className="relative flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[#FAFF71]">
        {/* 内部橙色小圆圈 */}
        <div className="w-4 h-4 rounded-full bg-[#FF7802] group-hover:bg-black transition-colors duration-300" />
      </div>
      <span className="font-sans font-bold text-xl text-white group-hover:text-black ml-4 tracking-wide whitespace-nowrap">
        {label}
      </span>
    </Link>
  );
}

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#faff71] overflow-hidden border-b-4 border-black pb-12">
      
      {/* === 原汁原味的重力网格背景交互 === */}
      <GravityGrid amplitude={24} radius={400} cellSize={40} color="#000" opacity={0.18} className="z-[1]" />
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] mix-blend-overlay z-[2]" />

      {/* === 核心布局容器 === */}
      <div className="relative w-full max-w-[1280px] h-[750px] md:h-[800px] mt-16 md:mt-24 z-10 pointer-events-none">
        
        {/* === 居中大标题 === */}
        <div className="absolute left-1/2 top-[12%] -translate-x-1/2 text-center w-full px-4 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="font-['VT323'] text-2xl tracking-widest uppercase text-black/60">U.TOP LAB</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
              <span className="font-['VT323'] text-2xl tracking-widest uppercase text-black/60">UF</span>
            </div>
            
            <h1 className="font-['VT323'] text-6xl md:text-[6.5rem] lg:text-[7.5rem] text-black uppercase leading-[0.85] tracking-tight select-none">
              Urban Technology,<br />
              <span className="text-5xl md:text-[5.5rem] lg:text-[6rem]">Observation & Practice</span>
            </h1>
          </motion.div>
        </div>

        {/* === 模块 1: Interaction (VR头显) - 左上方 === */}
        <FloatingModule 
          className="left-[5%] top-[25%] hidden md:flex flex-col items-center gap-2 pointer-events-auto" 
          delay={0} duration={3.5} amplitude={10}
        >
          <img src={img1} alt="VR Headset" className="w-48 lg:w-56 h-auto object-contain drop-shadow-2xl" />
          <div className="w-[2px] h-8 bg-black opacity-30" />
          <ModernLabel label="Interaction" href="/highlights/vr" />
        </FloatingModule>

        {/* === 模块 2: Intelligence (像素机器人) - 左下方 === */}
        <FloatingModule 
          className="left-[18%] lg:left-[22%] bottom-[8%] hidden md:flex flex-col items-center gap-2 pointer-events-auto" 
          delay={0.8} duration={4} amplitude={14}
        >
          <ModernLabel label="Intelligence" href="/highlights/ai" />
          <div className="w-[2px] h-8 bg-black opacity-30" />
          <img src={img4} alt="Intelligence AI" className="w-40 lg:w-48 h-auto object-contain drop-shadow-2xl" />
        </FloatingModule>

        {/* === 模块 3: Collaboration (像素小人) - 右下方 === */}
        <FloatingModule 
          className="right-[18%] lg:right-[22%] bottom-[12%] hidden md:flex flex-col items-center gap-2 pointer-events-auto" 
          delay={1.5} duration={3.8} amplitude={12}
        >
          <ModernLabel label="Collaboration" href="/highlights/hci" />
          <div className="w-[2px] h-8 bg-black opacity-30" />
          <img src={img3} alt="Collaboration" className="w-56 lg:w-64 h-auto object-contain drop-shadow-2xl" />
        </FloatingModule>

        {/* === 模块 4: Health (智能眼镜) - 右上方 === */}
        <FloatingModule 
          className="right-[2%] top-[20%] hidden md:flex flex-col items-center gap-2 pointer-events-auto" 
          delay={0.4} duration={3.2} amplitude={11}
        >
          <img src={img2} alt="Urban Sensing" className="w-56 lg:w-64 h-auto object-contain drop-shadow-2xl" />
          <div className="w-[2px] h-8 bg-black opacity-30" />
          <ModernLabel label="Health" href="/highlights/urban" />
        </FloatingModule>

        {/* === 移动端降级展示 (Mobile Fallback) === */}
        <div className="absolute top-[40%] w-full md:hidden flex flex-wrap justify-center gap-8 px-4 z-20 pointer-events-auto">
          <div className="flex flex-col items-center gap-2">
            <img src={img1} alt="Interaction" className="w-32 h-auto" />
            <ModernLabel label="Interaction" href="/highlights/vr" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <img src={img2} alt="Health" className="w-40 h-auto" />
            <ModernLabel label="Health" href="/highlights/urban" />
          </div>
        </div>

      </div>

      {/* === 底部滚动字幕 === */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black flex items-center overflow-hidden border-t-4 border-white pointer-events-none z-30">
        <motion.div 
          className="flex gap-8 whitespace-nowrap text-[#E2F16B] font-['VT323'] text-2xl uppercase tracking-widest"
          animate={{ x: "-50%" }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        >
           {[...Array(20)].map((_, i) => (
             <span key={i} className="mx-8">Urban Sensing /// Urban HCI /// Urban AI /// Observation & Practice</span>
           ))}
        </motion.div>
      </div>
    </section>
  );
}