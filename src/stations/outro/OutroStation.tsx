"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group, MeshStandardMaterial, PointLight } from "three";

import { journeyStations } from "@/journey/journey.config";
import { normalizeStationProgress } from "@/journey/progress";
import { useJourneyStore } from "@/store/journey.store";

import { resolveOutroMotionState, type OutroMotionProfile } from "./outro.motion";

const outroStation = journeyStations[4];

function resolveProfile(): OutroMotionProfile {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced";
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

export function OutroStation() {
  const root = useRef<Group>(null);
  const echo = useRef<Group>(null);
  const reflection = useRef<MeshStandardMaterial>(null);
  const light = useRef<PointLight>(null);
  const progress = useRef(0);
  const active = useRef(false);
  const profile = useRef<OutroMotionProfile>("desktop");
  const motionDirty = useRef(true);

  useEffect(() => {
    const update = () => {
      const journey = useJourneyStore.getState();
      const nextProgress = normalizeStationProgress(journey.globalProgress, outroStation.start, outroStation.end);
      const nextActive = journey.activeStationId === "outro";
      if (nextProgress !== progress.current || nextActive !== active.current) {
        progress.current = nextProgress;
        active.current = nextActive;
        motionDirty.current = true;
      }
    };
    const mobile = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateProfile = () => {
      const nextProfile = resolveProfile();
      if (nextProfile !== profile.current) {
        profile.current = nextProfile;
        motionDirty.current = true;
      }
    };

    update();
    updateProfile();
    const unsubscribe = useJourneyStore.subscribe(update);
    mobile.addEventListener("change", updateProfile);
    reduced.addEventListener("change", updateProfile);
    return () => {
      unsubscribe();
      mobile.removeEventListener("change", updateProfile);
      reduced.removeEventListener("change", updateProfile);
    };
  }, []);

  useFrame(() => {
    if (!motionDirty.current) return;
    const state = resolveOutroMotionState(progress.current, profile.current);
    if (root.current) root.current.visible = active.current;
    if (echo.current) {
      echo.current.visible = state.echoVisibility > 0.01;
      echo.current.scale.setScalar(state.echoScale);
    }
    if (reflection.current) reflection.current.opacity = state.reflectionVisibility * state.echoVisibility;
    if (light.current) light.current.intensity = state.reflectionVisibility * 0.8;
    motionDirty.current = false;
  });

  return (
    <group ref={root} visible={false} position={[0, 1.4, -1.8]}>
      <group ref={echo}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.045, 8, 32]} />
          <meshStandardMaterial color="#a98257" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[2.1, 0.14, 0.56]} />
          <meshStandardMaterial color="#765537" roughness={0.88} />
        </mesh>
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]}>
        <circleGeometry args={[3.4, 32]} />
        <meshStandardMaterial ref={reflection} color="#d7b880" transparent opacity={0} roughness={0.75} />
      </mesh>
      <pointLight ref={light} position={[0, 2.4, 2.2]} color="#e0ad70" distance={8} decay={2} intensity={0} />
    </group>
  );
}
