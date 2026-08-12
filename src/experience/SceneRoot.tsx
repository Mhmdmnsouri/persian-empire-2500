import { CameraRig } from "./CameraRig";
import { AssetPreloader } from "@/assets/AssetPreloader";

export function SceneRoot() {
  return (
    <>
      <CameraRig />
      <AssetPreloader />
      <ambientLight intensity={0.2} />
    </>
  );
}
