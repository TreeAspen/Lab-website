/**
 * Centralized Asset Registry
 * ===========================
 */

// ─── 核心品牌与成员照片 ─────────────────────────────────────
import labLogo from "../../assets/lab_logo.png";
import avatarIsaiah from "../../assets/Isaiah_Garnett.jpg";
import avatarRuolin from "../../assets/Ruolin_Wu.jpg"; 
import avatarShu from "../../assets/Shu_Yang.jpg";     
import avatarSteven from "../../assets/Steven Shi.jpg"; 
import avatarVincent from "../../assets/Vincent Cao.png";

// ─── 原有的 Hero & Highlights 资源 ──────────────────────────
import heroModel1 from "../../assets/bf2bbc386da37f36888e2dc21afb70b3a90d7d2c.png";
import heroModel2 from "../../assets/9590c2dfe28eb9423b2f44a9db43749383ad3919.png";
import highlightsVR from "../../assets/32757bc66e70df3e01c600e76b54870bd7951197.png";
import newsFeature from "../../assets/462c4020ca7808682a02f376453bb6a8df6becd9.png";
import extraGeneralImg from "../../assets/c950c19e6f6dbbe70ea343f9deab02f7058e9770.png";

// ─── 新增的 Hero 模型资源 (Collaboration & Intelligence) ─────
import heroModel3 from "../../assets/collaboration.png";
import heroModel4 from "../../assets/intelligence.png";

// ─── 11 个高校 Logo ──────────────────────────────────────────
import logoEmory from "../../assets/Emory.png";
import logoFAU from "../../assets/FAU.png";
import logoFSU from "../../assets/FSU.svg";
import logoFudan from "../../assets/Fudan.webp";
import logoGhana from "../../assets/Ghana.png";
import logoNYUCUSP from "../../assets/NYU CUSP.png";
import logoNYUGPH from "../../assets/NYU GPH.jpg";
import logoNYUTandon from "../../assets/NYU TANDON.jpg";
import logoSouthCarolina from "../../assets/South Carolina.svg";
import logoBerkeley from "../../assets/UC Berkeley.png";
import logoUF from "../../assets/UF.webp";

import videoSegmentation from "../../assets/Segmentation.mp4";

// ─── 外部图片 (Unsplash) ────────────────────────────────────
export const newsImages: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1574519618668-c34001efde43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc3MTc5NTY4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  2: "https://images.unsplash.com/photo-1585051256362-eb56bf4d5ea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neSUyMGNpcmN1aXQlMjBib2FyZHxlbnwxfHx8fDE3NzE3OTU2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  3: "https://images.unsplash.com/photo-1759078634211-cbe4201f26fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZXhwbyUyMGZ1dHVyaXN0aWMlMjBldmVudHxlbnwxfHx8fDE3NzE3OTU2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

// ─── 统一导出 ──────────────────────────────────────────────
export { 
  labLogo,
  avatarIsaiah,
  avatarRuolin,
  avatarShu,
  avatarSteven,
  avatarVincent,
  heroModel1, 
  heroModel2,
  heroModel3, 
  heroModel4, 
  highlightsVR, 
  newsFeature,
  extraGeneralImg,
  logoEmory,
  logoFAU,
  logoFSU,
  logoFudan,
  logoGhana,
  logoNYUCUSP,
  logoNYUGPH,
  logoNYUTandon,
  logoSouthCarolina,
  logoBerkeley,
  logoUF,
  videoSegmentation,
};