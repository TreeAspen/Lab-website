import { motion } from "motion/react";

const partners = [
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 },
  { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 },
];

export function Collaborators() {
  return (
    <section className="bg-white text-black py-20 px-4 md:px-12 relative border-t-4 border-black">
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
        <h2 className="font-['VT323'] text-5xl md:text-6xl uppercase tracking-widest text-black drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
          collaborator
        </h2>
        <p className="font-mono text-xs uppercase text-gray-500 mt-4 max-w-2xl mx-auto">
          TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative z-10 w-full overflow-hidden">
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {/* Duplicate items for seamless loop */}
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="w-48 h-24 shrink-0 border-2 border-black rounded-lg flex items-center justify-center bg-transparent hover:bg-black/5 transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <span className="font-mono text-gray-400 text-xs">Partner {partner.id}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}