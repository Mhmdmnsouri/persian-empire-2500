# Persepolis Motion Storyboard

## Working Title

**Persian Empire 2500**

## Experience Goal

This project is not a static 3D gallery. It is a guided, scroll-driven narrative in which typography, lighting, camera motion, sound, and 3D artifacts work together as one cinematic system.

The user controls the pace through scrolling, while the sequence, framing, focus, and emotional rhythm remain intentionally directed.

---

## 1. Experience Architecture

### Core Structure

A single fixed WebGL canvas remains active throughout the entire experience.

```text
Fixed WebGL Canvas
├── Active Artifact
├── Camera Rig
├── Lighting System
├── Particle Layer
├── Environment Layer
└── Post Processing

Scrollable HTML Story
├── Intro
├── Station 01
├── Station 02
├── Station 03
├── Station 04
├── Station 05
├── Station 06
├── Station 07
├── Station 08
├── Station 09
├── Station 10
└── Outro
```

HTML content, labels, chapter counters, and accessibility controls remain outside the canvas, but their timing is synchronized with the 3D timeline.

### Approximate Scroll Distribution

```text
Intro                       0% to 8%
Station 01: Grand Stairway  8% to 17%
Station 02: Lamassu         17% to 27%
Station 03: Bull Capital    27% to 37%
Station 04: Relief Panel    37% to 47%
Station 05: Apadana Column  47% to 57%
Station 06: Cuneiform       57% to 66%
Station 07: Rhyton          66% to 75%
Station 08: Lotus Motif     75% to 83%
Station 09: Gate of Nations 83% to 92%
Station 10: Immortal Guard  92% to 98%
Outro                       98% to 100%
```

Each station should use approximately `180vh` to `260vh` of scroll space on desktop. More complex stations, such as the Lamassu, relief panel, and bull capital, may receive longer timelines.

---

## 2. Motion Language

The experience should feel calm, alive, deliberate, and cinematic.

### Primary Motion Types

#### Reveal from Darkness

An artifact or word slowly emerges from near-blackness.

Used for:

- Intro typography
- First appearance of each artifact
- Major chapter transitions
- Emotional pauses

#### Focus Push

The camera moves gently toward an important detail.

Used for:

- Facial features
- Inscriptions
- Structural joints
- Decorative motifs

#### Controlled Orbit

The camera or artifact rotates between approximately 15 and 50 degrees.

Used for:

- Lamassu
- Bull capital
- Rhyton
- Immortal Guard

Full turntable-style rotation should be avoided.

#### Assembly

Separate pieces appear, rise, slide, or align into a final form.

Used for:

- Grand Stairway
- Bull capital structure
- Apadana column
- Gate of All Nations

#### Light Sweep

A directional light moves across the artifact to reveal surface detail.

Used for:

- Relief panel
- Cuneiform tablet
- Stone textures
- Metal details

#### Typographic Displacement

Words move, separate, scale, or leave the frame after completing their narrative role.

Used for:

- Intro
- Chapter transitions
- Key historical concepts

#### Fade Through Darkness

The previous artifact fades into shadow while the next artifact emerges from the same visual space.

Used as the default transition when no more specific transition is appropriate.

---

## 3. Motion Rules

### One Motion Hero per Station

Each station must have one dominant motion idea.

```text
Intro                  Typography and depth
Grand Stairway         Sequential assembly
Lamassu                Controlled orbit
Bull Capital           Structural assembly
Relief Panel           Light and focus travel
Apadana Column         Vertical construction and pull-back
Cuneiform Tablet       Close reading
Rhyton                 Rotation and reflections
Lotus Motif            Radial reveal
Gate of All Nations    Architectural assembly
Immortal Guard         Heroic reveal and stillness
```

Secondary motion should remain subtle.

### Camera Behavior

The camera should never feel uncontrolled.

Allowed movements:

- Slow push-in
- Slow pull-back
- Short orbit
- Horizontal pan
- Vertical tilt
- Target shift
- Slight field-of-view change

