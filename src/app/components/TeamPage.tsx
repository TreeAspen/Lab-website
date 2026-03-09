import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Globe, Users, GraduationCap, BookOpen } from "lucide-react";
import { teamMembers, type TeamMember } from "../data/projects";
import { useState } from "react";

const categories = [
  { key: "all", label: "All Members" },
  { key: "faculty", label: "Faculty" },
  { key: "phd", label: "PhD Students" },
  { key: "master", label: "Master's Students" },
] as const;

function getCategoryIcon(cat: TeamMember["category"]) {
  switch (cat) {
    case "faculty":
      return <BookOpen className="w-3.5 h-3.5" />;
    case "phd":
      return <GraduationCap className="w-3.5 h-3.5" />;
    case "master":
      return <GraduationCap className="w-3.5 h-3.5" />;
    default:
      return <Users className="w-3.5 h-3.5" />;
  }
}

function getCategoryColor(cat: TeamMember["category"]) {
  switch (cat) {
    case "faculty":
      return "bg-[#FF7A00] text-black border-[#FF7A00]";
    case "phd":
      return "bg-[#E2F16B] text-black border-[#E2F16B]";
    case "master":
      return "bg-white/20 text-white border-white/30";
    default:
      return "bg-white/10 text-white border-white/20";
  }
}

export function TeamPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered =
    activeFilter === "all"
      ? teamMembers
      : teamMembers.filter((m) => m.category === activeFilter);

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* ─── Back Navigation ───────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-['VT323'] text-lg uppercase tracking-wide text-white/70 hover:text-[#E2F16B] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* ─── Hero Header ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 md:px-8"
      >
        <div className="relative border-2 border-white/30 rounded-2xl overflow-hidden p-8 md:p-12 lg:p-16">
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(226,241,107,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(226,241,107,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#E2F16B]" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#E2F16B]" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#FF7A00]" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#FF7A00]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-[#E2F16B]" />
              <span className="font-mono text-sm text-[#E2F16B] uppercase tracking-widest">
                Research Team
              </span>
            </div>
            <h1 className="font-['VT323'] text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.85] text-white mb-6">
              Our Team
            </h1>
            <p className="font-mono text-base text-gray-400 max-w-2xl leading-relaxed">
              U.TOP Lab brings together researchers across urban planning, computer science,
              and human-computer interaction to advance the science of urban intelligence.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ─── Filter Tabs ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-6xl mx-auto px-4 md:px-8 mt-8"
      >
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-5 py-2 rounded-full font-['VT323'] text-base uppercase tracking-wider border-2 transition-all ${
                activeFilter === cat.key
                  ? "bg-[#E2F16B] text-black border-[#E2F16B]"
                  : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ─── Team Grid ────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className="group bg-white/5 border-2 border-white/15 rounded-xl overflow-hidden hover:border-[#E2F16B]/50 transition-all flex flex-col"
            >
              <Link to={`/team/${member.id}`} className="block flex-1">
                {/* 🌟 核心修改：无照片的赛博风格头像区 */}
                <div className="relative h-48 bg-[#0a0a0a] overflow-hidden flex items-center justify-center group-hover:bg-[#111] transition-colors border-b border-white/10">
                  {/* 大字体的首字母作为背景图腾 */}
                  <div className="font-['VT323'] text-[8rem] text-white/5 group-hover:text-[#E2F16B]/10 transition-colors leading-none select-none">
                    {member.name.charAt(0)}
                  </div>
                  
                  {/* 扫描线 */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent 0px, transparent 1px, #fff 1px, #fff 2px)",
                      backgroundSize: "100% 4px"
                    }}
                  />

                  {/* 类别徽章 */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-['VT323'] text-xs uppercase tracking-wider border ${getCategoryColor(member.category)}`}>
                      {getCategoryIcon(member.category)}
                      {member.category}
                    </span>
                  </div>

                  {/* 底部名字和职位层 */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="font-['VT323'] text-2xl uppercase text-white leading-tight">
                      {member.name}
                    </h3>
                    <p className="font-['VT323'] text-base text-[#E2F16B] uppercase tracking-wide">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* 文本内容 */}
                <div className="p-5 space-y-4">
                  <p className="font-mono text-xs text-white/50 uppercase tracking-wide">
                    {member.title}
                  </p>
                  <p className="font-mono text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                  {/* 研究方向标签 */}
                  <div className="flex gap-1.5 flex-wrap">
                    {member.research.map((tag) => (
                      <span key={tag} className="bg-white/8 border border-white/10 px-2.5 py-0.5 rounded font-mono text-[11px] text-white/50 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>

              {/* 底部链接 */}
              {(member.email || member.website) && (
                <div className="flex gap-3 pt-2 mx-5 mb-5 border-t border-white/10 mt-auto">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-[#FF7A00] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {member.email}
                    </a>
                  )}
                  {member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-[#E2F16B] transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Website
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}