# Persian Empire 2500

## Product Specification

**Document:** `SPEC.md`  
**Status:** Draft for implementation  
**Version:** 1.0.0  
**Primary Language:** English  
**Supported Experience Languages:** Persian and English  
**Project Type:** Scroll-driven cinematic 3D storytelling website

---

## 1. Product Summary

**Persian Empire 2500** is an interactive web experience that introduces selected architectural and cultural elements of Persepolis through cinematic scroll-based storytelling.

The project is not a virtual tour and does not attempt to reconstruct the entire archaeological site. Instead, it presents a curated sequence of individual artifacts and architectural elements inside a dark, minimal, museum-like digital environment.

Each chapter combines:

- 3D objects
- controlled camera movement
- scroll-driven animation
- dynamic lighting
- animated typography
- concise historical storytelling
- synchronized transitions
- optional ambient sound

The experience should feel immersive and alive without requiring a large real-time environment, free-roaming navigation, or complex terrain.

---

## 2. Product Vision

Create a premium, emotionally engaging, and technically polished digital experience that allows users to discover Persepolis one object at a time.

The project should communicate that Persepolis is more than a collection of ruins. Every object, carving, column, and inscription carries part of a larger historical narrative.

### Vision Statement

> Transform historical artifacts into a cinematic digital story where movement, light, and interaction reveal meaning.

---

## 3. Product Goals

### 3.1 Primary Goals

- Present Persepolis through a curated sequence of 3D artifacts.
- Use scroll as the primary narrative control.
- Make each artifact feel distinct through a unique motion behavior.
- Deliver a high-quality desktop experience with a simplified but complete mobile version.
- Keep the project feasible for a developer-led implementation.
- Maintain strong performance despite real-time 3D rendering.
- Support both Persian and English content.
- Build the architecture so placeholder geometry can later be replaced by production assets without changing journey logic.

### 3.2 Secondary Goals

- Demonstrate advanced front-end engineering skills.
- Serve as a portfolio-grade showcase for WebGL, animation, and performance engineering.
- Create a foundation that can later support more artifacts, historical chapters, or other Iranian heritage experiences.
- Provide optional educational context without turning the experience into a dense article.

---

## 4. Non-Goals

The first production version will not include:

- A full reconstruction of Persepolis
- A desert, mountain, or large terrain environment
- Free-roaming first-person navigation
- Game mechanics
- Character movement
- User accounts
- User-generated content
- Multiplayer features
- Complex physics
- Full archaeological simulation
- Full VR support
- Real-time global illumination
- Procedural world generation
- A complete database of Achaemenid artifacts
- Native mobile applications

---

## 5. Target Audience

### 5.1 Primary Audience

- General audiences interested in history, culture, and visual storytelling
- Designers and developers interested in interactive web experiences
- Iranian and international users who want a modern introduction to Persepolis
- Portfolio reviewers, agencies, and technical recruiters

### 5.2 Secondary Audience

- Students
- Teachers
- Museums and cultural organizations
- Tourism and cultural media platforms
- Digital humanities researchers

---

## 6. Core Experience Principles

### 6.1 Guided, Not Freeform

The user controls the speed of the story through scrolling, but the project controls:

- chapter order
- camera framing
- focus points
- timing relationships
- visual hierarchy
- object transitions

### 6.2 One Main Artifact at a Time

Only one artifact should act as the visual focus in each station.

Background elements may support the composition, but they must not compete with the primary object.

### 6.3 One Motion Hero per Station

Each chapter must have one dominant motion concept.

Examples:

- sequential assembly
- controlled orbit
- close reading
- light sweep
- radial reveal
- architectural construction
- heroic stillness

### 6.4 Motion Must Explain

Animation must reveal structure, meaning, scale, function, or detail.

Decorative movement without narrative value should be minimized.

### 6.5 Calm but Alive

The experience should feel dynamic without becoming chaotic.

The visual rhythm should prioritize:

- deliberate motion
- controlled pacing
- readable text
- smooth transitions
- subtle idle movement
- dramatic pauses

---

## 7. Experience Structure

