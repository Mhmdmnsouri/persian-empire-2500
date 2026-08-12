"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { Mesh } from "three";

import { resolveAsset } from "./asset.utils";
import type { AssetKey, AssetQuality } from "./asset.types";

type ArtifactAssetProps = Readonly<{
  assetKey: AssetKey;
  quality: AssetQuality;
}>;

export function ArtifactAsset({ assetKey, quality }: ArtifactAssetProps) {
  const { url } = resolveAsset(assetKey, quality);
  const gltf = useGLTF(url);
  const scene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    clone.traverse((object) => {
      if (object instanceof Mesh) {
        object.material = Array.isArray(object.material)
          ? object.material.map((material) => material.clone())
          : object.material.clone();
      }
    });

    return clone;
  }, [gltf.scene]);

  useEffect(
    () => () => {
      scene.traverse((object) => {
        if (object instanceof Mesh) {
          for (const material of Array.isArray(object.material)
            ? object.material
            : [object.material]) {
            material.dispose();
          }
        }
      });
    },
    [scene],
  );

  // useGLTF owns cached geometry and textures; this wrapper owns cloned materials only.
  return <primitive object={scene} dispose={null} />;
}
