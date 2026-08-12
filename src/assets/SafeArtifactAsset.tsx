"use client";

import { Suspense } from "react";

import { ArtifactAsset } from "./ArtifactAsset";
import { ArtifactAssetBoundary } from "./ArtifactAssetBoundary";
import { ArtifactFallback } from "./ArtifactFallback";
import type { AssetKey, AssetQuality } from "./asset.types";

type SafeArtifactAssetProps = Readonly<{
  assetKey: AssetKey;
  quality: AssetQuality;
}>;

export function SafeArtifactAsset({ assetKey, quality }: SafeArtifactAssetProps) {
  return (
    <ArtifactAssetBoundary key={`${assetKey}-${quality}`}>
      <Suspense fallback={<ArtifactFallback />}>
        <ArtifactAsset assetKey={assetKey} quality={quality} />
      </Suspense>
    </ArtifactAssetBoundary>
  );
}