The complete planned experience contains:

1. Intro
2. Grand Stairway
3. Lamassu
4. Bull Capital
5. Delegation Relief Panel
6. Apadana Column
7. Cuneiform Tablet
8. Achaemenid Rhyton
9. Lotus Motif
10. Gate of All Nations
11. Immortal Guard
12. Outro

### 7.1 Recommended Scroll Distribution

```text
Intro                       0% to 8%
Grand Stairway              8% to 17%
Lamassu                     17% to 27%
Bull Capital                27% to 37%
Delegation Relief Panel     37% to 47%
Apadana Column              47% to 57%
Cuneiform Tablet            57% to 66%
Achaemenid Rhyton           66% to 75%
Lotus Motif                 75% to 83%
Gate of All Nations         83% to 92%
Immortal Guard              92% to 98%
Outro                       98% to 100%
```

The exact percentages may change after motion testing.

---

## 8. MVP Scope

The MVP should validate the technical and visual foundation before all stations are implemented.

### 8.1 MVP Chapters

1. Intro
2. Grand Stairway
3. Lamassu
4. Bull Capital
5. Minimal Outro

### 8.2 MVP Goals

The MVP must validate:

- scroll synchronization
- reversible animation
- camera smoothing
- camera target interpolation
- typography motion
- artifact transitions
- lazy loading
- desktop and mobile quality profiles
- reduced motion behavior
- initial loading experience
- performance budget
- architecture for replacing placeholder assets

### 8.3 MVP Asset Strategy

Use procedural placeholders wherever possible.

```text
Grand Stairway
- BoxGeometry
- InstancedMesh or generated merged geometry

Lamassu
- Temporary low-detail GLB or simplified placeholder volume

Bull Capital
- Primitive placeholder groups or temporary GLB

Intro
- HTML typography and light particles

Outro
- Reused silhouettes and typography
```

Final historical assets are not required for MVP approval.

---

## 9. Full Station Requirements

---

### 9.1 Intro

**Purpose:** Establish mystery, tone, and the relationship between stone and memory.

**Motion Hero:** Typographic depth and displacement.

**Required Behaviors:**

- Start from near-total darkness.
- Introduce words at different virtual depths.
- Move the camera gently toward and between selected words.
- Allow key words to separate and leave the frame.
- Reveal the first artifact through the negative space created by the typography.
- Keep the full sentence accessible to screen readers.

**Suggested Line:**

> Stone remembers what time cannot erase.

---

### 9.2 Grand Stairway

**Purpose:** Introduce ceremony, order, and architectural movement.

**Motion Hero:** Sequential assembly.

**Required Behaviors:**

- Reveal one step first.
- Assemble additional steps progressively.
- Add side structures and relief areas.
- Move the camera forward and slightly upward.
- Reveal relief detail with directional light.
- End at a strong upper-stair composition.

---

### 9.3 Lamassu

**Purpose:** Present the guardian as a combination of intelligence, strength, and vigilance.

**Motion Hero:** Controlled orbit.

**Required Behaviors:**

- Begin as a silhouette.
- Reveal the face before the body.
- Reveal the wings with a separate light pass.
- Rotate the model or camera between approximately 25 and 45 degrees.
- Introduce minimal symbolic labels.
- End in a strong three-quarter hero angle.

---

### 9.4 Bull Capital

**Purpose:** Explain the relationship between art and structural engineering.

**Motion Hero:** Exploded assembly.

**Required Behaviors:**

- Present the capital separately.
- Reveal connector and column sections below it.
- Build the shaft upward.
- Introduce a simplified roof beam.
- Assemble the complete structural relationship.
- Show concise labels for load support and architectural function.

---

### 9.5 Delegation Relief Panel

**Purpose:** Introduce diplomacy, diversity, ceremonial representation, and carved storytelling.

**Motion Hero:** Light sweep and guided focus.

**Required Behaviors:**

- Reveal the panel with grazing side light.
- Pan slowly across the surface.
- Highlight one delegation at a time.
- Dim non-focused areas without hiding context.
- Display concise labels for dress, offerings, or identity.
- Return to the complete composition before transition.

