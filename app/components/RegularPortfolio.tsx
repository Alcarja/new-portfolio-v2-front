"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type ApiProject } from "../data/projects";
import { useGetAllProjects } from "../adapters/hooks";

export default function RegularPortfolio({
  onToggle,
}: {
  onToggle?: () => void;
}) {
  const { data: projects = [], isLoading } = useGetAllProjects();

  return (
    <div className="min-h-screen bg-[#f3f3f3] font-sans">
      {/* Dot grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-1"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#f3f3f3]/80 backdrop-blur-sm border-b-[3px] border-black">
        <div className="max-w-400 mx-auto px-6 py-4 flex justify-between items-center">
          <div className="bg-white border-[3px] border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-base font-black tracking-tight text-black leading-none uppercase">
              Jaime Alcaraz
            </h1>
          </div>
          <nav className="flex items-center gap-4">
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
            {onToggle && (
              <button
                onClick={onToggle}
                className="bg-black text-white px-4 py-2 text-[10px] font-bold shadow-[4px_4px_0px_0px_#FF3E00] uppercase tracking-widest hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
              >
                View Carousel &larr;
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Projects */}
      <section id="projects" className="max-w-350 mx-auto px-6 pt-16 pb-24">
        <div className="mb-12">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black uppercase leading-none">
            Selected
            <br />
            Works
          </h2>
          <div className="mt-4 w-24 h-1 bg-black" />
        </div>

        {isLoading ? (
          <p className="text-black font-black text-xl uppercase tracking-tighter">
            Loading...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project: ApiProject, i: number) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.1 }}
                  className="group bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all overflow-hidden cursor-pointer"
                >
                  <div className="relative aspect-4/3 overflow-hidden border-b-[3px] border-black">
                    <Image
                      src={"/Abisko-1.jpg"}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black text-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black tracking-tighter text-black uppercase">
                      {project.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black/50">
                      <span>{project.type}</span>
                      <span>&middot;</span>
                      <span>{project.year}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technology.map((iconUrl: string, ti: number) => (
                        <Image
                          key={ti}
                          src={iconUrl}
                          alt="tech"
                          width={20}
                          height={20}
                          className="rounded-sm"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* About */}
      <section id="about" className="border-t-[3px] border-black bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black uppercase leading-none mb-12">
            About
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg leading-relaxed text-black/80">
                I&apos;m a developer and designer who builds clean, performant
                web experiences. I care about the details — from pixel-perfect
                layouts to buttery-smooth interactions.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-black/80">
                Currently focused on full-stack development with React, Next.js,
                and Three.js. Always exploring the intersection of design and
                engineering.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-2">
                  Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Three.js",
                    "Node.js",
                    "Tailwind",
                    "PostgreSQL",
                    "Docker",
                  ].map((t) => (
                    <span
                      key={t}
                      className="border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-widest"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t-[3px] border-black">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black uppercase leading-none mb-12">
            Get In
            <br />
            Touch
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:hello@jaimealcaraz.com"
              className="inline-block bg-black text-white px-8 py-4 text-sm font-bold shadow-[6px_6px_0px_0px_#FF3E00] uppercase tracking-widest hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all"
            >
              Email Me
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white border-[3px] border-black text-black px-8 py-4 text-sm font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] uppercase tracking-widest hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white border-[3px] border-black text-black px-8 py-4 text-sm font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] uppercase tracking-widest hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-[3px] border-black bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
            Jaime Alcaraz &copy; 2026
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
            Built with Next.js + Three.js
          </span>
        </div>
      </footer>
    </div>
  );
}
