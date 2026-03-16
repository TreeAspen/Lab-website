import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Calendar, Users, Zap } from "lucide-react";
import { projects } from "../data/projects";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4EB]">
        <div className="text-center">
          <h1 className="font-['VT323'] text-6xl text-[#FF7A00] mb-4">
            PROJECT NOT FOUND
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-['VT323'] text-xl bg-black text-[#E2F16B] px-6 py-3 hover:bg-[#FF7A00] hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Return to Grid
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="bg-[#F4F4EB] min-h-screen pt-20">
      {/* ─── Back Navigation ───────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 md:py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-['VT323'] text-lg uppercase tracking-wide hover:text-[#FF7A00] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* ─── Hero Banner ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 md:px-8"
      >
        <div className="relative rounded-2xl overflow-hidden border-4 border-black">
          {/* Image / Video 智能切换 */}
          <div className="relative h-[250px] sm:h-[300px] md:h-[450px] overflow-hidden bg-black">
            {project.heroVideo ? (
              <video
                src={project.heroVideo as string}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80"
              />
            ) : (
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
            
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          </div>

          {/* Title bar overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <span className="bg-[#FF7A00] text-black px-2 md:px-3 py-1 font-['VT323'] text-xs md:text-sm uppercase tracking-wider border border-black">
                <Zap className="w-3 h-3 inline mr-1" />
                {project.status}
              </span>
              <span className="bg-[#E2F16B] text-black px-2 md:px-3 py-1 font-['VT323'] text-xs md:text-sm uppercase tracking-wider border border-black">
                <Calendar className="w-3 h-3 inline mr-1" />
                {project.year}
              </span>
            </div>

            <h1 className="font-['VT323'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase leading-[0.9]">
              {project.title}
            </h1>
          </div>

          {/* Terminal-style header bar */}
          <div className="absolute top-0 left-0 right-0 bg-black/80 backdrop-blur-sm px-3 md:px-4 py-2 flex items-center gap-2 border-b-2 border-white/20">
            <div className="flex gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#FF7A00] border border-white/20" />
              <span className="w-3 h-3 rounded-full bg-[#E2F16B] border border-white/20" />
              <span className="w-3 h-3 rounded-full bg-white/30 border border-white/20" />
            </div>
            <span className="font-['VT323'] text-white/60 text-xs md:text-sm tracking-wider ml-1 md:ml-2 truncate">
              PROJECT_{String(project.id).padStart(3, "0")}.exe — {project.slug}
            </span>
          </div>
        </div>
      </motion.div>

      {/* ─── Tags ──────────────────────────────────── */}
      {project.tags && project.tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto px-4 md:px-8 mt-6 md:mt-8"
        >
          <div className="flex gap-2 flex-wrap">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-[#E2F16B] border-2 border-black px-3 md:px-4 py-1 md:py-1.5 rounded-full font-['VT323'] text-sm md:text-base uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── 🌟 交互式 HTML 模块渲染区 (响应式重构) ─────────────── */}
      {project.embedHtml && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="max-w-6xl mx-auto px-4 md:px-8 mt-10"
        >
          <div className="bg-black border-4 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-[#111] px-4 py-2.5 border-b-2 border-white/20 flex items-center justify-between">
              <span className="font-['VT323'] text-[#E2F16B] text-sm md:text-base tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FF7A00]" /> 
                INTERACTIVE_MODULE.exe
              </span>
            </div>
            
            <div className="w-full h-[1400px] sm:h-[1200px] md:h-auto md:aspect-video relative bg-white overflow-hidden">
              <iframe 
                src={project.embedHtml} 
                className="absolute inset-0 w-full h-full border-none"
                title={`${project.title} Interactive`}
                sandbox="allow-scripts allow-same-origin"
                scrolling="yes"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Overview / 简介区块 ────────────────────────── */}
      {project.overview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-6xl mx-auto px-4 md:px-8 mt-10"
        >
          <div className="bg-white border-4 border-black rounded-xl p-5 md:p-10 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="absolute top-2 right-2 md:top-3 md:right-3 w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 border-[#FF7A00]" />
            <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 w-4 h-4 md:w-6 md:h-6 border-b-2 border-l-2 border-[#FF7A00]" />

            <h2 className="font-['VT323'] text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider mb-2 flex items-center gap-2 md:gap-3">
              <span className="text-[#FF7A00]">///</span> {project.title} Overview
            </h2>
            <div className="w-16 md:w-24 h-1 bg-[#E2F16B] mb-4 md:mb-6" />
            <p className="font-mono text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl text-gray-800">
              {project.overview}
            </p>
          </div>
        </motion.div>
      )}

      {/* ─── Content Sections ──────────────────────── */}
      {project.sections && project.sections.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12 space-y-8">
          {project.sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`relative flex flex-col ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-4 md:gap-6 items-stretch`}
            >
              <div className="hidden md:flex flex-col items-center justify-start pt-6 w-16 shrink-0">
                <div className="w-12 h-12 bg-black text-[#E2F16B] rounded-full flex items-center justify-center font-['VT323'] text-2xl border-2 border-[#E2F16B]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                {i < project.sections.length - 1 && (
                  <div className="w-[2px] flex-1 bg-black/20 mt-2" />
                )}
              </div>

              <div className="flex-1 bg-white border-2 border-black rounded-xl p-5 md:p-8 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-['VT323'] text-xl md:text-3xl uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
                  <span className="text-[#FF7A00] text-base md:text-lg">{">"}</span>
                  {section.heading}
                </h3>
                <p className="font-mono text-sm md:text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {section.body}
                </p>

                {section.image && (
                  <div className="mt-5 md:mt-6 rounded-lg overflow-hidden border-2 border-black">
                    <img
                      src={section.image}
                      alt={section.heading}
                      className="w-full h-auto max-h-[300px] md:max-h-96 object-cover"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ─── Team Section ──────────────────────────── */}
      {project.team && project.team.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-4 md:px-8 mt-12"
        >
          <div className="bg-black text-white rounded-xl p-5 md:p-8 border-2 border-white/20 shadow-[4px_4px_0px_0px_#E2F16B]">
            <h3 className="font-['VT323'] text-xl md:text-2xl uppercase tracking-wider mb-4 md:mb-6 flex items-center gap-3">
              <span className="text-[#FF7A00]">{">"}</span>
              <Users className="w-4 h-4 md:w-5 md:h-5 text-[#E2F16B]" />
              Research Team
            </h3>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {project.team.map((member, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 md:gap-3 bg-white/10 border border-white/20 rounded-full px-3 md:px-5 py-1.5 md:py-2 hover:bg-white/20 transition-colors cursor-default"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#FF7A00] border border-white/30 flex items-center justify-center font-['VT323'] text-xs md:text-sm text-black shadow-[0_0_10px_rgba(255,122,0,0.5)]">
                    {member
                      .replace("Dr. ", "")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="font-mono text-xs md:text-sm whitespace-nowrap">{member}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Prev / Next Navigation ────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12 md:mt-16 mb-20">
        <div className="flex flex-col md:flex-row justify-between gap-4 border-t-4 border-black pt-6 md:pt-8">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-3 bg-white border-2 border-black rounded-xl px-5 py-3 md:px-6 md:py-4 transition-all hover:bg-black hover:text-[#faff71] w-full md:w-auto"
            >
              <ArrowLeft className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
              <div className="overflow-hidden">
                <p className="font-mono text-[10px] md:text-xs text-gray-500 uppercase group-hover:text-gray-400">
                  Previous
                </p>
                <p className="font-['VT323'] text-lg md:text-xl uppercase truncate">
                  {prevProject.title}
                </p>
              </div>
            </Link>
          ) : (
            <div className="hidden md:block w-full md:w-auto" />
          )}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="group flex items-center justify-end gap-3 bg-white border-2 border-black rounded-xl px-5 py-3 md:px-6 md:py-4 transition-all hover:bg-black hover:text-[#faff71] w-full md:w-auto text-right"
            >
              <div className="overflow-hidden">
                <p className="font-mono text-[10px] md:text-xs text-gray-500 uppercase group-hover:text-gray-400">
                  Next
                </p>
                <p className="font-['VT323'] text-lg md:text-xl uppercase truncate">
                  {nextProject.title}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div className="hidden md:block w-full md:w-auto" />
          )}
        </div>
      </div>
    </div>
  );
}