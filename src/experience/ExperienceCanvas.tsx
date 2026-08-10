"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

import { SceneRoot } from "./SceneRoot";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import { WebGLFallback } from "./WebGLFallback";

function supportsWebGL(): boolean {
  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
}

export function ExperienceCanvas() {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setWebglAvailable(supportsWebGL());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (webglAvailable === false) {
    return <WebGLFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<WebGLFallback />}>
      <Canvas className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" dpr={[1, 1.5]}>
        <SceneRoot />
      </Canvas>
    </WebGLErrorBoundary>
  );
}
