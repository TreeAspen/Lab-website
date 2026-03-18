import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Mail,
  Globe,
  GraduationCap,
  BookOpen,
  FileText,
  FolderOpen,
  Users
} from "lucide-react";
import { teamMembers, projects } from "../data/projects";

export function TeamMemberDetailPage() {
  const { id } = useParams();
  const member = teamMembers.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="font-['VT323'] text-6xl text-[#FF7A00] mb-4">
            AGENT NOT FOUND
          </h1>
          <Link
            to="/team"
            className="inline-flex items-center gap-2 font-['VT323'] text-xl bg-[#E2F16B] text-black px-6 py-3 hover:bg-[#FF7A00] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Return to Team
          </Link>
        </div>
      </div>
    );
  }

  const linkedProjects = member.projects
    ? projects.filter((p) => member.projects!.includes(p.slug))
    : [];

  const categoryLabel =
    member.category === "faculty"
      ? "Faculty"
      : member.category === "phd"
      ? "PhD Student"
      : member.category === "master"
      ? "Master's Student"
      : "Alumni";

  const categoryColor =
    member.category === "faculty"
      ? "bg-[#FF7A00] text-black border-[#FF7A00]"
      : member.category === "phd"
      ? "bg-[#E2F16B] text-black border-[#E2F16B]"
      : "bg-white/20 text-white border-white/30";

  return (
    <div className="bg-black text-white min-h-screen pt-20 pb-20">
      {/* ─── Back Navigation ───────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        <Link
          to="/team"
          className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-white/70 hover:text-[#E2F16B] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Team</span>
        </Link>
      </div>

      {/* ─── Profile Hero ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 md:px-8"
      >
        <div className="relative border-2 border-white/30 rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(226,241,107,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(226,241,107,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#E2F16B] z-10 pointer-events-none" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#E2F16B] z-10 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#FF7A00] z-10 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#FF7A00] z-10 pointer-events-none" />

          <div className="flex flex-col md:flex-row bg-[#0a0a0a]">
            
            <div className="relative w-full md:w-80 lg:w-96 aspect-[4/3] shrink-0 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 overflow-hidden group">
              {member.avatar ? (
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500" 
                />
              ) : (
                <>
                  <div className="font-['VT323'] text-[12rem] text-white/5 leading-none select-none">
                    {member.name.charAt(0)}
                  </div>
                  <div className="absolute bottom-8 font-mono text-xs text-[#FF7A00]/50 tracking-[0.3em] uppercase bg-black/50 px-4 py-1 border border-[#FF7A00]/20 z-10">
                    [ IMAGE REDACTED ]
                  </div>
                </>
              )}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(255,255,255,0.8) 1px, rgba(255,255,255,0.8) 2px)",
                  backgroundSize: "100% 4px"
                }}
              />
            </div>

            <div className="relative flex-1 p-6 md:p-10 flex flex-col justify-center bg-black/40">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF7A00] border border-white/20" />
                  <span className="w-3 h-3 rounded-full bg-[#E2F16B] border border-white/20" />
                  <span className="w-3 h-3 rounded-full bg-white/30 border border-white/20" />
                </div>
                <span className="font-['VT323'] text-white/40 text-sm tracking-wider ml-2">
                  AGENT_{member.id.toUpperCase().replace(/-/g, "_")}.profile
                </span>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-['VT323'] text-xs uppercase tracking-wider border w-fit mb-4 ${categoryColor}`}
              >
                {member.category === "faculty" ? (
                  <BookOpen className="w-3.5 h-3.5" />
                ) : (
                  <GraduationCap className="w-3.5 h-3.5" />
                )}
                {categoryLabel}
              </span>

              <h1 className="font-['VT323'] text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.85] text-white mb-3">
                {member.name}
              </h1>
              <p className="font-['VT323'] text-xl md:text-2xl text-[#E2F16B] uppercase tracking-wide mb-2">
                {member.role}
              </p>
              <p className="font-mono text-sm text-white/50 uppercase tracking-wide mb-6">
                {member.title}
              </p>

              <div className="flex gap-2 flex-wrap mb-8">
                {member.research.map((tag) => (
                  <span
                    key={tag}
                    className="bg-black border border-[#E2F16B]/50 px-3 py-1 rounded-sm font-mono text-xs text-[#E2F16B] uppercase shadow-[0_0_8px_rgba(226,241,107,0.15)]"
                  >
                    <span className="text-white/30 mr-1">#</span>{tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 flex-wrap">
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#E2F16B] text-black border border-transparent rounded-sm px-5 py-2 font-['VT323'] text-lg uppercase tracking-wider hover:bg-white hover:shadow-[0_0_15px_rgba(226,241,107,0.6)] transition-all transform hover:-translate-y-0.5"
                  >
                    <Globe className="w-4 h-4" />
                    Personal Website
                  </a>
                )}
                
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 bg-transparent border border-white/30 rounded-sm px-5 py-2 font-mono text-xs text-white/60 hover:text-white hover:border-white transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    {member.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Bio ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-6xl mx-auto px-4 md:px-8 mt-10"
      >
        <div className="bg-white/5 border-2 border-white/20 rounded-xl p-6 md:p-10 relative">
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#FF7A00]" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#FF7A00]" />

          <h2 className="font-['VT323'] text-3xl uppercase tracking-wider mb-1 flex items-center gap-3">
            <span className="text-[#E2F16B]">{">>>"}</span> Biography
          </h2>
          <div className="w-24 h-1 bg-[#FF7A00] mb-6" />
          <p className="font-mono text-base leading-relaxed text-gray-300 max-w-4xl whitespace-pre-line">
            {member.fullBio || member.bio}
          </p>
        </div>
      </motion.div>

      {/* ─── Publications ──────────────────────────── */}
      {member.publications && member.publications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-6xl mx-auto px-4 md:px-8 mt-8"
        >
          <div className="bg-white/5 border-2 border-white/15 rounded-xl p-6 md:p-8 hover:border-[#E2F16B]/40 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#FF7A00] rounded-lg flex items-center justify-center border border-[#FF7A00]">
                <FileText className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-['VT323'] text-2xl md:text-3xl uppercase tracking-wider text-[#E2F16B]">
                Selected Publications
              </h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/30 to-transparent" />
            </div>

            <div className="space-y-4">
              {member.publications.map((pub, i) => (
                <div
                  key={i}
                  className="bg-white/3 border border-white/10 rounded-lg p-4 hover:border-white/25 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      
                      {/* 🌟 核心修改 2：如果存在 link 字段，则渲染为可点击的高亮链接 */}
                      {pub.link ? (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-sm text-[#E2F16B] hover:text-[#FF7A00] underline decoration-[#E2F16B]/40 hover:decoration-[#FF7A00]/80 underline-offset-4 leading-relaxed mb-1 block transition-colors"
                        >
                          {pub.title}
                        </a>
                      ) : (
                        <p className="font-mono text-sm text-gray-200 leading-relaxed mb-1">
                          {pub.title}
                        </p>
                      )}

                      <p className="font-mono text-xs text-white/40">
                        <span className="text-[#E2F16B]">{pub.venue}</span>
                        {" · "}
                        {pub.year}
                      </p>
                    </div>
                    <span className="font-['VT323'] text-lg text-white/20 shrink-0">
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Related Projects ──────────────────────── */}
      {linkedProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-6xl mx-auto px-4 md:px-8 mt-8"
        >
          <div className="bg-white/5 border-2 border-white/15 rounded-xl p-6 md:p-8 hover:border-[#E2F16B]/40 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#E2F16B] rounded-lg flex items-center justify-center border border-[#E2F16B]">
                <FolderOpen className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-['VT323'] text-2xl md:text-3xl uppercase tracking-wider text-[#E2F16B]">
                Related Projects
              </h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {linkedProjects.map((proj) => (
                <div
                  key={proj.slug}
                  className="bg-[#0a0a0a] border border-white/15 rounded-xl overflow-hidden"
                >
                  <div className="p-4 flex items-center justify-between border-b border-white/10">
                    <h4 className="font-['VT323'] text-xl uppercase text-[#faff71] truncate">
                      <span className="text-[#FF7A00] mr-2">{"//"}</span>{proj.title}
                    </h4>
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-xs text-white/40 line-clamp-2">
                      {proj.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Other Team Members ────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12 mb-6">
        <h3 className="font-['VT323'] text-2xl uppercase tracking-wider mb-6 flex items-center gap-2 text-[#E2F16B]">
          <Users className="w-5 h-5" /> Other Team Members
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {teamMembers
            .filter((m) => m.id !== id)
            .map((m) => (
              <Link
                key={m.id}
                to={`/team/${m.id}`}
                className="group bg-[#0a0a0a] border border-white/15 rounded-xl overflow-hidden hover:border-[#E2F16B]/50 transition-all text-center flex flex-col"
              >
                <div className="aspect-[4/3] flex items-center justify-center relative overflow-hidden">
                  
                  {m.avatar ? (
                    <img src={m.avatar} alt={m.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="font-['VT323'] text-[4rem] text-white/10 group-hover:text-[#E2F16B]/20 transition-colors leading-none">
                      {m.name.charAt(0)}
                    </div>
                  )}

                  <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0px, transparent 1px, #fff 1px, #fff 2px)", backgroundSize: "100% 4px" }} />
                </div>
                <div className="p-2 border-t border-white/10 bg-black/40 relative z-10">
                  <p className="font-['VT323'] text-sm uppercase group-hover:text-[#E2F16B] transition-colors truncate">
                    {m.name}
                  </p>
                  <p className="font-mono text-[10px] text-white/30 truncate">
                    {m.role}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>

    </div>
  );
}