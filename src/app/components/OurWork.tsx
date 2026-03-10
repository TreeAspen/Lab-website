import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
// 🌟 1. 导入视频变量
import { videoSegmentation } from "../assets"; 

const workAreas = [
  {
    id: "sensing",
    title: "Urban Sensing",
    desc: "Sensor-based measurements capturing urban life — mobile data, wearables, computer vision, and environmental monitoring.",
    href: "/highlights/urban",
    color: "#E2F16B",
    // 🌟 2. 直接使用变量，不要加引号！
    heroVideo: videoSegmentation,
  },
  {
    id: "vr",
    title: "Urban VR",
    desc: "Immersive VR, photogrammetry, and 3D interfaces for urban planning and participatory design.",
    href: "/highlights/vr",
    color: "#FF7A00",
    heroImage:
      "https://images.unsplash.com/photo-1708924401329-bb17acf6c16b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGhlYWRzZXQlMjBjeWJlcnB1bmt8ZW58MXx8fHwxNzcyMTM3NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "agent", 
    title: "Urban Agent", 
    desc: "AI agents and conversational systems bridging complex urban data with citizens' daily lives.",
    href: "/highlights/agent",
    color: "#E2F16B",
    heroImage:
      "https://images.unsplash.com/photo-1562544887-593f89e2d21b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwZGF0YSUyMHZpc3VhbGl6YXRpb24lMjBkYXJrfGVufDF8fHx8MTc3MjEzNzU0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function OurWork() {
  return (
    <section id="work" className="bg-[#1a1a1a] text-[#f0f0f0] py-20 px-4 md:px-12 relative overflow-hidden border-t-4 border-white">
      {/* Texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
        <h2 className="font-['VT323'] text-5xl md:text-6xl uppercase tracking-widest text-[#f0f0f0]">
          Our Work
        </h2>
        <p className="font-mono text-sm md:text-base uppercase text-gray-400 mt-2 tracking-wide">
          Three pillars of urban technology research
        </p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {workAreas.map((work, i) => (
          <Link key={work.id} to={work.href}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#2a2a2a] border-2 border-white/20 rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer h-full flex flex-col"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-black flex items-center justify-center">
                
                {/* 🌟 3. 条件渲染：如果有 heroVideo 就渲染视频，否则渲染图片 */}
                {work.heroVideo ? (
                  <video 
                    src={work.heroVideo} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    // 🌟 4. 去掉了 mix-blend-screen，确保视频在黑色背景下不会隐形
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                ) : (
                  <img 
                    src={work.heroImage} 
                    alt={work.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                  />
                )}
                
                <div className="absolute inset-0 opacity-30 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_100%)] bg-[length:20px_20px]" />
                <div 
                  className="absolute top-4 left-4 px-3 py-1 font-['VT323'] text-lg uppercase tracking-wider text-black"
                  style={{ backgroundColor: work.color }}
                >
                  {work.id}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-['VT323'] text-2xl md:text-3xl mb-2 text-white group-hover:text-[#E2F16B] transition-colors uppercase tracking-wider">
                  {work.title}
                </h3>
                <p className="font-mono text-sm text-gray-400 leading-relaxed flex-1">
                  {work.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono uppercase text-gray-500">
                  <span className="flex items-center gap-2 group-hover:text-[#FF7A00] transition-colors">
                    View Research <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}