Avoid:

- Fast rotation
- Long free-flight movement
- Camera shake
- Large abrupt position changes
- Repeated zoom effects

### Scroll Behavior

All major movement must remain reversible.

When the user scrolls backward:

- Camera motion reverses smoothly
- Artifact assembly reverses correctly
- Text returns in the correct order
- Lighting transitions remain coherent
- No animation should restart from zero unexpectedly

### Idle Motion

When the user pauses:

- Dust particles continue moving slowly
- Light intensity may breathe very subtly
- Floating artifacts may drift by a nearly invisible amount
- No object should visibly wobble or rotate continuously

---

# 4. Intro: The Story Emerges from Darkness

## Emotional Goal

Mystery, silence, discovery, and anticipation.

## Initial State

- Background is almost completely black
- Very subtle atmospheric particles
- A faint volumetric light in the center
- No recognizable 3D object
- Minimal environmental sound

## Scroll Sequence

### Phase 1: First Word

The word appears:

> Stone

The camera slowly pushes toward the word.

The word should feel suspended in physical depth, not flat on the screen.

### Phase 2: Second Word

A second word appears deeper in the scene:

> Memory

As the camera advances, the first word drifts slightly to the side.

### Phase 3: Sentence Formation

The final line forms:

> Stone remembers what time cannot erase.

Words appear at slightly different depths.

The camera passes gently between them.

### Phase 4: Typographic Displacement

With further scrolling:

- Key words enlarge slightly
- Words separate from the sentence
- Some move beyond the frame
- The remaining negative space becomes a passage
- The first artifact begins to emerge through that passage

## Camera Motion

- Slow forward dolly
- Minimal field-of-view reduction
- Slight target shift between words

## Lighting

- Almost black at the start
- Thin warm beam behind the words
- Light gradually reveals floating dust

## Transition to Station 01

The final word moves out of frame.

A horizontal stone edge appears in the darkness.

That edge becomes the first stair.

## Mobile Adaptation

- Reduce word depth separation
- Use fewer simultaneous words
- Avoid strong field-of-view changes
- Preserve the push-in effect with scale and opacity if needed

---

# 5. Station 01: Grand Stairway

## Narrative Goal

Introduce Persepolis through movement, procession, and architectural order.

## Motion Hero

Sequential assembly.

## Initial State

Only one stone step is visible under a narrow light.

## Scroll Sequence

### Phase 1: First Steps

Additional steps appear one by one.

Each step rises gently from darkness and locks into position.

### Phase 2: Stairway Expansion

The staircase expands outward.

Side walls and balustrades appear from large stone blocks.

### Phase 3: Camera Ascent

The camera moves forward and slightly upward.

The user should feel as if the viewpoint is climbing without recreating a full environment.

### Phase 4: Relief Discovery

Side relief panels become visible.

A light sweep reveals carved figures.

The primary title and a short historical note appear.

### Phase 5: Processional Rhythm

A subtle wave of light travels upward across the steps.

The camera pauses near the upper section.

## Camera Motion

- Low-angle push-in
- Gentle upward tilt
- Slight lateral movement near the reliefs

## Artifact Motion

- Step-by-step construction
- Side wall assembly
- Relief opacity and normal intensity increase

## Text Motion

- Title rises from below
- Supporting text fades in line by line
- Key number or fact appears beside the model

## Lighting

- Narrow warm light at the start
- Wider top light during assembly
- Side lighting for relief details

## Transition to Station 02

The staircase darkens from bottom to top.

Two shadowed forms remain at the sides.

One of them grows into the silhouette of a Lamassu.

## Mobile Adaptation

- Show fewer physical steps
- Use a merged stair mesh after the assembly phase
- Reduce camera ascent distance
- Keep relief labels below the canvas

---

# 6. Station 02: Lamassu

## Narrative Goal

Present the guardian as a combination of intelligence, strength, and vigilance.

## Motion Hero