---

### 9.6 Apadana Column

**Purpose:** Communicate scale, repetition, and architectural grandeur.

**Motion Hero:** Vertical construction and pull-back.

**Required Behaviors:**

- Begin with the base.
- Grow or assemble the shaft.
- Position the capital.
- Pull the camera backward.
- Reveal additional columns through instancing.
- Introduce one clear scale fact.

---

### 9.7 Cuneiform Tablet

**Purpose:** Shift from monumental architecture to written memory.

**Motion Hero:** Close reading.

**Required Behaviors:**

- Reveal the tablet from moderate distance.
- Move closer to the inscription.
- Highlight one line at a time.
- Show a translated phrase or interpretive summary.
- Use side lighting to emphasize carved depth.
- Provide a readable text transcript outside the WebGL canvas.

---

### 9.8 Achaemenid Rhyton

**Purpose:** Present craftsmanship, ritual, luxury, and material detail.

**Motion Hero:** Controlled rotation and reflected light.

**Required Behaviors:**

- Reveal the silhouette through a moving highlight.
- Rotate the object gradually.
- Focus on the animal form and decorative details.
- Use a simplified reflective environment.
- End in a museum-style hero composition.

---

### 9.9 Lotus Motif

**Purpose:** Create a visual pause centered on symmetry and symbolic order.

**Motion Hero:** Radial reveal.

**Required Behaviors:**

- Begin from a central bud.
- Reveal petals in layers.
- Move toward a front-facing composition.
- Briefly reveal the motif's geometry and symmetry.
- Show a short explanation of symbolic use.
- End in stillness.

---

### 9.10 Gate of All Nations

**Purpose:** Present the gate as a ceremonial and political threshold.

**Motion Hero:** Architectural assembly.

**Required Behaviors:**

- Assemble the base and steps.
- Raise major wall and pillar components.
- Position guardian figures.
- Complete the gate opening.
- Move the camera toward the threshold.
- Frame a distant point of light through the architecture.

---

### 9.11 Immortal Guard

**Purpose:** End the main artifact sequence with human presence, discipline, and continuity.

**Motion Hero:** Heroic reveal and stillness.

**Required Behaviors:**

- Begin as a silhouette.
- Reveal the spear, face, clothing, and equipment.
- Move closer to the upper body.
- Introduce minimal symbolic labels.
- Pull back to a full-figure composition.
- End with deliberate stillness.

---

### 9.12 Outro

**Purpose:** Provide reflection, closure, and optional continuation.

**Required Behaviors:**

- Return to near-black.
- Briefly show faint echoes of previous artifacts.
- Display the final statement.
- Pull the camera backward slowly.
- Provide optional actions:
  - restart journey
  - explore artifact index
  - view historical sources
  - toggle sound
  - switch language

**Suggested Final Line:**

> What remains is not only stone. It is the memory of a world.

---

## 10. User Experience Requirements

### 10.1 Primary Input

- Mouse wheel
- Trackpad scrolling
- Touch scrolling
- Keyboard page navigation where practical

### 10.2 Scroll Behavior

- All major animations must respond to scroll progress.
- Major sequences must be reversible.
- Scrolling backward must restore the previous visual state correctly.
- Animation must not depend only on one-time callbacks.
- Scroll input must be smoothed without creating noticeable lag.
- The user must not become trapped inside a station.

### 10.3 Progress Feedback

The interface should include a subtle chapter progress system.

Possible elements:

- chapter number
- total chapter count
- current chapter title
- progress line or minimal indicator

The progress UI must not dominate the visual experience.

### 10.4 Skip and Restart

The user should be able to:

- skip the introduction
- restart the journey
- jump to the artifact index after the journey
- access the current chapter from the navigation system

---

## 11. Camera Requirements

### 11.1 Camera Model

The camera must support independently animated:

- position
- target
- field of view
- optional roll
- station-level interpolation

### 11.2 Camera Movement Types

Allowed:

- slow push-in
- slow pull-back
- short orbit
- horizontal pan
- vertical tilt
- focus target shift
- subtle field-of-view adjustment

