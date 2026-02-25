"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
      <div className="max-w-400 mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/">
          <div
            className="p-2 transition-all duration-300"
            style={{
              backgroundColor: "var(--theme-bg-secondary)",
              border: `var(--theme-border-width) var(--theme-border-style) var(--theme-border-color)`,
              boxShadow: "var(--theme-shadow-primary)",
              borderRadius: "var(--theme-border-radius)",
            }}
          >
            <h1
              className="text-sm leading-none"
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

        <div className="flex items-center gap-4">
          {/* Theme switcher */}
          <div className="flex items-center gap-1">
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

          <>
            <a
              href="/contact"
              className="text-[10px] font-bold uppercase tracking-widest transition-all"
              style={{ color: "var(--theme-text-primary)" }}
            >
              Contact
            </a>
          </>

          {isHome && (
            <button
              onClick={onToggle}
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: "var(--theme-accent)",
                color: "var(--theme-text-on-accent)",
                boxShadow: "var(--theme-shadow-accent)",
                borderRadius: "var(--theme-border-radius)",
              }}
            >
              {mode === "carousel"
                ? "Browse Projects \u2192"
                : "View Carousel \u2190"}
            </button>
          )}

          {!isHome && (
            <Link
              href="/"
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
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
