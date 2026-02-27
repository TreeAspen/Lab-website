import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

const stats = [
  { id: 1, value: "19", label: "Publications" },
  { id: 2, value: "24", label: "Conferences" },
  { id: 3, value: "8", label: "Partners" },
  { id: 4, value: "12", label: "Tools & Demos" },
];

function AnimatedNumber({ value, delay }: { value: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const target = parseInt(value);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const duration = 1500;
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress >= 1) clearInterval(timer);
      }, 16);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, target, delay]);

  return <span ref={ref}>{count}</span>;
}

export function Achievements() {
  return (
    <section className="bg-[#E2F16B] text-black py-20 px-4 md:px-12 relative border-t-4 border-black">
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
        <h2 className="font-['VT323'] text-5xl md:text-6xl uppercase tracking-widest text-black">
          Highlights
        </h2>
        <p className="font-mono text-sm uppercase text-black/50 mt-2">
          Key metrics from U.TOP Lab
        </p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <motion.div 
             key={stat.id}
             initial={{ opacity: 0, scale: 0.5 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: stat.id * 0.1 }}
             className="flex flex-col items-center"
          >
            <span className="font-['VT323'] text-6xl md:text-8xl text-[#FF7A00] mb-2">
              <AnimatedNumber value={stat.value} delay={stat.id * 100} />
            </span>
            <span className="text-sm uppercase tracking-widest border-b-2 border-black pb-1 font-mono">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
