"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

import { stationAssetMap } from "./asset.manifest";
import { getNearbyAssetKeys, resolveAsset, resolveAssetQuality } from "./asset.utils";
import { journeyStations } from "@/journey/journey.config";
import { useJourneyStore } from "@/store/journey.store";

function preloadNearbyAssets(): void {
  const state = useJourneyStore.getState();
  const quality = resolveAssetQuality(
    window.matchMedia("(max-width: 767px)").matches,
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const keys = getNearbyAssetKeys(
    journeyStations.map((station) => station.id),
    state.activeStationIndex,
    state.direction,
    stationAssetMap,
  );

  for (const key of keys) {
    useGLTF.preload(resolveAsset(key, quality).url);
  }
}

export function AssetPreloader() {
  useEffect(() => {
    preloadNearbyAssets();
    return useJourneyStore.subscribe(preloadNearbyAssets);
  }, []);

  return null;
}
