import { CameraRig } from "./CameraRig";
import { AssetPreloader } from "@/assets/AssetPreloader";
import { GrandStairwayStation } from "@/stations/grand-stairway/GrandStairwayStation";
import { LamassuStation } from "@/stations/lamassu/LamassuStation";
import type { StationLabel } from "@/content/content.types";

type SceneRootProps = Readonly<{ lamassuFocusLabels: readonly StationLabel[] }>;

export function SceneRoot({ lamassuFocusLabels }: SceneRootProps) {
  return (
    <>
      <CameraRig />
      <AssetPreloader />
      <ambientLight intensity={0.2} />
      <GrandStairwayStation />
      <LamassuStation focusLabels={lamassuFocusLabels} />
    </>
  );
}
