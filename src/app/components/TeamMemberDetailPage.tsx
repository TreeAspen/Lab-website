import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Globe,
  GraduationCap,
  BookOpen,
  FileText,
  FolderOpen,
  Users,
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

  const currentIndex = teamMembers.findIndex((m) => m.id === id);
  const prevMember = currentIndex > 0 ? teamMembers[currentIndex - 1] : null;
  const nextMember =
    currentIndex < teamMembers.length - 1
      ? teamMembers[currentIndex + 1]
      : null;

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
    <div className="bg-black text-white min-h-screen pt-20">
      {/* ─── Back Navigation ───────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        <Link
          to="/team"
          className="inline-flex items-center gap-2 font-['VT323'] text-lg uppercase tracking-wide text-white/70 hover:text-[#E2F16B] transition-colors group"
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
          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(226,241,107,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(226,241,107,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* HUD corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#E2F16B] z-10" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#E2F16B] z-10" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#FF7A00] z-10" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#FF7A00] z-10" />

          <div className="flex flex-col md:flex-row bg-[#0a0a0a]">
            {/* 🌟 核心修改：左侧无照片的特工机密档案区 */}
            <div className="relative w-full md:w-80 lg:w-96 h-64 md:h-auto shrink-0 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
              <div className="font-['VT323'] text-[12rem] text-white/5 leading-none select-none">
                {member.name.charAt(0)}
              </div>
              <div className="absolute bottom-8 font-mono text-xs text-[#FF7A00]/50 tracking-[0.3em] uppercase bg-black/50 px-4 py-1 border border-[#FF7A00]/20">
                [ IMAGE REDACTED ]
              </div>
              {/* 细密扫描线 */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(255,255,255,0.8) 1px, rgba(255,255,255,0.8) 2px)",
                  backgroundSize: "100% 4px"
                }}
              />
            </div>

            {/* Info */}
            <div className="relative flex-1 p-6 md:p-10 flex flex-col justify-center bg-black/40">
              {/* Terminal bar */}
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

              {/* Category badge */}
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

              {/* Research tags */}
              <div className="flex gap-2 flex-wrap mb-6">
                {member.research.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/8 border border-white/15 px-3 py-1 rounded-full font-mono text-xs text-white/60 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Contact */}
              <div className="flex gap-4 flex-wrap">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 bg-white/5 border border-white/15 rounded-full px-4 py-2 font-mono text-xs text-white/60 hover:text-[#FF7A00] hover:border-[#FF7A00]/40 transition-colors"
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
                    className="inline-flex items-center gap-2 bg-white/5 border border-white/15 rounded-full px-4 py-2 font-mono text-xs text-white/60 hover:text-[#E2F16B] hover:border-[#E2F16B]/40 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Personal Website
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

      {/* ─── Education ─────────────────────────────── */}
      {member.education && member.education.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-6xl mx-auto px-4 md:px-8 mt-8"
        >
          <div className="bg-white/5 border-2 border-white/15 rounded-xl p-6 md:p-8 hover:border-[#E2F16B]/40 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#E2F16B] rounded-lg flex items-center justify-center border border-[#E2F16B]">
                <GraduationCap className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-['VT323'] text-2xl md:text-3xl uppercase tracking-wider text-[#E2F16B]">
                Education
              </h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/30 to-transparent" />
            </div>

            <div className="space-y-4 ml-2">
              {member.education.map((edu, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#FF7A00] mt-2 shrink-0" />
                  <p className="font-mono text-sm text-gray-300 leading-relaxed">
                    {edu}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

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
                      <p className="font-mono text-sm text-gray-200 leading-relaxed mb-1">
                        {pub.title}
                      </p>
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
                <Link
                  key={proj.slug}
                  to={`/projects/${proj.slug}`}
                  className="group bg-white/5 border border-white/15 rounded-xl overflow-hidden hover:border-[#FF7A00]/60 transition-all"
                >
                  <div className="h-32 overflow-hidden relative">
                    <img
                      src={proj.heroImage}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute top-2 right-2 bg-black/70 border border-white/20 px-2 py-0.5 rounded font-['VT323'] text-[10px] text-white/60 uppercase tracking-wider">
                      {proj.status}
                    </span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-['VT323'] text-xl uppercase group-hover:text-[#E2F16B] transition-colors">
                        {proj.title}
                      </h4>
                      <p className="font-mono text-xs text-white/40 mt-1">
                        {proj.desc}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#FF7A00] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </div>
                </Link>
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
                {/* 🌟 底部推荐栏也去掉了照片 */}
                <div className="h-20 flex items-center justify-center relative overflow-hidden">
                  <div className="font-['VT323'] text-[4rem] text-white/10 group-hover:text-[#E2F16B]/20 transition-colors leading-none">
                    {m.name.charAt(0)}
                  </div>
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent 0px, transparent 1px, #fff 1px, #fff 2px)",
                      backgroundSize: "100% 4px"
                    }}
                  />
                </div>
                <div className="p-2 border-t border-white/10 bg-black/40">
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

      {/* ─── Prev / Next Navigation ────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-10 mb-20">
        <div className="flex flex-col md:flex-row justify-between gap-4 border-t-2 border-white/15 pt-8">
          {prevMember ? (
            <Link
              to={`/team/${prevMember.id}`}
              className="group flex items-center gap-3 bg-white/5 border border-white/15 rounded-xl px-6 py-4 hover:border-[#E2F16B]/40 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white/40 group-hover:text-[#E2F16B] group-hover:-translate-x-1 transition-all" />
              <div>
                <p className="font-mono text-xs text-white/40 uppercase">
                  Previous
                </p>
                <p className="font-['VT323'] text-xl uppercase group-hover:text-[#E2F16B] transition-colors">
                  {prevMember.name}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextMember ? (
            <Link
              to={`/team/${nextMember.id}`}
              className="group flex items-center gap-3 bg-white/5 border border-white/15 rounded-xl px-6 py-4 hover:border-[#FF7A00]/40 transition-all text-right"
            >
              <div>
                <p className="font-mono text-xs text-white/40 uppercase">
                  Next
                </p>
                <p className="font-['VT323'] text-xl uppercase group-hover:text-[#FF7A00] transition-colors">
                  {nextMember.name}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#FF7A00] group-hover:translate-x-1 transition-all" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}