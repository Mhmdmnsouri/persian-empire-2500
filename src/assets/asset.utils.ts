import { assetManifest } from "./asset.manifest";
import type {
  AssetKey,
  AssetManifest,
  AssetQuality,
  AssetResolution,
  StationAssetMap,
} from "./asset.types";

export function resolveAssetQuality(isMobile: boolean, reducedMotion: boolean): AssetQuality {
  if (reducedMotion) return "reduced";
  return isMobile ? "mobile" : "standard";
}

export function resolveAsset(key: AssetKey, quality: AssetQuality): AssetResolution {
  const entry = assetManifest[key];

  return { key, quality, url: entry.model[quality], fallback: entry.fallback };
}

export function validateAssetManifest(manifest: AssetManifest = assetManifest): void {
  for (const [key, entry] of Object.entries(manifest)) {
    if (entry.kind !== "placeholder")
      throw new Error(`Asset ${key} must be explicitly classified.`);

    for (const [quality, url] of Object.entries(entry.model)) {
      if (!url.startsWith("/assets/") || !url.endsWith(".glb")) {
        throw new Error(`Asset ${key} has an invalid ${quality} model URL.`);
      }
    }

    if (entry.fallback.kind !== "procedural") {
      throw new Error(`Asset ${key} requires a supported fallback.`);
    }
  }
}

export function getNearbyAssetKeys(
  stationIds: readonly string[],
  activeIndex: number,
  direction: "forward" | "backward" | "idle",
  stationAssets: StationAssetMap,
): AssetKey[] {
  const orderedIndices =
    direction === "backward" ? [activeIndex, activeIndex - 1] : [activeIndex, activeIndex + 1];
  const keys = orderedIndices
    .map((index) => stationIds[index])
    .map((stationId) => (stationId ? stationAssets[stationId as keyof StationAssetMap] : undefined))
    .filter((key): key is AssetKey => Boolean(key));

  return [...new Set(keys)];
}