Avoid:

- rapid camera movement
- full 360-degree orbit
- uncontrolled free flight
- repeated dramatic zooms
- large camera roll
- artificial shake

### 11.3 Camera Data Contract

```ts
export type CameraKeyframe = {
  progress: number;
  position: [number, number, number];
  target: [number, number, number];
  fov?: number;
  roll?: number;
};

export type StationCameraConfig = {
  entry: CameraKeyframe;
  focus: CameraKeyframe[];
  exit: CameraKeyframe;
};
```

### 11.4 Camera Smoothing

Use damped interpolation.

Raw scroll values must not be applied directly to camera transforms.

### 11.5 Mobile Camera Behavior

On mobile:

- shorten camera travel
- prefer rotating the artifact instead of orbiting the camera
- reduce field-of-view changes
- avoid deep perspective movement behind text
- keep labels outside the canvas

---

## 12. Artifact Motion Requirements

Every artifact should expose a consistent motion state.

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

Each station maps local normalized progress from `0` to `1` into the artifact state.

### 12.1 Artifact Rules

- No uncontrolled continuous spinning.
- No visible animation loops that distract from reading.
- Idle motion must remain extremely subtle.
- Assembly should use predictable easing.
- Artifact orientation must remain historically and visually coherent.
- Placeholder assets and final assets must use compatible transform contracts.

---

## 13. Typography Requirements

### 13.1 Rendering

Primary narrative text must remain HTML.

Do not render essential text as WebGL textures.

### 13.2 Supported Motion

- opacity
- translate X
- translate Y
- scale
- blur
- letter spacing
- word-level masking
- depth illusion
- staggered word reveal

### 13.3 Accessibility

Animated word groups must preserve a complete accessible sentence.

Example:

```html
<p aria-label="Stone remembers what time cannot erase.">
  <span aria-hidden="true">Stone</span>
  <span aria-hidden="true">remembers</span>
  <span aria-hidden="true">what time</span>
  <span aria-hidden="true">cannot erase.</span>
</p>
```

### 13.4 Content Length

Each station should contain:

- one title
- one short lead sentence
- one concise explanatory paragraph
- up to three labels or facts

Long-form historical content should be available through an optional detail panel or artifact index.

---

## 14. Visual Direction

### 14.1 Overall Style

- dark museum-like environment
- warm stone and gold highlights
- minimal interface
- cinematic lighting
- strong negative space
- restrained particles
- premium editorial typography
- realistic but not excessively glossy materials

### 14.2 Suggested Palette

```text
Background near-black: #080808
Secondary dark:        #11100E
Warm stone:            #B89A72
Light stone:           #D5C2A5
Gold accent:           #C79A4A
Muted text:            #9C958B
Primary text:          #F0ECE4
```

The final palette may be adjusted after material and typography testing.

### 14.3 Visual Consistency

All artifacts should feel part of the same visual system.

Consistency should come from:

- lighting direction
- background treatment
- stone and metal material calibration
- camera pacing
- typography
- transition language
- label design

---

## 15. Lighting Requirements

### 15.1 Shared Lighting System

The experience may use:

- low ambient environment light
- one primary warm key light
- one optional rim light
- one local focus light
- limited volumetric lighting

### 15.2 Lighting Profiles

```text
Intro                  Minimal volumetric light
Grand Stairway         Warm top and side light
Lamassu                Face light and wing rim light
Bull Capital           Strong top light
Relief Panel           Grazing side light
Apadana Column         Vertical spotlight
Cuneiform Tablet       Narrow reading light
Rhyton                 Moving reflective highlight
Lotus Motif            Soft symmetrical light
Gate of All Nations    Interior shadow and distant light
Immortal Guard         Strong backlight and narrow key light
Outro                  Fading ambient glow
```

### 15.3 Performance Rules

- Avoid multiple shadow-casting lights.
- Use baked detail where possible.
- Disable expensive effects on low-quality profiles.
- Volumetric effects must be optional.
- Contact shadows should be limited to hero artifacts.

---

## 16. Transition System