Controlled orbit.

## Initial State

The Lamassu appears only as a silhouette.

Its face is partially visible.

## Scroll Sequence

### Phase 1: Face Reveal

Light reveals the human face first.

The camera pushes closer.

### Phase 2: Body Reveal

The light moves toward the body and legs.

The model rotates approximately 15 degrees.

### Phase 3: Wing Reveal

A second light sweep reveals the wings.

The object rotates further, reaching approximately 35 to 45 degrees.

### Phase 4: Symbolic Labels

Three minimal labels appear:

- Human wisdom
- Bull strength
- Eagle vigilance

Labels should connect to the artifact with short, restrained guide lines.

### Phase 5: Guardian Pose

The camera settles at the strongest three-quarter angle.

Motion slows almost to stillness.

## Camera Motion

- Gentle push-in
- Small orbit around the model
- Slight target changes between face, body, and wing

## Artifact Motion

- Controlled Y-axis rotation
- Very subtle vertical drift
- No continuous spinning

## Text Motion

- Main title appears after the face reveal
- Symbolic labels appear only when their related features are visible
- Supporting paragraph fades in after the orbit begins

## Lighting

- Face light
- Wing edge light
- Soft floor reflection
- Warm stone highlights

## Transition to Station 03

The camera moves toward the top of the Lamassu.

Its upper silhouette aligns with the shape of the bull capital.

The Lamassu fades as the capital appears.

## Mobile Adaptation

- Rotate the model instead of orbiting the camera
- Limit rotation to approximately 25 degrees
- Use tap-accessible labels
- Disable heavy contact shadows

---

# 7. Station 03: Bull Capital

## Narrative Goal

Explain how artistic form and structural engineering worked together.

## Motion Hero

Exploded structural assembly.

## Initial State

The bull capital floats alone in darkness.

The lower column is not yet visible.

## Scroll Sequence

### Phase 1: Capital Reveal

The two bull forms emerge under a top light.

The camera moves slightly closer.

### Phase 2: Neck and Connector

The connector and decorative ring appear below the capital.

Components remain separated in an exploded view.

### Phase 3: Column Shaft

The shaft grows upward from below.

Its sections align with the capital.

### Phase 4: Roof Beam

A simplified translucent roof beam appears above.

The capital moves into its final position.

The beam rests between the bull forms.

### Phase 5: Structural Explanation

Short labels explain:

- Load transfer
- Twin-animal form
- Roof support
- Architectural symbolism

### Phase 6: Final Assembly

All components lock together.

The camera rotates slightly to reveal the beam relationship.

## Camera Motion

- Slow push-in
- Vertical tilt from shaft to capital
- Short three-quarter orbit during final assembly

## Artifact Motion

- Controlled exploded view
- Vertical assembly
- Final snap with soft easing

## Text Motion

- Title appears when the bull forms are visible
- Structural terms appear during assembly
- Explanatory text remains short

## Lighting

- Strong top light
- Narrow rim light around animal forms
- Reduced ambient light during exploded view

## Transition to Station 04

The camera moves toward the decorative base.

Its carved pattern expands to fill the frame.

The pattern becomes the border of the relief panel.

## Mobile Adaptation

- Use fewer separated components
- Keep the camera fixed
- Animate model groups instead of individual small pieces
- Replace complex translucent beam material with a simple wireframe or outline

---

# 8. Station 04: Delegation Relief Panel

## Narrative Goal

Show diplomacy, diversity, and ceremonial order through carved figures.

## Motion Hero

Light sweep and guided focus.

## Initial State

A large relief panel stands nearly invisible in darkness.

Only its outer border is visible.

## Scroll Sequence

### Phase 1: Surface Reveal

A side light moves across the stone.

The first group of figures becomes visible.

### Phase 2: Guided Pan

The camera pans slowly across the panel.

The movement should feel like reading an image.

### Phase 3: First Delegation Focus

One figure or delegation is highlighted.

Other sections become slightly darker.

