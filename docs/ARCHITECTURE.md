# ARCHITECTURE.md

## Project

**Persian Empire 2500**

## Document Status

- **Status:** Draft for implementation
- **Version:** 1.0.0
- **Audience:** Developers, AI coding agents, technical reviewers
- **Related Documents:**
  - `docs/SPEC.md`
  - `docs/MOTION_STORYBOARD.md`
  - `docs/CAMERA_SYSTEM.md`
  - `docs/ASSET_PIPELINE.md`
  - `docs/PERFORMANCE_BUDGET.md`
  - `docs/ACCESSIBILITY.md`
  - `docs/TEST_PLAN.md`
  - `docs/DECISIONS.md`

---

# 1. Architecture Goals

The architecture must support a cinematic, scroll-driven, 3D storytelling experience while remaining modular, performant, accessible, and easy to evolve.

The system must allow the project to begin with procedural placeholders and later replace them with production 3D assets without rewriting the journey logic.

The architecture must prioritize:

- one persistent WebGL canvas
- reversible scroll-driven motion
- independent camera position and target control
- isolated narrative stations
- accessible HTML content
- lazy asset loading
- responsive quality profiles
- mobile and reduced-motion variants
- predictable state ownership
- testable motion logic
- clean separation between story, rendering, content, and infrastructure

---

# 2. Core Architecture Principles

## 2.1 One Persistent WebGL Canvas

The application uses one persistent React Three Fiber canvas for the full journey.

The canvas must not be remounted when the active station changes.

Benefits:

- continuous camera state
- shared renderer and lighting
- smoother transitions
- lower initialization cost
- easier asset preloading
- consistent post-processing
- fewer WebGL context issues

## 2.2 HTML and WebGL Are Separate Layers

The application has two coordinated visual layers:

```text
HTML Interface Layer
├── Titles
├── Historical text
├── Labels
├── Navigation
├── Progress
├── Language controls
├── Sound controls
└── Accessibility fallback

WebGL Experience Layer
├── Camera
├── 3D artifacts
├── Lighting
├── Particles
├── Shadows
└── Post-processing
```

Primary narrative text must remain in semantic HTML.

WebGL must not be required to access the historical content.

## 2.3 Journey Logic Is Data-Driven

Station order, scroll ranges, motion profiles, assets, and camera keyframes are defined in configuration.

Avoid hard-coded station ordering inside components.

## 2.4 Each Station Is Isolated

Every station owns:

- artifact rendering
- local motion mapping
- station-specific lights when needed
- station-specific labels
- local asset dependencies
- mobile behavior
- reduced-motion behavior

A station must not directly mutate another station.

## 2.5 Motion Is Derived from Progress

The main animation model is progress-based.

```text
Global Scroll Progress
        ↓
Active Station Resolution
        ↓
Local Station Progress
        ↓
Camera State
Artifact State
Lighting State
Typography State
Transition State
```

Major animation must be reversible by deriving visual state from normalized progress.

## 2.6 Shared Infrastructure Remains Station-Agnostic

Shared systems such as the camera rig, renderer, quality manager, asset loader, and journey controller must not contain historical content or station-specific assumptions.

---

# 3. High-Level System Diagram

```text
Browser Scroll / Touch / Keyboard
                ↓
         Scroll Adapter
                ↓
     Global Journey Progress
                ↓
        Journey Controller
                ↓
 ┌──────────────┼─────────────────┐
 ↓              ↓                 ↓
Active       Local Station     Scroll Direction
Station      Progress          and Velocity
 ↓              ↓                 ↓
Station       Camera Rig       UI Motion
Lifecycle     Artifact Motion  Transition Control
 ↓              ↓                 ↓
Asset Loader  Lighting Rig     HTML Story Layer
       \         |               /
        \        |              /
         └── Persistent WebGL Canvas
```

---

# 4. Runtime Layers

## 4.1 Application Layer

Responsibilities:

- route handling
- locale resolution
- metadata
- global layout
- page composition
- server-side content preparation where appropriate

Location:

```text
src/app/
```

## 4.2 Experience Layer

Responsibilities:

- persistent Canvas
- renderer setup
- camera rig
- shared lighting
- particle system
- post-processing
- WebGL fallback
- quality-aware rendering behavior

Location:

```text
src/experience/
```

## 4.3 Journey Layer

Responsibilities:

- global progress
- station activation
- station-local progress
- scroll direction
- preload timing
- transition coordination
- navigation between stations
- journey lifecycle

Location:

```text
src/journey/
```

## 4.4 Station Layer

Responsibilities:

- station-specific 3D scene
- station-specific motion mapping
- station-specific artifact state
- station-specific labels and lighting overrides
- station-specific mobile and reduced-motion variants

Location:

```text
src/stations/
```

## 4.5 Interface Layer

Responsibilities:

- title and text presentation
- chapter indicators
- sound control
- locale control
- skip, restart, and navigation controls
- accessible labels
- fallback content

Location:

```text
src/interface/
```

## 4.6 Content Layer

Responsibilities:

- localized titles
- historical copy
- artifact labels
- source references
- extended content

Location:

```text
src/content/
```

## 4.7 Asset Layer

Responsibilities:

- asset manifest
- loader utilities
- preloading
- fallback selection
- quality-specific asset resolution
- shared material and texture registration

Location:

```text
src/assets/
```

## 4.8 Shared Store Layer

Responsibilities:

- lightweight shared journey state
- locale
- sound preference
- quality profile
- reduced-motion preference
- active station metadata

Location:

```text
src/store/
```

Per-frame transform values must not be stored in global React state.

---

# 5. Recommended Repository Structure

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   └── not-found.tsx
├── experience/
│   ├── ExperienceCanvas.tsx
│   ├── SceneRoot.tsx
│   ├── CameraRig.tsx
│   ├── LightingRig.tsx
│   ├── ParticleField.tsx
│   ├── PostProcessing.tsx
│   ├── QualityController.tsx
│   ├── VisibilityController.tsx
│   ├── WebGLErrorBoundary.tsx
│   └── WebGLFallback.tsx
├── journey/
│   ├── JourneyProvider.tsx
│   ├── JourneyController.tsx
│   ├── JourneyViewport.tsx
│   ├── journey.config.ts
│   ├── journey.types.ts
│   ├── progress.ts
│   ├── useGlobalProgress.ts
│   ├── useStationProgress.ts
│   ├── useScrollDirection.ts
│   └── useStationLifecycle.ts
├── stations/
│   ├── intro/
│   │   ├── IntroStation.tsx
│   │   ├── intro.config.ts
│   │   ├── intro.motion.ts
│   │   └── intro.types.ts
│   ├── grand-stairway/
│   ├── lamassu/
│   ├── bull-capital/
│   ├── relief-panel/
│   ├── apadana-column/
│   ├── cuneiform/
│   ├── rhyton/
│   ├── lotus/
│   ├── gate-of-all-nations/
│   ├── immortal-guard/
│   └── outro/
├── interface/
│   ├── StoryLayer.tsx
│   ├── StorySection.tsx
│   ├── StoryText.tsx
│   ├── ArtifactLabels.tsx
│   ├── ChapterProgress.tsx
│   ├── JourneyNavigation.tsx
│   ├── LanguageToggle.tsx
│   ├── SoundToggle.tsx
│   ├── SkipIntroButton.tsx
│   └── RestartButton.tsx
├── assets/
│   ├── asset-manifest.ts
│   ├── asset.types.ts
│   ├── loaders.ts
│   ├── preload.ts
│   ├── quality-resolver.ts
│   └── fallbacks.ts
├── content/
│   ├── content.types.ts
│   ├── en.ts
│   ├── fa.ts
│   └── sources.ts
├── store/
│   └── journey.store.ts
├── config/
│   ├── quality.config.ts
│   ├── performance.config.ts
│   ├── lighting.config.ts
│   └── accessibility.config.ts
├── lib/
│   ├── math/
│   ├── animation/
│   ├── browser/
│   └── assertions/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/

public/
└── assets/
    ├── models/
    ├── textures/
    ├── audio/
    └── fallback/

