# PERFORMANCE_BUDGET.md

## Project

**Persian Empire 2500**

## Document Status

- **Status:** Draft for implementation
- **Version:** 1.0.0
- **Audience:** Developers, AI coding agents, technical artists, QA engineers, and technical reviewers
- **Primary Goal:** Define measurable runtime, loading, memory, and rendering limits for the complete experience
- **Related Documents:**
  - `AGENTS.md`
  - `docs/SPEC.md`
  - `docs/MOTION_STORYBOARD.md`
  - `docs/ARCHITECTURE.md`
  - `docs/CAMERA_SYSTEM.md`
  - `docs/ASSET_PIPELINE.md`
  - `docs/ACCESSIBILITY.md`
  - `docs/TEST_PLAN.md`
  - `docs/DECISIONS.md`

---

# 1. Purpose

This document defines the performance limits for the Persepolis experience.

Performance is a product requirement, not a final optimization task.

Every station, visual effect, asset, and dependency must remain within an approved budget.

The project must preserve:

- responsive scrolling
- stable camera motion
- readable typography
- reliable asset transitions
- acceptable mobile frame rate
- reasonable initial loading
- predictable memory use
- graceful quality reduction
- accessibility behavior
- complete fallback content

A visual effect must be simplified or removed when it prevents the project from meeting these budgets.

---

# 2. Performance Priorities

When a tradeoff is required, use this order:

```text
1. Input responsiveness
2. Accessibility and reduced-motion behavior
3. Stable frame rate
4. Camera smoothness
5. Artifact readability
6. Loading reliability
7. Visual detail
8. Decorative effects
```

The project must not sacrifice input responsiveness or accessibility to preserve a decorative effect.

---

# 3. Supported Performance Profiles

The experience uses four explicit profiles.

```ts
export type QualityProfile =
  | "high"
  | "standard"
  | "mobile"
  | "reduced";
```

## 3.1 High

Target devices:

- capable desktop GPU
- modern high-performance laptop
- large viewport
- stable runtime frame rate

Features:

- highest approved model LOD
- highest approved texture resolution
- full camera paths
- limited volumetric effects
- approved post-processing
- highest particle budget
- higher shadow resolution

## 3.2 Standard

Target devices:

- typical desktop
- standard laptop
- capable tablet
- uncertain GPU capability

Features:

- medium LOD
- moderate textures
- limited particles
- simplified post-processing
- moderate shadow resolution
- full narrative motion with reduced visual cost

## 3.3 Mobile

Target devices:

- mobile phones
- tablets with constrained GPU
- narrow viewport
- touch input

Features:

- mobile LOD
- reduced texture resolution
- shortened camera paths
- object rotation instead of camera orbit where appropriate
- reduced particles
- simplified lighting
- minimal post-processing
- reduced shadow cost

## 3.4 Reduced

Target conditions:

- `prefers-reduced-motion`
- manually selected reduced-motion mode
- very constrained device fallback when approved

Features:

- minimal camera travel
- no strong orbit
- no deep parallax
- simplified transitions
- staged fades instead of complex assembly where necessary
- low particle count
- minimal post-processing
- preserved historical content

---

# 4. Frame Rate Targets

## 4.1 Desktop

```text
Target:
60 FPS where practical

Minimum acceptable sustained frame rate:
45 FPS on supported standard desktop devices

Temporary transition floor:
40 FPS for less than 500 ms
```

A station that remains below 45 FPS on the standard desktop profile requires optimization or a documented exception.

## 4.2 Mobile

```text
Target:
30 FPS minimum stable frame rate

Preferred:
45 FPS on capable mobile devices

Temporary transition floor:
26 FPS for less than 500 ms
```

A station that remains below 30 FPS on a supported mid-range mobile device fails the performance gate.

## 4.3 Reduced Motion

Reduced-motion mode must not perform worse than the equivalent mobile or standard profile.

## 4.4 Frame Time Reference

```text
60 FPS budget:
16.67 ms per frame

45 FPS budget:
22.22 ms per frame

30 FPS budget:
33.33 ms per frame
```

The complete frame budget includes:

- JavaScript
- React work
- Three.js updates
- animation calculations
- GPU rendering
- browser composition

---

# 5. Input and Scroll Responsiveness

## 5.1 Main Thread

Scroll handlers must remain lightweight.

Target:

```text
Raw scroll handler execution:
under 2 ms preferred

Long task threshold:
no task over 50 ms during normal scrolling

Repeated long tasks:
not acceptable
```

