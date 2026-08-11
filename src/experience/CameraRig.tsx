"use client";
/* eslint-disable react-hooks/immutability -- This shared rig is the documented sole owner of the external Three.js camera. */
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { PerspectiveCamera, Vector3 } from "three";
import { stationCameraConfigs } from "./camera.config";
import {
  damp,
  defaultCameraDamping,
  defaultCameraPose,
  resolveCameraProfile,
  resolveDesiredCameraPose,
} from "./camera.utils";
import type { CameraPose } from "./camera.types";
import type { CameraDampingConfig } from "./camera.types";
import { journeyStations } from "@/journey/journey.config";
import { normalizeStationProgress } from "@/journey/progress";
import { useJourneyStore } from "@/store/journey.store";

export function CameraRig() {
  const camera = useThree((state) => state.camera) as PerspectiveCamera;
  const desired = useRef<CameraPose>(defaultCameraPose);
  const target = useRef(new Vector3(...defaultCameraPose.target));
  const position = useRef(new Vector3(...defaultCameraPose.position));
  const lastFov = useRef(camera.fov);
  const profile = useRef(resolveCameraProfile(false, false));
  const damping = useRef<CameraDampingConfig>(defaultCameraDamping);
  const lastDiagnosticUpdate = useRef(0);
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const state = useJourneyStore.getState();
      const station = journeyStations[state.activeStationIndex];
      profile.current = resolveCameraProfile(mobile.matches, reduced.matches);
      desired.current = resolveDesiredCameraPose(
        stationCameraConfigs[station.id],
        normalizeStationProgress(state.globalProgress, station.start, station.end),
        profile.current,
      );
      damping.current = { ...defaultCameraDamping, ...stationCameraConfigs[station.id].damping };
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
  useFrame((_, delta) => {
    const pose = desired.current;
    position.current.x = damp(
      position.current.x,
      pose.position[0],
      damping.current.position,
      delta,
    );
    position.current.y = damp(
      position.current.y,
      pose.position[1],
      damping.current.position,
      delta,
    );
    position.current.z = damp(
      position.current.z,
      pose.position[2],
      damping.current.position,
      delta,
    );
    target.current.x = damp(target.current.x, pose.target[0], damping.current.target, delta);
    target.current.y = damp(target.current.y, pose.target[1], damping.current.target, delta);
    target.current.z = damp(target.current.z, pose.target[2], damping.current.target, delta);
    camera.position.copy(position.current);
    const fov = damp(camera.fov, pose.fov, damping.current.fov, delta);
    if (Math.abs(fov - lastFov.current) > 0.001) {
      camera.fov = fov;
      lastFov.current = fov;
      camera.updateProjectionMatrix();
    }
    camera.lookAt(target.current);
    if (
      process.env.NODE_ENV === "development" &&
      performance.now() - lastDiagnosticUpdate.current >= 250
    ) {
      lastDiagnosticUpdate.current = performance.now();
      const journey = useJourneyStore.getState();
      window.dispatchEvent(
        new CustomEvent("camera-diagnostics", {
          detail: {
            journey,
            profile: profile.current,
            desired: pose,
            renderedPosition: position.current.toArray(),
            renderedTarget: target.current.toArray(),
            fov: camera.fov,
          },
        }),
      );
    }
  });
  return null;
}
