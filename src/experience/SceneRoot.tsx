import { CameraRig } from "./CameraRig";
import { AssetPreloader } from "@/assets/AssetPreloader";
import { GrandStairwayStation } from "@/stations/grand-stairway/GrandStairwayStation";

export function SceneRoot() {
  return (
    <>
      <CameraRig />
      <AssetPreloader />
      <ambientLight intensity={0.2} />
      <GrandStairwayStation />
    </>
  );
}
