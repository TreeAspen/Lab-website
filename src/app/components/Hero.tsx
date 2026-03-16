import { useEffect, useState, useRef } from "react";
import { 
  heroModel1 as img1, 
  heroModel2 as img2, 
  heroModel3 as img3, 
  heroModel4 as img4 
} from "../assets";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";
import { GravityGrid } from "./GravityGrid";
import { Link } from "react-router-dom";

/**
 * 1. 物理引擎参数配置
 */
const PHYSICS_CONFIG = {
  vTarget: 1.8,   // 保持 1.8 的较快移速
  damping: 1,     // 能量无损耗
  repulsion: 1.0  // 完全弹性碰撞系数
};

/**
 * 2. 赛博胶囊按键组件
 */
function ModernLabel({ label, href }: { label: string; href: string }) {
  const isExternal = href.startsWith('http');
  const baseClasses = "group flex items-center h-10 md:h-12 bg-[#1C1C13] rounded-full pl-1.5 md:pl-2 pr-6 md:pr-8 hover:bg-[#FF7A00] transition-all duration-300 border-2 border-black z-30 pointer-events-auto shadow-md";
  const content = (
    <>
      <div className="relative flex items-center justify-center w-[28px] h-[28px] md:w-[34px] md:h-[34px] rounded-full bg-[#FAFF71]">
        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#FF7802] group-hover:bg-black transition-colors duration-300" />
      </div>
      <span className="font-sans font-bold text-base md:text-xl text-white group-hover:text-black ml-3 md:ml-4 tracking-wide whitespace-nowrap">
        {label}
      </span>
    </>
  );

  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>{content}</a>
  ) : (
    <Link to={href} className={baseClasses}>{content}</Link>
  );
}

/**
 * 3. 2D 物理竞技场核心钩子
 * 🌟 核心适配：接收一个 scale 比例参数，动态调整碰撞体积
 */
