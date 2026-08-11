import { CameraRig } from "./CameraRig";

export function SceneRoot() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.2} />
    </>
  );
}
