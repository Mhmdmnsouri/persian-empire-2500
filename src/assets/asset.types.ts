import type { StationId } from "@/journey/journey.types";

export const assetKeys = [
  "grand-stairway",
  "lamassu",
  "bull-capital",
  "delegation-relief-panel",
  "apadana-column",
  "cuneiform-tablet",
  "achaemenid-rhyton",
  "lotus-motif",
  "gate-of-all-nations",
  "immortal-guard",
] as const;

export type AssetKey = (typeof assetKeys)[number];
export type AssetQuality = "high" | "standard" | "mobile" | "reduced";

export type AssetVariants = Readonly<Record<AssetQuality, string>>;

export type AssetFallback = Readonly<{
  kind: "procedural";
}>;

export type ArtifactAssetEntry = Readonly<{
  kind: "placeholder";
  model: AssetVariants;
  fallback: AssetFallback;
}>;

export type AssetManifest = Readonly<Record<AssetKey, ArtifactAssetEntry>>;

export type AssetResolution = Readonly<{
  key: AssetKey;
  quality: AssetQuality;
  url: string;
  fallback: AssetFallback;
}>;

export type StationAssetMap = Readonly<Partial<Record<StationId, AssetKey>>>;
