# CAMERA_SYSTEM.md

## Project

**Persian Empire 2500**

## Document Status

- **Status:** Draft for implementation
- **Version:** 1.0.0
- **Audience:** Developers, AI coding agents, motion designers, technical reviewers
- **Related Documents:**
  - `AGENTS.md`
  - `docs/SPEC.md`
  - `docs/MOTION_STORYBOARD.md`
  - `docs/ARCHITECTURE.md`
  - `docs/PERFORMANCE_BUDGET.md`
  - `docs/ACCESSIBILITY.md`
  - `docs/DECISIONS.md`

---

# 1. Purpose

This document defines the camera system for the scroll-driven Persepolis experience.

The camera is one of the primary storytelling tools of the project. It controls attention, reveals scale, frames details, and connects narrative stations.

The camera system must remain:

- progress-driven
- reversible
- deterministic
- station-configurable
- mobile-aware
- reduced-motion aware
- smooth under noisy scroll input
- independent from artifact transforms
- testable without rendering the complete scene

The camera must never feel uncontrolled or game-like.

---

# 2. Core Principles

## 2.1 One Shared Camera

The journey uses one shared perspective camera inside one persistent React Three Fiber Canvas.

Stations do not create independent cameras.

Stations do not directly mutate the active camera.

## 2.2 Position and Target Are Independent

Camera position and camera target must be animated as separate tracks.

```text
Camera Position
       +
Camera Target
       ↓
Final Camera Orientation
```

Moving the camera without controlling its target can produce incorrect framing and unwanted rotations.

## 2.3 Progress Is the Source of Truth

Camera state must be reconstructable from normalized scroll progress.

The camera must work correctly when the user:

- scrolls forward
- scrolls backward
- scrolls rapidly
- changes direction repeatedly
- refreshes in the middle of a station
- jumps directly to a chapter

## 2.4 Damping Is Required

Raw scroll values must not be applied directly to the camera.

The camera rig must damp toward a desired pose.

The desired pose is deterministic.

The rendered pose is smoothed.

## 2.5 Camera Motion Must Explain

Camera movement must serve one or more of these purposes:

- reveal an object
- focus on a detail
- communicate scale
- show structural relationships
- guide reading
- create a transition
- establish emotional rhythm

Movement without narrative value should be removed.

---

# 3. Camera Responsibilities

The shared camera system owns:

- camera position
- camera target
- field of view
- optional roll
- interpolation
- station transitions
- mobile adjustments
- reduced-motion adjustments
- viewport adaptation
- debug visualization
- camera restoration after resize
- camera state recovery after refresh

The camera system does not own:

- artifact rotation
- artifact scale
- artifact assembly
- station text
- lighting logic
- scroll section height
- asset loading

---

# 4. High-Level Data Flow

```text
Browser Scroll
      ↓
Global Journey Progress
      ↓
Active Station Resolution
      ↓
Local Station Progress
      ↓
Station Camera Configuration
      ↓
Desired Camera Pose
      ↓
Quality and Accessibility Adjustments
      ↓
Damped Camera Rig
      ↓
Three.js Camera Transform
```

---

# 5. Camera Data Model

## 5.1 Vector Type

```ts
export type Vector3Tuple = readonly [number, number, number];
```

## 5.2 Camera Keyframe

```ts
export type CameraKeyframe = {
  progress: number;
  position: Vector3Tuple;
  target: Vector3Tuple;
  fov?: number;
  roll?: number;
  ease?: CameraEase;
};
```

Rules:

- `progress` must be between `0` and `1`
- keyframes must be sorted
- duplicate progress values are not allowed
- `fov` is optional
- `roll` should usually remain `0`
- all values must be finite

## 5.3 Camera Pose

```ts
export type CameraPose = {
  position: Vector3Tuple;
  target: Vector3Tuple;
  fov: number;
  roll: number;
};
```

## 5.4 Station Camera Configuration

