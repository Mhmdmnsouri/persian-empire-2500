"use client";

import { useEffect, useState } from "react";

type CameraDiagnostic = {
  journey: { globalProgress: number; activeStationId: string; direction: string };
  profile: string;
  fov: number;
};

export function CameraDiagnostics() {
  const [diagnostic, setDiagnostic] = useState<CameraDiagnostic | null>(null);

  useEffect(() => {
    const onDiagnostic = (event: Event) =>
      setDiagnostic((event as CustomEvent<CameraDiagnostic>).detail);
    window.addEventListener("camera-diagnostics", onDiagnostic);
    return () => window.removeEventListener("camera-diagnostics", onDiagnostic);
  }, []);

  if (!diagnostic) return null;
  return (
    <output className="pointer-events-none fixed bottom-3 left-3 z-10 whitespace-pre rounded bg-black/75 p-2 font-mono text-xs text-white">{`station: ${diagnostic.journey.activeStationId}\nprogress: ${diagnostic.journey.globalProgress.toFixed(3)}\ndirection: ${diagnostic.journey.direction}\nprofile: ${diagnostic.profile}\nfov: ${diagnostic.fov.toFixed(1)}`}</output>
  );
}