docs/
├── SPEC.md
├── MOTION_STORYBOARD.md
├── ARCHITECTURE.md
├── CAMERA_SYSTEM.md
├── ASSET_PIPELINE.md
├── PERFORMANCE_BUDGET.md
├── ACCESSIBILITY.md
├── CONTENT_GUIDE.md
├── TEST_PLAN.md
├── ROADMAP.md
└── DECISIONS.md
```

---

# 6. Application Composition

The main page should compose the HTML journey and WebGL experience as sibling layers.

```tsx
export default function JourneyPage() {
  return (
    <JourneyProvider>
      <main>
        <ExperienceCanvas />
        <StoryLayer />
        <JourneyNavigation />
      </main>
    </JourneyProvider>
  );
}
```

The Canvas remains fixed.

The HTML story provides the scroll height.

```text
Page
├── Fixed Experience Canvas
├── Scrollable Story Sections
└── Fixed Minimal Controls
```

---

# 7. Journey Progress Model

## 7.1 Global Progress

Global journey progress is normalized between `0` and `1`.

```ts
export type NormalizedProgress = number;
```

The scroll adapter converts document scroll position into normalized progress.

```ts
globalProgress = clamp(
  scrollTop / maxScrollableDistance,
  0,
  1
);
```

## 7.2 Station Range

Every station defines a global progress range.

```ts
export type StationRange = {
  start: number;
  end: number;
};
```

## 7.3 Local Progress

Local station progress is normalized between `0` and `1`.

```ts
export function normalizeStationProgress(
  globalProgress: number,
  start: number,
  end: number
): number {
  if (end <= start) {
    return 0;
  }

  return Math.min(
    1,
    Math.max(0, (globalProgress - start) / (end - start))
  );
}
```

## 7.4 Active Station Resolution

The active station is the station whose range contains the current global progress.

At range boundaries, the journey controller may preserve the previous station briefly to support cross-fades.

## 7.5 Direction

Scroll direction is derived from current and previous progress.

```ts
export type ScrollDirection = "forward" | "backward" | "idle";
```

Direction may influence preload priorities and transition behavior, but visual state must still be derived from progress.

---

# 8. Station Configuration

## 8.1 Station Contract

```ts
export type MotionProfile =
  | "typography"
  | "assembly"
  | "orbit"
  | "light-sweep"
  | "close-reading"
  | "radial-reveal"
  | "heroic-reveal";

export type MobileProfile =
  | "full"
  | "simplified"
  | "static-focus";

export type StationConfig = {
  id: string;
  index: number;
  range: {
    start: number;
    end: number;
  };
  titleKey: string;
  descriptionKey: string;
  assetKey: string;
  motionProfile: MotionProfile;
  mobileProfile: MobileProfile;
  preloadOffset: number;
  camera: StationCameraConfig;
  lighting?: StationLightingConfig;
};
```

## 8.2 Station Runtime Context

```ts
export type StationRuntimeContext = {
  globalProgress: number;
  localProgress: number;
  direction: ScrollDirection;
  quality: QualityProfile;
  reducedMotion: boolean;
  isActive: boolean;
  isPreloaded: boolean;
};
```

## 8.3 Station Render Contract

Each station receives runtime data and renders its artifact.

```tsx
type StationProps = {
  runtime: StationRuntimeContext;
};