A concise label explains clothing, offering, or origin.

### Phase 4: Second Delegation Focus

Focus moves to another figure.

The camera shifts only slightly.

### Phase 5: Full Composition

The full relief is visible again.

A short summary appears about ceremonial unity and representation.

## Camera Motion

- Horizontal pan
- Short push-in for selected details
- Minimal target shifts

## Artifact Motion

- Almost static
- Slight parallax through depth or displacement
- Localized normal or light emphasis

## Text Motion

- Labels appear close to the selected figure
- Main paragraph remains outside the canvas
- Labels disappear before focus moves elsewhere

## Lighting

- Strong grazing side light
- Focus light for selected figure
- Low ambient fill

## Transition to Station 05

The camera pushes into a carved vertical line.

The line becomes a column shaft groove.

## Mobile Adaptation

- Use a swipe-like horizontal camera motion controlled by scroll
- Highlight only one or two figures
- Avoid multiple simultaneous labels
- Use a high-quality normal map instead of deep geometry where possible

---

# 9. Station 05: Apadana Column

## Narrative Goal

Communicate scale, height, repetition, and architectural grandeur.

## Motion Hero

Vertical construction followed by a cinematic pull-back.

## Initial State

Only the column base is visible in a narrow circle of light.

## Scroll Sequence

### Phase 1: Base Reveal

The camera looks slightly downward at the base.

Decorative rings become visible.

### Phase 2: Shaft Growth

The shaft rises from the base.

The camera tilts upward to follow it.

### Phase 3: Capital Placement

The bull capital descends into position.

A soft light reveals the complete column.

### Phase 4: Scale Reveal

The camera pulls back.

Additional columns appear in the distance as faint instances.

### Phase 5: Number and Scale

A large numeric fact appears, such as the original column count or approximate height.

The central column remains the visual anchor.

## Camera Motion

- Vertical tilt
- Slight upward movement
- Long controlled pull-back

## Artifact Motion

- Column construction
- Capital placement
- Background column instancing

## Text Motion

- Title remains near the lower third
- Scale facts appear after pull-back
- Supporting paragraph fades in only after construction completes

## Lighting

- Vertical spotlight
- Soft volumetric beams
- Deeper shadows behind distant columns

## Transition to Station 06

The distant columns fade.

The central column turns into a narrow vertical band of light.

The light sweeps across a stone tablet.

## Mobile Adaptation

- Shorter column growth
- Fewer background instances
- Fixed camera with animated model scale if necessary
- Reduced volumetric lighting

---

# 10. Station 06: Cuneiform Tablet

## Narrative Goal

Shift from architectural scale to the intimacy of written memory.

## Motion Hero

Close reading.

## Initial State

The tablet is seen from a moderate distance.

Its inscription is not yet readable.

## Scroll Sequence

### Phase 1: Tablet Reveal

Warm light reveals the edges and damaged stone surface.

### Phase 2: Reading Push

The camera moves closer.

Individual lines become clearer.

### Phase 3: Line Focus

A narrow light highlights one inscription line.

The rest remains visible but subdued.

### Phase 4: Meaning Layer

A translated phrase or interpretive summary appears beside the highlighted line.

### Phase 5: Surface Detail

The camera moves slightly sideways.

Incisions and stone depth become more visible.

## Camera Motion

- Slow push-in
- Very small lateral pan
- Mild target shift between inscription lines

## Artifact Motion

- Minimal rotation
- Optional 5 to 10 degree tilt for depth
- No dramatic spin

## Text Motion

- Translation appears in stages
- Original and translated content remain visually distinct
- Avoid long paragraphs over the model

## Lighting

- Narrow raking light
- Localized focus light
- Dark surrounding space

## Transition to Station 07

The selected cuneiform signs brighten.

Their angular shapes stretch and transform into reflective metal highlights.

The rhyton emerges.

## Mobile Adaptation

- Use one highlighted line only
- Increase typography size
- Reduce camera depth movement
- Provide a readable text transcript below the canvas