## 5.2 Scroll Mapping

Do not perform heavy operations directly inside raw scroll events.

Preferred flow:

```text
Scroll position capture
→ normalized progress update
→ frame-based visual interpolation
```

## 5.3 React Updates

Do not trigger React component updates for every animation frame.

High-frequency transforms belong in:

- refs
- motion controllers
- shader uniforms
- pure frame calculations

## 5.4 Scroll Latency

The visual response should feel connected to input.

Excessive smoothing that causes noticeable lag must be reduced.

---

# 6. Initial Loading Budget

## 6.1 Critical Initial Payload

Preferred initial budgets:

```text
Critical JavaScript:
under 250 KB compressed preferred

Initial 3D payload:
under 5 MB preferred

Initial texture payload:
under 3 MB preferred

Initial fallback imagery:
under 1 MB preferred

Critical fonts:
under 300 KB total preferred
```

These are target budgets, not permission to use the full amount automatically.

## 6.2 Initial Station Scope

Initial loading should include only:

- application shell
- intro typography
- shared minimal materials
- intro particles
- first station placeholder or asset
- required fallback image
- critical localization content

Do not load the full journey initially.

## 6.3 Time-to-Experience Targets

On a representative broadband connection:

```text
First readable HTML:
under 1.5 seconds preferred

Interactive controls:
under 2.5 seconds preferred

Intro visually ready:
under 3 seconds preferred

First 3D station ready:
under 4 seconds preferred
```

Actual targets must be validated with throttled testing.

---

# 7. Per-Station Network Budget

## 7.1 Preferred Station Payload

```text
Simple procedural station:
under 500 KB additional payload

Standard artifact station:
1 MB to 3 MB preferred

Hero artifact station:
1 MB to 4 MB preferred

Exceptional hero station:
up to 6 MB only with approval
```

Payload includes:

- model
- station-specific textures
- station-specific audio
- station-specific fallback image

## 7.2 Preloading

The next station should preload before it enters the visible transition range.

Preloading must not:

- block the current station
- create visible main-thread stalls
- compete aggressively with critical content
- load all remaining stations at once

## 7.3 Failed Preload

When preload fails:

- use a fallback
- preserve text
- continue the journey
- avoid infinite retry loops

---

# 8. JavaScript and Bundle Budget

## 8.1 Core Bundle

Avoid adding dependencies that significantly increase the main bundle without clear value.

Every major dependency must be reviewed for:

- compressed size
- tree-shaking support
- client-only cost
- runtime CPU cost
- duplicate functionality
- browser compatibility

## 8.2 Route Loading

Only client-side code required for the current experience should load on the journey route.

Do not include:

- unused admin tooling
- asset authoring tools
- development diagnostics
- large documentation viewers
- unused UI frameworks

## 8.3 Development Tools

Debug panels and inspection libraries must not enter the production bundle unless explicitly required.

## 8.4 Dynamic Imports

Use dynamic imports for:

- heavy station components
- optional audio system
- optional post-processing
- development-only tools
- noncritical artifact detail panels

---

# 9. Draw Call Budget

Draw calls must be measured per active milestone state.

## 9.1 Target Budgets

```text
High profile:
under 120 draw calls preferred

Standard profile:
under 90 draw calls preferred

Mobile profile:
under 60 draw calls preferred

Reduced profile:
under 45 draw calls preferred
```

## 9.2 Transition Budget

During station overlap:

```text
High:
under 160 draw calls preferred

Standard:
under 120 draw calls preferred

Mobile:
under 80 draw calls preferred
```

Overlap should remain brief.

## 9.3 Reduction Strategies

Use:

- shared materials
- geometry merging
- instancing
- texture atlases when appropriate
- fewer transparent meshes
- simplified background elements
- limited shadow casters

---

# 10. Triangle Budget

Triangle counts are measured for visible runtime geometry.

## 10.1 Scene Budget

```text
High profile visible triangles:
under 350,000 preferred

Standard profile visible triangles:
under 220,000 preferred

Mobile profile visible triangles:
under 100,000 preferred

Reduced profile visible triangles:
under 75,000 preferred
```

## 10.2 Hero Asset Budget

```text
LOD0:
30,000 to 80,000 triangles preferred

LOD1:
12,000 to 35,000 triangles preferred

LOD2:
3,000 to 12,000 triangles preferred
```

## 10.3 Transition Overlap

