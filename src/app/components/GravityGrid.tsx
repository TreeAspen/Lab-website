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
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  // Smooth interpolation target for gravity center
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
      // Gentle pulse
      const pulse = amp * (1 + 0.08 * Math.sin(time * 0.6));
      // Gaussian falloff — wide & gentle
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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Only track if mouse is within bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y };
      } else {
        mouseRef.current = null;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    // Listen on window so events aren't blocked by higher z-index siblings
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const draw = (time: number) => {
      const dpr = window.devicePixelRatio || 1;
      const w = parent.clientWidth;
      const h = parent.clientHeight;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        // Initialize gravity center on first size
        if (gravityCenter.current.x === 0 && gravityCenter.current.y === 0) {
          gravityCenter.current = { x: w / 2, y: h / 2 };
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Smooth-lerp gravity center toward mouse (or canvas center)
      const targetX = mouseRef.current ? mouseRef.current.x : w / 2;
      const targetY = mouseRef.current ? mouseRef.current.y : h / 2;
      const lerp = 0.08;
      gravityCenter.current.x += (targetX - gravityCenter.current.x) * lerp;
      gravityCenter.current.y += (targetY - gravityCenter.current.y) * lerp;

      const cx = gravityCenter.current.x;
      const cy = gravityCenter.current.y;

      const t = time / 1000;
      const cols = Math.ceil(w / cellSize) + 2;
      const rows = Math.ceil(h / cellSize) + 2;
      const segments = 12; // sub-segments per cell for smooth curves

      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 0.8;

      // Draw horizontal lines
      for (let row = -1; row <= rows; row++) {
        ctx.beginPath();
        for (let seg = 0; seg <= cols * segments; seg++) {
          const rawX = (seg / segments) * cellSize - cellSize;
          const rawY = row * cellSize;
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
          const rawX = col * cellSize;
          const rawY = (seg / segments) * cellSize - cellSize;
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
    };
  }, [cellSize, color, distort, opacity, amplitude, radius]);

  return (
    <div ref={parentRef} className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
}