function usePhysicsArena(scale: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 使用 baseRadius 记录原始半径，计算时乘上 scale
  const modulesRef = useRef([
    { id: 0, x: useMotionValue(0), y: useMotionValue(0), vx: -0.707, vy: -0.707, baseRadius: 105 }, 
    { id: 1, x: useMotionValue(0), y: useMotionValue(0), vx: 0.707, vy: -0.707, baseRadius: 126 },  
    { id: 2, x: useMotionValue(0), y: useMotionValue(0), vx: -0.707, vy: 0.707, baseRadius: 95 },  
    { id: 3, x: useMotionValue(0), y: useMotionValue(0), vx: 0.707, vy: 0.707, baseRadius: 147 },   
  ]);

  const [dimensions, setDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1200, 
    height: typeof window !== 'undefined' ? window.innerHeight : 800 
  });

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    const m = modulesRef.current;
    
    // 初始化出生点 (手机端稍微聚拢一点防止直接卡出屏幕)
    const startX = dimensions.width < 768 ? 0.25 : 0.4;
    m[0].x.set(-dimensions.width * startX); m[0].y.set(-dimensions.height * 0.25);
    m[1].x.set(dimensions.width * 0.1);  m[1].y.set(-dimensions.height * 0.25);
    m[2].x.set(-dimensions.width * startX); m[2].y.set(dimensions.height * 0.25);
    m[3].x.set(dimensions.width * 0.1);  m[3].y.set(dimensions.height * 0.25);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []); // 仅在挂载时初始化一次

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;
    
    const timeFactor = delta / 16; 
    const modules = modulesRef.current;
    
    // 边界定义：手机端左右允许稍微超出一点点
    const isMobile = dimensions.width < 768;
    const boundaryMultiplier = isMobile ? 1.5 : 1.3;
    const leftBoundaryX = -(dimensions.width / 2) * boundaryMultiplier;
    const rightBoundaryX = (dimensions.width / 2) * 0.8; 
    
    const boundaryY = dimensions.height / 2;

    // --- 第一步：物体间碰撞 ---
    for (let i = 0; i < modules.length; i++) {
      for (let j = i + 1; j < modules.length; j++) {
        const m1 = modules[i];
        const m2 = modules[j];
        const dx = m2.x.get() - m1.x.get();
        const dy = m2.y.get() - m1.y.get();
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // 🌟 核心适配：碰撞判断时应用缩放比例
        const minDist = (m1.baseRadius + m2.baseRadius) * scale;

        if (distance < minDist) {
          const overlap = minDist - distance;
          const nx = dx / distance;
          const ny = dy / distance;
          
          m1.x.set(m1.x.get() - nx * overlap * 0.5);
          m1.y.set(m1.y.get() - ny * overlap * 0.5);
          m2.x.set(m2.x.get() + nx * overlap * 0.5);
          m2.y.set(m2.y.get() + ny * overlap * 0.5);

          const dvx = m2.vx - m1.vx;
          const dvy = m2.vy - m1.vy;
          const velAlongNormal = dvx * nx + dvy * ny;
          
          if (velAlongNormal < 0) {
            const jImpulse = -2 * velAlongNormal;
            m1.vx -= jImpulse * nx * 0.5;
            m1.vy -= jImpulse * ny * 0.5;
            m2.vx += jImpulse * nx * 0.5;
            m2.vy += jImpulse * ny * 0.5;
          }
        }
      }
    }

    // --- 第二步：更新与速度校准 ---
    modules.forEach(m => {
      const currentSpeed = Math.sqrt(m.vx * m.vx + m.vy * m.vy);
      if (currentSpeed !== 0) {
        m.vx = (m.vx / currentSpeed) * PHYSICS_CONFIG.vTarget;
        m.vy = (m.vy / currentSpeed) * PHYSICS_CONFIG.vTarget;
      }

      let nextX = m.x.get() + m.vx * timeFactor;
      let nextY = m.y.get() + m.vy * timeFactor;
      
      const currentRadius = m.baseRadius * scale;

      // X 轴边界碰撞
      if (nextX > rightBoundaryX - currentRadius) {
        m.vx = -Math.abs(m.vx); nextX = rightBoundaryX - currentRadius;
      } else if (nextX < leftBoundaryX + currentRadius) {
        m.vx = Math.abs(m.vx); nextX = leftBoundaryX + currentRadius;
      }
      
      // Y轴活动范围 (为底部跑马灯留出空间)
      const floorBoundary = boundaryY - currentRadius - (isMobile ? 50 : 80); 
      const extraHeight = dimensions.height * (isMobile ? 0.15 : 0.30);
      const ceilingBoundary = -boundaryY - extraHeight + currentRadius; 

      if (nextY > floorBoundary) {
        m.vy = -Math.abs(m.vy); nextY = floorBoundary; 
      } else if (nextY < ceilingBoundary) {
        m.vy = Math.abs(m.vy); nextY = ceilingBoundary; 
      }

      m.x.set(nextX);
      m.y.set(nextY);
    });
  });

  return { containerRef, modules: modulesRef.current };
}

/**
 * 4. 渲染模块
 */
