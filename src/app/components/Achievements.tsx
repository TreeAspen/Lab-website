import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

const stats = [
  { id: 1, value: "379", label: "View" },
  { id: 2, value: "24", label: "Conference" },
  { id: 3, value: "19", label: "Papers" },
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
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
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
    <section className="bg-[#faff71] text-black py-20 px-4 md:px-12 relative border-t-4 border-black">
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
        <h2 className="font-['VT323'] text-5xl md:text-6xl uppercase tracking-widest text-black drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
          Achievement
        </h2>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row justify-around gap-12 text-center">
        {stats.map((stat) => (
          <motion.div 
             key={stat.id}
             initial={{ opacity: 0, scale: 0.5 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: stat.id * 0.1 }}
             className="flex flex-col items-center"
          >
            <span className="font-['VT323'] text-6xl md:text-8xl text-[#ff6b00] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-2">
              <AnimatedNumber value={stat.value} delay={stat.id * 100} />
            </span>
            <span className="font-bold text-xl uppercase tracking-widest border-b-2 border-black pb-1">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}