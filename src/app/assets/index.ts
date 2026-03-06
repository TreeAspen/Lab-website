/**
 * Centralized Asset Registry
 * ===========================
 */

// ─── 原有的 Hero & Highlights 资源 ──────────────────────────
import heroModel1 from "../../assets/bf2bbc386da37f36888e2dc21afb70b3a90d7d2c.png";
import heroModel2 from "../../assets/9590c2dfe28eb9423b2f44a9db43749383ad3919.png";
import highlightsVR from "../../assets/32757bc66e70df3e01c600e76b54870bd7951197.png";
import newsFeature from "../../assets/462c4020ca7808682a02f376453bb6a8df6becd9.png";

// ─── 新增：10 个高校 Logo ────────────────────────────────────
// 注意：确保文件名和后缀（png/svg/webp）与你文件夹里的一致
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

// ─── 外部图片 (Unsplash) ──────────────────────────────────
export const newsImages: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1574519618668-c34001efde43?...",
  2: "https://images.unsplash.com/photo-1585051256362-eb56bf4d5ea3?...",
  3: "https://images.unsplash.com/photo-1759078634211-cbe4201f26fc?...",
};

// ─── 统一导出 ──────────────────────────────────────────────
export { 
  heroModel1, 
  heroModel2, 
  highlightsVR, 
  newsFeature,
  // 导出新增的 Logo
  logoEmory,
  logoFAU,
  logoFSU,
  logoFudan,
  logoGhana,
  logoNYUGPH,
  logoNYUTandon,
  logoSouthCarolina,
  logoBerkeley,
  logoUF
};