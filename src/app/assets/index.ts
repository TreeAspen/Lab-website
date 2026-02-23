/**
 * Centralized Asset Registry
 * ===========================
 * All image/asset imports are managed here.
 */

// ─── Local Asset Imports (Hero) ──────────────────────────────
// Hero left model image
import heroModel1 from "../../assets/bf2bbc386da37f36888e2dc21afb70b3a90d7d2c.png";
// Hero right model image
import heroModel2 from "../../assets/9590c2dfe28eb9423b2f44a9db43749383ad3919.png";

// ─── Local Asset Imports (Highlights) ────────────────────────
// Highlights section VR/feature image
import highlightsVR from "../../assets/32757bc66e70df3e01c600e76b54870bd7951197.png";

// ─── Local Asset Imports (News) ──────────────────────────────
// News section feature image
import newsFeature from "../../assets/462c4020ca7808682a02f376453bb6a8df6becd9.png";

// ─── External Images (Unsplash) ──────────────────────────────
export const newsImages: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1574519618668-c34001efde43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc3MTc5NTY4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  2: "https://images.unsplash.com/photo-1585051256362-eb56bf4d5ea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neSUyMGNpcmN1aXQlMjBib2FyZHxlbnwxfHx8fDE3NzE3OTU2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  3: "https://images.unsplash.com/photo-1759078634211-cbe4201f26fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZXhwbyUyMGZ1dHVyaXN0aWMlMjBldmVudHxlbnwxfHx8fDE3NzE3OTU2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

// ─── Named Exports ──────────────────────────────────────────
export { heroModel1, heroModel2, highlightsVR, newsFeature };