```ts
export type StationCameraConfig = {
  keyframes: CameraKeyframe[];
  mobileKeyframes?: CameraKeyframe[];
  reducedMotionKeyframes?: CameraKeyframe[];
  damping?: Partial<CameraDampingConfig>;
  constraints?: Partial<CameraConstraints>;
};
```

## 5.5 Damping Configuration

```ts
export type CameraDampingConfig = {
  position: number;
  target: number;
  fov: number;
  roll: number;
};
```

Suggested initial values:

```ts
export const defaultCameraDamping: CameraDampingConfig = {
  position: 5,
  target: 6,
  fov: 4,
  roll: 4,
};
```

Values must be tuned by feel and measured behavior.

## 5.6 Camera Constraints

```ts
export type CameraConstraints = {
  minFov: number;
  maxFov: number;
  maxRoll: number;
  maxPositionDeltaPerFrame: number;
  maxTargetDeltaPerFrame: number;
};
```

Suggested defaults:

```ts
export const defaultCameraConstraints: CameraConstraints = {
  minFov: 30,
  maxFov: 55,
  maxRoll: 0.03,
  maxPositionDeltaPerFrame: 2,
  maxTargetDeltaPerFrame: 2,
};
```

---

# 6. Camera Configuration Rules

## 6.1 Keyframe Count

Use the minimum number of keyframes required to describe the intended shot.

Typical station:

```text
Entry
Focus
Exit
```

Complex station:

```text
Entry
Reveal
Detail Focus
Secondary Focus
Hero Pose
Exit
```

Avoid excessive keyframes that create fragile motion.

## 6.2 Keyframe Progress

Keyframe progress is local to the station.

Example:

```ts
const lamassuCamera: StationCameraConfig = {
  keyframes: [
    {
      progress: 0,
      position: [0, 1.4, 7],
      target: [0, 1.6, 0],
    },
    {
      progress: 0.35,
      position: [0.7, 1.8, 5.4],
      target: [0, 2.1, 0],
    },
    {
      progress: 0.72,
      position: [2.2, 1.7, 4.5],
      target: [0, 1.9, 0],
    },
    {
      progress: 1,
      position: [2.6, 2.2, 5.8],
      target: [0, 2.2, 0],
    },
  ],
};
```

## 6.3 Position Units

World units should be treated consistently.

The project uses conceptual meters.

Final asset wrappers normalize imported models to the expected camera scale.

## 6.4 FOV

Field-of-view changes must remain subtle.

Recommended range:

```text
Default: 40 to 45 degrees
Close focus: 32 to 40 degrees
Wide architectural reveal: 42 to 50 degrees
```

Avoid using FOV as a repeated zoom effect.

## 6.5 Roll

Roll should remain zero in almost all cases.

Small roll may be used only when:

- explicitly approved
- extremely subtle
- reversible
- safe in reduced motion

---

# 7. Interpolation

## 7.1 Keyframe Segment Resolution

For local progress `p`:

1. find surrounding keyframes
2. normalize segment progress
3. apply easing
4. interpolate position
5. interpolate target
6. interpolate FOV
7. interpolate roll

## 7.2 Segment Progress

```ts
export function normalizeSegmentProgress(
  value: number,
  start: number,
  end: number
): number {
  if (end <= start) {
    return 0;
  }

  return Math.min(1, Math.max(0, (value - start) / (end - start)));
}
```

## 7.3 Linear Interpolation

Position and target may begin with linear interpolation.

```ts
export function lerpTuple(
  from: Vector3Tuple,
  to: Vector3Tuple,
  t: number
): Vector3Tuple {
  return [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t,
    from[2] + (to[2] - from[2]) * t,
  ];
}
```

## 7.4 Curved Paths

Use spline interpolation only when linear movement produces visible corners.

Approved use cases:

- short orbit
- smooth push around an artifact
- architectural pull-back
- multi-point detail reading

Do not introduce splines by default.

## 7.5 Easing

Use a small approved set.

```ts
export type CameraEase =
  | "linear"
  | "smooth"
  | "ease-in"
  | "ease-out"
  | "ease-in-out";
```

Suggested implementation:

```ts
export function applyCameraEase(
  value: number,
  ease: CameraEase = "smooth"
): number {
  const t = Math.min(1, Math.max(0, value));

  switch (ease) {
    case "linear":
      return t;

    case "ease-in":
      return t * t;

    case "ease-out":
      return 1 - (1 - t) * (1 - t);

    case "ease-in-out":
      return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;

    case "smooth":
    default:
      return t * t * (3 - 2 * t);
  }
}
```

---

# 8. Damping

## 8.1 Desired Pose vs Rendered Pose

The journey computes the desired pose from scroll progress.

The Camera Rig damps the rendered pose toward it.

```text
Scroll Progress
    ↓
Desired Pose
    ↓
Damping
    ↓
Rendered Pose
```

## 8.2 Frame-Rate Independent Damping

Use frame-rate independent damping.

Example:

```ts
export function damp(
  current: number,
  target: number,
  lambda: number,
  delta: number
): number {
  return target + (current - target) * Math.exp(-lambda * delta);
}
```

For vectors, damp each axis or use an existing safe math helper.

## 8.3 Separate Damping Rates

Position and target may use different rates.

Target can settle slightly faster than position when needed for stable focus.

## 8.4 Damping Constraints

Damping must not create:

- excessive lag behind the user's scroll
- overshoot
- visible bounce
- loss of reversibility
- delayed station transitions

The camera should feel connected to scroll, not detached from it.

---

# 9. Camera Orientation

## 9.1 Look Target

After position and target are damped:

```ts
camera.position.copy(position);
camera.lookAt(target);
```

If roll is supported, apply it after the look orientation.

## 9.2 Stable Up Vector

Use a stable up vector:

```ts
camera.up.set(0, 1, 0);
```

Do not modify the up vector per station.

## 9.3 Avoid Singular Framing

Do not place the camera directly above or below the target in a way that creates unstable rotation.

## 9.4 Target Anchors

Each artifact may expose semantic target anchors.

Example:

```ts
export type ArtifactFocusAnchors = {
  center: Vector3Tuple;
  face?: Vector3Tuple;
  wing?: Vector3Tuple;
  inscription?: Vector3Tuple;
  base?: Vector3Tuple;
  capital?: Vector3Tuple;
};
```

Camera configuration should refer to stable normalized anchors where practical.

---

# 10. Station Transition Model

## 10.1 Transition Ownership

The Journey Controller resolves the transition phase.

The Camera Rig resolves the desired pose.

Stations define entry and exit poses.

## 10.2 Transition Overlap

A short overlap may exist between outgoing and incoming stations.

```text
Outgoing Station Exit
          +
Incoming Station Entry
          ↓
Transition Pose
```

## 10.3 Transition Pose Strategies

Approved strategies:

### Direct Blend

Blend from outgoing exit pose to incoming entry pose.

### Shared Match Pose

Both stations define the same transition pose.

### Darkness Reset

During a dark transition, move the camera to the next entry pose while visual content is hidden.

### Object-Matched Transition

Use a visual match while the camera shifts focus between related shapes.

## 10.4 Avoid Visible Teleportation

Large camera changes must be hidden by:

- darkness
- object occlusion
- transition geometry
- controlled crossfade
- sufficient scroll distance

## 10.5 Reverse Transition

The same transition must work backward.

Do not use irreversible callbacks to force the next pose.

---

# 11. Station Camera Profiles

## 11.1 Intro

Primary motion:

- slow forward push
- target shift between words
- minimal FOV reduction
- no orbit

## 11.2 Grand Stairway

Primary motion:

- low-angle forward movement
- gradual upward movement
- upward target shift
- slight side movement near reliefs

## 11.3 Lamassu

Primary motion:

- gentle push-in
- short three-quarter orbit
- focus shift from face to wing
- settle at hero angle

## 11.4 Bull Capital

Primary motion:

- push toward capital
- vertical tilt following assembly
- short orbit during structural reveal
- final stable composition

## 11.5 Relief Panel

Primary motion:

- horizontal pan
- shallow push toward selected figure
- local target changes
- minimal FOV changes

## 11.6 Apadana Column

