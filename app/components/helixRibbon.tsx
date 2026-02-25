"use client";

import * as THREE from "three";
import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, Html, useTexture } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useGetAllProjects } from "../adapters/hooks";
import { useTheme } from "../theme/ThemeContext";

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
  strokeColor,
  onClick,
}: {
  project: Project;
  radius: number;
  startAngle: number;
  yPos: number;
  width: number;
  height: number;
  yStepPerRad: number;
  strokeColor: string;
  onClick: () => void;
}) {
  const [hovered, setHover] = useState(false);
  const groupRef = useRef<THREE.Group>(null!);

  // Proxy remote images through API route to avoid CORS
  const textureUrl = useMemo(() => {
    const url = project?.imageUrl;
    if (!url) return "/Abisko-1.jpg";
    if (url.startsWith("/")) return url;
    return `/api/proxy-image?url=${encodeURIComponent(url)}`;
  }, [project?.imageUrl]);

  const loadedTexture = useTexture(textureUrl) as THREE.Texture;
  const texture = useMemo(() => {
    const t = loadedTexture.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.anisotropy = 16;
    t.generateMipmaps = true;
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
        {/* STROKE */}
        <mesh
          geometry={geometry}
          position={[0, 0, -0.02]}
          scale={[1.015, 1.015, 1]}
        >
          <meshBasicMaterial color={strokeColor} side={THREE.DoubleSide} />
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

function HelixScene({
  projects,
  strokeColor,
}: {
  projects: Project[];
  strokeColor: string;
}) {
  const router = useRouter();
  const groupRef = useRef<THREE.Group>(null!);
  const scroll = useScroll();

  const radius = 4.5;
  const imgW = 2.6;
  const imgH = 1.6;
  const pitch = 2.4;
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
          key={i}
          project={project}
          radius={radius}
          width={imgW}
          height={imgH}
          yStepPerRad={yStepPerRad}
          strokeColor={strokeColor}
          startAngle={-i * angleStep}
          yPos={-i * yStepPerImage}
          onClick={() => router.push(`/projects/${project.id}`)}
        />
      ))}
    </group>
  );
}

function ThemedFog({
  color,
  near,
  far,
}: {
  color: string;
  near: number;
  far: number;
}) {
  const fogRef = useRef<THREE.Fog>(null!);

  useEffect(() => {
    if (fogRef.current) {
      fogRef.current.color.set(color);
      fogRef.current.near = near;
      fogRef.current.far = far;
    }
  }, [color, near, far]);

  return <fog ref={fogRef} attach="fog" args={[color, near, far]} />;
}

export default function HelixRibbon() {
  const { data: projectsData, isLoading } = useGetAllProjects();
  const { theme } = useTheme();
  const { fogColor, meshStrokeColor, ambientIntensity, fogNear, fogFar } =
    theme.three;

  const projects: Project[] = useMemo(() => {
    if (!projectsData) return [];
    return [...projectsData, ...projectsData, ...projectsData];
  }, [projectsData]);

  return (
    <div
      className="h-screen w-full overflow-hidden font-sans"
      style={{ backgroundColor: "var(--theme-bg-primary)" }}
    >
      {/* Bottom overlay hints */}
      <div className="fixed inset-0 pointer-events-none z-10 p-10 flex flex-col justify-end">
        <div className="flex justify-between items-end">
          <div
            className="font-black pb-1 text-sm tracking-tighter"
            style={{
              color: "var(--theme-text-primary)",
              borderBottom: `4px solid var(--theme-border-color)`,
              textTransform:
                "var(--theme-heading-transform)" as React.CSSProperties["textTransform"],
            }}
          >
            Scroll_Explore
          </div>
          <div
            className="font-bold text-[10px] uppercase tracking-widest text-right leading-tight opacity-70"
            style={{ color: "var(--theme-text-primary)" }}
          >
            Selected Works <br /> 24 — 26
          </div>
        </div>
      </div>

      {/* Dot grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-1"
        style={{
          backgroundImage: `radial-gradient(circle, var(--theme-dot-color) 1px, transparent 1px)`,
          backgroundSize: `var(--theme-dot-size) var(--theme-dot-size)`,
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 28], fov: 22 }}
        dpr={[1, 2]}
        gl={{ antialias: true, logarithmicDepthBuffer: true }}
      >
        <ambientLight intensity={ambientIntensity} />
        <ThemedFog color={fogColor} near={fogNear} far={fogFar} />
        <Suspense
          fallback={
            <Html
              center
              className="font-black text-xl uppercase tracking-tighter"
              style={{ color: "var(--theme-text-primary)" }}
            >
              Loading Portfolio...
            </Html>
          }
        >
          <ScrollControls pages={6} damping={0.4}>
            <group position={[0, 1.8, 0]}>
              {projects.length > 0 ? (
                <HelixScene projects={projects} strokeColor={meshStrokeColor} />
              ) : (
                <Html
                  center
                  className="font-black text-xl uppercase tracking-tighter"
                  style={{ color: "var(--theme-text-primary)" }}
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