Two hero artifacts may temporarily overlap only when total scene triangles remain within the transition budget.

## 10.4 Procedural Geometry

Procedural architecture should use:

- low segment counts
- instancing
- normal maps for small detail
- merged static geometry after assembly when beneficial

---

# 11. Material Budget

## 11.1 Material Count

```text
High profile:
under 30 active materials preferred

Standard profile:
under 22 active materials preferred

Mobile profile:
under 14 active materials preferred
```

## 11.2 Shared Materials

Reuse shared materials such as:

```text
MAT_STONE_CLEAN
MAT_STONE_WEATHERED
MAT_STONE_DARK
MAT_STONE_POLISHED
MAT_GOLD_AGED
MAT_METAL_AGED
MAT_WOOD_DARK
```

## 11.3 Shader Complexity

Custom shaders require:

- measurable visual value
- mobile fallback
- reduced profile fallback
- performance profiling
- documented ownership

Avoid unnecessary branching and large uniform sets.

---

# 12. Texture Budget

## 12.1 Runtime Resolution

```text
Hero desktop texture:
2048 × 2048 maximum preferred

Standard texture:
1024 × 1024 preferred

Mobile texture:
512 × 512 or 1024 × 1024

Small shared texture:
256 × 256 to 512 × 512
```

4K textures require explicit approval.

## 12.2 Texture Memory

Preferred active GPU texture memory:

```text
High profile:
under 256 MB preferred

Standard profile:
under 160 MB preferred

Mobile profile:
under 96 MB preferred

Reduced profile:
under 64 MB preferred
```

These values include:

- color textures
- normal maps
- ORM maps
- environment maps
- shadow maps
- render targets
- post-processing buffers

## 12.3 Compression

Use KTX2 where appropriate.

Fallback images should use WebP or AVIF where supported.

## 12.4 Channel Packing

Pack compatible maps when practical.

Preferred convention:

```text
R = Ambient Occlusion
G = Roughness
B = Metallic
```

---

# 13. Model File Budget

## 13.1 GLB Size

Preferred compressed file sizes:

```text
LOD0 hero model:
under 4 MB preferred

LOD1:
under 2.5 MB preferred

LOD2:
under 1.2 MB preferred

Simple prop:
under 500 KB preferred
```

## 13.2 Exceptions

An asset exceeding budget requires:

- measured need
- visual comparison
- mobile alternative
- documented exception
- station-level performance test

## 13.3 Hidden Geometry

Runtime files must not contain:

- hidden high-poly duplicates
- unused cameras
- unused lights
- internal geometry
- unused animations
- unused material slots

---

# 14. Shadow Budget

## 14.1 Shadow-Casting Lights

Preferred maximum:

```text
High:
1 primary shadow-casting light

Standard:
1 simplified shadow-casting light

Mobile:
0 or 1 limited shadow-casting light

Reduced:
0 or 1 minimal shadow-casting light
```

Do not enable shadows on all lights.

## 14.2 Shadow Map Resolution

Suggested maximums:

```text
High:
2048

Standard:
1024

Mobile:
512 to 1024

Reduced:
512 or disabled
```

## 14.3 Shadow Casters

Only visually important objects should cast shadows.

Background and hidden geometry should not cast shadows.

## 14.4 Alternatives

Use:

- baked AO
- contact shadow approximation
- blob shadows
- material darkening
- light gradients

when full shadows are unnecessary.

---

# 15. Particle Budget

## 15.1 Particle Count

Suggested limits:

```text
High:
up to 2,000 lightweight particles

Standard:
up to 1,000

Mobile:
up to 400

Reduced:
up to 100 or disabled
```

## 15.2 Particle Rules

Particles must:

- use shared geometry or points
- avoid per-particle React components
- avoid complex transparency sorting
- avoid large overdraw
- remain visually subtle

## 15.3 Idle Motion

Particle motion should continue only when:

- tab is visible
- rendering is active
- user preference allows it

---

# 16. Lighting Budget

## 16.1 Active Lights

Preferred active light counts:

```text
High:
3 to 4 total lights

Standard:
2 to 3 total lights

Mobile:
1 to 2 total lights

Reduced:
1 to 2 total lights
```

## 16.2 Station Lights

Stations should request lighting profiles rather than instantiate uncontrolled light sets.

## 16.3 Volumetric Effects

Volumetric lighting must be:

- optional
- quality-aware
- disabled on constrained profiles
- tested for fill-rate cost