Transitions should connect visual ideas rather than simply fade between unrelated objects.

### 16.1 Planned Transition Map

```text
Intro
Typography separates to reveal the first stair

Grand Stairway
Stairs darken and form the Lamassu silhouette

Lamassu
Upper silhouette aligns with the bull capital

Bull Capital
Decorative pattern expands into the relief frame

Relief Panel
Vertical carved line becomes a column groove

Apadana Column
Column becomes a narrow reading light

Cuneiform Tablet
Cuneiform highlights transform into metal reflections

Rhyton
Circular reflection becomes the lotus structure

Lotus Motif
Petals separate into architectural fragments

Gate of All Nations
Distant light becomes a human silhouette

Immortal Guard
Spear becomes the final typographic divider

Outro
Artifact echoes return to darkness
```

### 16.2 Transition Rules

- Keep transitions reversible.
- Avoid using particle dissolve for every chapter.
- Use visual match cuts when possible.
- Transition duration must support scroll reversal.
- No abrupt unloading while the artifact remains visible.

---

## 17. Audio Requirements

Audio is optional and must begin only after user interaction.

### 17.1 Sound Layers

- subtle ambient room or wind tone
- restrained stone resonance
- soft transition accents
- occasional metallic detail for selected artifacts

### 17.2 Rules

- No autoplay with audible sound.
- Provide a persistent mute control.
- Do not use loud impact effects.
- Do not use continuous epic music at full volume.
- Audio must never compete with narration or reading.
- The experience must remain complete with sound disabled.

---

## 18. Internationalization

### 18.1 Supported Languages

- Persian
- English

### 18.2 Direction

- Persian: RTL
- English: LTR

### 18.3 Requirements

- All narrative content must come from translation files or structured content objects.
- No hard-coded station text inside 3D components.
- Layout must support mirrored text alignment.
- 3D composition may remain unchanged unless labels require repositioning.
- Fonts must be selected for high readability and visual compatibility.

### 18.4 Suggested Routes

```text
/fa
/en
```

---

## 19. Accessibility Requirements

### 19.1 Reduced Motion

Respect `prefers-reduced-motion`.

Reduced motion mode must:

- disable long camera travel
- disable strong orbiting
- replace complex assembly with short fades
- reduce blur and depth shifts
- preserve all text and historical meaning
- keep chapter navigation functional

### 19.2 Keyboard Accessibility

- Controls must be keyboard reachable.
- Focus states must be visible.
- Sound, language, restart, and skip controls must use native buttons.
- Artifact labels must not require hover only.
- Modal or detail panels must manage focus correctly.

### 19.3 Screen Readers

- Provide semantic headings.
- Provide full text alternatives for visual-only artifact labels.
- Keep animated typography accessible.
- Describe important 3D interactions where necessary.
- Provide a non-WebGL reading path if WebGL is unavailable.

### 19.4 Contrast

All essential text must meet accessible contrast requirements.

---

## 20. Responsive Design

### 20.1 Desktop

Desktop receives:

- complete camera paths
- richer lighting
- higher shadow quality
- more particles
- more complex assembly
- wider editorial layouts

### 20.2 Tablet

Tablet receives:

- shorter camera paths
- fewer simultaneous labels
- moderate particles
- reduced shadows
- simplified text placement

### 20.3 Mobile

Mobile receives:

- shorter station timelines
- reduced camera travel
- more object-based rotation
- fewer active lights
- simplified shadows
- fewer object parts
- labels outside the canvas
- reduced particle count
- optimized texture resolution

### 20.4 WebGL Fallback

If WebGL is unavailable or fails:

- show a static or lightly animated image for each station
- preserve all text and navigation
- avoid blocking the complete experience

---

## 21. Performance Requirements

### 21.1 Targets

```text
Minimum mobile frame rate:           30 FPS
Target desktop frame rate:           60 FPS
Preferred initial 3D payload:        under 5 MB
Preferred per-station payload:       1 to 4 MB
Maximum active hero artifacts:       1
Maximum nearby loaded stations:      current, previous, next
```