export function LamassuStation({ runtime }: StationProps) {
  const state = getLamassuMotionState(runtime);

  return <LamassuArtifact state={state} />;
}
```

Station motion state should be calculated outside the render tree when practical.

---

# 9. Station Lifecycle

Each station can be in one of these lifecycle states:

```text
unloaded
preloading
ready
active
leaving
cached
disposed
```

## 9.1 Preloading

The next station begins loading before its visual range starts.

Preloading may use:

- current progress
- scroll direction
- station preload offset
- asset size
- connection quality

## 9.2 Active Window

At runtime, the system should prefer keeping:

```text
previous station
current station
next station
```

available when memory permits.

## 9.3 Disposal

A distant station may release:

- geometry
- textures
- animation resources
- local caches

Shared resources must not be disposed while still referenced.

## 9.4 Transition Overlap

During transitions, both outgoing and incoming stations may be visible.

The overlap must be explicit and short.

Do not rely on accidental React mount timing.

---

# 10. Persistent WebGL Architecture

## 10.1 Experience Canvas

Responsibilities:

- create the renderer
- configure color management
- configure DPR
- host camera and scene
- provide suspense and error boundaries
- coordinate shared effects

Example composition:

```tsx
export function ExperienceCanvas() {
  return (
    <WebGLErrorBoundary fallback={<WebGLFallback />}>
      <Canvas>
        <SceneRoot />
      </Canvas>
    </WebGLErrorBoundary>
  );
}
```

## 10.2 Scene Root

```text
SceneRoot
├── CameraRig
├── LightingRig
├── ParticleField
├── ActiveStations
├── SharedEnvironment
└── PostProcessing
```

## 10.3 Renderer Configuration

Renderer configuration must be centralized.

Do not define renderer options inside individual stations.

Configuration may include:

- antialias
- power preference
- output color space
- tone mapping
- adaptive DPR
- shadow map type
- alpha behavior

---

# 11. Camera Architecture

The camera is shared across all stations.

The camera rig owns:

- current camera position
- current target
- FOV interpolation
- optional roll
- damping
- quality-specific limits
- reduced-motion behavior

## 11.1 Camera State Source

The active station contributes camera keyframes.

The camera rig resolves the desired camera state from:

```text
active station
local progress
quality profile
reduced-motion preference
viewport profile
```

## 11.2 Position and Target

Position and target are separate tracks.

```ts
export type CameraPose = {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  roll: number;
};
```

## 11.3 Interpolation

Camera motion uses damped interpolation.

Do not directly assign raw scroll-derived values to the camera each frame.

## 11.4 Camera Ownership

Stations define desired poses.

The shared camera rig applies them.

Stations must not directly mutate the Three.js camera.

---

# 12. Motion Architecture

## 12.1 Pure Motion Mapping

Where practical, motion mapping is implemented as pure functions.

```ts
export type ArtifactMotionState = {
  visibility: number;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  focus: number;
  assemblyProgress?: number;
  highlightProgress?: number;
};
```

Example:

```ts
export function getLamassuMotionState(
  runtime: StationRuntimeContext
): ArtifactMotionState {
  const p = runtime.localProgress;

  return {
    visibility: smoothstep(0.05, 0.2, p),
    position: [0, 0, 0],
    rotation: [0, lerp(-0.2, 0.5, p), 0],
    scale: lerp(0.92, 1, p),
    focus: smoothstep(0.25, 0.65, p),
  };
}
```

Benefits:

- reversible behavior
- unit testability
- deterministic state
- easier debugging
- fewer GSAP side effects

## 12.2 GSAP Responsibilities

GSAP may be used for:

- scroll integration
- HTML typography sequences
- smooth property transitions
- controlled timeline composition
- transition coordination

GSAP must not become the only source of truth for journey state.

## 12.3 No One-Time Motion Dependencies

Core visuals must not depend only on:

- `onEnter`
- `onLeave`
- one-time setup callbacks
- mutation-only animation state

The final visual state must be reconstructable from progress.

---

# 13. HTML Story Architecture

Each station has a corresponding semantic HTML section.

```tsx
<section
  id="station-lamassu"
  data-station="lamassu"
  aria-labelledby="station-lamassu-title"
>
  <h2 id="station-lamassu-title">
    The Guardian of All Nations
  </h2>

  <p>
    Historical narrative...
  </p>
</section>
```

## 13.1 Story Sections

Story sections determine scroll length.

The WebGL station does not own document height.

## 13.2 Animated Typography

Visual word-level animation may use child spans.

The full sentence must remain accessible through semantic text or `aria-label`.

## 13.3 Labels

Artifact labels should remain HTML where possible.

Labels may be projected from 3D world coordinates to screen coordinates.

The projection system must:

- hide labels behind the camera
- handle viewport changes
- avoid excessive per-frame React updates
- simplify or relocate labels on mobile

---

# 14. State Management

## 14.1 Zustand Store

The shared store should remain small.

```ts
export type JourneyState = {
  globalProgress: number;
  activeStationId: string;
  activeStationIndex: number;
  direction: ScrollDirection;
  locale: "fa" | "en";
  quality: QualityProfile;
  soundEnabled: boolean;
  reducedMotion: boolean;
  introSkipped: boolean;
};
```

## 14.2 What Belongs in the Store

Store:

- active station
- current locale
- current quality profile
- user controls
- global progress metadata
- sound preference
- reduced-motion state

## 14.3 What Does Not Belong in the Store

Do not store:

- mesh position every frame
- camera transform every frame
- particle positions
- temporary interpolation values
- material opacity every frame
- animation timeline internals

Use refs or local motion controllers for those values.

---

# 15. Asset Architecture

## 15.1 Central Asset Manifest

All runtime asset references must come from a centralized manifest.

```ts
export type AssetVariant = {
  high?: string;
  standard?: string;
  mobile?: string;
  fallback?: string;
};

