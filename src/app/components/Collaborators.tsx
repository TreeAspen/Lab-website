import { motion } from "motion/react";

const partners = [
  { id: 1, name: "UF" },
  { id: 2, name: "NYU Tandon" },
  { id: 3, name: "NYU GPH" },
  { id: 4, name: "Emory" },
  { id: 5, name: "UC Berkeley" },
  { id: 6, name: "FSU" },
  { id: 7, name: "FAU" },
  { id: 8, name: "Fudan" },
  { id: 9, name: "Ghana" },
  { id: 10, name: "South Carolina" },
];

export function Collaborators() {
  return (
    <section className="bg-white text-black py-20 px-4 md:px-12 relative border-t-4 border-black">
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
        <h2 className="font-['VT323'] text-5xl md:text-6xl uppercase tracking-widest text-black">
          Who We've Worked With
        </h2>
        <p className="font-mono text-xs uppercase text-gray-500 mt-4 max-w-2xl mx-auto">
          Academic and community partners across multiple institutions and regions
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
              className="w-52 h-24 shrink-0 border-2 border-black rounded-lg flex items-center justify-center bg-transparent hover:bg-[#E2F16B]/30 transition-all"
            >
              <span className="font-['VT323'] text-xl uppercase tracking-wider text-black">{partner.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
