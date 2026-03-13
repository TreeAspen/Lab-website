import { motion } from "motion/react";

export function Brief() {
  return (
    <section id="brief" className="bg-[#F4F4EB] py-20 px-4 md:px-12 border-t-4 border-black">
      {/* 🌟 核心修改 1：把 max-w-4xl 改成了 max-w-6xl，加宽了整体容器的占位 */}
      <div className="max-w-6xl mx-auto">
        {/* 顶部标签栏 */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-black text-[#E2F16B] px-4 py-1 font-mono text-lg uppercase tracking-wider">
            About
          </div>
          <div className="flex-1 h-[2px] bg-black/10" />
        </div>

        {/* 文字内容区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          {/* 🌟 核心修改 2：删除了这里的 max-w-3xl，让文字自由铺满 6xl 的容器宽度 */}
          <p className="font-mono text-2xl md:text-3xl leading-relaxed text-black">
            <span className="text-[#FF7A00] underline decoration-2 underline-offset-8">
              U.TOP Lab (Urban Technology, Observation & Practice)
            </span>{" "}
            is a forward-thinking group dedicated to 
            engineering the "utopia" of evidence-based, human-centered, and participatory cities.
          </p>
          
          {/* 🌟 核心修改 3：同样删除了 max-w-3xl */}
          <p className="font-mono text-2xl md:text-3xl leading-relaxed text-black">
            Positioned at the intersection of urban science and cutting-edge technology, we bridge 
            the gap between scientific inquiry and real-world application. Through collaborative 
            partnerships with public agencies and local communities, we develop the novel systems, 
            methods, and tools necessary to shape the future of urban life.
          </p>
        </motion.div>
      </div>
    </section>
  );
}