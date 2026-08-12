import type { AssetManifest, StationAssetMap } from "./asset.types";

const placeholderVariants = (filename: string) => ({
  high: `/assets/models/${filename}`,
  standard: `/assets/models/${filename}`,
  mobile: `/assets/models/${filename}`,
  reduced: `/assets/models/${filename}`,
});

const proceduralFallback = { kind: "procedural" } as const;

export const assetManifest = {
  "grand-stairway": {
    kind: "placeholder",
    model: placeholderVariants("grand-stairway-placeholder.glb"),
    fallback: proceduralFallback,
  },
  lamassu: {
    kind: "placeholder",
    model: placeholderVariants("lamassu-placeholder.glb"),
    fallback: proceduralFallback,
  },
  "bull-capital": {
    kind: "placeholder",
    model: placeholderVariants("bull-capital-placeholder.glb"),
    fallback: proceduralFallback,
  },
  "delegation-relief-panel": {
    kind: "placeholder",
    model: placeholderVariants("delegation-relief-panel-placeholder.glb"),
    fallback: proceduralFallback,
  },
  "apadana-column": {
    kind: "placeholder",
    model: placeholderVariants("apadana-column-placeholder.glb"),
    fallback: proceduralFallback,
  },
  "cuneiform-tablet": {
    kind: "placeholder",
    model: placeholderVariants("cuneiform-tablet-placeholder.glb"),
    fallback: proceduralFallback,
  },
  "achaemenid-rhyton": {
    kind: "placeholder",
    model: placeholderVariants("achaemenid-rhyton-placeholder.glb"),
    fallback: proceduralFallback,
  },
  "lotus-motif": {
    kind: "placeholder",
    model: placeholderVariants("lotus-motif-placeholder.glb"),
    fallback: proceduralFallback,
  },
  "gate-of-all-nations": {
    kind: "placeholder",
    model: placeholderVariants("gate-of-all-nations-placeholder.glb"),
    fallback: proceduralFallback,
  },
  "immortal-guard": {
    kind: "placeholder",
    model: placeholderVariants("immortal-guard-placeholder.glb"),
    fallback: proceduralFallback,
  },
} as const satisfies AssetManifest;

export const stationAssetMap = {
  "grand-stairway": "grand-stairway",
  lamassu: "lamassu",
  "bull-capital": "bull-capital",
} as const satisfies StationAssetMap;
