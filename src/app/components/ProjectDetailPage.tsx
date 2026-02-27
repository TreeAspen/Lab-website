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
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
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
          {/* Image */}
          <div className="relative h-[300px] md:h-[450px] overflow-hidden">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)",
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Title bar overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            {/* Status & Year badges */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#FF7A00] text-black px-3 py-1 font-['VT323'] text-sm uppercase tracking-wider border border-black">
                <Zap className="w-3 h-3 inline mr-1" />
                {project.status}
              </span>
              <span className="bg-[#E2F16B] text-black px-3 py-1 font-['VT323'] text-sm uppercase tracking-wider border border-black">
                <Calendar className="w-3 h-3 inline mr-1" />
                {project.year}
              </span>
            </div>

            <h1 className="font-['VT323'] text-4xl md:text-6xl lg:text-7xl text-white uppercase leading-[0.9]">
              {project.title}
            </h1>
          </div>

          {/* Terminal-style header bar */}
          <div className="absolute top-0 left-0 right-0 bg-black/80 backdrop-blur-sm px-4 py-2 flex items-center gap-2 border-b-2 border-white/20">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF7A00] border border-white/20" />
              <span className="w-3 h-3 rounded-full bg-[#E2F16B] border border-white/20" />
              <span className="w-3 h-3 rounded-full bg-white/30 border border-white/20" />
            </div>
            <span className="font-['VT323'] text-white/60 text-sm tracking-wider ml-2">
              PROJECT_{String(project.id).padStart(3, "0")}.exe — {project.slug}
            </span>
          </div>
        </div>
      </motion.div>

      {/* ─── Tags ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-6xl mx-auto px-4 md:px-8 mt-8"
      >
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-[#E2F16B] border-2 border-black px-4 py-1.5 rounded-full font-['VT323'] text-base uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ─── Overview ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-6xl mx-auto px-4 md:px-8 mt-10"
      >
        <div className="bg-white border-4 border-black rounded-xl p-6 md:p-10 relative">
          {/* Corner decoration */}
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#FF7A00]" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#FF7A00]" />

          <h2 className="font-['VT323'] text-3xl md:text-4xl uppercase tracking-wider mb-1 flex items-center gap-3">
            <span className="text-[#FF7A00]">///</span> Overview
          </h2>
          <div className="w-24 h-1 bg-[#E2F16B] mb-6" />
          <p className="font-mono text-base leading-relaxed max-w-4xl">
            {project.overview}
          </p>
        </div>
      </motion.div>

      {/* ─── Content Sections ──────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12 space-y-8">
        {project.sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
            className={`relative flex flex-col ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-6 items-stretch`}
          >
            {/* Section number - decorative */}
            <div className="hidden md:flex flex-col items-center justify-start pt-6 w-16 shrink-0">
              <div className="w-12 h-12 bg-black text-[#E2F16B] rounded-full flex items-center justify-center font-['VT323'] text-2xl border-2 border-[#E2F16B]">
                {String(i + 1).padStart(2, "0")}
              </div>
              {i < project.sections.length - 1 && (
                <div className="w-[2px] flex-1 bg-black/20 mt-2" />
              )}
            </div>

            {/* Content card */}
            <div className="flex-1 bg-white border-2 border-black rounded-xl p-6 md:p-8 transition-all">
              <h3 className="font-['VT323'] text-2xl md:text-3xl uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="text-[#FF7A00] text-lg">{">"}</span>
                {section.heading}
              </h3>
              <p className="font-mono text-sm leading-relaxed text-gray-700">
                {section.body}
              </p>

              {/* Placeholder for user to add images */}
              {section.image && (
                <div className="mt-6 rounded-lg overflow-hidden border-2 border-black">
                  <img
                    src={section.image}
                    alt={section.heading}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {/* Image drop zone hint */}
              <div className="mt-6 border-2 border-dashed border-black/20 rounded-lg p-4 text-center">
                <p className="font-mono text-xs text-gray-400 uppercase">
                  [ Image / Media Placeholder — Replace with your content ]
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Team Section ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="max-w-6xl mx-auto px-4 md:px-8 mt-12"
      >
        <div className="bg-black text-white rounded-xl p-6 md:p-8 border-2 border-white/20">
          <h3 className="font-['VT323'] text-2xl uppercase tracking-wider mb-6 flex items-center gap-3">
            <Users className="w-5 h-5 text-[#E2F16B]" />
            Research Team
          </h3>
          <div className="flex flex-wrap gap-4">
            {project.team.map((member, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-5 py-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#FF7A00] border border-white/30 flex items-center justify-center font-['VT323'] text-sm text-black">
                  {member
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span className="font-mono text-sm">{member}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── Prev / Next Navigation ────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-16 mb-20">
        <div className="flex flex-col md:flex-row justify-between gap-4 border-t-4 border-black pt-8">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-3 bg-white border-2 border-black rounded-xl px-6 py-4 transition-all"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <div>
                <p className="font-mono text-xs text-gray-500 uppercase">
                  Previous
                </p>
                <p className="font-['VT323'] text-xl uppercase">
                  {prevProject.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-3 bg-white border-2 border-black rounded-xl px-6 py-4 transition-all text-right"
            >
              <div>
                <p className="font-mono text-xs text-gray-500 uppercase">
                  Next
                </p>
                <p className="font-['VT323'] text-xl uppercase">
                  {nextProject.title}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}