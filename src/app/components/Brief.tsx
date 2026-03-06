import { motion } from "motion/react";

export function Brief() {
  return (
    /* 1. 恢复浅色背景 bg-[#F4F4EB]，边框改回 border-black */
    <section id="brief" className="bg-[#F4F4EB] py-20 px-4 md:px-12 border-t-4 border-black">
      <div className="max-w-4xl mx-auto">
        {/* 顶部标签栏 */}
        <div className="flex items-center gap-4 mb-10">
          {/* About 标签改回黑底电光绿字 */}
          <div className="bg-black text-[#E2F16B] px-4 py-1 font-sans font-bold text-lg uppercase tracking-wider">
            About
          </div>
          {/* 装饰线改回半透明黑色 */}
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
          {/* 第一段：文字改回 text-black，橙色部分保持下划线 */}
          <p className="font-sans font-bold text-2xl md:text-3xl leading-relaxed max-w-3xl text-black">
            <span className="text-[#FF7A00] underline decoration-2 underline-offset-8">
              U.TOP Lab (Urban Technology, Observation & Practice)
            </span>{" "}
            is a forward-thinking group dedicated to 
            engineering the "utopia" of evidence-based, human-centered, and participatory cities.
          </p>
          
          {/* 第二段：同样保持 text-black 标准加粗字体 */}
          <p className="font-sans font-bold text-2xl md:text-3xl leading-relaxed max-w-3xl text-black">
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