---

# 17. Post-Processing Budget

## 17.1 Approved Effect Categories

Possible effects:

- subtle vignette
- restrained bloom
- color grading
- limited depth of field
- optional noise
- minimal tone mapping adjustments

## 17.2 Rules

- Use the fewest passes possible.
- Disable nonessential passes on mobile.
- Reduced mode should use minimal or no post-processing.
- Depth of field must not reduce text readability.
- Bloom must not wash out stone details.
- Avoid motion blur unless separately approved and profiled.

## 17.3 Render Targets

Post-processing render targets count toward GPU memory budget.

---

# 18. Device Pixel Ratio Budget

## 18.1 Suggested DPR

```text
High:
1.5 to 2.0 maximum

Standard:
1.0 to 1.5

Mobile:
1.0 to 1.25

Reduced:
1.0
```

Do not automatically render at the device's full native DPR.

## 18.2 Adaptive DPR

Adaptive DPR may reduce resolution when sustained frame rate is below target.

Profile changes must be stable and avoid visible oscillation.

---

# 19. CPU Budget

## 19.1 Per-Frame JavaScript

Preferred per-frame JavaScript budget:

```text
High and standard:
under 4 ms preferred

Mobile:
under 8 ms preferred
```

## 19.2 Prohibited Per-Frame Work

Do not:

- allocate arrays
- allocate vectors
- parse JSON
- traverse the full scene
- update global React state
- log diagnostics
- calculate unchanged configuration
- rebuild materials
- clone models
- perform DOM queries repeatedly

## 19.3 Cached Computation

Precompute:

- keyframe segments
- station ranges
- reusable vectors
- artifact anchors
- quality configuration
- static geometry

---

# 20. Memory Budget

## 20.1 Loaded Station Window

Prefer keeping:

```text
Previous station
Current station
Next station
```

loaded when practical.

## 20.2 Browser Memory Targets

Indicative target ranges:

```text
Desktop total page memory:
under 500 MB preferred

Mobile total page memory:
under 250 MB preferred
```

Actual browser reporting varies and must be interpreted carefully.

## 20.3 Disposal

Distant station resources may be disposed when:

- no longer visible
- not shared
- not required for immediate reverse scroll
- safe fallback exists

## 20.4 Leak Testing

Test:

- complete forward journey
- complete reverse journey
- restart journey
- repeat journey multiple times
- language switch
- quality downgrade
- route leave and return

Memory should not grow indefinitely.

---

# 21. Active Station Budget

At normal runtime, prefer:

```text
1 hero artifact
1 shared camera
1 shared lighting rig
1 shared particle system
1 HTML story layer
```

During transitions:

```text
1 outgoing artifact
1 incoming artifact
shared infrastructure
```

Avoid keeping several heavy hero artifacts visible at once.

---

# 22. Audio Budget

## 22.1 File Size

```text
Initial ambient audio:
under 500 KB preferred

Per-station accent:
under 150 KB preferred
```

## 22.2 Loading

Audio is noncritical.

Do not block the visual experience on audio.

## 22.3 Runtime

Use a small number of concurrent audio sources.

Stop or suspend audio when the tab is hidden.

---

# 23. Font Budget

Use the minimum number of font families and weights.

Preferred:

```text
English:
1 family, 2 to 3 weights

Persian:
1 family, 2 to 3 weights
```

Use:

- subset fonts
- compressed WOFF2
- preloading only for critical weights
- `font-display` behavior that preserves readability

Avoid loading decorative font weights that are not used.

---

# 24. DOM Budget

The WebGL experience should not be surrounded by an excessively large DOM.

## 24.1 Story Sections

Use semantic but compact markup.

## 24.2 Labels

Do not render hundreds of hidden artifact labels.

Only active and nearby labels should exist.

## 24.3 Preferred Limits

```text
Active visible artifact labels:
3 maximum preferred

Total mounted story labels:
only current and nearby stations preferred
```

---

# 25. Quality Profile Matrix

