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

// 👇 给两个 JPG 格式的 NYU Logo 单独加上 needsBlend: true 标记，其他保持原样
const partners = [
  { id: 1, name: "University of Florida", src: logoUF },
  { id: 2, name: "NYU Tandon School of Engineering", src: logoNYUTandon, needsBlend: true },
  { id: 3, name: "NYU School of Global Public Health", src: logoNYUGPH, needsBlend: true },
  { id: 4, name: "Emory University", src: logoEmory },
  { id: 5, name: "University of California, Berkeley", src: logoBerkeley },
  { id: 6, name: "Florida State University", src: logoFSU },
  { id: 7, name: "Florida Atlantic University", src: logoFAU },
  { id: 8, name: "Fudan University", src: logoFudan },
  { id: 9, name: "University of Ghana", src: logoGhana },
  { id: 10, name: "University of South Carolina", src: logoSouthCarolina },
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
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="w-64 h-32 shrink-0 border-2 border-black rounded-lg flex flex-col items-center justify-center bg-transparent hover:bg-[#E2F16B]/30 transition-all group cursor-pointer p-4"
            >
              <img 
                src={partner.src} 
                alt={partner.name} 
                /* 👇 核心修改：只有带有 needsBlend 标记的图片，才会加上 mix-blend-multiply 去除白底 */
                className={`h-10 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 mb-2 ${
                  partner.needsBlend ? 'mix-blend-multiply' : ''
                }`}
              />
              <span className="font-['VT323'] text-sm text-center uppercase tracking-wider text-black/40 group-hover:text-black transition-colors leading-tight px-2">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}