---

# 11. Station 07: Achaemenid Rhyton

## Narrative Goal

Reveal craftsmanship, ceremony, and luxury.

## Motion Hero

Controlled rotation and reflected light.

## Initial State

Only a metallic contour is visible.

## Scroll Sequence

### Phase 1: Material Reveal

A moving highlight defines the vessel silhouette.

### Phase 2: Main Form

The vessel rotates approximately 20 degrees.

Its main body becomes visible.

### Phase 3: Animal Detail

The camera moves closer to the animal-shaped section.

The object rotates slightly further.

### Phase 4: Decorative Band

A light travels around engraved details.

A concise note introduces ceremonial use and craftsmanship.

### Phase 5: Final Presentation

The camera pulls back slightly.

The object settles into a museum-like hero angle.

## Camera Motion

- Small push-in
- Mild orbit
- Slight pull-back at the end

## Artifact Motion

- Controlled rotation
- Subtle lift from pedestal
- Gentle return to final pose

## Text Motion

- Title appears with the first full reflection
- Material and function labels appear during detail focus
- Supporting text remains brief

## Lighting

- Moving specular highlights
- Warm key light
- Soft edge light
- Dark reflective floor

## Transition to Station 08

The reflected highlight becomes circular.

It expands into the radial shape of the lotus motif.

## Mobile Adaptation

- Reduce reflection complexity
- Rotate the model directly
- Use a simpler environment map
- Disable expensive real-time reflections

---

# 12. Station 08: Lotus Motif

## Narrative Goal

Create a visual pause centered on symmetry, repetition, and symbolic order.

## Motion Hero

Radial reveal.

## Initial State

A small central shape appears in darkness.

## Scroll Sequence

### Phase 1: Core Reveal

The central bud emerges.

### Phase 2: Petal Expansion

Petals appear in concentric layers.

The expansion follows a slow radial rhythm.

### Phase 3: Symmetry Emphasis

The camera moves directly in front of the motif.

Fine guide lines or subtle rings briefly reveal its geometry.

### Phase 4: Architectural Context

Small silhouettes of borders, capitals, or wall decorations appear around it.

The motif is shown as a repeated visual language.

### Phase 5: Final Stillness

The guides disappear.

Only the finished lotus remains.

## Camera Motion

- Short push-in
- Move toward a front-facing orthographic-like composition
- Minimal movement after symmetry reveal

## Artifact Motion

- Radial petal assembly
- Small scale pulse at completion
- No continuous rotation

## Text Motion

- Title appears after the first petal ring
- Symbolic meaning appears during symmetry phase
- Text exits before transition

## Lighting

- Soft top light
- Gentle radial shadow
- Less dramatic contrast than previous stations

## Transition to Station 09

The outer petals separate into architectural fragments.

The fragments rise and become pillars, walls, and lintels.

## Mobile Adaptation

- Reduce petal count if necessary
- Use a single combined mesh after assembly
- Avoid complex guide-line animation
- Keep the motif centered above the text

---

# 13. Station 09: Gate of All Nations

## Narrative Goal

Present the gate as an architectural symbol of entry, diplomacy, and imperial reach.

## Motion Hero

Architectural assembly.

## Initial State

A dark pedestal is visible.

Several stone fragments float above it.

## Scroll Sequence

### Phase 1: Platform Assembly

The base and steps slide into position.

### Phase 2: Pillars and Walls

Major architectural blocks rise vertically.

### Phase 3: Lamassu Placement

Two guardian figures appear at the entrance.

They should be simplified or optimized instances.

### Phase 4: Gate Completion

The lintel and upper elements lock into place.

The camera pushes toward the entrance.

### Phase 5: Framed View

The camera passes only slightly into the gate.

The architecture frames a distant point of light.

A short note introduces the idea of nations entering through a shared ceremonial threshold.

## Camera Motion

- Initial pull-back during assembly
- Slow push toward the opening
- Slight upward tilt

