import { labLogo } from "../assets"; 
import { ArrowRight, ChevronRight, ChevronDown, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const navItems = [
  {
    label: "Home",
    children: [
      { label: "Brief", href: "/#brief", isExternal: false, isAnchor: true },
      { label: "News", href: "/#news", isExternal: false, isAnchor: true },
    ],
  },
  {
    label: "Projects",
    children: [
      { label: "Urban Sensing", href: "/highlights/urban", isExternal: false },
      { label: "Urban VR", href: "/highlights/vr", isExternal: false },
      { label: "Urban Agent", href: "/highlights/agent", isExternal: false },
    ],
  },
  {
    label: "Team",
    children: [
      { label: "Our Team", href: "/team", isExternal: false },
      { label: "Join Us", href: "https://forms.gle/fRuKyLcMGgsBJ4Fn9", isExternal: true }, 
    ],
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 🌟 新增：移动端菜单打开时，禁止底部页面滚动
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // 处理点击外部区域关闭下拉菜单
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // 处理包含锚点 (#) 的路由跳转
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpenDropdown(null);
    setMobileOpen(false); // 确保手机端点击后收起菜单

    const [path, hash] = href.split("#");
    
    if (location.pathname !== path) {
      navigate(path);
      setTimeout(() => {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 right-0 flex justify-between items-center px-6 md:px-8 py-5 z-[60] pointer-events-none">
        
        {/* 左侧 Logo + 标题 */}
        <Link 
          to="/" 
          className="flex items-center gap-3 pointer-events-auto select-none group relative z-[60]"
          onClick={() => setMobileOpen(false)}
        >
          <img 
            src={labLogo} 
            alt="U.TOP Lab Logo" 
            className="h-10 w-auto object-contain group-hover:scale-105 transition-transform" 
          />
          <span className="font-['VT323'] text-4xl tracking-tighter text-black group-hover:text-[#FF7A00] transition-colors mt-1">
            U.TOP
          </span>
        </Link>

        {/* ─── 桌面端中间导航菜单 ──────────────────────────────────────── */}
        <nav ref={dropdownRef} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 bg-black text-[#F4F4EB] rounded-full px-4 py-2 pointer-events-auto shadow-2xl">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                className="flex items-center gap-1 px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <span className="font-['VT323'] text-xl uppercase tracking-wider">{item.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === item.label && (
                <div className="absolute top-[calc(100%+15px)] left-0 bg-black p-6 min-w-[220px] rounded-2xl z-50">
                  <div className="flex flex-col gap-4">
                    {item.children.map((child) => {
                      if (child.isExternal) {
                        return (
                          <a 
                            key={child.label} href={child.href} target="_blank" rel="noopener noreferrer"
                            className="group flex items-center gap-3 transition-colors" 
                            onClick={() => setOpenDropdown(null)}
                          >
                            <ChevronRight size={16} className="text-[#F4F4EB] group-hover:translate-x-1 transition-transform" />
                            <span className="font-mono text-sm text-[#F4F4EB]/80 hover:text-white transition-colors">{child.label}</span>
                          </a>
                        );
                      }
                      if (child.isAnchor) {
                        return (
                          <a
                            key={child.label} href={child.href}
                            onClick={(e) => handleAnchorClick(e, child.href)}
                            className="group flex items-center gap-3 transition-colors cursor-pointer"
                          >
                            <ChevronRight size={16} className="text-[#F4F4EB] group-hover:translate-x-1 transition-transform" />
                            <span className="font-mono text-sm text-[#F4F4EB]/80 hover:text-white transition-colors">{child.label}</span>
                          </a>
                        );
                      }
                      return (
                        <Link 
                          key={child.label} to={child.href} 
                          className="group flex items-center gap-3 transition-colors" 
                          onClick={() => setOpenDropdown(null)}
                        >
                          <ChevronRight size={16} className="text-[#F4F4EB] group-hover:translate-x-1 transition-transform" />
                          <span className="font-mono text-sm text-[#F4F4EB]/80 hover:text-white transition-colors">{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* ─── 右侧区域 ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 relative z-[60]">
          {/* 桌面端 Apply Now 按钮 */}
          <a 
            href="https://forms.gle/fRuKyLcMGgsBJ4Fn9" 
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto hidden md:flex items-center gap-3 bg-[#F4F4EB] border-2 border-black rounded-full px-1 py-1 pr-5 hover:bg-gray-100 transition-colors group"
          >
            <div className="bg-[#FF7A00] rounded-full p-2 border border-black group-hover:bg-[#E2F16B] transition-colors">
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
            </div>
            <span className="font-['VT323'] text-lg uppercase tracking-wide text-black">Apply Now</span>
          </a>

          {/* 移动端汉堡菜单按钮 */}
          <button 
            className="pointer-events-auto md:hidden bg-black text-white p-2.5 rounded-xl border-2 border-transparent transition-colors active:scale-95" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5 text-[#FF7A00]" /> : <Menu className="w-5 h-5 text-[#E2F16B]" />}
          </button>
        </div>
      </header>

      {/* ─── 移动端全屏折叠菜单 ──────────────────────────────────────── */}
      <div 
        className={`fixed inset-0 bg-[#F4F4EB] z-[55] md:hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-6 pb-10 overflow-y-auto">
          <div className="flex flex-col gap-8 flex-1">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col">
                <div className="font-['VT323'] text-3xl uppercase tracking-wider text-black border-b-2 border-black pb-2 mb-4 flex items-center gap-3">
                  <span className="text-[#FF7A00]">///</span>
                  {item.label}
                </div>
                <div className="flex flex-col gap-4 pl-8">
                  {item.children.map((child) => {
                    const mobileLinkClass = "font-mono text-lg text-black/70 hover:text-black transition-colors flex items-center gap-2";
                    
                    if (child.isExternal) {
                      return (
                        <a 
                          key={child.label} href={child.href} target="_blank" rel="noopener noreferrer"
                          className={mobileLinkClass}
                          onClick={() => setMobileOpen(false)}
                        >
                          <ChevronRight className="w-4 h-4 text-[#FF7A00]" />
                          {child.label}
                        </a>
                      );
                    }
                    if (child.isAnchor) {
                      return (
                        <a
                          key={child.label} href={child.href}
                          onClick={(e) => handleAnchorClick(e, child.href)}
                          className={mobileLinkClass}
                        >
                          <ChevronRight className="w-4 h-4 text-[#FF7A00]" />
                          {child.label}
                        </a>
                      );
                    }
                    return (
                      <Link 
                        key={child.label} to={child.href} 
                        className={mobileLinkClass}
                        onClick={() => setMobileOpen(false)}
                      >
                        <ChevronRight className="w-4 h-4 text-[#FF7A00]" />
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* 移动端底部 Apply Now 按钮 */}
          <div className="mt-8 pt-8 border-t-2 border-black">
            <a 
              href="https://forms.gle/fRuKyLcMGgsBJ4Fn9" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-black text-[#F4F4EB] border-2 border-black rounded-full p-2 group active:scale-95 transition-transform"
              onClick={() => setMobileOpen(false)}
            >
              <span className="font-['VT323'] text-2xl uppercase tracking-wide ml-6">Apply Now</span>
              <div className="bg-[#E2F16B] rounded-full p-3">
                <ArrowRight className="w-5 h-5 text-black" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}