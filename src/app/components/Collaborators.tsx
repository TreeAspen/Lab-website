import { motion } from "motion/react";
import logoEmory from "../../assets/Emory.png";
import logoFAU from "../../assets/FAU.png";
import logoFSU from "../../assets/FSU.svg";
import logoFudan from "../../assets/Fudan.webp";
import logoGhana from "../../assets/Ghana.png";
import logoNYUGPH from "../../assets/NYU GPH.jpg";
import logoNYUTandon from "../../assets/NYU TANDON.jpg";
import logoSouthCarolina from "../../assets/South Carolina.svg";
import logoBerkeley from "../../assets/UC Berkeley.png";
import logoUF from "../../assets/UF.webp";

const partners = [
  { id: 1, name: "UF", src: logoUF },
  { id: 2, name: "NYU Tandon", src: logoNYUTandon },
  { id: 3, name: "NYU GPH", src: logoNYUGPH },
  { id: 4, name: "Emory", src: logoEmory },
  { id: 5, name: "UC Berkeley", src: logoBerkeley },
  { id: 6, name: "FSU", src: logoFSU },
  { id: 7, name: "FAU", src: logoFAU },
  { id: 8, name: "Fudan", src: logoFudan },
  { id: 9, name: "Ghana", src: logoGhana },
  { id: 10, name: "South Carolina", src: logoSouthCarolina },
];

export function Collaborators() {
  return (
    <section className="bg-white text-black py-20 px-4 md:px-12 relative border-t-4 border-black">
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
        <h2 className="font-['VT323'] text-5xl md:text-6xl uppercase tracking-widest text-black">
          Who We've Worked With
        </h2>
        <p className="font-mono text-xs uppercase text-gray-500 mt-4 max-w-2xl mx-auto">
          Academic and community partners across multiple institutions and regions
        </p>
      </div>

      <div className="relative z-10 w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="w-56 h-32 shrink-0 border-2 border-black rounded-lg flex flex-col items-center justify-center bg-transparent hover:bg-[#E2F16B]/30 transition-all group cursor-pointer p-4"
            >
              <img 
                src={partner.src} 
                alt={partner.name} 
                className="h-12 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 mb-3"
              />
              <span className="font-['VT323'] text-sm uppercase tracking-wider text-black/40 group-hover:text-black transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}