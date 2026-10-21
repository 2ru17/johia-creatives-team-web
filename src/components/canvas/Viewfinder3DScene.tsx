"use client";

import React, { useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { CameraAngle } from "@/store/useCreativesStore";

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

// Lightweight Floating Sparkle (Zero THREE.Clock dependency)
function FloatingSparkle({
  position,
  color,
  size = 0.08,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const timeRef = useRef(0);
  const initialY = position[1];

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.2;
      meshRef.current.rotation.x += delta * 0.8;
      meshRef.current.position.y = initialY + Math.sin(timeRef.current * 1.5) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[size]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
    </mesh>
  );
}

// 3D Stage Microphone on Boom Stand
function Microphone({ accent }: { accent: string }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Heavy Base */}
      <mesh position={[0, 0.025, 0]}>
        <cylinderGeometry args={[0.26, 0.28, 0.05, 32]} />
        <meshStandardMaterial color="#374151" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Vertical Chrome Shaft */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.25, 16]} />
        <meshStandardMaterial color="#E5E7EB" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* Boom Arm Clutch Joint */}
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color={accent} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Angled Boom Arm & Mic Capsule */}
      <group position={[0, 1.25, 0]} rotation={[0, 0, -0.42]}>
        <mesh position={[0.34, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.014, 0.014, 0.68, 16]} />
          <meshStandardMaterial color="#F3F4F6" roughness={0.15} metalness={0.95} />
        </mesh>

        {/* Mic Clip */}
        <mesh position={[0.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.024, 0.08, 16]} />
          <meshStandardMaterial color="#4B5563" roughness={0.4} />
        </mesh>

        {/* Mic Grill / Capsule (Brighter Silver Chrome) */}
        <mesh position={[0.68, 0, 0]}>
          <sphereGeometry args={[0.05, 24, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.98} />
        </mesh>
      </group>
    </group>
  );
}

// 3D Acoustic / Worship Guitar on Stand
function WorshipGuitar({ accent }: { accent: string }) {
  return (
    <group position={[0.9, 0, 0.3]} rotation={[0, -0.5, 0]}>
      {/* Guitar Stand Base */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.22, 0.25, 0.06, 16]} />
        <meshStandardMaterial color="#4B5563" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.45, -0.05]}>
        <cylinderGeometry args={[0.02, 0.02, 0.9, 16]} />
        <meshStandardMaterial color="#9CA3AF" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Guitar Lower Body */}
      <group position={[0, 0.45, 0.08]} rotation={[0.18, 0, 0]}>
        {/* Main Body (Warm Mahogany) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.62, 0.75, 0.16]} />
          <meshStandardMaterial color="#9A3412" roughness={0.25} metalness={0.15} />
        </mesh>

        {/* Top Soundboard (Luminous Golden Spruce) */}
        <mesh position={[0, 0, 0.085]}>
          <planeGeometry args={[0.56, 0.7]} />
          <meshStandardMaterial color="#F59E0B" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Sound Hole Rosette Ring */}
        <mesh position={[0, 0.1, 0.088]}>
          <ringGeometry args={[0.1, 0.13, 32]} />
          <meshStandardMaterial color="#FEF3C7" roughness={0.3} />
        </mesh>

        {/* Sound Hole */}
        <mesh position={[0, 0.1, 0.09]}>
          <cylinderGeometry args={[0.095, 0.095, 0.01, 24]} />
          <meshStandardMaterial color="#18181B" roughness={0.9} />
        </mesh>

        {/* Bridge */}
        <mesh position={[0, -0.18, 0.09]}>
          <boxGeometry args={[0.22, 0.05, 0.02]} />
          <meshStandardMaterial color="#451A03" roughness={0.7} />
        </mesh>

        {/* Fretboard / Neck */}
        <mesh position={[0, 0.65, 0.06]}>
          <boxGeometry args={[0.09, 0.75, 0.04]} />
          <meshStandardMaterial color="#44403C" roughness={0.35} />
        </mesh>

        {/* Headstock */}
        <mesh position={[0, 1.08, 0.06]}>
          <boxGeometry args={[0.12, 0.18, 0.035]} />
          <meshStandardMaterial color="#9A3412" roughness={0.3} />
        </mesh>

        {/* Tuner Pegs (Gold Sparkle) */}
        {[-0.07, 0.07].map((x, xi) =>
          [0.02, 0.06, 0.1].map((y, yi) => (
            <mesh key={`${xi}-${yi}`} position={[x, 1.02 + y, 0.06]}>
              <cylinderGeometry args={[0.015, 0.015, 0.03, 8]} />
              <meshStandardMaterial color="#FDE047" roughness={0.1} metalness={0.95} />
            </mesh>
          ))
        )}
      </group>
    </group>
  );
}