### 21.2 Required Optimizations

- lazy-load station assets
- preload the next station
- unload distant heavy assets where practical
- use compressed GLB files
- use KTX2 textures
- use Meshopt or Draco where appropriate
- use InstancedMesh for repeated geometry
- adapt device pixel ratio
- reduce shadow resolution on lower tiers
- stop or reduce rendering when the tab is hidden
- avoid unnecessary post-processing
- reuse materials and geometries
- use `frameloop="demand"` where compatible with the motion system

### 21.3 Quality Profiles

```ts
export type QualityProfile = "high" | "standard" | "mobile" | "reduced";
```

Selection may consider:

- viewport size
- device pixel ratio
- GPU capability
- frame-rate sampling
- reduced-motion preference

---

## 22. Asset Strategy

### 22.1 Phase One

Use procedural geometry and placeholders.

### 22.2 Phase Two

Replace only high-value artifacts with optimized production models.

Priority:

1. Lamassu
2. Bull Capital
3. Relief Panel
4. Rhyton
5. Immortal Guard
6. Cuneiform Tablet
7. Gate details

### 22.3 Asset Requirements

Final 3D assets should:

- use GLB
- have correct origin and scale
- use predictable orientation
- contain optimized topology
- use PBR materials
- avoid unnecessary hidden geometry
- provide LODs when beneficial
- use compressed textures
- be visually consistent with the lighting system

### 22.4 Asset Naming

```text
artifact-name_lod0.glb
artifact-name_lod1.glb
artifact-name_lod2.glb
artifact-name_albedo.ktx2
artifact-name_normal.ktx2
artifact-name_roughness.ktx2
```

---

## 23. Technical Stack

### 23.1 Core

- Next.js
- React
- TypeScript
- React Three Fiber
- Three.js
- Drei
- GSAP
- ScrollTrigger
- Zustand

### 23.2 Testing

- Vitest
- Playwright

### 23.3 Code Quality

- ESLint
- Prettier
- Husky

### 23.4 Asset Pipeline

- GLB / glTF
- KTX2
- Meshopt or Draco
- Blender for final asset cleanup only

### 23.5 Optional

- React Three Postprocessing
- Howler.js or Web Audio API
- Storybook for isolated interface components

---

## 24. Application Architecture

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── globals.css
├── experience/
│   ├── ExperienceCanvas.tsx
│   ├── CameraRig.tsx
│   ├── LightingRig.tsx
│   ├── ParticleField.tsx
│   ├── PostProcessing.tsx
│   └── WebGLFallback.tsx
├── journey/
│   ├── JourneyController.tsx
│   ├── JourneyProvider.tsx
│   ├── journey.config.ts
│   ├── journey.types.ts
│   ├── useJourneyProgress.ts
│   └── useStationProgress.ts
├── stations/
│   ├── intro/
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
│   ├── StoryText.tsx
│   ├── ChapterProgress.tsx
│   ├── JourneyNavigation.tsx
│   ├── LanguageToggle.tsx
│   ├── SoundToggle.tsx
│   ├── RestartButton.tsx
│   └── SkipIntroButton.tsx
├── assets/
│   ├── asset-manifest.ts
│   ├── preload.ts
│   └── loaders.ts
├── content/
│   ├── en.ts
│   ├── fa.ts
│   └── content.types.ts
├── store/
│   └── journey.store.ts
├── config/
│   ├── quality.config.ts
│   ├── lighting.config.ts
│   ├── performance.config.ts
│   └── accessibility.config.ts
└── tests/
    ├── unit/
    └── e2e/
```

---

## 25. Station Configuration

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
  scrollStart: number;
  scrollEnd: number;
  titleKey: string;
  descriptionKey: string;
  assetKey: string;
  motionProfile: MotionProfile;
  mobileProfile: MobileProfile;
  preloadAt: number;
  camera: StationCameraConfig;
};
```

### Example

