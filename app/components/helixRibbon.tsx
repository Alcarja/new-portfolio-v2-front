"use client";

import * as THREE from "three";
import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, Html, useTexture } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useGetAllProjects } from "../adapters/hooks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Project = Record<string, any>;

// --- COMPONENTS ---

function SubtlePopCard({
  project,
  radius,
  startAngle,
  yPos,
  width,
  height,
  yStepPerRad,
  onClick,
}: {
  project: Project;
  radius: number;
  startAngle: number;
  yPos: number;
  width: number;
  height: number;
  yStepPerRad: number;
  onClick: () => void;
}) {
  const [hovered, setHover] = useState(false);
  const groupRef = useRef<THREE.Group>(null!);

  const loadedTexture = useTexture("/Abisko-1.jpg") as THREE.Texture;
  const texture = useMemo(() => {
    const t = loadedTexture.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, [loadedTexture]);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, 48, 1);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const localAngle = x / radius;
      pos.setX(i, Math.sin(localAngle) * radius);
      pos.setZ(i, Math.cos(localAngle) * radius);
      pos.setY(i, pos.getY(i) + localAngle * yStepPerRad);
    }
    geo.computeVertexNormals();
    return geo;
  }, [width, height, radius, yStepPerRad]);

  useFrame(() => {
    if (!groupRef.current) return;
    const s = hovered ? 1.05 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  return (
    <group position={[0, yPos, 0]} rotation={[0, startAngle, 0]}>
      <group
        ref={groupRef}
        onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
        onPointerOut={() => setHover(false)}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {/* BLACK STROKE */}
        <mesh
          geometry={geometry}
          position={[0, 0, -0.02]}
          scale={[1.015, 1.015, 1]}
        >
          <meshBasicMaterial color="black" side={THREE.DoubleSide} />
        </mesh>

        {/* PROJECT IMAGE */}
        <mesh geometry={geometry}>
          <meshBasicMaterial
            map={texture}
            side={THREE.DoubleSide}
            polygonOffset
            polygonOffsetFactor={-4}
            polygonOffsetUnits={-4}
          />
        </mesh>
      </group>
    </group>
  );
}

function HelixScene({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const groupRef = useRef<THREE.Group>(null!);
  const scroll = useScroll();

  const radius = 6.0;
  const imgW = 2.2;
  const imgH = 3.5;
  const pitch = 3.8;
  const yStepPerRad = pitch / (Math.PI * 2);
  const angleStep = imgW / radius;
  const yStepPerImage = angleStep * yStepPerRad;

  useFrame(() => {
    if (!groupRef.current) return;
    const offset = scroll.offset;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      offset * Math.PI * 10,
      0.05,
    );
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, i) => (
        <SubtlePopCard
          key={project.id}
          project={project}
          radius={radius}
          width={imgW}
          height={imgH}
          yStepPerRad={yStepPerRad}
          startAngle={-i * angleStep}
          yPos={-i * yStepPerImage}
          onClick={() => router.push(`/projects/${project.id}`)}
        />
      ))}
    </group>
  );
}

export default function HelixRibbon({ onToggle }: { onToggle?: () => void }) {
  const { data: projectsData, isLoading } = useGetAllProjects();

  const projects: Project[] = useMemo(() => {
    if (!projectsData) return [];
    return [...projectsData, ...projectsData, ...projectsData];
  }, [projectsData]);

  return (
    <div className="h-screen w-full bg-[#f3f3f3] overflow-hidden font-sans">
      <div className="fixed inset-0 pointer-events-none z-10 p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="bg-white border-[3px] border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-2xl font-black tracking-tighter text-black leading-none uppercase">
              Jaime Alcaraz
            </h1>
          </div>
          <div className="text-black font-bold text-[10px] uppercase tracking-widest text-right leading-tight opacity-70">
            Selected Works <br /> 24 — 26
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="text-black font-black border-b-4 border-black pb-1 text-sm tracking-tighter uppercase">
            Scroll_Explore
          </div>
          <div className="flex items-end gap-3">
            {onToggle && (
              <button
                onClick={onToggle}
                className="pointer-events-auto bg-white border-[3px] border-black text-black px-5 py-2 text-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-widest hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
              >
                Browse Projects &rarr;
              </button>
            )}
            <div className="bg-black text-white px-5 py-2 text-[10px] font-bold shadow-[4px_4px_0px_0px_#FF3E00] uppercase tracking-widest">
              Get In Touch
            </div>
          </div>
        </div>
      </div>

      {/* Dot grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-1"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 28], fov: 22 }}
        gl={{ antialias: true, logarithmicDepthBuffer: true }}
      >
        <ambientLight intensity={1.5} />
        <fog attach="fog" args={["#f3f3f3", 25, 60]} />
        <Suspense
          fallback={
            <Html
              center
              className="text-black font-black text-xl uppercase tracking-tighter"
            >
              Loading Portfolio...
            </Html>
          }
        >
          <ScrollControls pages={6} damping={0.4}>
            <group position={[0, 1.8, 0]}>
              {projects.length > 0 ? (
                <HelixScene projects={projects} />
              ) : (
                <Html
                  center
                  className="text-black font-black text-xl uppercase tracking-tighter"
                >
                  {isLoading ? "Loading..." : "No projects found"}
                </Html>
              )}
            </group>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