## Artifact Motion

- Large modular block assembly
- Guardian placement
- Final architectural lock

## Text Motion

- Title appears once the gate silhouette becomes recognizable
- Architectural labels appear during assembly
- Final narrative line appears when the opening is complete

## Lighting

- Warm overhead light
- Strong interior darkness
- Bright distant point through the gate
- Rim light on guardian figures

## Transition to Station 10

The distant point of light grows.

A human silhouette steps into it.

The gate darkens, leaving the Immortal Guard.

## Mobile Adaptation

- Use fewer architectural pieces
- Replace some assembly with opacity transitions
- Limit camera movement through the gate
- Use simplified guardian models

---

# 14. Station 10: Immortal Guard

## Narrative Goal

End the artifact sequence with discipline, protection, continuity, and human presence.

## Motion Hero

Heroic reveal followed by deliberate stillness.

## Initial State

A standing silhouette appears against a narrow backlight.

## Scroll Sequence

### Phase 1: Silhouette

The spear and headpiece are visible first.

### Phase 2: Face and Armor

A slow light sweep reveals the face, clothing, shield, and weapon.

### Phase 3: Camera Focus

The camera pushes closer to the face and upper body.

### Phase 4: Symbolic Detail

Small labels identify:

- Guard
- Discipline
- Loyalty
- Continuity

### Phase 5: Full Figure

The camera pulls back to show the full figure.

The guard remains nearly motionless.

Stillness becomes the final expression of power.

## Camera Motion

- Slow push-in
- Mild vertical tilt
- Final pull-back

## Artifact Motion

- No major rotation
- Very subtle pose drift only if needed
- Cloth and accessories remain static unless rigged animation is exceptionally restrained

## Text Motion

- Title appears after the face reveal
- Supporting narrative appears during the pull-back
- Labels fade before the outro

## Lighting

- Strong backlight
- Narrow warm key light
- Controlled edge highlights
- Dark floor and background

## Transition to Outro

The figure fades into shadow.

Only the spear remains visible.

The spear becomes a vertical line.

The line becomes the final typographic divider.

## Mobile Adaptation

- Keep the model static
- Use one main light
- Reduce shadow resolution
- Move labels below the artifact

---

# 15. Outro: Memory Remains

## Emotional Goal

Reflection, silence, continuity, and closure.

## Initial State

The screen returns to near-black.

Fragments of previous artifacts appear as faint outlines in the background.

## Scroll Sequence

### Phase 1: Echoes

Brief silhouettes appear:

- A stair edge
- A wing
- A column capital
- A cuneiform line
- A lotus petal

They should not appear simultaneously at full strength.

### Phase 2: Final Sentence

The final line appears:

> What remains is not only stone.  
> It is the memory of a world.

### Phase 3: Final Pull-back

The camera pulls back very slowly.

The visual fragments form a loose constellation.

### Phase 4: Closure

The title appears:

**Persian Empire 2500**

Optional actions appear:

- Explore artifacts
- Read historical sources
- Restart journey
- Toggle sound

## Lighting

- Minimal warm glow
- Particles fade gradually
- No bright final flash

## Sound

- Ambient sound becomes quieter
- A final low stone or metallic resonance
- Silence after completion

## Mobile Adaptation

- Use fewer artifact silhouettes
- Avoid complex depth layering
- Keep the final sentence readable without motion

---

# 16. Transition Map

```text
Intro
Typography parts to reveal first stair

Grand Stairway
Darkening stairs to Lamassu silhouette

Lamassu
Upper silhouette match to bull capital

Bull Capital
Decorative pattern expands into relief border

Relief Panel
Vertical carving line becomes column groove

Apadana Column
Column becomes a narrow light over tablet

Cuneiform Tablet
Signs become metal reflections

Rhyton
Circular highlight becomes lotus structure

Lotus Motif
Petals become architectural fragments

Gate of All Nations
Distant light becomes human silhouette

Immortal Guard
Spear becomes final typographic divider

Outro
Fragments return to darkness
```

