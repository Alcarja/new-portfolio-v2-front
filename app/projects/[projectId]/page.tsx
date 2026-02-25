"use client";

import { useGetProjectById } from "@/app/adapters/hooks";
import { useTheme } from "@/app/theme/ThemeContext";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProjectPage = ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  // 1. Hooks always at the top
  const { projectId } = use(params);
  const { themeName } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: projectData, isLoading } = useGetProjectById(Number(projectId));

  // 2. Use a "Passive" Effect
  useEffect(() => {
    // A simple requestAnimationFrame ensures the initial render
    // is committed before we trigger the 'mounted' state.
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // 3. Process data
  const project = Array.isArray(projectData) ? projectData[0] : projectData;

  // 4. Combined condition to prevent multiple render passes
  // If we aren't mounted yet, we render a "null" or a static shell
  // that matches the server 100%.
  if (!mounted) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--theme-bg-primary)" }}
      />
    );
  }

  if (isLoading || !project) {
    return (
      <div
        className="min-h-screen flex items-center justify-center font-mono"
        style={{
          backgroundColor: "var(--theme-bg-primary)",
          color: "var(--theme-text-primary)",
        }}
      >
        {themeName === "code" ? "> INITIALIZING_STREAMS..." : "Loading..."}
      </div>
    );
  }

  // --- STYLE 1: CODE / TERMINAL ---
  if (themeName === "code") {
    return (
      <main
        className="min-h-screen p-4 mt-20 md:p-12 font-mono transition-colors duration-500"
        style={{
          backgroundColor: "var(--theme-bg-primary)",
          color: "var(--theme-text-primary)",
        }}
      >
        <div className="max-w-5xl mx-auto border border-[var(--theme-border-color)]">
          <div className="bg-[var(--theme-border-color)] text-[var(--theme-bg-primary)] px-4 py-1 flex justify-between text-xs">
            <span>
              FILE:{" "}
              {project?.name
                ? project?.name.toUpperCase().replace(/\s/g, "_")
                : "LOADING"}
              .MD
            </span>
            <span>TYPE: {project?.type}</span>
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4 text-[var(--theme-accent)]">
              {`> ${project?.name}_`}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b border-[var(--theme-border-color)] pb-8 border-dashed">
              <div className="space-y-2 text-xs">
                <p>
                  <span className="opacity-50">STAMP:</span> {project?.year}
                </p>
                <p>
                  <span className="opacity-50">LOC:</span>{" "}
                  <a
                    href={project?.url}
                    target="_blank"
                    className="underline hover:text-[var(--theme-accent)]"
                  >
                    {project?.url}
                  </a>
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm opacity-80 leading-relaxed">
                  System analysis of {project?.name}. This module utilizes a
                  stack of {project?.technology?.length} core dependencies to
                  deliver high-performance rendering.
                </p>
              </div>
            </div>

            <div className="relative aspect-video border border-[var(--theme-border-color)] grayscale sepia hue-rotate-[100deg] brightness-75 mb-8 overflow-hidden">
              <Image
                src={project?.imageUrl || "/placeholder.jpg"}
                alt={project?.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] pointer-events-none" />
            </div>

            <div className="flex flex-wrap gap-4">
              {project?.technology?.map((tech: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-2 border border-[var(--theme-border-color)] px-3 py-2"
                >
                  <div className="relative w-5 h-5">
                    <Image
                      src={tech}
                      alt="tech"
                      fill
                      className="object-contain invert brightness-200"
                    />
                  </div>
                  <span className="text-[10px]">DEP_0{i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // --- STYLE 2: BRUTALIST / POP-ART ---
  if (themeName === "brutalist" || themeName === "pop-art") {
    return (
      <main
        className="min-h-screen transition-colors duration-500"
        style={{ backgroundColor: "var(--theme-bg-primary)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-24">
          <header className="mb-12 relative">
            <h1
              className="text-7xl md:text-[10rem] lg:text-[12rem] leading-[0.8] mb-8"
              style={{
                color: "var(--theme-text-primary)",
                fontFamily: "var(--theme-heading-font-family)",
                textTransform: "var(--theme-heading-transform)",
                fontWeight: "var(--theme-heading-weight)",
              }}
            >
              {project?.name}
            </h1>
            <div className="inline-block bg-[var(--theme-accent)] text-[var(--theme-text-on-accent)] px-6 py-2 font-black rotate-2 border-4 border-black text-2xl shadow-[4px_4px_0px_#000]">
              {project?.year} &middot; {project?.type}
            </div>
          </header>

          <div
            className="relative border-[var(--theme-border-width)] border-solid border-[var(--theme-border-color)] bg-[var(--theme-bg-secondary)]"
            style={{ boxShadow: "var(--theme-shadow-primary)" }}
          >
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={project?.imageUrl || "/placeholder.jpg"}
                alt="alt"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-12">
              <div className="flex flex-wrap gap-8 mb-12">
                {project?.technology?.map((tech: string, i: number) => (
                  <div
                    key={i}
                    className="bg-white border-4 border-black shadow-[4px_4px_0px_#000]"
                  >
                    <div className="relative w-12 h-12">
                      <Image
                        src={tech}
                        alt="tech icon"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={project?.url}
                target="_blank"
                className="inline-block text-4xl font-black underline hover:text-[var(--theme-accent)] transition-colors"
              >
                VISIT_SITE →
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // --- STYLE 3: REGULAR (MODERN) ---
  return (
    <main
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: "var(--theme-bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="text-sm font-medium opacity-50 hover:opacity-100 transition-opacity mb-20 block text-[var(--theme-text-primary)]"
        >
          ← Back to works
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-6 text-[var(--theme-text-primary)]">
              {project?.name}
            </h1>
            <div className="flex gap-4 text-sm uppercase tracking-widest text-[var(--theme-text-secondary)] mb-12">
              <span>{project?.type}</span>
              <span>/</span>
              <span>{project?.year}</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {project?.technology?.map((tech: string, i: number) => (
                <div
                  key={i}
                  className="relative w-12 h-12 rounded-full bg-[var(--theme-bg-secondary)] flex items-center justify-center border border-[var(--theme-border-color)]"
                >
                  <div className="relative w-12 h-12">
                    <Image
                      src={tech}
                      alt="tech icon"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div
              className="rounded-2xl overflow-hidden relative aspect-[4/3]"
              style={{ boxShadow: "var(--theme-shadow-primary)" }}
            >
              <Image
                src={project?.imageUrl || "/placeholder.jpg"}
                alt={project?.name || "image"}
                fill
                className="object-cover"
              />
            </div>
            <a
              href={project?.url}
              target="_blank"
              className="inline-flex h-14 items-center justify-center px-10 rounded-full text-sm font-medium hover:scale-105 transition-transform"
              style={{
                backgroundColor: "var(--theme-accent)",
                color: "var(--theme-text-on-accent)",
              }}
            >
              Launch Project
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
