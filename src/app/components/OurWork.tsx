import { motion } from "motion/react";

const works = [
  { id: 1, title: "Neural Feedback Loop", desc: "Using AI to optimize urban grid layouts." },
  { id: 2, title: "Urban Grid Optimization", desc: "Analyzing traffic flow patterns in real-time." },
  { id: 3, title: "Smart City Interfaces", desc: "HCI principles applied to public infrastructure." },
  { id: 4, title: "Data Visualization", desc: "Visualizing complex datasets for city planning." },
  { id: 5, title: "Sustainable Energy", desc: "Optimizing energy consumption in smart buildings." },
  { id: 6, title: "Community Engagement", desc: "Tools for citizen participation in urban design." },
];

export function OurWork() {
  return (
    <section className="bg-[#1a1a1a] text-[#f0f0f0] py-20 px-4 md:px-12 relative overflow-hidden border-t-4 border-white">
      {/* Chalkboard Effect */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Scribbles (Simulated) */}
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full border-dashed animate-spin-slow pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/10 rotate-45 pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
        <h2 className="font-['VT323'] text-5xl md:text-6xl uppercase tracking-widest text-[#f0f0f0] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          Our Work
        </h2>
        <p className="font-mono text-sm uppercase text-gray-400 mt-2">
          Schematics & Prototypes
        </p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.map((work) => (
          <motion.div
            key={work.id}
            whileHover={{ scale: 1.02 }}
            className="bg-[#2a2a2a] border-2 border-white/20 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="aspect-square bg-gray-400/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
               {/* Placeholder Grid */}
               <div className="absolute inset-0 opacity-30 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_100%)] bg-[length:20px_20px]" />
               <span className="font-['VT323'] text-2xl opacity-50 text-white group-hover:opacity-100 transition-opacity">
                 {work.id}
               </span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-white group-hover:text-[#faff71] transition-colors uppercase">
              {work.title}
            </h3>
            <p className="font-mono text-xs text-gray-400">
              {work.desc}
            </p>
             <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono uppercase text-gray-500">
                <span>Case Study</span>
                <span>→</span>
             </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