Primary motion:

- upward tilt
- slight vertical movement
- controlled pull-back for scale

## 11.7 Cuneiform Tablet

Primary motion:

- close-reading push
- small lateral movement
- precise line target shift
- no dramatic orbit

## 11.8 Rhyton

Primary motion:

- mild push-in
- short orbit
- detail focus
- slight pull-back

## 11.9 Lotus Motif

Primary motion:

- short push
- move toward front-facing composition
- minimal movement after symmetry reveal

## 11.10 Gate of All Nations

Primary motion:

- pull-back during assembly
- forward movement toward threshold
- slight upward tilt
- no full entry into a large environment

## 11.11 Immortal Guard

Primary motion:

- slow upper-body push
- mild vertical tilt
- final full-figure pull-back
- deliberate stillness

## 11.12 Outro

Primary motion:

- slow pull-back
- target remains near the final constellation
- minimal FOV widening

---

# 12. Desktop Camera Profile

Desktop may use:

- full approved camera paths
- longer depth movement
- short orbits
- subtle FOV changes
- multiple focus anchors
- wider cinematic framing

Desktop must still avoid:

- excessive travel
- strong roll
- full rotations
- long free-flight behavior

---

# 13. Mobile Camera Profile

## 13.1 Goals

Mobile must preserve the same story with reduced movement complexity.

## 13.2 Mobile Adjustments

Prefer:

- shorter camera travel
- fixed or nearly fixed camera
- artifact rotation instead of camera orbit
- fewer target changes
- reduced FOV changes
- more stable central framing
- labels outside Canvas

## 13.3 Mobile Keyframes

A station may define explicit mobile keyframes.

```ts
const mobileKeyframes: CameraKeyframe[] = [
  {
    progress: 0,
    position: [0, 1.5, 6.2],
    target: [0, 1.6, 0],
  },
  {
    progress: 1,
    position: [0.5, 1.7, 5.3],
    target: [0, 1.9, 0],
  },
];
```

## 13.4 Orientation Changes

On resize or orientation change:

- recompute the desired pose
- preserve station progress
- avoid resetting the journey
- avoid sudden camera jumps
- damp toward the updated pose

---

# 14. Reduced Motion Camera Profile

## 14.1 Requirements

Reduced motion must preserve:

- station order
- artifact focus
- historical content
- chapter navigation
- visual hierarchy

## 14.2 Reduced Motion Behavior

Replace:

- long pushes with short position shifts
- orbit with static three-quarter framing
- deep parallax with opacity
- FOV zoom with simple scale or fade
- multi-point panning with one focus pose

## 14.3 Reduced Keyframes

Each station should define reduced-motion keyframes when the standard path is not appropriate.

```ts
const reducedMotionKeyframes: CameraKeyframe[] = [
  {
    progress: 0,
    position: [0, 1.6, 6],
    target: [0, 1.7, 0],
  },
  {
    progress: 1,
    position: [0, 1.6, 5.6],
    target: [0, 1.7, 0],
  },
];
```

## 14.4 Manual Override

If the interface provides a manual reduced-motion setting, it must take precedence over automatic quality selection.

---

# 15. Direct Chapter Navigation

## 15.1 Behavior

When a user selects a chapter:

1. scroll to the station's HTML section
2. allow progress to update normally
3. let the camera reconstruct from progress
4. do not directly force camera state independently from scroll

## 15.2 Optional Smooth Scroll

Smooth scrolling may be used only when:

- reduced motion is not enabled
- it does not trap the user
- it remains interruptible
- it does not conflict with browser behavior

## 15.3 Reduced Motion Navigation

Use immediate or short-duration scrolling.

---

# 16. Refresh and Restoration

On page refresh:

- derive global progress from document position
- resolve active station
- calculate local station progress
- calculate desired camera pose
- initialize rendered pose close to desired pose
- avoid flying from the default camera position

The initial camera may snap to the desired pose before the first visible frame.

After initialization, normal damping resumes.

---

# 17. Resize Behavior

## 17.1 Viewport Changes

On resize:

