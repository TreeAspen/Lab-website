import { ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full fixed top-0 left-0 right-0 flex justify-between items-center px-8 py-6 z-50 pointer-events-none">
      {/* Logo - kept for layout balance, but pointer-events-auto to make it clickable if needed */}
      <div className="font-['VT323'] font-bold text-3xl tracking-tighter pointer-events-auto select-none">
        U.TOP
      </div>

      {/* Centered Nav - Black Capsule */}
      <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 bg-black text-[#F4F4EB] rounded-full px-8 py-3 pointer-events-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
        {["Home", "Projects", "Team"].map((item) => (
          <div
            key={item}
            className="flex items-center gap-1 cursor-pointer group hover:text-[#E2F16B] transition-colors"
          >
            <span className="font-bold text-lg font-['VT323'] uppercase tracking-wide">
              {item}
            </span>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
          </div>
        ))}
      </nav>

      {/* Right Action Button */}
      <Link
        to="/connect"
        className="pointer-events-auto flex items-center gap-3 bg-[#F4F4EB] border-2 border-black rounded-full px-1 py-1 pr-5 hover:bg-gray-100 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="bg-[#FF7A00] rounded-full p-2 border border-black">
          <ArrowRight className="w-4 h-4 text-black" />
        </div>
        <span className="font-bold text-lg font-['VT323'] uppercase tracking-wide text-black">
          Connect us
        </span>
      </Link>
    </header>
  );
}