export type ArtifactAssetEntry = {
  model: AssetVariant;
  poster?: string;
  textures?: Record<string, AssetVariant>;
};
```

Example:

```ts
export const assetManifest = {
  lamassu: {
    model: {
      high: "/assets/models/lamassu_lod0.glb",
      standard: "/assets/models/lamassu_lod1.glb",
      mobile: "/assets/models/lamassu_lod2.glb",
      fallback: "/assets/fallback/lamassu.webp",
    },
  },
} satisfies Record<string, ArtifactAssetEntry>;
```

## 15.2 Quality Resolution

The asset resolver selects the best variant for the active quality profile.

## 15.3 Placeholder Compatibility

Placeholder and final assets must use compatible transforms.

Each artifact wrapper should define:

- scale contract
- origin contract
- orientation contract
- placement anchor
- bounding box expectations

## 15.4 Shared Asset Cache

Use Drei and Three.js caching carefully.

Shared assets should not be loaded repeatedly.

---

# 16. Quality Architecture

## 16.1 Quality Profiles

```ts
export type QualityProfile =
  | "high"
  | "standard"
  | "mobile"
  | "reduced";
```

## 16.2 Selection Inputs

Quality may be selected using:

- viewport size
- device pixel ratio
- hardware concurrency
- GPU capability where available
- frame-rate sampling
- reduced-motion preference

## 16.3 Quality Responsibilities

A profile may control:

- DPR
- model LOD
- texture resolution
- particle count
- shadow resolution
- active lights
- post-processing
- volumetric effects
- station motion complexity

## 16.4 Adaptive Downgrade

If runtime performance remains below target for a sustained period, the system may move to a lower quality profile.

Automatic quality upgrades should be conservative.

---

# 17. Accessibility Architecture

Accessibility is built into the system, not added at the end.

## 17.1 Reduced Motion

Reduced motion uses the same station sequence and content.

It replaces:

- long camera travel with short focus transitions
- orbit with limited rotation or fade
- assembly with staged visibility
- deep typography movement with simple reveals
- complex transitions with brief dissolves

## 17.2 WebGL Fallback

If WebGL is unavailable:

```text
Static Artifact Image
+ Station Title
+ Historical Text
+ Chapter Navigation
```

The complete story remains usable.

## 17.3 Keyboard Navigation

Provide accessible controls for:

- next chapter
- previous chapter
- skip intro
- restart journey
- toggle sound
- switch locale

## 17.4 Screen Reader Path

All historical text exists in semantic HTML.

Decorative canvas content should not create redundant screen-reader noise.

---

# 18. Internationalization Architecture

Supported locales:

```text
fa
en
```

## 18.1 Routing

Recommended routes:

```text
/fa
/en
```

## 18.2 Content Access

```ts
export type StationContent = {
  title: string;
  lead: string;
  description: string;
  labels: string[];
  sourceIds: string[];
};
```

Station components receive content through locale-aware selectors.

Do not duplicate station components per language.

## 18.3 Layout Direction

The interface layer supports RTL and LTR.

The 3D composition remains mostly shared, but screen labels may need mirrored placement.

---

# 19. Audio Architecture

Audio is optional.

The experience must be complete without sound.

## 19.1 Audio Controller

A shared audio controller manages:

- user activation
- mute state
- ambient layer
- station accent sounds
- transition sounds
- fade-in and fade-out

## 19.2 Browser Policy

Audio begins only after user interaction.

No audible autoplay.

## 19.3 Station Integration

Stations may request sound cues through a shared interface.

Stations must not instantiate independent audio systems.

---

# 20. Error Handling Architecture

## 20.1 WebGL Boundary

Wrap the WebGL experience in an error boundary.

## 20.2 Asset Failure

If an artifact fails to load:

1. log the failure
2. render fallback geometry or image
3. preserve text
4. continue the journey

## 20.3 Station Isolation

A failure in one station must not break the entire page.

## 20.4 User-Facing Errors

Do not expose stack traces.

Show concise fallback messaging.

---

# 21. Performance Architecture

Performance is enforced by design.

## 21.1 Active Scene Budget

Prefer:

```text
1 hero artifact
1 outgoing artifact during transition
1 incoming artifact during transition
shared lights
shared particles
```

## 21.2 Loading Budget

Only critical intro and first-station assets are loaded initially.

## 21.3 Render Budget

Minimize:

- draw calls
- shadow casters
- material count
- transparent layers
- post-processing passes
- per-frame allocations
- React state updates during animation

## 21.4 Visibility Management

When the document is hidden:

- pause idle animation
- reduce or stop rendering
- suspend nonessential audio
- preserve journey state

---

# 22. Testing Architecture

## 22.1 Unit Tests

Pure functions should cover:

- progress normalization
- active station selection
- local station progress
- direction detection
- motion state mapping
- quality profile selection
- asset variant resolution
- locale content validation

## 22.2 Integration Tests

Test:

- journey controller and station lifecycle
- progress to camera-state mapping
- fallback asset selection
- reduced-motion configuration
- locale switching

## 22.3 Playwright

Test:

- page load
- intro visibility
- forward scrolling
- reverse scrolling
- station transitions
- mobile layout
- reduced motion
- language switching
- sound controls
- WebGL fallback
- no horizontal overflow

## 22.4 Visual Regression

Use a small set of stable milestone states.

Avoid screenshotting every animation frame.

---

# 23. Logging and Observability

Log only actionable runtime events.

Examples:

- asset load failure
- unsupported WebGL
- quality downgrade
- station initialization failure
- unexpected missing content key

Avoid per-frame logs.

Production monitoring should not collect unnecessary personal data.

---

# 24. Dependency Boundaries

## 24.1 Allowed Dependency Direction

```text
app
↓
journey
↓
experience and stations
↓
assets, content, config, lib
```

The interface may read journey state but must not directly mutate Three.js objects.

Stations may depend on shared experience contracts but must not depend on other stations.

## 24.2 Forbidden Coupling

Avoid:

- stations importing other stations
- content importing rendering code
- asset manifest importing station components
- interface components mutating camera refs
- camera rig containing historical copy
- store containing live Three.js objects

---

# 25. Architectural Decision Records

Important decisions must be recorded in `docs/DECISIONS.md`.

Required ADR topics include:

- persistent Canvas
- progress-derived motion
- camera ownership
- station lifecycle
- asset compression
- quality-tier strategy
- reduced-motion behavior
- WebGL fallback
- audio library choice if added
- any new major dependency

---

# 26. MVP Architecture

The MVP includes:

```text
Intro
Grand Stairway
Lamassu
Bull Capital
Minimal Outro
```

The MVP must implement:

- persistent Canvas
- global progress
- station-local progress
- reversible animation
- shared camera rig
- basic quality profiles
- reduced-motion path
- lazy station loading
- HTML story sections
- asset manifest
- fallback experience
- automated smoke tests

The MVP must not depend on final Blender assets.

---

# 27. Architecture Acceptance Criteria

The architecture is acceptable when:

- only one Canvas exists
- stations are isolated
- camera state is shared and data-driven
- position and target are independent
- scroll reversal works
- motion state is reconstructable from progress
- HTML content remains accessible
- mobile behavior is explicit
- reduced-motion behavior is explicit
- assets are loaded through the manifest
- placeholder assets can be replaced without changing journey logic
- one station failure does not crash the journey
- distant heavy assets can be unloaded
- performance budgets are enforceable
- motion logic is testable without WebGL
- project documentation matches implementation

---

# 28. Example End-to-End Data Flow

```text
User scrolls
    ↓