- update aspect ratio
- update projection matrix
- resolve desktop or mobile profile
- recalculate desired pose
- preserve current progress
- avoid station reset

## 17.2 Breakpoint Transition

Switching between desktop and mobile profiles should use damping.

Do not teleport the camera unless the screen is hidden during the change.

## 17.3 Text Reflow

Camera framing must not assume fixed text dimensions.

HTML overlays may occupy more space in Persian or on mobile.

---

# 18. Scroll Velocity

## 18.1 Use

Scroll velocity may influence secondary behavior such as:

- motion blur strength if approved
- temporary damping adjustment
- preload priority
- subtle transition intensity

## 18.2 Restrictions

Scroll velocity must not change:

- station order
- final camera pose
- historical content
- accessibility behavior

## 18.3 Fast Scroll

When the user scrolls rapidly:

- desired pose may jump
- rendered camera must damp safely
- no intermediate one-time animation must be required
- loading fallback must prevent blank scenes

---

# 19. Camera Collision

The main journey does not require a general collision system.

Camera positions are authored.

If an imported asset intersects the camera path:

- fix the asset normalization
- adjust camera keyframes
- adjust the focus anchor
- do not add a full collision engine

---

# 20. Development Debug Tools

Development mode should provide optional camera diagnostics.

## 20.1 Debug Overlay

Display:

- global progress
- station ID
- local progress
- scroll direction
- desired position
- rendered position
- desired target
- rendered target
- FOV
- quality profile
- reduced-motion state

## 20.2 Visual Helpers

Optional helpers:

- target sphere
- camera path line
- keyframe markers
- focus anchor markers
- artifact bounding box
- safe framing guides

## 20.3 Debug Controls

Development-only controls may allow:

- copy current camera pose
- freeze progress
- scrub local progress
- switch quality profile
- toggle reduced motion
- show station boundaries
- show world axes

## 20.4 Production

Debug tools must not ship in the production interface.

---

# 21. Camera Authoring Workflow

## Step 1: Use Placeholder Assets

Author the camera using procedural or normalized placeholders.

## Step 2: Define Hero Framing

Choose:

- entry frame
- primary detail frame
- hero frame
- exit frame

## Step 3: Add Minimal Keyframes

Start with three keyframes.

Add more only when necessary.

## Step 4: Test Scroll Reversal

Test the full station backward before polishing.

## Step 5: Test Mobile

Do not derive mobile behavior only by shrinking desktop coordinates.

Author explicit mobile poses when needed.

## Step 6: Test Reduced Motion

Create a complete reduced-motion path.

## Step 7: Replace Final Asset

Verify that the production asset matches the transform contract.

Adjust the wrapper before rewriting camera data.

## Step 8: Profile

Confirm that camera behavior does not trigger expensive unnecessary scene work.

---

# 22. Camera Pose Utilities

Recommended utilities:

```text
clampProgress
normalizeSegmentProgress
findSurroundingKeyframes
applyCameraEase
interpolateCameraPose
resolveCameraProfile
dampCameraPose
validateCameraConfig
```

Suggested API:

```ts
export function resolveDesiredCameraPose({
  config,
  localProgress,
  quality,
  reducedMotion,
}: {
  config: StationCameraConfig;
  localProgress: number;
  quality: QualityProfile;
  reducedMotion: boolean;
}): CameraPose;
```

---

# 23. Camera Rig Example

```tsx
"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { PerspectiveCamera, Vector3 } from "three";

export function CameraRig() {
  const camera = useThree(
    (state) => state.camera
  ) as PerspectiveCamera;

  const renderedPosition = useRef(new Vector3());
  const renderedTarget = useRef(new Vector3());

  const desiredPosition = useMemo(() => new Vector3(), []);
  const desiredTarget = useMemo(() => new Vector3(), []);

  useFrame((_, delta) => {
    const pose = getCurrentDesiredPose();

    desiredPosition.set(...pose.position);
    desiredTarget.set(...pose.target);

    dampVector(
      renderedPosition.current,
      desiredPosition,
      5,
      delta
    );

    dampVector(
      renderedTarget.current,
      desiredTarget,
      6,
      delta
    );

    camera.position.copy(renderedPosition.current);
    camera.fov = damp(
      camera.fov,
      pose.fov,
      4,
      delta
    );

    camera.updateProjectionMatrix();
    camera.lookAt(renderedTarget.current);
  });

  return null;
}
```

