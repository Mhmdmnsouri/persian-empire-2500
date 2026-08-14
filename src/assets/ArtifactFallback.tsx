import { Html } from "@react-three/drei";

import type { AssetFallback } from "./asset.types";

type ArtifactFallbackProps = Readonly<{ fallback?: AssetFallback }>;

export function ArtifactFallback({ fallback = { kind: "procedural" } }: ArtifactFallbackProps) {
  if (fallback.kind === "poster") {
    return (
      <Html center transform={false}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Drei Html renders this on-demand Canvas fallback poster. */}
        <img
          src={fallback.url}
          alt=""
          aria-hidden="true"
          className="h-auto w-40 rounded-sm border border-stone-border object-cover sm:w-56"
        />
      </Html>
    );
  }

  return (
    <mesh>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial color="#b89a72" roughness={0.85} />
    </mesh>
  );
}
