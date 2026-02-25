"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({
  mode,
  onToggle,
}: {
  mode: "carousel" | "regular";
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f3f3f3]/80 backdrop-blur-sm border-b-[3px] border-black">
      <div className="max-w-400 mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/">
          <div className="bg-white border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            <h1 className="text-sm font-black tracking-tight text-black leading-none uppercase">
              Jaime Alcaraz
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {isHome && mode === "regular" && (
            <>
              <a
                href="#projects"
                className="text-black text-[10px] font-bold uppercase tracking-widest hover:border-b-2 hover:border-black transition-all"
              >
                Projects
              </a>
              <a
                href="#about"
                className="text-black text-[10px] font-bold uppercase tracking-widest hover:border-b-2 hover:border-black transition-all"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-black text-[10px] font-bold uppercase tracking-widest hover:border-b-2 hover:border-black transition-all"
              >
                Contact
              </a>
            </>
          )}

          {isHome && (
            <button
              onClick={onToggle}
              className="bg-black text-white px-4 py-2 text-[10px] font-bold shadow-[4px_4px_0px_0px_#FF3E00] uppercase tracking-widest hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
            >
              {mode === "carousel"
                ? "Browse Projects \u2192"
                : "View Carousel \u2190"}
            </button>
          )}

          {!isHome && (
            <Link
              href="/"
              className="bg-white border-[3px] border-black text-black px-4 py-2 text-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-widest hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              &larr; Back
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