---

# 17. Camera System

## Camera State per Station

Each station should define:

```ts
type CameraKeyframe = {
  position: [number, number, number];
  target: [number, number, number];
  fov?: number;
  roll?: number;
  progress: number;
};

type StationCameraConfig = {
  entry: CameraKeyframe;
  focus: CameraKeyframe[];
  exit: CameraKeyframe;
};
```

Camera position and camera target must be animated independently.

### Recommended Smoothing

Use damped interpolation rather than direct value assignment.

The camera should feel responsive to scroll without exposing raw scroll jitter.

### Scroll Reversal

All camera paths must support backward scrolling.

No camera state should depend on one-time callbacks alone.

---

# 18. Artifact Motion Contract

Every artifact should expose a consistent motion interface.

```ts
type ArtifactMotionState = {
  visibility: number;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  focus: number;
  assemblyProgress?: number;
  highlightProgress?: number;
};
```

Each station should map normalized local scroll progress from `0` to `1` into this state.

---

# 19. Typography Motion Contract

Text should remain accessible HTML.

Suggested animation properties:

- Opacity
- Translate X
- Translate Y
- Scale
- Blur
- Letter spacing
- Word-level depth illusion
- Mask reveal

Avoid rendering primary narrative text as WebGL textures.

### Intro Typography

The intro may use individual word wrappers.

```html
<p aria-label="Stone remembers what time cannot erase.">
  <span aria-hidden="true">Stone</span>
  <span aria-hidden="true">remembers</span>
  <span aria-hidden="true">what time</span>
  <span aria-hidden="true">cannot erase.</span>
</p>
```

The accessible sentence remains intact while visual words animate independently.

---

# 20. Lighting System

Use lighting as part of the story.

## Shared Lights

- Low ambient environment light
- Main warm key light
- Adjustable rim light
- Optional local focus light
- Limited volumetric effect

## Per-Station Lighting Profiles

```text
Intro             Minimal volumetric light
Stairway          Warm overhead and side light
Lamassu           Face and wing edge light
Bull Capital      Strong top light
Relief Panel      Grazing side light
Apadana Column    Vertical spotlight
Cuneiform         Narrow reading light
Rhyton            Reflective moving highlights
Lotus             Soft symmetrical light
Gate              Interior shadow and distant light
Guard             Strong backlight and narrow key
Outro             Fading ambient glow
```

---

# 21. Sound Direction

Sound is optional and must begin only after user interaction.

## Shared Sound Layers

- Low wind-like ambience
- Soft room tone
- Very subtle stone resonance
- Small transition accents
- Occasional metallic detail for artifacts

## Rules

- No continuous epic music at full volume
- No loud impact effects
- Sound should never compete with reading
- Provide a persistent mute control
- Respect browser autoplay policies
- Respect user accessibility preferences where possible

---

# 22. Desktop and Mobile Motion Tiers

## Desktop High

- Full camera paths
- Volumetric lighting
- Higher shadow resolution
- More particles
- Normal mapped and optimized 3D artifacts
- More complex assembly animations

## Desktop Standard

- Reduced particle count
- Limited volumetric effect
- Moderate shadow resolution
- Same narrative timeline

## Mobile Standard

- Shorter camera paths
- Object rotation instead of camera orbit where appropriate
- Simplified shadows
- Fewer active lights
- Reduced particles
- Fewer simultaneous object parts
- Labels outside the canvas

## Reduced Motion

When `prefers-reduced-motion` is enabled:

- Disable long camera travel
- Disable orbit and strong zoom
- Replace assembly with fades or short dissolves
- Keep chapter transitions brief
- Preserve all text and historical content
- Allow manual artifact rotation only when explicitly requested

---

# 23. Performance Rules

