import { MapPin, Mail, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer id="interest" className="bg-black text-white py-16 px-4 md:px-12 relative border-t-4 border-white">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Interest Form CTA */}
        <div className="text-center mb-16 pb-16 border-b border-gray-800">
          <h3 className="font-['VT323'] text-4xl md:text-5xl mb-4 text-[#E2F16B] uppercase tracking-wider">
            Interested in Joining?
          </h3>
          <p className="font-mono text-sm text-gray-400 max-w-xl mx-auto mb-8">
            We're always looking for talented researchers, designers, and engineers passionate about 
            urban technology. Fill out our interest form to get in touch.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-3 bg-[#FF7A00] text-black px-8 py-4 font-['VT323'] text-2xl uppercase tracking-wide border-2 border-[#FF7A00] hover:bg-transparent hover:text-[#FF7A00] transition-all"
          >
            <span>Interest Form</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-12 text-sm font-mono">
          <div className="flex flex-col gap-4">
            <h3 className="font-['VT323'] text-4xl mb-4 text-[#E2F16B]">U.TOP Lab</h3>
            
            <div className="flex items-center gap-2 group hover:text-[#E2F16B] transition-colors">
              <MapPin className="w-4 h-4" />
              <span>University of Florida, Gainesville, FL</span>
            </div>

            <div className="flex items-center gap-2 group hover:text-[#E2F16B] transition-colors">
              <Mail className="w-4 h-4" />
              <span>utop@ufl.edu</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-['VT323'] text-xl text-gray-400 uppercase tracking-wider">Research</span>
            <Link to="/highlights/urban" className="hover:text-[#E2F16B] transition-colors">Urban Sensing</Link>
            <Link to="/highlights/hci" className="hover:text-[#E2F16B] transition-colors">Urban HCI</Link>
            <Link to="/highlights/ai" className="hover:text-[#E2F16B] transition-colors">Urban AI</Link>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-['VT323'] text-xl text-gray-400 uppercase tracking-wider">Links</span>
            <a href="#news" className="hover:text-[#E2F16B] transition-colors">News</a>
            <a href="#work" className="hover:text-[#E2F16B] transition-colors">Projects</a>
            <a href="#" className="hover:text-[#E2F16B] transition-colors">Publications</a>
          </div>

          <div className="flex flex-col gap-4 text-right items-end">
            <div className="font-['VT323'] text-2xl tracking-tighter mb-4 text-[#E2F16B]">U.TOP | UF</div>
            <p className="text-gray-400 text-xs max-w-xs">
              Urban Technology, Observation & Practice — engineering the "utopia" of evidence-based, 
              human-centered, and participatory cities.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-600 font-mono">
        &copy; 2026 U.TOP Lab, University of Florida. All rights reserved.
      </div>
    </footer>
  );
}