Scroll adapter calculates global progress
    ↓
Journey controller resolves active station
    ↓
Journey controller calculates local progress
    ↓
Station motion function calculates artifact state
    ↓
Camera config calculates desired camera pose
    ↓
Camera rig damps toward desired pose
    ↓
Lighting rig applies station lighting profile
    ↓
Artifact renderer applies transform and material state
    ↓
HTML story layer updates title, text, and labels
    ↓
Asset loader preloads the next station
```

---

# 29. Recommended First Implementation Order

1. Create the persistent Canvas.
2. Create global normalized progress.
3. Define station configuration.
4. Resolve active station and local progress.
5. Create shared camera rig.
6. Implement placeholder Intro.
7. Implement placeholder Grand Stairway.
8. Add reversible transition behavior.
9. Add mobile quality profile.
10. Add reduced-motion profile.
11. Add asset manifest and preloader.
12. Add WebGL fallback.
13. Add Vitest coverage.
14. Add Playwright smoke tests.
15. Record architectural decisions.

---

# 30. Summary

The project is built around a strict separation of responsibilities:

```text
Scroll controls progress.
Journey controls sequence.
Stations control local meaning.
Camera controls attention.
Lighting controls discovery.
HTML controls readable narrative.
Assets remain replaceable.
Performance rules control ambition.
```

The architecture should make the experience feel cinematic while keeping the implementation understandable, testable, and sustainable.