```ts
export const stations: StationConfig[] = [
  {
    id: "grand-stairway",
    index: 1,
    scrollStart: 0.08,
    scrollEnd: 0.17,
    titleKey: "stations.grandStairway.title",
    descriptionKey: "stations.grandStairway.description",
    assetKey: "grand-stairway",
    motionProfile: "assembly",
    mobileProfile: "simplified",
    preloadAt: 0.05,
    camera: {
      entry: {
        progress: 0,
        position: [0, 1.2, 8],
        target: [0, 0.8, 0],
      },
      focus: [],
      exit: {
        progress: 1,
        position: [0, 3.5, 3.5],
        target: [0, 2.2, 0],
      },
    },
  },
];
```

---

## 26. State Management

Zustand should manage lightweight shared journey state.

Suggested state:

```ts
export type JourneyState = {
  globalProgress: number;
  activeStationId: string;
  activeStationIndex: number;
  direction: "forward" | "backward";
  locale: "fa" | "en";
  quality: QualityProfile;
  soundEnabled: boolean;
  reducedMotion: boolean;
  introSkipped: boolean;
};
```

Do not store rapidly changing low-level Three.js values in global React state when refs or animation state are more appropriate.

---

## 27. Loading Experience

### 27.1 Initial Load

The initial screen should:

- remain visually consistent with the dark intro
- show a minimal loading indicator
- preload only critical intro and first-station assets
- allow typography to appear before heavy later assets are ready

### 27.2 Station Preloading

Preload the next station before it becomes visible.

Suggested behavior:

```text
Current station begins
→ next station preloading starts
→ next station is ready before transition
→ previous distant station may unload
```

### 27.3 Failure Handling

If an artifact fails to load:

- show a simplified fallback geometry or image
- preserve chapter text
- log the failure
- do not break the complete journey

---

## 28. SEO and Metadata

Even though the experience is highly visual, the page must remain indexable.

Requirements:

- semantic HTML content
- localized metadata
- canonical URLs
- Open Graph image
- structured page title and description
- crawlable chapter text
- artifact names in headings
- no essential content hidden only inside WebGL

Suggested metadata title:

```text
Persian Empire 2500
```

Suggested description:

```text
Explore the architecture, guardians, carvings, inscriptions, and symbols of Persepolis through an interactive scroll-driven 3D story.
```

---

## 29. Analytics Events

The project should support privacy-conscious analytics events.

Suggested events:

```text
journey_started
intro_skipped
station_entered
station_completed
sound_enabled
sound_disabled
language_changed
reduced_motion_used
journey_restarted
artifact_details_opened
journey_completed
```

Do not send per-frame or per-scroll analytics.

---

## 30. Testing Requirements

### 30.1 Unit Tests

Use Vitest for:

- progress normalization
- station range calculations
- direction detection
- quality-profile selection
- reduced-motion configuration
- content key validation
- asset manifest validation
- fallback selection

### 30.2 End-to-End Tests

Use Playwright for:

- page loads successfully
- intro is visible
- scrolling changes the active station
- reverse scrolling restores the previous station
- language switching works
- sound toggle works
- skip intro works
- reduced-motion mode works
- WebGL fallback remains readable
- no horizontal overflow on mobile
- production routes work in Persian and English

### 30.3 Visual Regression

Recommended visual snapshots:

- intro initial state
- stairway midpoint
- Lamassu hero angle
- bull-capital assembly completion
- mobile intro
- reduced-motion station state

---

## 31. Logging and Error Handling

- Use error boundaries around the WebGL experience.
- Log asset loading failures.
- Log unsupported WebGL conditions.
- Avoid exposing technical errors to users.
- Provide a readable fallback experience.
- Ensure one failed station does not crash the entire page.

---

## 32. Security and Privacy

- Do not require accounts or personal data.
- Do not store unnecessary identifiers.
- Use trusted asset origins.
- Validate external content before rendering.
- Avoid runtime code generation from remote input.
- Use a restrictive Content Security Policy where practical.
- Avoid unnecessary third-party scripts.

---

## 33. Delivery Phases

### Phase 0: Project Foundation

- initialize repository
- configure Next.js and TypeScript
- configure linting and formatting
- configure Vitest and Playwright
- create project documentation
- define station configuration types
- define quality and accessibility profiles

