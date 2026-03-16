import { useEffect, useRef, useCallback } from "react";

interface GravityGridProps {
  className?: string;
  /** Gravity well amplitude in px, default 30 */
  amplitude?: number;
  /** Gravity well radius in px, default 300 */
  radius?: number;
  /** Grid cell size in px, default 40 */
  cellSize?: number;
  /** Line color */
  color?: string;
  /** Line opacity 0-1 */
  opacity?: number;
}

export function GravityGrid({
  className = "",
  amplitude = 30,
  radius = 300,
  cellSize = 40,
  color = "#000",
  opacity = 0.18,
}: GravityGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  // 记录交互坐标（鼠标或手指）
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  
  const gravityCenter = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const distort = useCallback(
    (
      px: number,
      py: number,
      cx: number,
      cy: number,
      amp: number,
      rad: number,
      time: number
    ) => {
      const dx = px - cx;
      const dy = py - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const pulse = amp * (1 + 0.08 * Math.sin(time * 0.6));
      const falloff = Math.exp(-(dist * dist) / (2 * rad * rad));
      const force = pulse * falloff;
      return {
        x: px - (dx / dist) * force,
        y: py - (dy / dist) * force,
      };
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ─── 统一处理坐标更新（兼容鼠标和触摸） ───
    const updatePointer = (clientX: number, clientY: number) => {
      const rect = parent.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        pointerRef.current = { x, y };
      } else {
        pointerRef.current = null;
      }
    };

    // 鼠标事件
    const handleMouseMove = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
    const handleMouseLeave = () => { pointerRef.current = null; };

    // 🌟 核心适配 1：触摸事件
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => { pointerRef.current = null; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    // passive: true 提升移动端滚动性能
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    const draw = (time: number) => {
      const dpr = window.devicePixelRatio || 1;
      const w = parent.clientWidth;
      const h = parent.clientHeight;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        if (gravityCenter.current.x === 0 && gravityCenter.current.y === 0) {
          gravityCenter.current = { x: w / 2, y: h / 2 };
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const targetX = pointerRef.current ? pointerRef.current.x : w / 2;
      const targetY = pointerRef.current ? pointerRef.current.y : h / 2;
      const lerp = 0.08;
      gravityCenter.current.x += (targetX - gravityCenter.current.x) * lerp;
      gravityCenter.current.y += (targetY - gravityCenter.current.y) * lerp;

      const cx = gravityCenter.current.x;
      const cy = gravityCenter.current.y;
      const t = time / 1000;

      // 🌟 核心适配 2：移动端性能优化
      // 屏幕越小，格子稍微放大一点，且曲线切分段数减少，防止手机发烫
      const isMobile = w < 768;
      const actualCellSize = isMobile ? cellSize * 1.2 : cellSize; 
      const segments = isMobile ? 6 : 12; // 手机端用 6 段即可保持流畅的视觉体验

      const cols = Math.ceil(w / actualCellSize) + 2;
      const rows = Math.ceil(h / actualCellSize) + 2;

      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = isMobile ? 0.6 : 0.8; // 手机端线条稍微细一点显得不那么拥挤

      // Draw horizontal lines
      for (let row = -1; row <= rows; row++) {
        ctx.beginPath();
        for (let seg = 0; seg <= cols * segments; seg++) {
          const rawX = (seg / segments) * actualCellSize - actualCellSize;
          const rawY = row * actualCellSize;
          const { x, y } = distort(rawX, rawY, cx, cy, amplitude, radius, t);
          if (seg === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw vertical lines
      for (let col = -1; col <= cols; col++) {
        ctx.beginPath();
        for (let seg = 0; seg <= rows * segments; seg++) {
          const rawX = col * actualCellSize;
          const rawY = (seg / segments) * actualCellSize - actualCellSize;
          const { x, y } = distort(rawX, rawY, cx, cy, amplitude, radius, t);
          if (seg === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [cellSize, color, distort, opacity, amplitude, radius]);

  return (
    <div ref={parentRef} className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
}