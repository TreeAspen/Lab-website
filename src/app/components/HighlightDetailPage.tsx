import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Target, FolderOpen, FileText, Presentation, ExternalLink, PlayCircle, ArrowUpRight } from "lucide-react";
import { highlightDetailData, projects, type HighlightData } from "../data/projects";

export function HighlightDetailPage() {
  const { id } = useParams();
  const data = highlightDetailData.find((h: HighlightData) => h.id === id);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="font-['VT323'] text-6xl text-[#FF7A00] mb-4">SECTOR NOT FOUND</h1>
          <Link to="/" className="inline-flex items-center gap-2 font-['VT323'] text-xl bg-[#E2F16B] text-black px-6 py-3 hover:bg-[#FF7A00] transition-colors">
            <ArrowLeft className="w-5 h-5" /> Return to Grid
          </Link>
        </div>
      </div>
    );
  }

  // 匹配并拉取所有关联的子项目数据 (渲染一排跳转卡片)
  const linkedProjects = projects.filter(p => data.relatedProjects.includes(p.slug));

  return (
    <div className="bg-black text-white min-h-screen pt-20 pb-24">
      {/* ─── Back Navigation ─── */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-white/70 hover:text-[#E2F16B] transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Grid</span>
        </Link>
      </div>

      {/* ─── Hero Header ─── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto px-4 md:px-8 mb-16">
        <div className="relative h-64 md:h-80 lg:h-[400px] border-2 border-white/20 rounded-xl overflow-hidden mb-8 bg-[#111]">
          
          {/* 🌟 核心渲染区：如果数据里有视频就播视频，否则播图片 */}
          {data.heroVideo ? (
            <video 
              src={data.heroVideo} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover opacity-60" 
            />
          ) : (
            <img 
              src={data.heroImage} 
              alt={data.title} 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity" 
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="font-['VT323'] text-5xl md:text-7xl uppercase tracking-wider text-[#E2F16B] drop-shadow-lg">
              {data.title}
            </h1>
            <div className="flex gap-2 flex-wrap mt-4">
              {data.tags.map((tag) => (
                <span key={tag} className="bg-black/50 backdrop-blur-md border border-[#E2F16B]/30 px-3 py-1 rounded font-mono text-xs uppercase text-[#E2F16B]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Overview Paragraphs */}
        <div className="space-y-6 text-gray-300 font-mono text-base leading-relaxed">
          {data.overview.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Media/Video Link */}
        {data.mediaLink && (
          <div className="mt-6">
            <a href={data.mediaLink.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#FF7A00] text-black px-6 py-2 font-mono text-sm font-bold hover:bg-[#E2F16B] transition-colors">
              <PlayCircle className="w-4 h-4" />
              {data.mediaLink.label}
            </a>
          </div>
        )}
      </motion.div>

      {/* ─── Focus Areas ─── */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl border-l-4 border-l-[#E2F16B]">
          <h2 className="flex items-center gap-3 font-['VT323'] text-3xl uppercase text-white mb-6">
            <Target className="w-6 h-6 text-[#E2F16B]" />
            Research Focus
          </h2>
          <ul className="space-y-4 font-mono text-sm text-gray-300">
            {data.focusPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-[#E2F16B] mt-0.5">■</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* ─── Related Projects (Jump Cards) ─── */}
      {linkedProjects.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto px-4 md:px-8 mb-16">
          <h2 className="flex items-center gap-3 font-['VT323'] text-3xl uppercase text-white mb-6">
            <FolderOpen className="w-6 h-6 text-[#FF7A00]" />
            Current Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {linkedProjects.map((proj) => (
              <Link key={proj.slug} to={`/projects/${proj.slug}`} className="group bg-[#0a0a0a] border border-white/20 rounded-xl overflow-hidden hover:border-[#FF7A00]/80 transition-all flex flex-col h-full">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-['VT323'] text-2xl uppercase text-[#faff71] group-hover:text-[#FF7A00] transition-colors line-clamp-2">
                      <ArrowUpRight className="inline-block w-5 h-5 mr-2 mb-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                      {proj.title}
                    </h3>
                  </div>
                  <p className="font-mono text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                    {proj.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                     {proj.tags.slice(0, 3).map((t, i) => (
                       <span key={i} className="text-[10px] font-mono uppercase bg-white/10 px-2 py-1 rounded text-white/50">{t}</span>
                     ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── Selected Publications ─── */}
      {data.publications && data.publications.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto px-4 md:px-8 mb-12">
          <h2 className="flex items-center gap-3 font-['VT323'] text-3xl uppercase text-white mb-6">
            <FileText className="w-6 h-6 text-[#E2F16B]" />
            Selected Publications
          </h2>
          <div className="space-y-4">
            {data.publications.map((pub, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-lg hover:bg-white/10 transition-colors flex gap-4">
                <span className="font-['VT323'] text-xl text-white/20 mt-1 shrink-0">[{String(idx + 1).padStart(2, "0")}]</span>
                <div>
                  <p className="font-mono text-sm text-gray-300 leading-relaxed mb-2">
                    {pub.citation}
                  </p>
                  {pub.link && (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-mono text-xs text-[#FF7A00] hover:text-[#E2F16B] transition-colors">
                      <ExternalLink className="w-3 h-3" /> DOI Link
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── Selected Conferences ─── */}
      {data.conferences && data.conferences.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="flex items-center gap-3 font-['VT323'] text-3xl uppercase text-white mb-6">
            <Presentation className="w-6 h-6 text-[#FF7A00]" />
            Selected Conferences
          </h2>
          <div className="space-y-4">
            {data.conferences.map((conf, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-lg flex gap-4">
                <span className="font-['VT323'] text-xl text-white/20 mt-1 shrink-0">[{String(idx + 1).padStart(2, "0")}]</span>
                <p className="font-mono text-sm text-gray-300 leading-relaxed">
                  {conf}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}