"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Color, Group, InstancedMesh, MeshStandardMaterial, Object3D, PointLight } from "three";

import { journeyStations } from "@/journey/journey.config";
import { normalizeStationProgress } from "@/journey/progress";
import { useJourneyStore } from "@/store/journey.store";

import {
  getGrandStairwayReliefReveal,
  getGrandStairwaySideWallAssembly,
  getGrandStairwayStepAssembly,
  getGrandStairwayStepBrightness,
  getGrandStairwayStepCount,
  getGrandStairwayTransitionToLamassu,
  type GrandStairwayMotionProfile,
} from "./grand-stairway.motion";

const maximumStepCount = 9;
const stairwayStation = journeyStations[1];

function resolveProfile(): GrandStairwayMotionProfile {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced";
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

export function GrandStairwayStation() {
  const steps = useRef<InstancedMesh>(null);
  const walls = useRef<InstancedMesh>(null);
  const reliefMaterial = useRef<MeshStandardMaterial>(null);
  const rightReliefMaterial = useRef<MeshStandardMaterial>(null);
  const reliefLight = useRef<PointLight>(null);
  const lamassuSilhouette = useRef<Group>(null);
  const progress = useRef(0);
  const profile = useRef<GrandStairwayMotionProfile>("desktop");
  const motionDirty = useRef(true);
  const stepTransform = useRef(new Object3D());
  const wallTransform = useRef(new Object3D());
  const stepColor = useRef(new Color());

  useEffect(() => {
    const updateProgress = () => {
      const nextProgress = normalizeStationProgress(
        useJourneyStore.getState().globalProgress,
        stairwayStation.start,
        stairwayStation.end,
      );
      if (nextProgress !== progress.current) {
        progress.current = nextProgress;
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

    const activeProfile = profile.current;
    const localProgress = progress.current;
    const visibleStepCount = getGrandStairwayStepCount(activeProfile);
    const stepMesh = steps.current;

    if (stepMesh) {
      for (let index = 0; index < maximumStepCount; index += 1) {
        const assembly =
          index < visibleStepCount
            ? getGrandStairwayStepAssembly(localProgress, index, activeProfile)
            : 0;
        const transform = stepTransform.current;
        transform.position.set(0, index * 0.32 - (1 - assembly) * 2, -0.6 - index * 0.62);
        transform.scale.set(5.5, Math.max(0.001, assembly), 0.95);
        transform.updateMatrix();
        stepMesh.setMatrixAt(index, transform.matrix);
        const brightness = getGrandStairwayStepBrightness(
          localProgress,
          index,
          visibleStepCount,
          activeProfile,
        );
        stepColor.current.setRGB(brightness * 0.78, brightness * 0.64, brightness * 0.47);
        stepMesh.setColorAt(index, stepColor.current);
      }
      stepMesh.instanceMatrix.needsUpdate = true;
      if (stepMesh.instanceColor) stepMesh.instanceColor.needsUpdate = true;
    }

    const wallMesh = walls.current;
    if (wallMesh) {
      const assembly = getGrandStairwaySideWallAssembly(localProgress, activeProfile);
      for (const [index, side] of [-1, 1].entries()) {
        const transform = wallTransform.current;
        transform.position.set(side * 3.1, 1.45 - (1 - assembly) * 1.5, -2.9);
        transform.scale.set(0.28, Math.max(0.001, assembly), 3.5);
        transform.updateMatrix();
        wallMesh.setMatrixAt(index, transform.matrix);
      }
      wallMesh.instanceMatrix.needsUpdate = true;
    }

    const reliefReveal = getGrandStairwayReliefReveal(localProgress, activeProfile);
    if (reliefMaterial.current) {
      reliefMaterial.current.opacity = reliefReveal;
      reliefMaterial.current.emissiveIntensity = reliefReveal * 0.18;
    }
    if (rightReliefMaterial.current) {
      rightReliefMaterial.current.opacity = reliefReveal;
      rightReliefMaterial.current.emissiveIntensity = reliefReveal * 0.18;
    }
    if (reliefLight.current) {
      reliefLight.current.intensity = reliefReveal * 1.35;
      reliefLight.current.position.x = -3.5 + reliefReveal * 7;
    }
    if (lamassuSilhouette.current) {
      const transition = getGrandStairwayTransitionToLamassu(localProgress, activeProfile);
      lamassuSilhouette.current.visible = transition > 0;
      lamassuSilhouette.current.scale.setScalar(Math.max(0.001, transition));
    }
    motionDirty.current = false;
  });

  return (
    <group>
      <instancedMesh
        ref={steps}
        args={[undefined, undefined, maximumStepCount]}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 0.32, 1]} />
        <meshStandardMaterial color="#7a6249" roughness={0.92} vertexColors />
      </instancedMesh>
      <instancedMesh ref={walls} args={[undefined, undefined, 2]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#544231" roughness={0.96} />
      </instancedMesh>
      <group position={[-2.7, 2.15, -3.15]}>
        <mesh>
          <boxGeometry args={[0.16, 1.4, 2.8]} />
          <meshStandardMaterial
            ref={reliefMaterial}
            color="#967852"
            emissive="#7a5432"
            roughness={0.88}
            transparent
            opacity={0}
          />
        </mesh>
      </group>
      <group position={[2.7, 2.15, -3.15]}>
        <mesh>
          <boxGeometry args={[0.16, 1.4, 2.8]} />
          <meshStandardMaterial
            ref={rightReliefMaterial}
            color="#967852"
            emissive="#7a5432"
            roughness={0.88}
            transparent
            opacity={0}
          />
        </mesh>
      </group>
      <pointLight ref={reliefLight} color="#e0ad70" distance={8} decay={2} intensity={0} />
      <group ref={lamassuSilhouette} position={[-3.1, 1.5, -4.5]} visible={false}>
        <mesh>
          <boxGeometry args={[1.1, 1.7, 0.5]} />
          <meshStandardMaterial color="#120f0d" roughness={1} />
        </mesh>
        <mesh position={[0, 1.25, 0.05]}>
          <boxGeometry args={[0.7, 0.7, 0.55]} />
          <meshStandardMaterial color="#120f0d" roughness={1} />
        </mesh>
      </group>
    </group>
  );
}
