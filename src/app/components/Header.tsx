import { ArrowRight, ChevronRight, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { label: "Brief", href: "#brief" },
  {
    label: "Research",
    href: "#pillars",
    // 这里体现了你要求的层级关系
    children: [
      { label: "Urban Sensing", href: "/highlights/urban" },
      { label: "Urban HCI", href: "/highlights/hci" },
      { label: "Urban Chatbot", href: "/highlights/ai" },
    ],
  },
  { label: "News", href: "#news" },
  { label: "Projects", href: "#work" },
  { label: "Team", href: "#team" },
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
      {/* Logo */}
      <Link to="/" className="font-['VT323'] text-3xl tracking-tighter pointer-events-auto select-none text-black">
        U.TOP
      </Link>

      {/* Desktop Nav: 保持黑色胶囊形状 */}
      <nav ref={dropdownRef} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 bg-black text-[#F4F4EB] rounded-full px-3 py-2 pointer-events-auto shadow-xl">
        {navItems.map((item) => (
          <div key={item.label} className="relative">
            {item.children ? (
              <button
                onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                className="flex items-center gap-1 px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <span className="font-['VT323'] text-lg uppercase tracking-wide">{item.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
              </button>
            ) : (
              <a
                href={item.href}
                className="flex items-center gap-1 px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <span className="font-['VT323'] text-lg uppercase tracking-wide">{item.label}</span>
              </a>
            )}

            {/* Dropdown: 实现图片中的层级逻辑 */}
            {item.children && openDropdown === item.label && (
              <div className="absolute top-[calc(100%+10px)] left-0 bg-white border-2 border-black p-4 min-w-[220px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                {/* 模拟图片中的层级标题 */}
                <div className="text-sm font-bold text-black/40 mb-3 uppercase tracking-widest px-2">
                  Category: {item.label}
                </div>
                
                <div className="flex flex-col gap-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="group flex items-center gap-3 px-2 py-1 transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {/* 图片中的 > 箭头符号 */}
                      <ChevronRight size={14} className="text-black group-hover:translate-x-1 transition-transform" />
                      <span className="font-sans text-lg text-black group-hover:underline decoration-2">
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

      {/* Right CTA */}
      <Link
        to="#interest"
        className="pointer-events-auto hidden md:flex items-center gap-3 bg-[#F4F4EB] border-2 border-black rounded-full px-1 py-1 pr-5 hover:bg-gray-100 transition-colors"
      >
        <div className="bg-[#FF7A00] rounded-full p-2 border border-black">
          <ArrowRight className="w-4 h-4 text-black" />
        </div>
        <span className="font-['VT323'] text-lg uppercase tracking-wide text-black">
          Join Us
        </span>
      </Link>

      {/* Mobile Menu (省略部分保持不变) */}
    </header>
  );
}