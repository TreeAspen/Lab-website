import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Layers, BookOpen } from "lucide-react";
import { highlightDetailData } from "../data/projects";

export function HighlightDetailPage() {
  const { id } = useParams();
  const highlight = highlightDetailData.find((h) => h.id === id);

  if (!highlight) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="font-['VT323'] text-6xl text-[#FF7A00] mb-4">
            SECTOR NOT FOUND
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-['VT323'] text-xl bg-[#E2F16B] text-black px-6 py-3 hover:bg-[#FF7A00] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Return to Grid
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = highlightDetailData.findIndex((h) => h.id === id);
  const otherHighlights = highlightDetailData.filter((h) => h.id !== id);

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* ─── Back Navigation ───────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-['VT323'] text-lg uppercase tracking-wide text-white/70 hover:text-[#E2F16B] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Highlights</span>
        </Link>
      </div>

      {/* ─── Hero Section ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 md:px-8"
      >
        <div className="relative rounded-2xl overflow-hidden border-2 border-white/30">
          {/* Image */}
          <div className="relative h-[300px] md:h-[450px] overflow-hidden">
            <img
              src={highlight.heroImage}
              alt={highlight.title}
              className="w-full h-full object-cover"
            />
            {/* Grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(226,241,107,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(226,241,107,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="w-5 h-5 text-[#E2F16B]" />
              <span className="font-mono text-sm text-[#E2F16B] uppercase tracking-widest">
                Research Division
              </span>
            </div>
            <h1 className="font-['VT323'] text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.85] text-white">
              {highlight.title}
            </h1>
          </div>

          {/* HUD corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#E2F16B]" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#E2F16B]" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#FF7A00]" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#FF7A00]" />
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
          {highlight.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-[#E2F16B] text-black border-2 border-[#E2F16B] px-4 py-1.5 rounded-full font-['VT323'] text-base uppercase tracking-wider"
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
        <div className="bg-white/5 border-2 border-white/20 rounded-xl p-6 md:p-10 relative">
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#FF7A00]" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#FF7A00]" />

          <h2 className="font-['VT323'] text-3xl uppercase tracking-wider mb-1 flex items-center gap-3">
            <span className="text-[#E2F16B]">{">>>"}</span> Overview
          </h2>
          <div className="w-24 h-1 bg-[#FF7A00] mb-6" />
          <p className="font-mono text-base leading-relaxed text-gray-300 max-w-4xl">
            {highlight.overview}
          </p>
        </div>
      </motion.div>

      {/* ─── Content Sections ──────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12 space-y-8">
        {highlight.sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
            className="relative"
          >
            <div className="bg-white/5 border-2 border-white/15 rounded-xl p-6 md:p-8 hover:border-[#E2F16B]/40 transition-colors">
              {/* Section header with decorative line */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-[#FF7A00] rounded-lg flex items-center justify-center font-['VT323'] text-xl text-black border border-[#FF7A00]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-white/30 to-transparent" />
              </div>

              <h3 className="font-['VT323'] text-2xl md:text-3xl uppercase tracking-wider mb-4 text-[#E2F16B]">
                {section.heading}
              </h3>
              <p className="font-mono text-sm leading-relaxed text-gray-400">
                {section.body}
              </p>

              {/* Image placeholder */}
              <div className="mt-6 border-2 border-dashed border-white/15 rounded-lg p-6 text-center">
                <BookOpen className="w-6 h-6 mx-auto text-white/20 mb-2" />
                <p className="font-mono text-xs text-white/20 uppercase">
                  [ Insert research imagery, diagrams, or charts here ]
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Other Research Directions ──────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-16 mb-20">
        <h3 className="font-['VT323'] text-2xl uppercase tracking-wider mb-6 flex items-center gap-2 text-[#E2F16B]">
          <span>///</span> Other Research Directions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {otherHighlights.map((item) => (
            <Link
              key={item.id}
              to={`/highlights/${item.id}`}
              className="group bg-white/5 border-2 border-white/15 rounded-xl overflow-hidden hover:border-[#FF7A00]/60 transition-all"
            >
              <div className="h-36 overflow-hidden relative">
                <img
                  src={item.heroImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <h4 className="font-['VT323'] text-xl uppercase group-hover:text-[#E2F16B] transition-colors">
                  {item.title}
                </h4>
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#FF7A00] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}