"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group, PointLight } from "three";

import { journeyStations } from "@/journey/journey.config";
import { normalizeStationProgress } from "@/journey/progress";
import { useJourneyStore } from "@/store/journey.store";

import { resolveBullCapitalMotionState, type BullCapitalMotionProfile } from "./bull-capital.motion";

const bullCapitalStation = journeyStations[3];

function resolveProfile(): BullCapitalMotionProfile {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced";
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

export function BullCapitalStation() {
  const root = useRef<Group>(null);
  const base = useRef<Group>(null);
  const shaft = useRef<Group>(null);
  const connector = useRef<Group>(null);
  const capital = useRef<Group>(null);
  const beam = useRef<Group>(null);
  const assemblyLight = useRef<PointLight>(null);
  const progress = useRef(0);
  const active = useRef(false);
  const profile = useRef<BullCapitalMotionProfile>("desktop");
  const motionDirty = useRef(true);

  useEffect(() => {
    const updateProgress = () => {
      const journey = useJourneyStore.getState();
      const nextProgress = normalizeStationProgress(
        journey.globalProgress,
        bullCapitalStation.start,
        bullCapitalStation.end,
      );
      const nextActive = journey.activeStationId === "bull-capital";
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

    updateProgress();
    updateProfile();
    const unsubscribe = useJourneyStore.subscribe(updateProgress);
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
    const state = resolveBullCapitalMotionState(progress.current, profile.current);

    if (root.current) {
      root.current.visible = active.current;
      root.current.scale.setScalar(1 - state.outroTransition * 0.06);
    }
    if (base.current) {
      base.current.visible = state.baseAssembly > 0;
      base.current.scale.y = Math.max(0.001, state.baseAssembly);
    }
    if (shaft.current) {
      shaft.current.visible = state.shaftAssembly > 0;
      shaft.current.scale.y = Math.max(0.001, state.shaftAssembly);
      shaft.current.position.y = 0.35 + state.shaftAssembly * 1.7;
    }
    if (connector.current) {
      connector.current.visible = state.connectorAssembly > 0;
      connector.current.scale.setScalar(Math.max(0.001, state.connectorAssembly));
    }
    if (capital.current) {
      capital.current.position.y = 4.5 + state.capitalOffsetY;
      capital.current.rotation.y = (1 - state.capitalAssembly) * 0.18;
    }
    if (beam.current) {
      beam.current.visible = state.beamAssembly > 0;
      beam.current.position.z = state.beamOffsetZ;
      beam.current.scale.z = Math.max(0.001, state.beamAssembly);
    }
    if (assemblyLight.current) {
      assemblyLight.current.intensity = (0.35 + state.beamAssembly * 1.15) * (1 - state.outroTransition);
    }
    motionDirty.current = false;
  });

  return (
    <group ref={root} visible={false} position={[0, -2.1, -0.8]}>
      <group ref={base} position={[0, 0.22, 0]}>
        <mesh>
          <cylinderGeometry args={[1.2, 1.38, 0.44, 8]} />
          <meshStandardMaterial color="#765c40" roughness={0.92} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.95, 1.05, 0.28, 8]} />
          <meshStandardMaterial color="#90714f" roughness={0.88} />
        </mesh>
      </group>
      <group ref={shaft} position={[0, 2.05, 0]}>
        <mesh>
          <cylinderGeometry args={[0.56, 0.72, 3.4, 12]} />
          <meshStandardMaterial color="#826646" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.43, 0.43, 3.45, 12]} />
          <meshStandardMaterial color="#9d7b55" roughness={0.93} />
        </mesh>
      </group>
      <group ref={connector} position={[0, 4.15, 0]}>
        <mesh>
          <cylinderGeometry args={[0.94, 0.68, 0.48, 8]} />
          <meshStandardMaterial color="#aa865b" roughness={0.86} />
        </mesh>
      </group>
      <group ref={capital} position={[0, 4.5, 0]}>
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[2.45, 0.42, 1.2]} />
          <meshStandardMaterial color="#b18b5d" roughness={0.82} />
        </mesh>
        {([-0.78, 0.78] as const).map((x) => (
          <group key={x} position={[x, 0.48, 0]} rotation={[0, 0, x * -0.16]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <capsuleGeometry args={[0.38, 0.82, 6, 10]} />
              <meshStandardMaterial color="#c09a68" roughness={0.84} />
            </mesh>
            <mesh position={[Math.sign(x) * 0.18, 0.34, -0.08]} rotation={[0, 0, x * -0.38]}>
              <coneGeometry args={[0.11, 0.55, 8]} />
              <meshStandardMaterial color="#c09a68" roughness={0.84} />
            </mesh>
          </group>
        ))}
      </group>
      <group ref={beam} position={[0, 5.32, 0]}>
        <mesh>
          <boxGeometry args={[4.8, 0.3, 0.62]} />
          <meshStandardMaterial color="#60442e" roughness={0.8} />
        </mesh>
      </group>
      <pointLight ref={assemblyLight} position={[-2.4, 5.8, 3.2]} color="#e0ad70" distance={10} decay={2} intensity={0} />
    </group>
  );
}
