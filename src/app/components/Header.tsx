import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { label: "Brief", href: "#brief" },
  {
    label: "Research",
    href: "#pillars",
    children: [
      { label: "Urban Sensing", href: "/highlights/urban" },
      { label: "Urban HCI", href: "/highlights/hci" },
      { label: "Urban AI", href: "/highlights/ai" },
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

      {/* Desktop Nav */}
      <nav ref={dropdownRef} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 bg-black text-[#F4F4EB] rounded-full px-3 py-2 pointer-events-auto">
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

            {/* Dropdown */}
            {item.children && openDropdown === item.label && (
              <div className="absolute top-full left-0 mt-2 bg-black border border-white/20 rounded-xl py-2 min-w-[180px] z-50">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    to={child.href}
                    className="block px-4 py-2 font-['VT323'] text-base uppercase tracking-wide hover:bg-white/10 hover:text-[#E2F16B] transition-colors"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Right: Interest Form CTA */}
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

      {/* Mobile Menu Button */}
      <button
        className="pointer-events-auto md:hidden bg-black text-white p-2 rounded-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="pointer-events-auto fixed inset-0 top-16 bg-black/95 md:hidden z-40 flex flex-col items-center pt-12 gap-4">
          {navItems.map((item) => (
            <div key={item.label} className="text-center">
              <a
                href={item.href}
                className="font-['VT323'] text-3xl text-[#F4F4EB] uppercase tracking-widest hover:text-[#E2F16B] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
              {item.children && (
                <div className="flex flex-col gap-1 mt-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="font-['VT323'] text-xl text-white/60 uppercase tracking-wide hover:text-[#FF7A00] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