This is an architectural example, not a required exact implementation.

The final implementation must avoid unnecessary allocation and repeated projection updates when values do not materially change.

---

# 24. Performance Rules

## 24.1 Per-Frame Allocation

Do not allocate:

- new vectors
- new arrays
- new quaternions
- new objects

inside the frame loop.

## 24.2 Projection Matrix

Update the projection matrix only when:

- FOV changes meaningfully
- aspect changes
- near or far planes change

## 24.3 Camera Helpers

Development helpers must be disabled in production.

## 24.4 Scroll Handlers

Use passive scroll listeners when applicable.

Avoid expensive work in raw scroll events.

## 24.5 State Updates

Do not update React or Zustand state every frame with camera values.

---

# 25. Accessibility Rules

## 25.1 Motion Comfort

Avoid:

- sudden acceleration
- full-screen rapid zoom
- large orbit
- repeated push-pull motion
- strong roll
- camera shake

## 25.2 Reduced Motion

Every station with camera travel must define a reduced alternative.

## 25.3 Focus and Reading

The camera must not move aggressively while long text is expected to be read.

## 25.4 Keyboard Navigation

Chapter navigation must produce a predictable camera state through scroll progress.

---

# 26. Testing Strategy

## 26.1 Unit Tests

Use Vitest for:

- keyframe sorting
- keyframe validation
- segment resolution
- progress normalization
- easing
- pose interpolation
- profile selection
- FOV constraints
- roll constraints
- reduced-motion resolution

## 26.2 Integration Tests

Test:

- active station to camera config mapping
- station-local progress to desired pose
- mobile profile switching
- reduced-motion profile switching
- resize behavior
- refresh restoration
- transition blending

## 26.3 Playwright Tests

Validate milestone states:

- Intro start
- Intro mid-progress
- Grand Stairway hero position
- Lamassu hero angle
- Bull Capital assembly view
- Reverse-scroll restoration
- mobile framing
- reduced-motion framing
- direct chapter navigation

## 26.4 Visual Tolerance

WebGL visual assertions should use stable milestone states.

Avoid frame-exact assertions during active damping.

Wait for camera settling or use a development test mode with deterministic damping.

---

# 27. Camera Validation Checklist

A station camera configuration is accepted when:

- entry frame is readable
- hero artifact is fully visible where required
- important details are not cropped
- target remains stable
- reverse scrolling works
- mobile framing works
- Persian and English text do not cover essential details
- reduced-motion framing works
- FOV remains within limits
- no visible camera teleport occurs
- no artifact intersection occurs
- transition in is coherent
- transition out is coherent
- frame rate remains acceptable
- no per-frame React state updates are introduced

---

# 28. Station Camera Template

```ts
export const stationCameraConfig: StationCameraConfig = {
  keyframes: [
    {
      progress: 0,
      position: [0, 1.5, 7],
      target: [0, 1.5, 0],
      fov: 44,
      ease: "smooth",
    },
    {
      progress: 0.55,
      position: [1.1, 1.8, 5.2],
      target: [0, 1.9, 0],
      fov: 40,
      ease: "ease-in-out",
    },
    {
      progress: 1,
      position: [2.2, 2.1, 5.8],
      target: [0, 2.1, 0],
      fov: 42,
      ease: "smooth",
    },
  ],

  mobileKeyframes: [
    {
      progress: 0,
      position: [0, 1.5, 6.4],
      target: [0, 1.6, 0],
      fov: 46,
    },
    {
      progress: 1,
      position: [0.5, 1.7, 5.6],
      target: [0, 1.8, 0],
      fov: 44,
    },
  ],

  reducedMotionKeyframes: [
    {
      progress: 0,
      position: [0, 1.6, 6],
      target: [0, 1.7, 0],
      fov: 44,
    },
    {
      progress: 1,
      position: [0, 1.6, 5.7],
      target: [0, 1.7, 0],
      fov: 43,
    },
  ],

  damping: {
    position: 5,
    target: 6,
    fov: 4,
  },

  constraints: {
    minFov: 34,
    maxFov: 50,
    maxRoll: 0,
  },
};
```

