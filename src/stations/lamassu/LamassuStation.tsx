"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group, SpotLight } from "three";

import { SafeArtifactAsset } from "@/assets/SafeArtifactAsset";
import type { AssetQuality } from "@/assets/asset.types";
import { resolveAssetQuality } from "@/assets/asset.utils";
import type { StationLabel } from "@/content/content.types";
import { journeyStations } from "@/journey/journey.config";
import { normalizeStationProgress } from "@/journey/progress";
import { useJourneyStore } from "@/store/journey.store";

import { resolveLamassuMotionState, type LamassuMotionProfile } from "./lamassu.motion";

const lamassuStation = journeyStations[2];
const focusPositions: readonly [number, number, number][] = [
  [-0.35, 1.3, 0],
  [0, 0.4, 0.15],
  [1.25, 0.75, 0],
];

function resolveProfile(): LamassuMotionProfile {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced";
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

export function LamassuStation({
  focusLabels,
}: Readonly<{ focusLabels: readonly StationLabel[] }>) {
  const [quality, setQuality] = useState<AssetQuality>("standard");
  const artifact = useRef<Group>(null);
  const silhouette = useRef<Group>(null);
  const focusAnchors = useRef<(Group | null)[]>([]);
  const faceLight = useRef<SpotLight>(null);
  const wingLight = useRef<SpotLight>(null);
  const localProgress = useRef(0);
  const active = useRef(false);
  const profile = useRef<LamassuMotionProfile>("desktop");
  const qualityRef = useRef<AssetQuality>("standard");
  const motionDirty = useRef(true);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const journey = useJourneyStore.getState();
      const nextProgress = normalizeStationProgress(
        journey.globalProgress,
        lamassuStation.start,
        lamassuStation.end,
      );
      const nextProfile = resolveProfile();
      active.current = journey.activeStationId === "lamassu";
      localProgress.current = nextProgress;
      profile.current = nextProfile;
      const nextQuality = resolveAssetQuality(mobile.matches, reduced.matches);
      if (nextQuality !== qualityRef.current) {
        qualityRef.current = nextQuality;
        setQuality(nextQuality);
      }
      motionDirty.current = true;
    };

    update();
    const unsubscribe = useJourneyStore.subscribe(update);
    mobile.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      unsubscribe();
      mobile.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useFrame(() => {
    if (!motionDirty.current) return;

    const state = resolveLamassuMotionState(localProgress.current, profile.current);
    const visible = active.current && state.artifactVisibility > 0;
    if (artifact.current) {
      artifact.current.visible = visible;
      artifact.current.rotation.y = state.rotationY;
      artifact.current.position.y = state.transitionToBullCapital * 0.45;
      artifact.current.scale.setScalar(1.8 * (0.96 + state.artifactVisibility * 0.04));
    }
    if (silhouette.current) {
      silhouette.current.visible = active.current && state.silhouetteVisibility > 0;
      silhouette.current.scale.setScalar(Math.max(0.001, state.silhouetteVisibility));
    }
    for (const [index, anchor] of focusAnchors.current.entries()) {
      const reveal = [state.faceReveal, state.bodyReveal, state.wingReveal][index] ?? 0;
      if (anchor) {
        anchor.visible = visible && reveal > 0.05;
        anchor.scale.setScalar(Math.max(0.001, reveal));
      }
    }
    if (faceLight.current) faceLight.current.intensity = state.faceReveal * 1.8;
    if (wingLight.current) wingLight.current.intensity = state.wingReveal * 1.2;
    motionDirty.current = false;
  });

  return (
    <group>
      <group ref={silhouette} position={[0, 1, -0.8]}>
        <mesh>
          <boxGeometry args={[2.2, 2.6, 0.9]} />
          <meshStandardMaterial color="#100d0b" roughness={1} />
        </mesh>
        <mesh position={[0, 1.55, 0.05]}>
          <boxGeometry args={[1.15, 0.85, 0.95]} />
          <meshStandardMaterial color="#100d0b" roughness={1} />
        </mesh>
      </group>
      <group ref={artifact} position={[0, 0, -0.8]} visible={false}>
        <SafeArtifactAsset assetKey="lamassu" quality={quality} />
      </group>
      <spotLight
        ref={faceLight}
        position={[-2.4, 3.6, 3.6]}
        target-position={[0, 1.25, -0.8]}
        color="#e0ad70"
        angle={0.38}
        penumbra={0.75}
        distance={10}
        intensity={0}
      />
      <spotLight
        ref={wingLight}
        position={[3.8, 2.5, 1.5]}
        target-position={[0.9, 0.7, -0.8]}
        color="#bd8c5b"
        angle={0.42}
        penumbra={0.8}
        distance={9}
        intensity={0}
      />
      {focusLabels.slice(0, 3).map((label, index) => (
        <group
          key={label.id}
          ref={(element) => {
            focusAnchors.current[index] = element;
          }}
          position={focusPositions[index]}
          visible={false}
        >
          <mesh>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color="#e0ad70" />
          </mesh>
          <Html distanceFactor={7} transform={false}>
            <span className="pointer-events-none whitespace-nowrap border border-stone-border bg-ink/85 px-2 py-1 text-xs text-paper">
              {label.value}
            </span>
          </Html>
        </group>
      ))}
    </group>
  );
}
