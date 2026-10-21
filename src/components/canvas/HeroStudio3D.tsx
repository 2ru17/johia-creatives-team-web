"use client";

import React, { useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useCreativesStore } from "@/store/useCreativesStore";

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

// Stylized 3D DSLR Camera
function DslrCamera({ accent }: { accent: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.25;
    groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Camera Main Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 1.4, 1.0]} />
        <meshStandardMaterial color="#1E2024" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Grip Handle */}
      <mesh position={[0.9, -0.05, 0.2]}>
        <boxGeometry args={[0.5, 1.3, 0.8]} />
        <meshStandardMaterial color="#141518" roughness={0.8} />
      </mesh>

      {/* Viewfinder Prism */}
      <mesh position={[-0.1, 0.85, 0]}>
        <cylinderGeometry args={[0.45, 0.6, 0.45, 4]} />
        <meshStandardMaterial color="#1E2024" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Lens Barrel */}
      <mesh position={[-0.1, 0, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.9, 32]} />
        <meshStandardMaterial color="#121316" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Lens Glass Element */}
      <mesh position={[-0.1, 0, 1.32]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.06, 32]} />
        <meshPhysicalMaterial
          color={accent}
          roughness={0.1}
          metalness={0.2}
          transmission={0.6}
          ior={1.5}
        />
      </mesh>

      {/* Shutter Button with Accent Ring */}
      <mesh position={[0.75, 0.74, 0.3]}>
        <cylinderGeometry args={[0.14, 0.14, 0.12, 16]} />
        <meshStandardMaterial color="#FAF7F2" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.75, 0.71, 0.3]}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 16]} />
        <meshStandardMaterial color={accent} />
      </mesh>
    </group>
  );
}

// Stylized Floating Studio Paint Can
function StudioPaintCan({
  position,
  color,
  rotationSpeed = 0.5,
}: {
  position: [number, number, number];
  color: string;
  rotationSpeed?: number;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.01 * rotationSpeed;
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Can Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 1.1, 32]} />
        <meshStandardMaterial color="#FAF7F2" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Paint Swatch Label Stripe */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.56, 0.56, 0.45, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>

      {/* Metal Rim Tops */}
      <mesh position={[0, 0.56, 0]}>
        <cylinderGeometry args={[0.57, 0.57, 0.06, 32]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.56, 0]}>
        <cylinderGeometry args={[0.57, 0.57, 0.06, 32]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Stylized Floating Lego Brick
function LegoBrick({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <group position={position}>
      {/* Brick Main Block (2x2) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.6, 0.9]} />
        <meshStandardMaterial color={color} roughness={0.25} />
      </mesh>

      {/* 4 Studs */}
      {[
        [-0.22, 0.22],
        [0.22, 0.22],
        [-0.22, -0.22],
        [0.22, -0.22],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.35, z]}>
          <cylinderGeometry args={[0.13, 0.13, 0.14, 16]} />
          <meshStandardMaterial color={color} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

export function HeroStudio3D() {
  const mounted = useIsMounted();
  const activeAccent = useCreativesStore((state) => state.activeAccent);

  if (!mounted) {
    return (
      <div className="w-full h-[360px] sm:h-[480px] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#121316]/30 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-[360px] sm:h-[480px] relative pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.8}
          dampingFactor={0.05}
        />

        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2.0} castShadow />
        <directionalLight position={[-5, -4, -3]} intensity={0.8} color={activeAccent} />
        <pointLight position={[0, 2, 2]} intensity={1.5} color="#FAF7F2" />

        {/* Floating Center DSLR */}
        <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
          <DslrCamera accent={activeAccent} />
        </Float>

        {/* Orbiting Studio Paint Can Left */}
        <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
          <StudioPaintCan position={[-2.4, 0.6, -0.5]} color="#FF5A1F" rotationSpeed={0.8} />
        </Float>

        {/* Orbiting Studio Paint Can Right */}
        <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.0}>
          <StudioPaintCan position={[2.5, -0.4, -0.2]} color={activeAccent} rotationSpeed={-0.6} />
        </Float>

        {/* Floating Lego Design Bricks */}
        <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
          <LegoBrick position={[-1.8, -1.2, 0.5]} color="#FACC15" />
        </Float>
        <Float speed={1.9} rotationIntensity={1.0} floatIntensity={1.1}>
          <LegoBrick position={[1.9, 1.3, -0.8]} color="#2563EB" />
        </Float>
        <Float speed={2.1} rotationIntensity={1.1} floatIntensity={1.3}>
          <LegoBrick position={[0.2, -1.5, 0.8]} color="#EC4899" />
        </Float>
      </Canvas>
    </div>
  );
}
