/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useGetAllProjects } from "../adapters/hooks";
import { ThemeName } from "../theme/themes";

type Project = Record<string, any>;

export default function RegularPortfolio({
  activeTheme,
}: {
  activeTheme: ThemeName;
}) {
  const { data: projects = [], isLoading } = useGetAllProjects();

  // Check if we are in the terminal/code mode
  const isCodeMode = activeTheme === "code";

  return (
    <div
      className="min-h-screen pt-16 transition-colors duration-500"
      style={{
        backgroundColor: "var(--theme-bg-primary)",
        fontFamily: "var(--theme-font-family)",
      }}
    >
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "var(--theme-bg-pattern)",
          backgroundSize: "var(--theme-bg-pattern-size)",
        }}
      />

      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 relative z-10">
        <header className="mb-16">
          <h2
            className="text-3xl md:text-5xl tracking-tight leading-none"
            style={{
              color: "var(--theme-text-primary)",
              fontWeight: "var(--theme-heading-weight)",
              fontFamily: "var(--theme-heading-font-family)",
              fontStyle: "var(--theme-heading-style)",
              textTransform: "var(--theme-heading-transform)" as any,
            }}
          >
            {isCodeMode ? "SRC/PROJECTS/" : "Projects"}
          </h2>
          {!isCodeMode && (
            <p
              className="text-sm mt-3"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              A selection of recent work
            </p>
          )}
        </header>

        {isLoading ? (
          <div
            className="text-center py-20 text-sm"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            {isCodeMode ? "INITIALIZING_SYSTEM_SCAN..." : "Loading..."}
          </div>
        ) : (
          <div
            className={
              isCodeMode
                ? "flex flex-col border-t border-(--theme-border-color)"
                : "grid grid-cols-1 md:grid-cols-2 gap-6"
            }
          >
            {projects.map((project: any, i: number) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                theme={activeTheme}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  theme,
}: {
  project: Project;
  index: number;
  theme: ThemeName;
}) {
  // 1. TERMINAL / CODE STYLE: Fixed-width, technical window look
  if (theme === "code") {
    return (
      <Link href={`/projects/${project.id}`} className="block w-full">
        <motion.div
          whileHover={{ x: 16, backgroundColor: "rgba(0, 255, 65, 0.05)" }}
          className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 p-4 border-l-2 border-transparent transition-all"
          style={{
            borderBottom: "1px solid var(--theme-border-color)",
            fontFamily: "var(--theme-heading-font-family)", // Assuming Fira Code/Mono
          }}
        >
          {/* 1. Terminal Prompt & ID */}
          <div className="flex items-center gap-3 min-w-[120px]">
            <span className="text-[var(--theme-accent)] opacity-50 font-mono text-xs">
              [{index.toString().padStart(2, "0")}]
            </span>
            <span className="text-[var(--theme-text-primary)] font-mono text-xs animate-pulse">
              $
            </span>
          </div>

          {/* 2. Minified Image Preview (The "Buffer" preview) */}
          <div className="relative w-24 h-14 overflow-hidden border border-(--theme-border-color) hidden sm:block">
            <Image
              src={project.imageUrl || "/Abisko-1.jpg"}
              alt={project.name}
              fill
              className="object-cover grayscale sepia hue-rotate-[100deg] brightness-50 group-hover:grayscale-0 group-hover:hue-rotate-0 group-hover:brightness-100 transition-all duration-500"
            />
            {/* Scanline overlay for the image specifically */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_2px] pointer-events-none" />
          </div>

          {/* 3. Main Data Content */}
          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div>
              <h3 className="text-[var(--theme-text-primary)] text-sm font-bold tracking-tight">
                {project.name.toUpperCase().replace(/\s+/g, "_")}.sh
              </h3>
              <p className="text-[10px] text-[var(--theme-text-secondary)] opacity-70 font-mono">
                ls --type={project.type.toLowerCase()}
              </p>
            </div>

            <div className="hidden md:flex flex-col justify-center">
              <div className="text-[10px] text-[var(--theme-text-secondary)] font-mono">
                <span className="text-[var(--theme-accent)]">YEAR:</span>{" "}
                {project.year}
              </div>
              <div className="text-[10px] text-[var(--theme-text-secondary)] font-mono">
                <span className="text-[var(--theme-accent)]">AUTH:</span>{" "}
                JAIME_ALCARAZ
              </div>
            </div>

            {/* 4. Tech Stack as "Arguments" */}
            <div className="flex items-center gap-2 overflow-hidden">
              {project.technology.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="text-[9px] px-1.5 py-0.5 border border-[var(--theme-text-secondary)] text-[var(--theme-text-secondary)] group-hover:border-[var(--theme-accent)] group-hover:text-[var(--theme-accent)] transition-colors"
                >
                  --{tech.split("/").pop()?.split(".")[0] || "dep"}
                </span>
              ))}
            </div>
          </div>

          {/* 5. The "Execution" Arrow (only visible on hover) */}
          <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--theme-accent)] font-mono hidden md:block">
            RUN_PROG {">"}
          </div>
        </motion.div>
      </Link>
    );
  }

  // 2. BRUTALIST / POP-ART STYLE: Heavy shadows, aggressive tilt, "Sticker" tag
  if (theme === "brutalist" || theme === "pop-art") {
    return (
      <Link href={`/projects/${project.id}`}>
        <motion.div
          style={{
            transform: "var(--theme-card-rotation)",
            border:
              "var(--theme-border-width) var(--theme-border-style) var(--theme-border-color)",
            backgroundColor: "var(--theme-bg-secondary)",
            boxShadow: "var(--theme-shadow-primary)",
          }}
          whileHover={{
            transform: "rotate(0deg) scale(1.02)",
            boxShadow: "var(--theme-shadow-accent)",
          }}
          className="relative p-2 h-full flex flex-col"
        >
          <div className="relative aspect-square border-2 border-black overflow-hidden mb-4">
            <Image
              src={project.imageUrl || "/Abisko-1.jpg"}
              alt={project.name}
              fill
              className="object-cover"
            />
            <div
              className="absolute -top-1 -left-1 bg-[var(--theme-accent)] text-[var(--theme-text-on-accent)] px-4 py-2 font-black italic border-2 border-black -rotate-12"
              style={{ fontFamily: "var(--theme-heading-font-family)" }}
            >
              #{index + 1}
            </div>
          </div>
          <div className="p-4 pt-0">
            <h3
              className="text-3xl leading-none mb-4"
              style={{
                fontFamily: "var(--theme-heading-font-family)",
                fontWeight: "var(--theme-heading-weight)",
                textTransform: "var(--theme-heading-transform)",
              }}
            >
              {project.name}
            </h3>
            <p className="text-xs font-bold underline mb-2 uppercase">
              {project.type}
            </p>
          </div>
        </motion.div>
      </Link>
    );
  }

  // 3. MINIMAL / MODERN STYLE — rounded cards
  return (
    <Link href={`/projects/${project.id}`} className="block w-full">
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        className="group cursor-pointer rounded-2xl overflow-hidden bg-(--theme-bg-secondary) transition-shadow duration-300 hover:shadow-lg"
      >
        {/* Image */}
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={project.imageUrl || "/Abisko-1.jpg"}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[11px] tracking-wide"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              {project.type}
            </span>
            <span
              className="text-[11px] tabular-nums"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              {project.year}
            </span>
          </div>
          <h3
            className="text-lg leading-snug tracking-tight"
            style={{
              color: "var(--theme-text-primary)",
              fontWeight: "var(--theme-heading-weight)",
              fontFamily: "var(--theme-heading-font-family)",
            }}
          >
            {project.name}
          </h3>

          {/* Tech icons */}
          <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-(--theme-border-color)">
            {project.technology.slice(0, 5).map((tech: string, i: number) => (
              <div
                key={i}
                className="w-4 h-4 opacity-35 group-hover:opacity-80 transition-opacity duration-300"
              >
                <Image src={tech} alt="tech" width={16} height={16} />
              </div>
            ))}
            {project.technology.length > 5 && (
              <span
                className="text-[10px]"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                +{project.technology.length - 5}
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
