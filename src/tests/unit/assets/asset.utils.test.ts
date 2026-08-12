import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { assetManifest, stationAssetMap } from "@/assets/asset.manifest";
import {
  getNearbyAssetKeys,
  resolveAsset,
  resolveAssetQuality,
  validateAssetManifest,
} from "@/assets/asset.utils";
import type { AssetManifest } from "@/assets/asset.types";

describe("asset infrastructure", () => {
  it("provides a placeholder asset, every quality variant, and a fallback for every manifest entry", () => {
    validateAssetManifest();

    for (const entry of Object.values(assetManifest)) {
      expect(entry.kind).toBe("placeholder");
      expect(entry.fallback.kind).toBe("procedural");
      expect(entry.model.high).toMatch(/\.glb$/);
      expect(entry.model.standard).toMatch(/\.glb$/);
      expect(entry.model.mobile).toMatch(/\.glb$/);
      expect(entry.model.reduced).toMatch(/\.glb$/);
    }
  });

  it("maps every placeholder variant to a checked-in runtime file", () => {
    for (const entry of Object.values(assetManifest)) {
      for (const url of Object.values(entry.model)) {
        expect(existsSync(join(process.cwd(), "public", url))).toBe(true);
      }
    }
  });

  it("resolves quality-specific model variants with a fallback", () => {
    expect(resolveAssetQuality(false, false)).toBe("standard");
    expect(resolveAssetQuality(true, false)).toBe("mobile");
    expect(resolveAssetQuality(true, true)).toBe("reduced");
    expect(resolveAsset("lamassu", "mobile")).toMatchObject({
      url: "/assets/models/lamassu-placeholder.glb",
      fallback: { kind: "procedural" },
    });
  });

  it("preloads only the active and directional-neighbor station assets", () => {
    const stationIds = ["intro", "grand-stairway", "lamassu", "bull-capital", "outro"];

    expect(getNearbyAssetKeys(stationIds, 1, "forward", stationAssetMap)).toEqual([
      "grand-stairway",
      "lamassu",
    ]);
    expect(getNearbyAssetKeys(stationIds, 2, "backward", stationAssetMap)).toEqual([
      "lamassu",
      "grand-stairway",
    ]);
  });

  it("rejects an invalid runtime model URL", () => {
    const invalidManifest = {
      ...assetManifest,
      lamassu: {
        ...assetManifest.lamassu,
        model: { ...assetManifest.lamassu.model, mobile: "/untrusted/lamassu.glb" },
      },
    } as AssetManifest;

    expect(() => validateAssetManifest(invalidManifest)).toThrow("invalid mobile model URL");
  });
});