// 3D Keyboard on X-Stand
function StageKeyboard({ accent }: { accent: string }) {
  return (
    <group position={[-1.0, 0, 0.2]} rotation={[0, 0.45, 0]}>
      {/* X Stand Legs */}
      <group position={[0, 0.4, 0]}>
        <mesh rotation={[0, 0, 0.6]}>
          <boxGeometry args={[0.035, 0.95, 0.035]} />
          <meshStandardMaterial color="#64748B" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh rotation={[0, 0, -0.6]}>
          <boxGeometry args={[0.035, 0.95, 0.035]} />
          <meshStandardMaterial color="#64748B" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Keyboard Body Chassis */}
      <mesh position={[0, 0.78, 0]}>
        <boxGeometry args={[1.05, 0.1, 0.38]} />
        <meshStandardMaterial color="#334155" roughness={0.35} metalness={0.6} />
      </mesh>

      {/* Synth Display Screen with Backlight */}
      <mesh position={[0, 0.835, -0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.32, 0.07]} />
        <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={1.5} />
      </mesh>

      {/* White Keybed */}
      <mesh position={[0, 0.832, 0.07]}>
        <boxGeometry args={[0.92, 0.018, 0.16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} />
      </mesh>

      {/* Black Keys */}
      {[-0.38, -0.3, -0.22, -0.1, -0.02, 0.1, 0.18, 0.26, 0.38].map((x, i) => (
        <mesh key={i} position={[x, 0.844, 0.04]}>
          <boxGeometry args={[0.024, 0.022, 0.09]} />
          <meshStandardMaterial color="#111827" roughness={0.3} />
        </mesh>
      ))}

      {/* Pitch Bend / Mod Wheels */}
      <mesh position={[-0.46, 0.84, 0.06]}>
        <boxGeometry args={[0.03, 0.03, 0.08]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.0} />
      </mesh>
    </group>
  );
}

// 3D Stage Floor & Backdrop Panels
function StageEnvironment({ accent }: { accent: string }) {
  return (
    <group>
      {/* Stage Platform with Refined Ebony Wood */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <boxGeometry args={[7.2, 0.3, 5.2]} />
        <meshStandardMaterial color="#252936" roughness={0.35} metalness={0.2} />
      </mesh>

      {/* Stage Front Neon Glow Strip */}
      <mesh position={[0, -0.02, 2.61]}>
        <boxGeometry args={[7.1, 0.05, 0.02]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2.2} />
      </mesh>

      {/* Stage Backdrop Wall */}
      <mesh position={[0, 1.8, -2.1]}>
        <boxGeometry args={[7.2, 3.8, 0.1]} />
        <meshStandardMaterial color="#1E222D" roughness={0.65} />
      </mesh>

      {/* Warm LED Halo Strip along Top of Backdrop */}
      <mesh position={[0, 3.5, -2.04]}>
        <boxGeometry args={[6.8, 0.06, 0.02]} />
        <meshStandardMaterial color="#FDE047" emissive="#FDE047" emissiveIntensity={2.5} />
      </mesh>

      {/* Warm LED Halo Strip along Stage Base */}
      <mesh position={[0, 0.08, -2.04]}>
        <boxGeometry args={[6.8, 0.06, 0.02]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2.2} />
      </mesh>

      {/* Acoustic Vertical Wood Slats on Backdrop (Warm Oak Finish) */}
      {[-2.8, -2.3, -1.8, -1.3, -0.8, -0.3, 0.2, 0.7, 1.2, 1.7, 2.2, 2.7].map((x, i) => (
        <mesh key={i} position={[x, 1.8, -2.03]}>
          <boxGeometry args={[0.15, 3.3, 0.04]} />
          <meshStandardMaterial color="#A16207" roughness={0.4} metalness={0.1} />
        </mesh>
      ))}

      {/* Overhead Stage Lighting Truss */}
      <mesh position={[0, 3.4, -0.5]}>
        <boxGeometry args={[6.8, 0.12, 0.12]} />
        <meshStandardMaterial color="#64748B" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Spotlights on Truss with Intense Beams */}
      {[-2.2, -0.9, 0.9, 2.2].map((x, idx) => (
        <group key={idx} position={[x, 3.3, -0.5]}>
          <mesh rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.14, 0.24, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
          <spotLight
            position={[0, 0, 0]}
            color={idx % 2 === 0 ? accent : "#FDE047"}
            intensity={5.5}
            angle={0.65}
            penumbra={0.7}
          />
        </group>
      ))}

      {/* Foldback Stage Monitors */}
      {[-1.9, 1.9].map((x, i) => (
        <mesh key={i} position={[x, 0.12, 1.6]} rotation={[-0.45, i === 0 ? 0.3 : -0.3, 0]}>
          <boxGeometry args={[0.55, 0.32, 0.42]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// Dynamic Camera Controller that smoothly transitions position, lookAt, and FOV
function CameraController({
  cameraAngle,
  zoom,
  horizonTilt,
}: {
  cameraAngle: CameraAngle;
  zoom: number;
  horizonTilt: number;
}) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0.6, 3.2));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.0, 0));

  useFrame((_, delta) => {
    let targetPos = new THREE.Vector3(0, 0.5, 2.8);
    let targetLookAt = new THREE.Vector3(0, 1.1, 0);

    if (cameraAngle === "LOW_WORSHIP") {
      // Low ground perspective looking up at mic and overhead god rays
      targetPos.set(0, 0.32, 2.6);
      targetLookAt.set(0, 1.25, 0);
    } else if (cameraAngle === "WIDE_CROWD") {
      // High elevated sanctuary crowd view
      targetPos.set(0, 2.5, 5.2);
      targetLookAt.set(0, 0.9, -0.3);
    } else if (cameraAngle === "STAGE_CLOSEUP") {
      // Macro portrait closeup on guitar & instrument detail
      targetPos.set(0.95, 0.85, 1.35);
      targetLookAt.set(0.9, 0.65, 0.3);
    }

    // Smooth lerp to camera targets
    const lerpSpeed = Math.min(delta * 4.5, 1);
    currentPos.current.lerp(targetPos, lerpSpeed);
    currentLookAt.current.lerp(targetLookAt, lerpSpeed);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);

    // Apply optical zoom via FOV
    const perspectiveCam = camera as THREE.PerspectiveCamera;
    const baseFov = 46;
    const targetFov = baseFov / zoom;
    perspectiveCam.fov = THREE.MathUtils.lerp(perspectiveCam.fov, targetFov, lerpSpeed);

    // Apply Horizon Tilt to camera roll
    const tiltRadians = horizonTilt * (Math.PI / 180);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, tiltRadians, lerpSpeed);

    camera.updateProjectionMatrix();
  });

  return null;
}

