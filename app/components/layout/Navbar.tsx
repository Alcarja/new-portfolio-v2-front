"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../theme/ThemeContext";
import { themes, type ThemeName } from "../../theme/themes";

export default function Navbar({
  mode,
  onToggle,
}: {
  mode: "carousel" | "regular";
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { themeName, setTheme } = useTheme();
  const themeNames = Object.keys(themes) as ThemeName[];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when tapping outside
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        backgroundColor: `color-mix(in srgb, var(--theme-bg-navbar) 85%, transparent)`,
        borderBottom: `var(--theme-border-width) var(--theme-border-style) var(--theme-border-color)`,
        backdropFilter: "var(--theme-navbar-blur)",
        fontFamily: "var(--theme-font-family)",
      }}
    >
      <div className="max-w-400 mx-auto px-3 md:px-4 py-2 flex justify-between items-center gap-2">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <div
            className="p-1.5 md:p-2 transition-all duration-300"
            style={{
              backgroundColor: "var(--theme-bg-secondary)",
              border: `var(--theme-border-width) var(--theme-border-style) var(--theme-border-color)`,
              boxShadow: "var(--theme-shadow-primary)",
              borderRadius: "var(--theme-border-radius)",
            }}
          >
            <h1
              className="text-xs md:text-sm leading-none whitespace-nowrap"
              style={{
                color: "var(--theme-text-primary)",
                textTransform:
                  "var(--theme-heading-transform)" as React.CSSProperties["textTransform"],
                fontWeight: "var(--theme-heading-weight)",
                fontStyle: "var(--theme-heading-style)",
                fontFamily: "var(--theme-heading-font-family)",
                letterSpacing: "var(--theme-letter-spacing)",
              }}
            >
              Jaime Alcaraz
            </h1>
          </div>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-1.5 md:gap-3">
          {/* Theme switcher — desktop: inline buttons */}
          <div className="hidden md:flex items-center gap-1">
            {themeNames.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className="px-2 py-1 text-[9px] font-bold uppercase tracking-widest cursor-pointer transition-[border,border-radius] duration-300"
                style={{
                  border: `var(--theme-border-width) var(--theme-border-style) var(--theme-border-color)`,
                  borderRadius: "var(--theme-border-radius)",
                  backgroundColor:
                    themeName === t
                      ? "var(--theme-accent)"
                      : "var(--theme-bg-secondary)",
                  color:
                    themeName === t
                      ? "var(--theme-text-on-accent)"
                      : "var(--theme-text-primary)",
                }}
              >
                {themes[t].label}
              </button>
            ))}
          </div>

          {/* Theme switcher — mobile: dropdown */}
          <div className="relative md:hidden" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="px-2 py-1 text-[9px] font-bold uppercase tracking-widest cursor-pointer"
              style={{
                border: `var(--theme-border-width) var(--theme-border-style) var(--theme-border-color)`,
                borderRadius: "var(--theme-border-radius)",
                backgroundColor: "var(--theme-accent)",
                color: "var(--theme-text-on-accent)",
              }}
            >
              {themes[themeName].label} ▾
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-full mt-2 flex flex-col gap-1 p-2 z-50 min-w-28"
                style={{
                  backgroundColor: "var(--theme-bg-secondary)",
                  border: `var(--theme-border-width) var(--theme-border-style) var(--theme-border-color)`,
                  borderRadius: "var(--theme-border-radius)",
                  boxShadow: "var(--theme-shadow-primary)",
                }}
              >
                {themeNames.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTheme(t);
                      setMenuOpen(false);
                    }}
                    className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest cursor-pointer text-left"
                    style={{
                      borderRadius: "var(--theme-border-radius)",
                      backgroundColor:
                        themeName === t
                          ? "var(--theme-accent)"
                          : "transparent",
                      color:
                        themeName === t
                          ? "var(--theme-text-on-accent)"
                          : "var(--theme-text-primary)",
                    }}
                  >
                    {themes[t].label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Contact — always visible */}
          <a
            href="/contact"
            className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all"
            style={{ color: "var(--theme-text-primary)" }}
          >
            Contact
          </a>

          {/* Mode toggle (home only) */}
          {isHome && (
            <button
              onClick={onToggle}
              className="px-2 py-1.5 md:px-4 md:py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer whitespace-nowrap"
              style={{
                backgroundColor: "var(--theme-accent)",
                color: "var(--theme-text-on-accent)",
                boxShadow: "var(--theme-shadow-accent)",
                borderRadius: "var(--theme-border-radius)",
              }}
            >
              <span className="hidden sm:inline">
                {mode === "carousel"
                  ? "Browse Projects \u2192"
                  : "View Carousel \u2190"}
              </span>
              <span className="sm:hidden">
                {mode === "carousel" ? "Projects" : "Carousel"}
              </span>
            </button>
          )}

          {/* Back button (non-home pages) */}
          {!isHome && (
            <Link
              href="/"
              className="px-2 py-1.5 md:px-4 md:py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
              style={{
                backgroundColor: "var(--theme-bg-secondary)",
                border: `var(--theme-border-width) var(--theme-border-style) var(--theme-border-color)`,
                color: "var(--theme-text-primary)",
                boxShadow: "var(--theme-shadow-primary)",
                borderRadius: "var(--theme-border-radius)",
              }}
            >
              &larr; Back
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
