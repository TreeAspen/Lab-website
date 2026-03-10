import { useEffect, useState, useRef } from "react";
import { 
  heroModel1 as img1, 
  heroModel2 as img2, 
  heroModel3 as img3, 
  heroModel4 as img4 
} from "../assets";
import { motion, useMotionValue, useTransform, useAnimationFrame, MotionValue } from "motion/react";
import { GravityGrid } from "./GravityGrid";
import { Link } from "react-router-dom";

/**
 * 1. 物理引擎参数配置
 */
const PHYSICS_CONFIG = {
  vTarget: 1.5,   // 保持 1.5 的较快移速
  damping: 1,     // 能量无损耗
  repulsion: 1.0  // 完全弹性碰撞系数
};

/**
 * 2. 赛博胶囊按键组件
 */
function ModernLabel({ label, href }: { label: string; href: string }) {
  const isExternal = href.startsWith('http');
  // 🌟 这里保持不变，确保按键大小不随图片放大
  const baseClasses = "group flex items-center h-12 bg-[#1C1C13] rounded-full pl-2 pr-8 hover:bg-[#FF7A00] transition-all duration-300 border-2 border-black z-30 pointer-events-auto";
  const content = (
    <>
      <div className="relative flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[#FAFF71]">
        <div className="w-4 h-4 rounded-full bg-[#FF7802] group-hover:bg-black transition-colors duration-300" />
      </div>
      <span className="font-sans font-bold text-xl text-white group-hover:text-black ml-4 tracking-wide whitespace-nowrap">
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
 */
function usePhysicsArena() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const modulesRef = useRef([
    // 🌟 修改：碰撞半径同步放大 1.5 倍 (100 -> 150, 120 -> 180, 90 -> 135, 140 -> 210)
    { id: 0, x: useMotionValue(0), y: useMotionValue(0), vx: -0.707, vy: -0.707, radius: 150 }, 
    { id: 1, x: useMotionValue(0), y: useMotionValue(0), vx: 0.707, vy: -0.707, radius: 180 },  
    { id: 2, x: useMotionValue(0), y: useMotionValue(0), vx: -0.707, vy: 0.707, radius: 135 },  
    { id: 3, x: useMotionValue(0), y: useMotionValue(0), vx: 0.707, vy: 0.707, radius: 210 },   
  ]);

  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    const m = modulesRef.current;
    
    // 初始化出生点，让它们一开始在屏幕内出现
    m[0].x.set(-dimensions.width * 0.25); m[0].y.set(-dimensions.height * 0.25);
    m[1].x.set(dimensions.width * 0.25);  m[1].y.set(-dimensions.height * 0.25);
    m[2].x.set(-dimensions.width * 0.25); m[2].y.set(dimensions.height * 0.25);
    m[3].x.set(dimensions.width * 0.25);  m[3].y.set(dimensions.height * 0.25);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;
    
    const timeFactor = delta / 16; 
    const modules = modulesRef.current;
    
    // X轴边界（左右屏幕边缘）
    const boundaryX = dimensions.width / 2;
    // Y轴基础边界（屏幕中心到上下边缘的距离）
    const boundaryY = dimensions.height / 2;

    // --- 第一步：物体间碰撞 ---
    for (let i = 0; i < modules.length; i++) {
      for (let j = i + 1; j < modules.length; j++) {
        const m1 = modules[i];
        const m2 = modules[j];
        const dx = m2.x.get() - m1.x.get();
        const dy = m2.y.get() - m1.y.get();
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = m1.radius + m2.radius;

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

      // X 轴边界碰撞 (保持左右不出屏幕)
      if (nextX > boundaryX - m.radius) {
        m.vx = -Math.abs(m.vx); nextX = boundaryX - m.radius;
      } else if (nextX < -boundaryX + m.radius) {
        m.vx = Math.abs(m.vx); nextX = -boundaryX + m.radius;
      }
      
      // Y轴活动范围，保持天花板向上延伸 30%
      const floorBoundary = boundaryY - m.radius - 80; 
      
      const extraHeight = dimensions.height * 0.30;
      const ceilingBoundary = -boundaryY - extraHeight + m.radius; 

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

function PhysicsModulePresenter({ imgSrc, label, href, imgWidth = "w-48", mValues }: any) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 overflow-visible pointer-events-none">
      <motion.div 
        style={{ x: mValues.x, y: mValues.y }}
        className="absolute w-[400px] h-[400px] flex items-center justify-center overflow-visible pointer-events-none"
      >
        <div className="absolute pointer-events-auto">
          {/* 🌟 图片大小将通过 props 传递的值被放大 1.5 倍 */}
          <img src={imgSrc} className={`${imgWidth} h-auto object-contain`} alt="" />
        </div>
        {/* 🌟 按键组件单独定位，其内部 h-12 样式保持不变 */}
        <div className="absolute z-50 top-64 pointer-events-auto">
          <ModernLabel label={label} href={href} />
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { containerRef, modules } = usePhysicsArena();

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center bg-[#faff71] border-b-4 border-black overflow-hidden z-10">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GravityGrid amplitude={25} radius={500} cellSize={40} color="#000" opacity={0.18} />
      </div>

      {/* 中心文字层：pointer-events-none 允许点击穿透，被遮挡的按键也处于可点击状态 */}
      <div className="relative z-50 text-center pointer-events-none px-4 select-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[120%] -z-10 bg-[#faff71] rounded-full blur-[60px] opacity-60 pointer-events-none" />

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <div className="flex items-center justify-center gap-4 mb-8 opacity-40">
            <span className="font-['VT323'] text-2xl tracking-[0.4em]">U.TOP LAB</span>
            <div className="h-1 w-12 bg-black" />
            <span className="font-['VT323'] text-2xl tracking-[0.4em]">EST. 2026</span>
          </div>
          
          <h1 className="font-['VT323'] text-6xl md:text-8xl lg:text-[7.5rem] text-black uppercase leading-[0.8] tracking-tighter">
            Urban Technology,<br />
            <span className="text-black drop-shadow-[5px_5px_0_rgba(255,122,0,1)]">
              Observation & Practice
            </span>
          </h1>
          
          <p className="mt-12 font-mono text-sm md:text-base text-black/90 max-w-2xl mx-auto uppercase leading-relaxed bg-[#faff71]/30 backdrop-blur-[1px] px-6 py-3 border-l-4 border-[#FF7A00] shadow-sm">
              Decoding future urban ecosystems through biosensing and multi-modal interaction.
          </p>
        </motion.div>
      </div>

      {/* 🌟 修改：图像大小放大到原先的 1.5 倍 (Tailwind w-XX 换算为 pixel 计算后放大) */}
      <div className="absolute inset-0 pointer-events-none z-40">
        {/* w-52 (208px) -> w-[312px] */}
        <PhysicsModulePresenter mValues={modules[0]} label="Interaction" href="/highlights/vr" imgSrc={img1} imgWidth="w-[312px]" />
        {/* w-64 (256px) -> w-[384px] */}
        <PhysicsModulePresenter mValues={modules[1]} label="Collaboration" href="https://forms.gle/fRuKyLcMGgsBJ4Fn9" imgSrc={img3} imgWidth="w-[384px]" />
        {/* w-48 (192px) -> w-[288px] */}
        <PhysicsModulePresenter mValues={modules[2]} label="Intelligence" href="/highlights/agent" imgSrc={img4} imgWidth="w-[288px]" />
        {/* w-72 (288px) -> w-[432px] */}
        <PhysicsModulePresenter mValues={modules[3]} label="Health" href="/highlights/urban" imgSrc={img2} imgWidth="w-[432px]" />
      </div>

      <div className="absolute bottom-0 w-full h-14 bg-black border-t-2 border-white flex items-center overflow-hidden z-[60] pointer-events-none">
        <motion.div 
          animate={{ x: [0, -1800] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap text-[#faff71] font-['VT323'] text-3xl uppercase tracking-widest italic"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-12">
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