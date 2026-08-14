"use client";

import { Suspense } from "react";

import { ArtifactAsset } from "./ArtifactAsset";
import { ArtifactAssetBoundary } from "./ArtifactAssetBoundary";
import { ArtifactFallback } from "./ArtifactFallback";
import { resolveAsset } from "./asset.utils";
import type { AssetKey, AssetQuality } from "./asset.types";

type SafeArtifactAssetProps = Readonly<{
  assetKey: AssetKey;
  quality: AssetQuality;
}>;

export function SafeArtifactAsset({ assetKey, quality }: SafeArtifactAssetProps) {
  const fallback = resolveAsset(assetKey, quality).fallback;

  return (
    <ArtifactAssetBoundary
      key={`${assetKey}-${quality}`}
      fallback={<ArtifactFallback fallback={fallback} />}
    >
      <Suspense fallback={<ArtifactFallback fallback={fallback} />}>
        <ArtifactAsset assetKey={assetKey} quality={quality} />
      </Suspense>
    </ArtifactAssetBoundary>
  );
}