| Feature | High | Standard | Mobile | Reduced |
|---|---|---|---|---|
| DPR | 1.5 to 2.0 | 1.0 to 1.5 | 1.0 to 1.25 | 1.0 |
| Model LOD | LOD0 | LOD1 | LOD2 | LOD2 or fallback |
| Hero texture | 2K | 1K to 2K | 512 to 1K | 512 to 1K |
| Shadows | High | Medium | Low or off | Off or minimal |
| Particles | Up to 2000 | Up to 1000 | Up to 400 | Up to 100 |
| Volumetrics | Limited | Reduced | Off | Off |
| Post-processing | Approved full set | Simplified | Minimal | Minimal or off |
| Camera path | Full | Full with limits | Shortened | Minimal |
| Orbit | Approved short orbit | Short orbit | Object rotation preferred | Disabled |
| Simultaneous labels | Up to 3 | Up to 3 | 1 to 2 | 1 to 2 |
| Active lights | 3 to 4 | 2 to 3 | 1 to 2 | 1 to 2 |

---

# 26. Automatic Quality Selection

## 26.1 Initial Inputs

Quality selection may consider:

- viewport size
- DPR
- mobile user agent only as a weak signal
- hardware concurrency
- device memory where available
- reduced-motion preference
- WebGL capability
- initial frame-rate sample

## 26.2 Do Not Overtrust Device Detection

Runtime measurement is more reliable than device labels.

## 26.3 Automatic Downgrade

Downgrade when:

- sustained FPS remains below profile threshold
- frame time remains unstable
- memory pressure becomes visible
- WebGL warnings occur
- repeated context instability appears

## 26.4 Hysteresis

Do not switch profiles repeatedly.

Use:

- sustained observation window
- cooldown period
- conservative upgrades
- immediate reduced-motion priority

---

# 27. Performance Measurement Tools

Recommended tools:

- Chrome DevTools Performance
- Chrome DevTools Memory
- Lighthouse
- React DevTools Profiler
- Three.js renderer statistics
- Spector.js in development only
- Playwright tracing
- WebPageTest where available
- browser network throttling
- device testing

Development diagnostics may show:

```text
FPS
frame time
draw calls
triangles
geometries
textures
programs
quality profile
loaded stations
DPR
```

Diagnostics must not ship as visible production UI.

---

# 28. Station Performance Report

Every completed station should have a report.

Suggested format:

```md
# Station Performance Report

## Station

Lamassu

## Profile

Mobile

## Device

Device name and browser

## Network

Connection or throttle profile

## Metrics

- Average FPS:
- Lowest FPS:
- Average frame time:
- Draw calls:
- Triangles:
- Active materials:
- Texture memory estimate:
- Model payload:
- Texture payload:
- Load duration:
- Transition duration:

## Result

Pass / Pass with exception / Fail

## Notes

Observed issues and recommended changes.
```

Store reports under:

```text
docs/performance/
```

---

# 29. Milestone Performance Gates

## 29.1 Foundation Gate

Required:

- no unnecessary heavy dependencies
- initial route loads
- Canvas initializes
- no repeated long tasks during idle
- fallback works

## 29.2 Motion Prototype Gate

Required:

- camera motion remains smooth
- no per-frame React state updates
- reverse scroll remains responsive
- mobile profile exists

## 29.3 MVP Gate

Required:

- stable mobile 30 FPS
- initial 3D payload under approved target
- station preloading works
- no major memory leak
- transitions remain within temporary frame-rate floor

## 29.4 Production Asset Gate

Required:

- each hero asset meets LOD and texture budgets
- each station report passes
- fallback exists
- mobile variant exists

## 29.5 Release Gate

Required:

- complete forward and reverse journey profiled
- supported device matrix passes
- no critical memory growth
- loading and fallback paths pass
- documented exceptions approved

---

# 30. Performance Testing Scenarios

Test all of the following:

## 30.1 Normal Journey

- load page
- complete full forward journey
- pause in each station
- complete Outro

## 30.2 Reverse Journey

- scroll to final station
- return to Intro
- verify loading and disposal

## 30.3 Rapid Scrubbing

- move quickly across multiple stations
- reverse direction repeatedly
- confirm no blank scene
- confirm no asset race failure

## 30.4 Restart

- complete journey
- restart
- repeat at least three times
- monitor memory

## 30.5 Resize

- resize desktop window
- rotate tablet or mobile
- preserve active station
- monitor frame rate

## 30.6 Background Tab

- hide tab
- return after delay
- verify rendering and audio resume correctly

## 30.7 Slow Network

- throttle network
- verify preload fallback
- verify current station remains usable

## 30.8 WebGL Failure

- force fallback
- confirm complete narrative remains accessible

---

# 31. Performance Failure Rules

A feature fails review when it causes:

- sustained mobile frame rate below 30 FPS
- repeated long tasks during scrolling
- blank station during normal preload
- uncontrolled memory growth
- excessive initial payload
- visible camera jitter
- large frame drops during every transition
- unusable mobile heat or battery behavior
- missing reduced profile
- broken fallback

The default response to failure is:

```text
Measure
→ identify largest cost
→ simplify
→ retest
```

Do not immediately add more infrastructure.

---

# 32. Optimization Order

When a station exceeds budget, optimize in this order:

```text
1. Remove unnecessary work
2. Reduce draw calls
3. Reduce shadow cost
4. Reduce particle and transparency cost
5. Reduce texture memory
6. Reduce model complexity
7. Reduce post-processing
8. Reduce DPR
9. Simplify camera or artifact motion
10. Replace effect with a lighter visual method
```

Do not reduce content accessibility.

---

# 33. Exceptions

A budget exception requires:

- exact metric exceeded
- measured reason
- visible benefit
- affected devices
- mobile alternative
- fallback behavior
- mitigation plan
- approval
- ADR or performance report reference

Example:

```md
## Exception

The Lamassu LOD0 model is 4.8 MB instead of the preferred 4 MB.

### Reason

Wing carving detail is visible during the approved close-up.

### Mitigation

- LOD1 is used for standard profile
- LOD2 is used for mobile
- LOD0 begins preloading during the Grand Stairway station
- fallback poster is available

### Status

Approved
```

---

# 34. CI Performance Checks

Where practical, CI should validate:

- bundle size trend
- asset file size limits
- missing LOD variants
- oversized textures
- manifest completeness
- production build
- route availability

Potential scripts:

```text
npm run performance:assets
npm run performance:bundle
npm run assets:validate
```

CI should fail on clear budget violations unless an exception is documented.

---

# 35. Recommended Asset Validation Output

```text
Asset: lamassu

Model
✓ LOD0 exists
✓ LOD1 exists
✓ LOD2 exists
✓ GLB format valid
✓ Transform contract found

File Size
✓ LOD0 below 4 MB
✓ LOD1 below 2.5 MB
✓ LOD2 below 1.2 MB

Textures
✓ KTX2 available
✓ Maximum resolution approved
✓ Mobile textures available

Fallback
✓ Poster available

Result
PASS
```

---

# 36. Recommended First Performance Task

```text
Create the initial performance infrastructure for the Persepolis project.

Read:
- AGENTS.md
- docs/SPEC.md
- docs/ARCHITECTURE.md
- docs/CAMERA_SYSTEM.md
- docs/ASSET_PIPELINE.md
- docs/PERFORMANCE_BUDGET.md
- docs/ACCESSIBILITY.md
- docs/DECISIONS.md

Implement:

1. Typed quality profiles
2. Central quality configuration
3. Initial profile selection
4. Adaptive DPR limits
5. Development-only renderer statistics
6. Visibility pause behavior
7. Asset size validation utilities
8. Quality-specific asset resolution
9. Unit tests for profile selection
10. Documentation for measured budgets

Requirements:

- no new major dependency without approval
- no production debug UI
- no per-frame React state updates
- reduced-motion preference must take precedence
- mobile must not use high profile by default
- production build must pass

At completion:
1. summarize implementation
2. list changed files
3. report lint, typecheck, unit, Playwright, and build results
4. provide an English commit message
```

---

# 37. Performance Acceptance Checklist

Before release, confirm:

## Network

- initial payload is within approved budget
- station assets load lazily
- next station preloads
- fallback imagery is compressed
- unnecessary files are not public

## CPU

- no repeated long tasks
- no per-frame React state updates
- frame callbacks avoid allocations
- scroll handlers remain lightweight

## GPU

- draw calls are within profile budgets
- triangles are within profile budgets
- textures are compressed
- shadows are limited
- post-processing is profile-aware
- particles are within profile limits

## Memory

- distant assets can unload
- shared resources remain stable
- repeated journeys do not leak significantly
- tab visibility handling works

## Experience

- camera remains smooth
- transitions do not stall
- mobile remains usable
- reduced motion remains complete
- fallback remains readable

---

# 38. Summary

The performance system follows this rule:

```text
Load only what is needed.
Render only what is visible.
Animate only what explains.
Share what can be shared.
Compress what can be compressed.
Measure before guessing.
Reduce quality before breaking the story.
```

The intended result is not the maximum possible visual complexity.

It is the highest visual quality that remains smooth, accessible, and reliable.
