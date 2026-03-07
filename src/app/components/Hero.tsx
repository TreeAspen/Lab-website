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
 * 通用浮动容器：处理上下呼吸浮动
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
      className={`absolute z-20 pointer-events-auto ${className}`}
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
 * 💡 注意：圆点的物理中心坐标永远是 X: 25px, Y: 24px (相对于此标签的左上角)
 */
function ModernLabel({ label, href, className = "" }: { label: string; href: string; className?: string }) {
  return (
    <Link
      to={href}
      className={`group relative flex items-center h-12 bg-[#1C1C13] rounded-full pl-2 pr-8 hover:bg-[#FF7A00] transition-colors duration-300 border-2 border-transparent shadow-lg ${className}`}
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

/**
 * 智能引导线组件：放置于最底层，提供自适应的斜度连接
 */
function ConnectLine({ x1, y1, x2, y2 }: { x1: string; y1: string; x2: string; y2: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
      <line 
        x1={x1} y1={y1} x2={x2} y2={y2} 
        stroke="black" strokeWidth="2" strokeOpacity="0.3" 
      />
    </svg>
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

        {/* 🌟 核心重构：4 个散落的独立容器 
          每个容器都有固定的宽高，图片和标签散落在对角线，通过 SVG 斜线在底层相连 
        */}

        {/* === 模块 1: Interaction (VR头显) === */}
        {/* 布局：图片在右上，标签在左下 */}
        <FloatingModule className="left-[2%] top-[15%] w-[300px] h-[280px] hidden md:block" delay={0} duration={3.5} amplitude={10}>
          <ConnectLine x1="70%" y1="35%" x2="25px" y2="calc(100% - 24px)" />
          <img src={img1} alt="VR Headset" className="absolute top-0 right-0 w-48 object-contain drop-shadow-2xl" />
          <ModernLabel label="Interaction" href="/highlights/vr" className="absolute bottom-0 left-0" />
        </FloatingModule>

        {/* === 模块 2: Intelligence (像素机器人) === */}
        {/* 布局：标签在左上，图片在右下 */}
        <FloatingModule className="left-[10%] bottom-[8%] w-[280px] h-[280px] hidden md:block" delay={0.8} duration={4} amplitude={14}>
          <ConnectLine x1="25px" y1="24px" x2="65%" y2="65%" />
          <ModernLabel label="Intelligence" href="/highlights/ai" className="absolute top-0 left-0" />
          <img src={img4} alt="Intelligence AI" className="absolute bottom-0 right-0 w-48 object-contain drop-shadow-2xl" />
        </FloatingModule>

        {/* === 模块 3: Collaboration (像素小人) === */}
        {/* 布局：图片在左上，标签在右下 */}
        {/* 标签靠右放置，利用 calc() 计算橙色圆点的物理坐标进行连线 */}
        <FloatingModule className="right-[8%] bottom-[6%] w-[320px] h-[300px] hidden md:block" delay={1.5} duration={3.8} amplitude={12}>
          <ConnectLine x1="30%" y1="35%" x2="calc(100% - 165px)" y2="calc(100% - 24px)" />
          <img src={img3} alt="Collaboration" className="absolute top-0 left-0 w-64 object-contain drop-shadow-2xl" />
          <ModernLabel label="Collaboration" href="/highlights/hci" className="absolute bottom-0 right-0" />
        </FloatingModule>

        {/* === 模块 4: Health (智能眼镜) === */}
        {/* 布局：标签在右上，图片在左下 */}
        <FloatingModule className="right-[2%] top-[12%] w-[320px] h-[260px] hidden md:block" delay={0.4} duration={3.2} amplitude={11}>
          <ConnectLine x1="calc(100% - 95px)" y1="24px" x2="35%" y2="65%" />
          <ModernLabel label="Health" href="/highlights/urban" className="absolute top-0 right-0" />
          <img src={img2} alt="Urban Sensing" className="absolute bottom-0 left-0 w-64 object-contain drop-shadow-2xl" />
        </FloatingModule>

        {/* === 移动端降级展示 (Mobile Fallback) === */}
        <div className="absolute top-[40%] w-full md:hidden flex flex-wrap justify-center gap-8 px-4 z-20 pointer-events-auto">
          <div className="flex flex-col items-center gap-6">
            <img src={img1} alt="Interaction" className="w-32 h-auto" />
            <ModernLabel label="Interaction" href="/highlights/vr" />
          </div>
          <div className="flex flex-col items-center gap-6">
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