import { ArrowRight, ChevronRight, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

// 完全按照你要求的层级关系重新定义导航数据
const navItems = [
  {
    label: "Home",
    children: [
      { label: "Brief", href: "#brief" },
      { label: "News", href: "#news" },
    ],
  },
  {
    label: "Projects",
    children: [
      { label: "Urban Sensing", href: "/highlights/urban" },
      { label: "Urban HCI", href: "/highlights/hci" },
      { label: "Urban Chatbot", href: "/highlights/ai" },
    ],
  },
  {
    label: "Team",
    children: [
      { label: "Director", href: "#director" },
      { label: "Current members", href: "#members" },
      { label: "Join Us", href: "#interest" },
    ],
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部自动关闭下拉菜单
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 right-0 flex justify-between items-center px-6 md:px-8 py-5 z-50 pointer-events-none">
      {/* 1. 左侧 Logo */}
      <Link to="/" className="font-['VT323'] text-3xl tracking-tighter pointer-events-auto select-none text-black">
        U.TOP
      </Link>

      {/* 2. 中间 Desktop Nav: 保持经典的黑色胶囊样式 */}
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

            {/* 下拉菜单: 实现图片中的层级逻辑和箭头符号 */}
            {openDropdown === item.label && (
              <div className="absolute top-[calc(100%+15px)] left-0 bg-white border-2 border-black p-5 min-w-[200px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex flex-col gap-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="group flex items-center gap-3 transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {/* 图片中的 》 箭头符号，这里使用 ChevronRight */}
                      <ChevronRight size={16} className="text-black group-hover:translate-x-1 transition-transform" />
                      <span className="font-sans text-lg text-black font-medium group-hover:underline">
                        {child.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* 3. 右侧 CTA 按钮 */}
      <Link
        to="#interest"
        className="pointer-events-auto hidden md:flex items-center gap-3 bg-[#F4F4EB] border-2 border-black rounded-full px-1 py-1 pr-5 hover:bg-gray-100 transition-colors"
      >
        <div className="bg-[#FF7A00] rounded-full p-2 border border-black">
          <ArrowRight className="w-4 h-4 text-black" />
        </div>
        <span className="font-['VT323'] text-lg uppercase tracking-wide text-black">
          Apply Now
        </span>
      </Link>

      {/* 移动端菜单按钮 */}
      <button
        className="pointer-events-auto md:hidden bg-black text-white p-2 rounded-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* 移动端导航全屏遮罩 */}
      {mobileOpen && (
        <div className="pointer-events-auto fixed inset-0 top-16 bg-black/95 md:hidden z-40 flex flex-col items-center pt-12 gap-8 overflow-y-auto pb-20">
          {navItems.map((item) => (
            <div key={item.label} className="w-full px-12">
              <h3 className="font-['VT323'] text-3xl text-[#E2F16B] uppercase mb-4 text-center">{item.label}</h3>
              <div className="flex flex-col items-center gap-3">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    to={child.href}
                    className="flex items-center gap-2 font-['VT323'] text-2xl text-white/80 hover:text-[#FF7A00]"
                    onClick={() => setMobileOpen(false)}
                  >
                    <ChevronRight size={18} /> {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}