export interface Viewfinder3DSceneProps {
  accent: string;
  cameraAngle: CameraAngle;
  zoom: number;
  horizonTilt: number;
  onFocusClick?: () => void;
}

export function Viewfinder3DScene({
  accent,
  cameraAngle,
  zoom,
  horizonTilt,
  onFocusClick,
}: Viewfinder3DSceneProps) {
  const mounted = useIsMounted();

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-950">
        <div className="w-10 h-10 rounded-full border-2 border-dashed border-white/20 animate-spin" />
      </div>
    );
  }

  return (
    <div
      onClick={onFocusClick}
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
    >
      <Canvas
        camera={{ position: [0, 0.6, 3.2], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#131622"]} />
        <fog attach="fog" args={["#131622", 8, 22]} />

        {/* Ambient & Luminous Stage Lights */}
        <ambientLight intensity={2.2} color="#FFF8F0" />
        <directionalLight position={[3, 7, 4]} intensity={4.2} color="#FFFFFF" />
        <directionalLight position={[-3, 5, 4]} intensity={2.6} color="#FFF5EB" />
        <directionalLight position={[0, 4.5, -3.2]} intensity={3.5} color={accent} />
        <pointLight position={[0, 0.4, 2.0]} intensity={4.0} color="#FFD8A8" distance={9} />

        {/* Targeted Instrument Spotlights */}
        <pointLight position={[0, 1.4, 0.5]} intensity={2.8} color="#FFFFFF" distance={4} />
        <pointLight position={[0.9, 0.9, 0.5]} intensity={3.2} color="#FEF3C7" distance={4} />
        <pointLight position={[-1.0, 1.0, 0.5]} intensity={2.8} color="#BAE6FD" distance={4} />

        {/* Dynamic Camera Rig */}
        <CameraController
          cameraAngle={cameraAngle}
          zoom={zoom}
          horizonTilt={horizonTilt}
        />

        {/* Free Orbit Controls so users can look around the 3D Stage */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
          dampingFactor={0.06}
          maxPolarAngle={Math.PI / 2 + 0.05} // don't go below floor
          minPolarAngle={0.2}
        />

        {/* 3D Stage Environment Elements */}
        <StageEnvironment accent={accent} />

        {/* 3D Instruments & Stage Pieces */}
        <Microphone accent={accent} />
        <WorshipGuitar accent={accent} />
        <StageKeyboard accent={accent} />

        {/* Floating Creative Sparkles around the Stage */}
        <FloatingSparkle position={[-1.6, 1.8, -0.6]} color={accent} size={0.08} />
        <FloatingSparkle position={[1.8, 2.1, -0.4]} color="#FBBF24" size={0.07} />
      </Canvas>
    </div>
  );
}
