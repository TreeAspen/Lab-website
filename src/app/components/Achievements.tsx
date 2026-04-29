import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { projects } from "../data/projects-loader";
import { teamMembers } from "../data/people";
import { highlights as highlightDetailData } from "../data/highlights";

// 🌟 1. 导入合作机构数组
import { partnersList } from "./Collaborators";

// ─── 🌟 核心修改：只从 teamMembers 提取并进行“严格去标点”去重 ───

// A. 统计 Publications：仅从团队成员的数据中提取，刚好 9 篇
const uniquePublications = new Set<string>();
teamMembers.forEach((member) => {
  member.publications?.forEach((pub) => {
    // 极其严格的去重：转小写，去除所有标点符号，去除多余空格
    const cleanTitle = pub.title
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    uniquePublications.add(cleanTitle);
  });
});
const totalPublications = uniquePublications.size;

// B. 统计 Conferences：从 Highlights 提取
const uniqueConferences = new Set<string>();
highlightDetailData.forEach((highlight) => {
  highlight.conferences?.forEach((conf) => {
    uniqueConferences.add(conf.trim().toLowerCase());
  });
});
const totalConferences = uniqueConferences.size;

// C. 统计 Partners：直接取数组长度
const totalPartners = partnersList.length;

// D. 统计 Projects：去重合并
const uniqueProjects = new Set<string>();
projects.forEach((p) => uniqueProjects.add(p.title.trim().toLowerCase()));
highlightDetailData.forEach((h) => uniqueProjects.add(h.title.trim().toLowerCase()));
const totalToolsAndDemos = uniqueProjects.size;

// ─────────────────────────────────────────────────────────────────

const stats = [
  { id: 1, value: String(totalPublications), label: "Publications" },
  { id: 2, value: String(totalConferences), label: "Conferences" },
  { id: 3, value: String(totalPartners), label: "Partners" },
  { id: 4, value: String(totalToolsAndDemos), label: "Projects" },
];

function AnimatedNumber({ value, delay }: { value: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const target = parseInt(value) || 0;

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