function PhysicsModulePresenter({ imgSrc, label, href, imgWidth = "w-48", mValues, scale }: any) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 overflow-visible pointer-events-none">
      <motion.div 
        // 🌟 核心适配：让 framer-motion 直接负责视觉缩放，和物理碰撞体积同步
        style={{ x: mValues.x, y: mValues.y, scale: scale }}
        className="absolute w-[300px] md:w-[400px] h-[300px] md:h-[400px] flex items-center justify-center overflow-visible pointer-events-none"
      >
        <div className="absolute pointer-events-auto">
          <img src={imgSrc} className={`${imgWidth} h-auto object-contain drop-shadow-2xl`} alt="" />
        </div>
        {/* 标签位置微调 */}
        <div className="absolute z-50 top-40 md:top-56 pointer-events-auto">
          <ModernLabel label={label} href={href} />
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  // 监听屏幕大小，判断是否是手机端，决定物理引擎的缩放比例
  const [scale, setScale] = useState(typeof window !== 'undefined' && window.innerWidth < 768 ? 0.65 : 1);

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth < 768 ? 0.65 : 1);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { containerRef, modules } = usePhysicsArena(scale);

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center bg-[#faff71] border-b-4 border-black overflow-hidden z-10">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GravityGrid amplitude={25} radius={500} cellSize={40} color="#000" opacity={0.18} />
      </div>

      <div className="relative z-50 text-center pointer-events-none px-4 md:px-8 select-none w-full max-w-[100vw]">
        {/* 中心高亮光晕 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[100%] h-[120%] -z-10 bg-[#faff71] rounded-full blur-[40px] md:blur-[60px] opacity-70 md:opacity-60 pointer-events-none" />

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          
          {/* 🌟 核心适配：顶部 Lab 信息在手机端分行或缩紧间距 */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8 opacity-40 px-2">
            <span className="font-['VT323'] text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.4em]">U.TOP LAB</span>
            <div className="hidden md:block h-1 w-12 bg-black" />
            <span className="font-['VT323'] text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.4em]">EST. 2026</span>
            <span className="hidden sm:inline font-['VT323'] text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.4em] md:ml-4">UF</span>
          </div>
          
          {/* 🌟 核心适配：大标题字体大小自适应 */}
          <h1 className="font-['VT323'] text-[3.8rem] leading-[0.85] sm:text-7xl md:text-8xl lg:text-[7.5rem] text-black uppercase tracking-tighter mx-auto max-w-[95%]">
            Urban Technology,<br />
            <span className="text-black drop-shadow-[3px_3px_0_rgba(255,122,0,1)] md:drop-shadow-[5px_5px_0_rgba(255,122,0,1)] block mt-2 md:mt-0">
              Observation & Practice
            </span>
          </h1>
          
          {/* 🌟 核心适配：副标题宽度与留白自适应 */}
          <p className="mt-8 md:mt-12 font-mono text-xs md:text-base text-black/90 w-full sm:max-w-[85%] md:max-w-2xl mx-auto uppercase leading-relaxed bg-[#faff71]/30 backdrop-blur-[1px] px-4 py-3 md:px-6 md:py-3 border-l-4 border-[#FF7A00] shadow-sm text-left sm:text-center inline-block">
            From Lab to City: Advancing Socio-Technical Urban Futures
          </p>
        </motion.div>
      </div>

      {/* 物理碰撞组件渲染区 */}
      <div className="absolute inset-0 pointer-events-none z-40">
        <PhysicsModulePresenter scale={scale} mValues={modules[0]} label="Interaction" href="/highlights/vr" imgSrc={img1} imgWidth="w-[180px] md:w-[218px]" />
        <PhysicsModulePresenter scale={scale} mValues={modules[1]} label="Collaboration" href="https://forms.gle/fRuKyLcMGgsBJ4Fn9" imgSrc={img3} imgWidth="w-[220px] md:w-[269px]" />
        <PhysicsModulePresenter scale={scale} mValues={modules[2]} label="Intelligence" href="/highlights/agent" imgSrc={img4} imgWidth="w-[160px] md:w-[202px]" />
        <PhysicsModulePresenter scale={scale} mValues={modules[3]} label="Health" href="/highlights/urban" imgSrc={img2} imgWidth="w-[240px] md:w-[302px]" />
      </div>

      {/* 底部跑马灯 */}
      <div className="absolute bottom-0 w-full h-10 md:h-14 bg-black border-t-2 border-white flex items-center overflow-hidden z-[60] pointer-events-none">
        <motion.div 
          animate={{ x: [0, -1800] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 md:gap-16 whitespace-nowrap text-[#faff71] font-['VT323'] text-xl md:text-3xl uppercase tracking-widest italic"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-6 md:gap-12">
              <span>Station Active: Human-City Interface</span>
              <span className="text-[#FF7A00]">{">>>"} Processing Data_0{i}</span>
              <span className="opacity-30">///</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}