"use client";

import { useTheme } from "@/app/theme/ThemeContext";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const { themeName } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--theme-bg-primary)" }}
      />
    );
  }

  const email = "jaime.alcarazc@gmail.com";
  const linkedin = "https://www.linkedin.com/in/jaime-alcaraz-castillo/";

  // --- TERMINAL ---
  if (themeName === "code") {
    return (
      <main
        className="min-h-screen pt-28 pb-20 px-6 font-mono transition-colors duration-500"
        style={{
          backgroundColor: "var(--theme-bg-primary)",
          color: "var(--theme-text-primary)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="border border-[var(--theme-border-color)]">
            <div className="bg-[var(--theme-border-color)] text-[var(--theme-bg-primary)] px-4 py-1 flex justify-between text-xs">
              <span>TERMINAL — CONTACT_MODULE</span>
              <span>SESSION: ACTIVE</span>
            </div>
            <div className="p-8 space-y-6">
              <div className="text-[var(--theme-accent)] text-2xl font-bold">
                {"> ESTABLISH_CONNECTION_"}
              </div>
              <div className="text-sm opacity-70 leading-relaxed">
                <p>{"// Available communication channels."}</p>
                <p>{"// Select a protocol to initiate contact."}</p>
              </div>

              <div className="space-y-4 pt-4">
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-4 p-4 border border-[var(--theme-border-color)] hover:border-[var(--theme-accent)] transition-colors"
                >
                  <span className="text-[var(--theme-accent)] text-xs opacity-50">
                    [01]
                  </span>
                  <span className="text-xs animate-pulse">$</span>
                  <div className="flex-grow">
                    <div className="text-sm font-bold">SEND_EMAIL.sh</div>
                    <div className="text-[10px] opacity-50 mt-1">
                      PROTOCOL: SMTP | ADDR: {email}
                    </div>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 text-[var(--theme-accent)] transition-opacity text-xs">
                    EXEC {">"}
                  </span>
                </a>

                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 border border-[var(--theme-border-color)] hover:border-[var(--theme-accent)] transition-colors"
                >
                  <span className="text-[var(--theme-accent)] text-xs opacity-50">
                    [02]
                  </span>
                  <span className="text-xs animate-pulse">$</span>
                  <div className="flex-grow">
                    <div className="text-sm font-bold">OPEN_LINKEDIN.sh</div>
                    <div className="text-[10px] opacity-50 mt-1">
                      PROTOCOL: HTTPS | NODE: linkedin.com/in/jaimealcaraz
                    </div>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 text-[var(--theme-accent)] transition-opacity text-xs">
                    EXEC {">"}
                  </span>
                </a>
              </div>

              <div className="pt-6 text-[10px] opacity-30">
                {">"} AWAITING_INPUT... <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // --- BRUTALIST / POP-ART ---
  if (themeName === "brutalist" || themeName === "pop-art") {
    return (
      <main
        className="min-h-screen pt-28 pb-20 px-6 transition-colors duration-500"
        style={{ backgroundColor: "var(--theme-bg-primary)" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <h1
            className="text-7xl md:text-[10rem] lg:text-[14rem] leading-[0.85] mb-16"
            style={{
              color: "var(--theme-text-primary)",
              fontFamily: "var(--theme-heading-font-family)",
              fontWeight: "var(--theme-heading-weight)",
              textTransform:
                "var(--theme-heading-transform)" as React.CSSProperties["textTransform"],
            }}
          >
            Say
            <br />
            Hello
          </h1>

          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href={`mailto:${email}`}
              className="group inline-block px-10 py-6 text-2xl font-black uppercase tracking-wider transition-transform hover:-translate-y-1"
              style={{
                backgroundColor: "var(--theme-accent)",
                color: "var(--theme-text-on-accent)",
                border:
                  "var(--theme-border-width) var(--theme-border-style) var(--theme-border-color)",
                boxShadow: "var(--theme-shadow-primary)",
              }}
            >
              Email Me
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block px-10 py-6 text-2xl font-black uppercase tracking-wider transition-transform hover:-translate-y-1"
              style={{
                backgroundColor: "var(--theme-bg-secondary)",
                color: "var(--theme-text-primary)",
                border:
                  "var(--theme-border-width) var(--theme-border-style) var(--theme-border-color)",
                boxShadow: "var(--theme-shadow-primary)",
              }}
            >
              LinkedIn
            </a>
          </div>

          <p
            className="mt-16 text-sm uppercase tracking-widest opacity-50"
            style={{ color: "var(--theme-text-primary)" }}
          >
            {email}
          </p>
        </div>
      </main>
    );
  }

  // --- REGULAR / MODERN ---
  return (
    <main
      className="min-h-screen pt-28 pb-20 px-6 transition-colors duration-500"
      style={{ backgroundColor: "var(--theme-bg-primary)" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h1
          className="text-5xl md:text-7xl font-light tracking-tighter mb-6"
          style={{ color: "var(--theme-text-primary)" }}
        >
          Get in touch
        </h1>
        <p
          className="text-lg mb-16 leading-relaxed"
          style={{ color: "var(--theme-text-secondary)" }}
        >
          Have a project in mind or just want to chat? I&apos;d love to hear
          from you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`mailto:${email}`}
            className="inline-flex h-14 items-center justify-center px-10 text-sm font-medium hover:scale-105 transition-transform"
            style={{
              backgroundColor: "var(--theme-accent)",
              color: "var(--theme-text-on-accent)",
              borderRadius: "var(--theme-border-radius)",
              boxShadow: "var(--theme-shadow-accent)",
            }}
          >
            Email Me
          </a>

          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center px-10 text-sm font-medium hover:scale-105 transition-transform"
            style={{
              backgroundColor: "var(--theme-bg-secondary)",
              color: "var(--theme-text-primary)",
              border:
                "var(--theme-border-width) var(--theme-border-style) var(--theme-border-color)",
              borderRadius: "var(--theme-border-radius)",
              boxShadow: "var(--theme-shadow-primary)",
            }}
          >
            LinkedIn
          </a>
        </div>

        <p
          className="mt-16 text-xs tracking-widest uppercase opacity-40"
          style={{ color: "var(--theme-text-primary)" }}
        >
          {email}
        </p>
      </div>
    </main>
  );
}
