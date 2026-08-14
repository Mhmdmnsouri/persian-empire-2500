"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

import { SceneRoot } from "./SceneRoot";
import { CameraDiagnostics } from "./CameraDiagnostics";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import { WebGLFallback } from "./WebGLFallback";
import type { StationLabel } from "@/content/content.types";

function supportsWebGL(): boolean {
  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
}

type ExperienceCanvasProps = Readonly<{
  fallbackCopy: string;
  lamassuFocusLabels: readonly StationLabel[];
}>;

export function ExperienceCanvas({ fallbackCopy, lamassuFocusLabels }: ExperienceCanvasProps) {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setWebglAvailable(supportsWebGL());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (webglAvailable === false) {
    return <WebGLFallback message={fallbackCopy} />;
  }

  return (
    <WebGLErrorBoundary fallback={<WebGLFallback message={fallbackCopy} />}>
      <Canvas className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" dpr={[1, 1.5]}>
        <SceneRoot lamassuFocusLabels={lamassuFocusLabels} />
      </Canvas>
      {process.env.NODE_ENV === "development" ? <CameraDiagnostics /> : null}
    </WebGLErrorBoundary>
  );
}