---

# 29. Common Failure Modes

## Camera Feels Delayed

Possible causes:

- damping too low
- scroll smoothing layered twice
- too many intermediate keyframes
- raw progress filtered excessively

## Camera Feels Jittery

Possible causes:

- direct scroll values applied to transforms
- unstable target
- React state updates
- inconsistent delta handling
- conflicting camera ownership

## Camera Rotates Unexpectedly

Possible causes:

- target crosses camera position
- unstable up vector
- position directly above target
- direct quaternion mutation
- multiple systems mutating camera

## Mobile Framing Is Broken

Possible causes:

- desktop path reused without adaptation
- text overlay not considered
- FOV too narrow
- target too low or high
- artifact wrapper scale mismatch

## Reverse Scroll Breaks

Possible causes:

- one-time timeline callbacks
- hidden local mutable state
- irreversible station mounting logic
- camera pose not derived from progress

---

# 30. Prohibited Camera Behavior

Do not implement:

- free-look controls in the main journey
- OrbitControls for normal user navigation
- full 360-degree camera spins
- camera shake
- aggressive dolly zoom
- extreme FOV animation
- large roll
- collision-driven camera movement
- physics-driven camera movement
- camera changes that only work forward
- station-level direct camera mutation

OrbitControls may be used temporarily in development for authoring, but must not control the production journey.

---

# 31. Initial MVP Camera Plan

## Intro

```text
Start:
Camera near darkness

Middle:
Slow push through typography

End:
Frame first stair edge
```

## Grand Stairway

```text
Start:
Low front view

Middle:
Forward and upward movement

End:
Upper stair frame with side relief
```

## Lamassu

```text
Start:
Centered silhouette

Middle:
Push toward face

End:
Three-quarter hero angle
```

## Bull Capital

```text
Start:
Capital-only frame

Middle:
Vertical structural reveal

End:
Complete assembled structure
```

## Outro

```text
Start:
Close remnant silhouette

End:
Slow pull-back into darkness
```

---

# 32. Recommended First Camera Task

```text
Implement the shared camera foundation for the Persepolis project.

Read:
- AGENTS.md
- docs/SPEC.md
- docs/MOTION_STORYBOARD.md
- docs/ARCHITECTURE.md
- docs/CAMERA_SYSTEM.md
- docs/PERFORMANCE_BUDGET.md
- docs/ACCESSIBILITY.md
- docs/DECISIONS.md

Implement:

1. Typed CameraKeyframe, CameraPose, and StationCameraConfig contracts
2. Camera configuration validation
3. Keyframe segment resolution
4. Camera pose interpolation
5. Separate position and target tracks
6. Frame-rate independent damping
7. Shared CameraRig component
8. Desktop, mobile, and reduced-motion profile resolution
9. Development-only camera diagnostics
10. Unit tests for interpolation and validation
11. One placeholder camera path for Intro and Grand Stairway

Requirements:

- stations must not mutate the camera directly
- scroll reversal must reconstruct the correct desired pose
- no per-frame React or Zustand updates
- no final assets
- no OrbitControls in production
- production build must pass
- update docs/DECISIONS.md only when a new decision is required

At completion:
1. summarize implementation
2. list changed files
3. report lint, typecheck, unit, Playwright, and build results
4. provide an English commit message
```

---

# 33. Summary

The camera system follows this contract:

```text
Scroll defines progress.
Stations define desired framing.
Position and target move independently.
The shared rig owns the real camera.
Damping removes noise.
Quality profiles reduce complexity.
Reduced motion preserves meaning.
Reverse scrolling must always work.
```

The camera is not a free-moving spectator.

It is a controlled narrator.
