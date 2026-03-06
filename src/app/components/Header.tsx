import { ArrowRight, ChevronRight, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

// 修正后的导航数据：去掉开头的 / 以防止 GitHub Pages 404
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
      <Link to="/" className="font-['VT323'] text-3xl tracking-tighter pointer-events-auto text-black select-none">
        U.TOP
      </Link>

      {/* 黑色胶囊导航栏 */}
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

            {/* 下拉菜单：黑底、无阴影、带缩进和 > 箭头 */}
            {openDropdown === item.label && (
              <div className="absolute top-[calc(100%+15px)] left-0 bg-black p-6 min-w-[220px] rounded-2xl z-50">
                <div className="flex flex-col gap-4">
                  {item.children.map((child) => (
                    <a 
                      key={child.label} 
                      href={child.href} 
                      className="group flex items-center gap-3 transition-colors" 
                      onClick={() => setOpenDropdown(null)}
                    >
                      <ChevronRight size={16} className="text-[#F4F4EB] group-hover:translate-x-1 transition-transform" />
                      <span className="font-sans text-lg text-[#F4F4EB]/80 font-medium group-hover:text-white">
                        {child.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      <Link to="#interest" className="pointer-events-auto hidden md:flex items-center gap-3 bg-[#F4F4EB] border-2 border-black rounded-full px-1 py-1 pr-5 hover:bg-gray-100 transition-colors">
        <div className="bg-[#FF7A00] rounded-full p-2 border border-black">
          <ArrowRight className="w-4 h-4 text-black" />
        </div>
        <span className="font-['VT323'] text-lg uppercase tracking-wide text-black">Apply Now</span>
      </Link>

      <button className="pointer-events-auto md:hidden bg-black text-white p-2 rounded-lg" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </header>
  );
}