### Phase 1: Motion Prototype

- fixed WebGL canvas
- scroll controller
- camera rig
- dark intro
- placeholder typography
- basic station switching
- reversible progress

### Phase 2: MVP Vertical Slice

- Grand Stairway
- Lamassu
- Bull Capital
- minimal Outro
- mobile profile
- reduced-motion profile
- loading strategy
- Playwright smoke tests

### Phase 3: Visual System

- final typography
- lighting profiles
- transition system
- sound controls
- progress UI
- bilingual content
- polished responsive layout

### Phase 4: Remaining Stations

- Relief Panel
- Apadana Column
- Cuneiform Tablet
- Rhyton
- Lotus Motif
- Gate of All Nations
- Immortal Guard

### Phase 5: Production Assets

- replace placeholders
- optimize GLB files
- compress textures
- add LODs
- refine materials
- performance profiling

### Phase 6: Production Hardening

- accessibility review
- SEO review
- mobile testing
- fallback testing
- analytics
- error monitoring
- final visual regression testing

---

## 34. Acceptance Criteria

The project is ready for public release when:

### Experience

- The story progresses smoothly through all stations.
- Every station has a distinct motion identity.
- The experience does not feel like a static model gallery.
- Camera movement remains calm and readable.
- Transitions connect chapters coherently.
- Reverse scrolling works correctly.

### Performance

- Mobile maintains at least 30 FPS on supported devices.
- Desktop targets 60 FPS where practical.
- Initial loading remains reasonable.
- Heavy station assets load before they are visible.
- No major memory leak appears during a complete journey.

### Accessibility

- Reduced-motion mode works.
- All controls are keyboard accessible.
- Text remains available outside WebGL.
- Both languages are usable and readable.
- WebGL failure does not block access to content.

### Quality

- Placeholder assets can be replaced without rewriting journey logic.
- No station contains unexpected animation resets.
- No major layout shift occurs during asset loading.
- No horizontal overflow exists on supported viewport sizes.
- Production build and automated tests pass.

---

## 35. Definition of Done for Each Station

A station is complete when:

- the historical content is approved
- desktop motion is implemented
- reverse scrolling works
- mobile behavior is implemented
- reduced-motion behavior is implemented
- text is localized
- asset loading is handled
- loading fallback exists
- performance is acceptable
- automated smoke coverage exists
- transition to the next station is complete
- transition from the previous station is complete
- no critical visual or accessibility issue remains

---

## 36. Recommended Initial Codex Task

```text
Create the project foundation for a scroll-driven 3D storytelling website named
"Persian Empire 2500".

Stack:
- Next.js
- TypeScript
- React Three Fiber
- Drei
- Three.js
- GSAP ScrollTrigger
- Zustand
- Vitest
- Playwright
- ESLint
- Prettier
- Husky

Implement only the project foundation and first motion prototype.

Requirements:
- localized /fa and /en routes
- one fixed WebGL canvas
- scroll-driven normalized journey progress
- independent camera position and target interpolation
- reversible animation architecture
- responsive desktop and mobile quality profiles
- prefers-reduced-motion support
- dark typographic intro placeholder
- placeholder Grand Stairway station
- station configuration system
- asset manifest and lazy-loading structure
- WebGL fallback
- Vitest unit tests
- Playwright smoke tests
- docs/DECISIONS.md
- no final 3D assets
- no Blender dependency
- production build must pass

At completion:
- summarize implementation decisions
- list changed files
- report test and build results
- provide an English commit message
```

---

## 37. Related Documentation

The repository should also contain:

```text
docs/
├── SPEC.md
├── MOTION_STORYBOARD.md
├── CAMERA_SYSTEM.md
├── ASSET_PIPELINE.md
├── PERFORMANCE_BUDGET.md
├── ACCESSIBILITY.md
├── CONTENT_GUIDE.md
└── DECISIONS.md
```

`SPEC.md` defines what must be built.

`MOTION_STORYBOARD.md` defines how the experience moves and transitions.

`DECISIONS.md` records technical and product decisions made during implementation.