- Only the current, previous, and next artifacts may remain loaded when possible
- Use lazy loading by station
- Preload the next station near the end of the current timeline
- Use compressed `GLB` assets
- Use `KTX2` textures where appropriate
- Use instancing for repeated geometry
- Limit real-time shadows
- Avoid multiple heavy post-processing passes
- Suspend unnecessary rendering when the tab is hidden
- Use adaptive device pixel ratio
- Provide quality tiers

### Initial Performance Targets

```text
Initial JavaScript and critical assets: as small as practical
Initial 3D payload: under 5 MB preferred
Per-station artifact payload: approximately 1 to 4 MB
Stable mobile frame rate: 30 FPS minimum
Target desktop frame rate: 60 FPS where practical
```

---

# 24. Implementation Structure

```text
src/
├── app/
├── experience/
│   ├── ExperienceCanvas.tsx
│   ├── CameraRig.tsx
│   ├── LightingRig.tsx
│   ├── ParticleField.tsx
│   └── PostProcessing.tsx
├── journey/
│   ├── JourneyController.tsx
│   ├── journey.config.ts
│   ├── journey.types.ts
│   └── useJourneyProgress.ts
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
│   ├── SoundToggle.tsx
│   ├── LanguageToggle.tsx
│   └── ReducedMotionNotice.tsx
├── store/
│   └── journey.store.ts
└── config/
    ├── quality.config.ts
    ├── lighting.config.ts
    └── performance.config.ts
```

---

# 25. Station Configuration Example

```ts
export type StationConfig = {
  id: string;
  index: number;
  scrollStart: number;
  scrollEnd: number;
  title: string;
  subtitle?: string;
  assetKey: string;
  motionProfile:
    | "typography"
    | "assembly"
    | "orbit"
    | "light-sweep"
    | "close-reading"
    | "radial-reveal"
    | "heroic-reveal";
  preloadAt: number;
  mobileProfile: "full" | "simplified" | "static-focus";
};

export const stations: StationConfig[] = [
  {
    id: "grand-stairway",
    index: 1,
    scrollStart: 0.08,
    scrollEnd: 0.17,
    title: "The Grand Stairway",
    assetKey: "grand-stairway",
    motionProfile: "assembly",
    preloadAt: 0.05,
    mobileProfile: "simplified",
  },
];
```

---

# 26. MVP Scope

The first implementation should include only:

1. Intro
2. Grand Stairway
3. Lamassu
4. Bull Capital
5. Outro

The MVP should validate:

- Scroll rhythm
- Camera smoothing
- Typography motion
- Artifact transition quality
- Mobile performance
- Asset loading strategy
- Reduced motion behavior
- Visual consistency

The remaining stations should be added only after this vertical slice feels complete.

---

# 27. Acceptance Criteria

The motion system is ready for production expansion when:

- Every timeline works correctly in both scroll directions
- No station feels like a static product viewer
- Each station has a distinct motion identity
- Camera movement remains calm and readable
- Text stays accessible and legible
- Mobile users receive the same story with reduced complexity
- Reduced motion mode preserves all essential information
- Transition timing feels intentional
- Loading never interrupts the visible narrative
- The experience maintains acceptable frame rates
- Final assets can replace placeholders without changing journey logic

---

# 28. Recommended First Codex Task

```text
Create a scroll-driven 3D narrative prototype for Persepolis using Next.js,
TypeScript, React Three Fiber, Drei, GSAP ScrollTrigger, and Zustand.

Implement the following vertical slice:
1. A dark typographic intro
2. Grand Stairway station
3. Lamassu station
4. Bull Capital station
5. A minimal outro

Use procedural placeholders for all geometry except optional temporary GLB files.

Requirements:
- One fixed WebGL canvas
- Scroll-driven reversible timelines
- Independent camera position and target animation
- Accessible HTML typography
- Desktop, mobile, and reduced-motion profiles
- Lazy station loading architecture
- No final visual assets
- No Blender dependency
- Modular station configuration
- Production build and Playwright smoke test
- Document architectural decisions in docs/DECISIONS.md
- Provide an English commit message
```
