import { createHashRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { News } from "./components/News";
import { Highlights } from "./components/Highlights";
import { OurWork } from "./components/OurWork";
import { Achievements } from "./components/Achievements";
import { Collaborators } from "./components/Collaborators";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-[#F4F4EB] font-sans text-black selection:bg-[#FF7A00] selection:text-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <News />
      <Highlights />
      <OurWork />
      <Achievements />
      <Collaborators />
    </>
  );
}

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "*", Component: () => <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <h1 className="font-['VT323'] text-[12rem] leading-none text-[#FF7A00] drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] mb-4">
          404
        </h1>
        <div className="font-['VT323'] text-3xl mb-12 uppercase tracking-widest bg-black text-[#E2F16B] px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
          System Error /// Page Not Found
        </div>
        <p className="max-w-md text-lg mb-10 font-mono border-l-4 border-black pl-4 text-left mx-auto">
          The requested data sector could not be located in the grid. The coordinates may be invalid or the observation target has moved.
        </p>
        <a 
          href="#/"
          className="group relative inline-flex items-center gap-3 bg-black text-[#F4F4EB] px-8 py-4 font-['VT323'] text-2xl uppercase tracking-wide border-2 border-transparent hover:bg-[#E2F16B] hover:text-black hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <span>Return to Grid</span>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="square" 
            strokeLinejoin="miter"
            className="group-hover:translate-x-1 transition-transform"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </a>
      </div> },
    ],
  },
]);