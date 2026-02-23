import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-4 md:px-12 relative border-t-4 border-white">
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 text-sm font-mono">
        <div className="flex flex-col gap-4">
          <h3 className="font-['VT323'] text-4xl mb-4 text-[#faff71]">Contact Us</h3>
          
          <div className="flex items-center gap-2 group hover:text-[#faff71] transition-colors">
            <MapPin className="w-4 h-4" />
            <span>123 Technology Park, Floor 4, New York, NY 10001</span>
          </div>

          <div className="flex items-center gap-2 group hover:text-[#faff71] transition-colors">
            <Phone className="w-4 h-4" />
            <span>+1 (212) 555-0123</span>
          </div>

          <div className="flex items-center gap-2 group hover:text-[#faff71] transition-colors">
            <Mail className="w-4 h-4" />
            <span>hello@utop.tech</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-right items-end">
          <div className="font-bold text-2xl tracking-tighter mb-4 text-[#faff71]">U.TOP</div>
          <p className="text-gray-400 text-xs max-w-xs">
            Urban Technology, Observation & Practice is a research lab dedicated to exploring the intersection of technology and urban environments.
          </p>
          <div className="flex gap-4 mt-4">
             {/* Social Icons Placeholder */}
             <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#faff71] hover:text-black transition-colors flex items-center justify-center cursor-pointer">X</div>
             <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#faff71] hover:text-black transition-colors flex items-center justify-center cursor-pointer">In</div>
             <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#faff71] hover:text-black transition-colors flex items-center justify-center cursor-pointer">Ig</div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
        © 2026 U.TOP. All rights reserved.
      </div>
    </footer>
  );
}
