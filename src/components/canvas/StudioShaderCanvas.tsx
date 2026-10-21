"use client";

import React, { useRef, useEffect, useMemo, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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

const LiquidShaderMaterial = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    float noise(vec2 p) {
      return sin(p.x * 6.0 + uTime * 0.4) * cos(p.y * 6.0 + uTime * 0.3) * 0.5 + 0.5;
    }

    void main() {
      vec2 uv = vUv;
      float n1 = noise(uv * 2.5);
      float n2 = noise(uv * 4.0 + vec2(n1 * 0.8, -n1 * 0.8));
      float swirl = sin((uv.x + uv.y + n2) * 5.0 + uTime * 0.6) * 0.5 + 0.5;

      vec3 baseMix = mix(uColor1, uColor3, uv.y);
      vec3 finalColor = mix(baseMix, uColor2, swirl * 0.28);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const activeAccent = useCreativesStore((state) => state.activeAccent);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#FAF7F2") },
      uColor2: { value: new THREE.Color(activeAccent) },
      uColor3: { value: new THREE.Color("#F4F1EA") },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColor2.value.set(activeAccent);
    }
  }, [activeAccent]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[16, 12, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={LiquidShaderMaterial.vertexShader}
        fragmentShader={LiquidShaderMaterial.fragmentShader}
      />
    </mesh>
  );
}

export function StudioShaderCanvas() {
  const mounted = useIsMounted();

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-[#FAF7F2] -z-10 transition-colors duration-500" />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-90">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
