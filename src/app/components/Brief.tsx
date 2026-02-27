import { motion } from "motion/react";

export function Brief() {
  return (
    <section id="brief" className="bg-[#F4F4EB] py-20 px-4 md:px-12 border-t-4 border-black">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-black text-[#E2F16B] px-3 py-1 font-['VT323'] text-lg uppercase tracking-wider">
            About
          </div>
          <div className="flex-1 h-[2px] bg-black/10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* 仅修改：统一加上 font-['VT323'] 字体，并将全称包裹在橙色 text-[#FF7A00] 中 */}
          <p className="font-['VT323'] text-2xl md:text-3xl leading-relaxed mb-8 max-w-3xl">
            <span className="text-[#FF7A00]">U.TOP Lab (Urban Technology, Observation & Practice)</span>{" "}
            is a forward-thinking group dedicated to 
            engineering the "utopia" of evidence-based, human-centered, and participatory cities.
          </p>
          
          {/* 仅修改：统一加上 font-['VT323'] 字体，颜色保留原本的 text-black/70 */}
          <p className="font-['VT323'] text-xl md:text-2xl leading-relaxed text-black/70 max-w-3xl">
            Positioned at the intersection of urban science and cutting-edge technology, we bridge 
            the gap between scientific inquiry and real-world application. Through collaborative 
            partnerships with public agencies and local communities, we develop the novel systems, 
            methods, and tools necessary to shape the future of urban life.
          </p>
        </motion.div>

        {/* Three Pillars Preview - 完全保留你的原版白色卡片样式 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              num: "01",
              title: "Urban Sensing",
              desc: "Sensor-based measurements that capture urban life at every level — mobile data, wearables, and computer vision.",
            },
            {
              num: "02",
              title: "Urban HCI",
              desc: "Immersive VR, photogrammetry, and 3D interfaces that let people step into future urban realities.",
            },
            {
              num: "03",
              title: "Urban AI",
              desc: "AI agents and conversational systems that bridge complex urban data with citizens' daily lives.",
            },
          ].map((pillar, i) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="border-2 border-black p-6 bg-white hover:bg-[#E2F16B]/20 transition-colors group"
            >
              <span className="font-['VT323'] text-4xl text-[#FF7A00] block mb-2">{pillar.num}</span>
              <h3 className="font-['VT323'] text-2xl uppercase tracking-wider mb-3">{pillar.title}</h3>
              <p className="font-mono text-xs text-black/60 leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}