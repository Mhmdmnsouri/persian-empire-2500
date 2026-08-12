# DECISIONS.md

## Project

**Persian Empire 2500**

## Document Status

- **Status:** Active
- **Version:** 1.0.0
- **Purpose:** Record important product, architecture, performance, accessibility, and asset decisions
- **Audience:** Developers, AI coding agents, technical reviewers, designers, and future maintainers

---

# 1. How to Use This Document

This file contains Architectural Decision Records, also known as ADRs.

An ADR should be added when a decision:

- changes the architecture
- introduces a major dependency
- changes the motion system
- changes the asset pipeline
- affects accessibility
- affects performance budgets
- changes the station lifecycle
- changes the camera model
- changes internationalization strategy
- introduces a long-term constraint
- replaces a previously accepted decision

Do not use this file as:

- a daily changelog
- a task list
- a bug tracker
- a meeting transcript
- a commit history
- a place for minor implementation notes

Minor implementation details belong in code comments, pull requests, or task documentation.

---

# 2. ADR Format

Each decision should follow this structure:

```md
## ADR-XXX: Decision Title

### Status

Proposed | Accepted | Superseded | Rejected | Deprecated

### Date

YYYY-MM-DD

### Context

What problem or constraint required a decision?

### Decision

What was decided?

### Rationale

Why was this option selected?

### Alternatives Considered

What alternatives were evaluated?

### Consequences

What positive and negative consequences follow?

### Implementation Notes

What rules must the implementation follow?

### Related Documents

- `docs/...`
```

---

# ADR-001: Use One Persistent WebGL Canvas

### Status

Accepted

### Date

2026-08-07

### Context

The experience contains multiple scroll-driven stations that must transition smoothly between artifacts.

Creating a separate WebGL canvas for every station would:

- recreate the renderer repeatedly
- reset camera state
- increase memory and initialization cost
- complicate transitions
- create inconsistent post-processing
- increase the risk of WebGL context issues

### Decision

Use one persistent React Three Fiber canvas for the entire journey.

All stations render inside the same shared scene and use the same renderer, camera rig, lighting infrastructure, and quality controller.

### Rationale

A persistent canvas provides:

- continuous camera motion
- smoother transitions
- shared lighting
- shared post-processing
- predictable station lifecycle
- lower initialization overhead
- simpler asset preloading

### Alternatives Considered

#### Separate Canvas per Station

Rejected because it would complicate transitions and increase renderer lifecycle cost.

#### Pre-rendered Video per Station

Rejected as the primary architecture because it would reduce interactivity and reverse-scroll control.

### Consequences

Positive:

- smooth visual continuity
- shared runtime systems
- fewer renderer lifecycle problems
- easier cross-station transitions

Negative:

- station cleanup must be explicit
- scene ownership must be carefully managed
- memory leaks could affect the full journey

### Implementation Notes

- The Canvas must not remount when the active station changes.
- Stations must mount and unmount inside the shared scene.
- Shared resources must not be disposed while still referenced.
- WebGL failures must fall back to semantic HTML and static imagery.

### Related Documents

- `docs/ARCHITECTURE.md`
- `docs/SPEC.md`

---

# ADR-002: Use Scroll Progress as the Source of Truth

### Status

Accepted

### Date

2026-08-07

### Context

The experience must support:

- forward scrolling
- backward scrolling
- scrubbed animation
- deterministic state
- direct chapter navigation
- refresh at arbitrary scroll positions
- reduced-motion variants

One-time animation callbacks are not sufficient for these requirements.

### Decision

Use normalized scroll progress as the primary source of truth for all major visual states.

The system must derive:

- active station
- local station progress
- camera pose
- artifact transform
- lighting state
- typography state
- transition state

from progress.

### Rationale

Progress-derived state is:

- reversible
- testable
- deterministic
- easier to debug
- compatible with direct navigation
- resilient to scroll direction changes

### Alternatives Considered

#### One-Time GSAP Timelines

Rejected as the only state model because one-time callbacks are difficult to reconstruct and reverse reliably.

#### Local Component Animation State

Rejected for major motion because local state can become inconsistent after rapid scroll changes.

### Consequences

Positive:

- predictable reverse scrolling
- easier testing
- easier refresh restoration
- fewer hidden animation states

Negative:

- motion mapping functions require careful design
- complex effects must be expressed as progress-driven state

### Implementation Notes

- Normalize global progress between `0` and `1`.
- Normalize station-local progress between `0` and `1`.
- Major visual state must be reconstructable at any progress value.
- GSAP may assist with scroll integration and HTML motion but must not become the only source of truth.

### Related Documents

- `docs/ARCHITECTURE.md`
- `docs/MOTION_STORYBOARD.md`

---

# ADR-003: Separate Camera Position and Target

### Status

Accepted

### Date

2026-08-07

### Context

The camera must guide attention toward specific artifact details.

Animating only camera position can create:

- incorrect framing
- unwanted looking direction
- sudden rotations
- weak storytelling
- poor focus during close-up sequences

### Decision

Animate camera position and camera target as independent tracks.

The shared Camera Rig owns the real Three.js camera.

Stations provide desired camera poses through configuration.

### Rationale

Independent position and target control enables:

- smooth focus changes
- controlled orbit
- close-reading sequences
- stable framing
- better mobile simplification
- deliberate visual storytelling

### Alternatives Considered

#### Animate Position Only

Rejected because the camera may move correctly while looking at the wrong point.

#### Allow Stations to Mutate the Camera Directly

Rejected because it creates coupling and conflicting ownership.

### Consequences

Positive:

- better visual direction
- reusable camera infrastructure
- simpler station contracts
- predictable transitions

Negative:

- additional interpolation logic
- target smoothing requires careful tuning

### Implementation Notes

- Stations define desired poses.
- The Camera Rig applies damped interpolation.
- Stations must not mutate the camera directly.
- Camera roll should remain near zero unless explicitly approved.
- Field-of-view changes must remain subtle.

### Related Documents

- `docs/CAMERA_SYSTEM.md`
- `docs/ARCHITECTURE.md`

---

# ADR-004: Keep Primary Narrative Content in Semantic HTML

### Status

Accepted

### Date

2026-08-07

### Context

The project contains animated typography, labels, historical explanations, and bilingual content.

Rendering essential text inside WebGL would reduce:

- accessibility
- SEO
- readability
- localization flexibility
- responsive behavior
- screen-reader support

### Decision

Keep primary narrative content in semantic HTML outside the WebGL canvas.

WebGL may contain decorative labels only when a semantic equivalent exists.

### Rationale

HTML provides:

- better accessibility
- better indexing
- simpler localization
- responsive typography
- easier selection and reading
- more reliable RTL and LTR support

### Alternatives Considered

#### WebGL Text for All Content

Rejected because it would make accessibility and localization significantly harder.

#### Rendered Textures

Rejected for essential content because they are not semantic and scale poorly.

### Consequences

Positive:

- accessible content
- better SEO
- easier bilingual support
- cleaner responsive layouts

Negative:

- HTML and 3D timing must be synchronized
- projected labels require careful positioning

### Implementation Notes

- Headings must use semantic heading elements.
- Animated words may use child spans.
- Full sentences must remain available to assistive technology.
- Historical content must not exist only inside Canvas.

### Related Documents

- `docs/SPEC.md`
- `docs/ACCESSIBILITY.md`
- `docs/CONTENT_GUIDE.md`

---

# ADR-005: Build the Experience Before Final Assets

### Status

Accepted

### Date

2026-08-07

### Context

Final historical assets can be expensive to create and optimize.

Camera framing, station timing, and visible detail requirements are not known until the motion prototype is tested.

Creating final assets too early risks:

- wasted modeling work
- incorrect scale
- unnecessary detail
- poor camera compatibility
- oversized files
- scope expansion

### Decision

Build the complete motion architecture with procedural and temporary placeholders before producing final assets.

### Rationale

This approach validates:

- station composition
- camera paths
- transition timing
- mobile performance
- asset visibility
- detail requirements
- technical feasibility

before expensive production work begins.

### Alternatives Considered

#### Build Final Assets First

Rejected because the visual requirements are not yet stable.

#### Use Only Static Images

Rejected because the project must demonstrate interactive 3D storytelling.

### Consequences

Positive:

- lower project risk
- faster MVP
- fewer unnecessary assets
- better production priorities

Negative:

- early visuals will not represent final quality
- placeholder contracts must be carefully normalized

### Implementation Notes

- MVP must not depend on Blender.
- Placeholder and final assets must use compatible transform contracts.
- Final asset production begins only after station motion approval.

### Related Documents

- `docs/ASSET_PIPELINE.md`
- `docs/SPEC.md`

---

# ADR-006: Use Blender Only for Asset Cleanup and Optimization

### Status

Accepted

### Date

2026-08-07

### Context

The primary developer is a software engineer without prior Blender experience.

Requiring full custom modeling would significantly increase complexity and delivery risk.

### Decision

Use Blender primarily for:

- importing generated or licensed assets
- correcting scale and rotation
- setting origin
- deleting unwanted geometry
- fixing normals
- reducing polygons
- validating materials
- exporting GLB

Advanced modeling remains optional or delegated.

### Rationale

This keeps the workflow developer-friendly while still improving asset quality and performance.

### Alternatives Considered

#### Full Custom Modeling in Blender

Rejected for the initial project because it requires a separate professional skill set.

#### No Blender at All

Rejected for final hero assets because raw AI or ready-made models often require cleanup.

### Consequences

Positive:

- manageable learning scope
- better final asset quality
- lower file size
- cleaner runtime integration

Negative:

- some Blender knowledge is still required
- complex assets may require an external specialist

### Implementation Notes

- Blender is not required for the MVP.
- Hero asset cleanup begins in the production asset phase.
- Advanced sculpting and rigging are not required unless separately approved.

### Related Documents

- `docs/ASSET_PIPELINE.md`

---

# ADR-007: Use GLB as the Primary Runtime Model Format

### Status

Accepted

### Date

2026-08-07

### Context

The project requires a standard runtime format that supports:

- geometry
- PBR materials
- compressed delivery
- Three.js compatibility
- predictable loading
- single-file transport

### Decision

Use `.glb` as the primary runtime model format.

### Rationale

GLB provides:

- native Three.js ecosystem support
- compact binary packaging
- standard PBR material support
- compatibility with optimization tooling
- predictable browser delivery

### Alternatives Considered

#### FBX

Rejected for runtime delivery because it is heavier and less web-oriented.

#### OBJ

Rejected because it has weak material and scene support.

#### Custom JSON Geometry

Rejected because it would create unnecessary tooling and maintenance.

### Consequences

Positive:

- standard runtime workflow
- easier loader integration
- broad tooling support

Negative:

- source assets still require separate storage
- optimization remains necessary

### Implementation Notes

- Source Blender, FBX, and OBJ files must not be served from `public/`.
- Runtime GLB assets must be registered in the asset manifest.
- Mesh compression should use the project-approved strategy.

### Related Documents

- `docs/ASSET_PIPELINE.md`
- `docs/PERFORMANCE_BUDGET.md`

---

# ADR-008: Use KTX2 for Production Texture Compression

### Status

Accepted

### Date

2026-08-07

### Context

Uncompressed image textures can dominate network transfer and GPU memory.

The experience includes multiple artifact materials and must support mobile devices.

### Decision

Use KTX2 for production 3D textures where technically appropriate.

Use WebP or AVIF for fallback and HTML imagery.

### Rationale

KTX2 can reduce:

- network transfer
- GPU memory pressure
- texture upload cost

while adapting to supported GPU formats.

### Alternatives Considered

#### PNG and JPEG Only

Rejected as the production strategy because they increase GPU upload and memory cost.

#### WebP for All 3D Textures

Rejected because browser image compression is not equivalent to GPU texture compression.

### Consequences

Positive:

- smaller texture payload
- improved runtime memory use
- better mobile behavior

Negative:

- additional export tooling
- compatibility and visual quality must be validated

### Implementation Notes

- Keep original texture sources outside the runtime directory.
- Validate normal maps and packed maps after compression.
- Maintain fallback posters as WebP or AVIF.

### Related Documents

- `docs/ASSET_PIPELINE.md`
- `docs/PERFORMANCE_BUDGET.md`

---

# ADR-009: Use Data-Driven Station Configuration

### Status

Accepted

### Date

2026-08-07

### Context

The project contains multiple stations with different:

- scroll ranges
- camera poses
- motion profiles
- asset requirements
- quality behavior
- content keys

Hard-coding station order and behavior across components would create duplication and coupling.

### Decision

Define station metadata in centralized typed configuration.

### Rationale

A data-driven station model enables:

- consistent ordering
- easier insertion and removal
- progress calculation
- preload planning
- type safety
- automated validation
- testability

### Alternatives Considered

#### Hard-Coded JSX Order

Rejected because it makes journey logic difficult to maintain.

#### Separate Independent Pages

Rejected because the experience requires one continuous scroll journey.

### Consequences

Positive:

- cleaner architecture
- easier testing
- predictable station lifecycle
- centralized metadata

Negative:

- configuration types require discipline
- stations still need custom local motion logic

### Implementation Notes

Each station config should include:

- ID
- index
- scroll range
- content keys
- asset key
- motion profile
- mobile profile
- preload offset
- camera configuration
- optional lighting configuration

### Related Documents

- `docs/ARCHITECTURE.md`
- `docs/SPEC.md`

---

# ADR-010: Use Zustand Only for Lightweight Shared State

### Status

Accepted

### Date

2026-08-07

### Context

The journey requires shared state for:

- active station
- locale
- sound preference
- quality profile
- reduced-motion preference
- global progress metadata

Per-frame 3D values change too frequently for normal React state.

### Decision

Use Zustand for lightweight shared journey state.

Do not store per-frame camera, mesh, particle, or material transforms in Zustand.

### Rationale

This separates:

- application-level state
- high-frequency animation state

and prevents excessive React updates.

### Alternatives Considered

#### React Context for All State

Rejected for high-frequency state due to broad rerender risk.

#### Redux Toolkit

Rejected as unnecessary for the current project scope.

#### Store All Animation Values in Zustand

Rejected because it would increase update frequency and coupling.

### Consequences

Positive:

- simple shared state
- limited rerenders
- easy access from interface and controllers

Negative:

- developers must understand the boundary between store and refs
- debugging is split between application and animation state

### Implementation Notes

Use refs or local animation controllers for:

- camera transforms
- mesh transforms
- particle state
- material uniforms
- interpolation values

### Related Documents

- `docs/ARCHITECTURE.md`

---

# ADR-011: Support Persian and English from the Beginning

### Status

Accepted

### Date

2026-08-07

### Context

The project is intended for both Iranian and international audiences.

Adding RTL and localization after the interface and motion system are complete would create rework.

### Decision

Support Persian and English from the project foundation.

Use locale-based routes:

```text
/fa
/en
```

### Rationale

Early bilingual support ensures:

- correct layout direction
- stable content contracts
- compatible typography
- localized metadata
- consistent testing

### Alternatives Considered

#### English First, Persian Later

Rejected because RTL requirements may affect layout and labels.

#### Persian Only

Rejected because the project has international portfolio and educational goals.

### Consequences

Positive:

- broader audience
- less localization rework
- better architecture

Negative:

- more content validation
- typography and layout testing become more complex

### Implementation Notes

- Historical content must come from localized content objects.
- Do not hard-code narrative copy inside station components.
- Interface layout must support RTL and LTR.
- Both routes require automated smoke tests.

### Related Documents

- `docs/SPEC.md`
- `docs/CONTENT_GUIDE.md`
- `docs/ACCESSIBILITY.md`

---

# ADR-012: Respect Reduced Motion as a First-Class Mode

### Status

Accepted

### Date

2026-08-07

### Context

The project uses:

- camera travel
- object rotation
- depth motion
- animated typography
- station transitions

Some users may experience discomfort or require reduced animation.

### Decision

Implement a dedicated reduced-motion experience from the beginning.

Reduced motion preserves the full story while simplifying animation.

### Rationale

Accessibility cannot be reliably added after all timelines are complete.

A first-class profile ensures each station has a defined reduced-motion behavior.

### Alternatives Considered

#### Disable All Animation

Rejected because some controlled visual transition is still useful and content must remain coherent.

#### Ignore `prefers-reduced-motion`

Rejected because it would create an inaccessible experience.

### Consequences

Positive:

- more inclusive experience
- clear station contracts
- improved low-end fallback

Negative:

- every station requires an additional motion profile
- testing scope increases

### Implementation Notes

Reduced motion should:

- limit camera travel
- disable strong orbit
- replace assembly with staged fades
- reduce blur and depth shifts
- preserve content and navigation

### Related Documents

- `docs/ACCESSIBILITY.md`
- `docs/SPEC.md`

---

# ADR-013: Provide a Complete WebGL Fallback

### Status

Accepted

### Date

2026-08-07

### Context

WebGL may fail because of:

- unsupported browser or hardware
- disabled acceleration
- context failure
- asset loading errors
- device instability

The historical content must remain available.

### Decision

Provide a complete non-WebGL fallback based on semantic HTML and static artifact imagery.

### Rationale

The experience should degrade gracefully rather than becoming unusable.

### Alternatives Considered

#### Show an Unsupported Browser Message Only

Rejected because it blocks access to the content.

#### Require WebGL

Rejected because the project has educational and accessibility goals.

### Consequences

Positive:

- resilient experience
- accessible content
- improved SEO
- safer error handling

Negative:

- fallback images and layouts require maintenance
- two presentation paths must be tested

### Implementation Notes

Fallback must include:

- artifact image
- title
- historical text
- chapter navigation
- language switching

### Related Documents

- `docs/ARCHITECTURE.md`
- `docs/ACCESSIBILITY.md`

---

# ADR-014: Use Explicit Quality Profiles

### Status

Accepted

### Date

2026-08-07

### Context

The experience must run across capable desktops, standard laptops, tablets, and mobile devices.

A single rendering configuration would either:

- underuse capable devices
- overload constrained devices

### Decision

Use explicit quality profiles:

```text
high
standard
mobile
reduced
```

### Rationale

Quality profiles make behavior predictable and testable.

They can control:

- DPR
- LOD
- texture resolution
- particles
- shadows
- lights
- post-processing
- motion complexity

### Alternatives Considered

#### One Universal Profile

Rejected because device capability varies significantly.

#### Fully Automatic Continuous Tuning

Rejected for the initial version because it is harder to test and debug.

### Consequences

Positive:

- predictable performance
- easier testing
- controlled degradation

Negative:

- more configuration
- more visual variants to validate

### Implementation Notes

Automatic runtime downgrade may be added when sustained performance falls below target.

Automatic upgrades must be conservative.

### Related Documents

- `docs/PERFORMANCE_BUDGET.md`
- `docs/ARCHITECTURE.md`

---

# ADR-015: Keep Only Nearby Stations Loaded

### Status

Accepted

### Date

2026-08-07

### Context

Loading all hero artifacts at once would increase:

- network transfer
- memory use
- texture memory
- decoding time
- initial load
- mobile instability

### Decision

Prefer keeping only:

- previous station
- current station
- next station

loaded when practical.

Shared resources remain cached.

### Rationale

This balances:

- smooth transitions
- preload readiness
- memory constraints

### Alternatives Considered

#### Load All Stations Initially

Rejected because it would significantly increase initial cost.

#### Load Only the Current Station

Rejected because transitions could expose loading delays.

### Consequences

Positive:

- lower memory usage
- faster initial load
- predictable preloading

Negative:

- station disposal must be correct
- reverse scrolling may require reloading distant stations

### Implementation Notes

- Preload based on direction and station offset.
- Do not dispose shared geometry or textures still in use.
- Use fallbacks if the next asset is not ready.

### Related Documents

- `docs/ARCHITECTURE.md`
- `docs/ASSET_PIPELINE.md`
- `docs/PERFORMANCE_BUDGET.md`

---

# ADR-016: Limit Each Station to One Motion Hero

### Status

Accepted

### Date

2026-08-07

### Context

The project aims to feel cinematic and dynamic, but excessive simultaneous movement would reduce clarity and create visual fatigue.

### Decision

Each station has one dominant motion concept.

Examples:

```text
Intro                  Typography
Grand Stairway         Assembly
Lamassu                Orbit
Bull Capital           Structural assembly
Relief Panel           Light sweep
Apadana Column         Vertical construction
Cuneiform Tablet       Close reading
Rhyton                 Reflection and rotation
Lotus Motif            Radial reveal
Gate of All Nations    Architectural assembly
Immortal Guard         Heroic stillness
```

### Rationale

A single motion hero gives each station a distinct identity while maintaining overall restraint.

### Alternatives Considered

#### Multiple Major Effects per Station

Rejected because it would create visual noise and performance cost.

#### One Repeated Effect for All Stations

Rejected because the journey would become monotonous.

### Consequences

Positive:

- stronger chapter identity
- clearer storytelling
- lower performance cost
- reduced visual fatigue

Negative:

- motion design requires more planning
- some attractive effects must be deliberately omitted

### Implementation Notes

Secondary motion must remain subtle and support the primary behavior.

### Related Documents

- `docs/MOTION_STORYBOARD.md`
- `docs/SPEC.md`

---

# ADR-017: Avoid Full Environment Reconstruction

### Status

Accepted

### Date

2026-08-07

### Context

The original concept involved:

- desert terrain
- mountains
- full architectural reconstruction
- long camera paths
- large environmental assets

This approach introduced excessive scope and asset complexity for a developer-led project.

### Decision

Use a dark, minimal, museum-like digital environment.

Present one curated artifact or architectural element at a time.

### Rationale

This approach preserves:

- cinematic storytelling
- 3D interaction
- scroll-driven camera motion
- historical focus
- portfolio value

while reducing:

- terrain work
- environmental modeling
- asset count
- camera complexity
- mobile performance risk

### Alternatives Considered

#### Full Persepolis Environment

Rejected for the first version due to scope and asset production cost.

#### Static Editorial Website

Rejected because it would lose the interactive 3D identity.

### Consequences

Positive:

- achievable scope
- stronger focus on individual artifacts
- better mobile performance
- easier art direction

Negative:

- less spatial understanding of the complete site
- architectural context must be explained through text and miniature assemblies

### Implementation Notes

The project may later add optional architectural overview scenes, but the main journey remains artifact-focused.

### Related Documents

- `docs/SPEC.md`
- `docs/MOTION_STORYBOARD.md`

---

# ADR-018: Use Vitest and Playwright as the Only Test Frameworks

### Status

Accepted

### Date

2026-08-07

### Context

The project needs:

- unit testing for progress and motion mapping
- browser testing for scrolling and responsive behavior
- a minimal and maintainable testing stack

### Decision

Use:

- Vitest for unit and integration tests
- Playwright for end-to-end and browser-level tests

### Rationale

This stack covers the required testing layers without unnecessary duplication.

### Alternatives Considered

#### Jest

Rejected because Vitest integrates more naturally with the modern TypeScript and Vite ecosystem used by project tooling.

#### Cypress

Rejected to keep the browser test stack limited to Playwright.

### Consequences

Positive:

- smaller testing stack
- clear test responsibilities
- good TypeScript support

Negative:

- visual WebGL testing may require targeted custom strategies

### Implementation Notes

Unit tests should prioritize pure motion and configuration logic.

Playwright should validate milestone states rather than every animation frame.

### Related Documents

- `docs/TEST_PLAN.md`
- `docs/ARCHITECTURE.md`

---

# ADR-019: Limit Code Quality Tooling

### Status

Accepted

### Date

2026-08-07

### Context

The project requires consistent formatting, linting, and pre-commit checks without a large maintenance burden.

### Decision

Use only:

- ESLint
- Prettier
- Husky

for code quality tooling unless a new tool is explicitly approved.

### Rationale

This keeps the project predictable and avoids overlapping tools.

### Alternatives Considered

Additional formatters, linters, and commit frameworks were rejected unless a demonstrated need appears.

### Consequences

Positive:

- simple tooling
- low configuration burden
- consistent workflow

Negative:

- some specialized checks may require custom scripts

### Implementation Notes

Any additional quality dependency requires a new ADR.

### Related Documents

- `AGENTS.md`
- `docs/TEST_PLAN.md`

---

# ADR-020: Record Major AI Decisions

### Status

Accepted

### Date

2026-08-07

### Context

AI coding agents may make technical choices during implementation.

Undocumented choices can cause:

- architecture drift
- inconsistent dependencies
- repeated debates
- hidden assumptions
- difficult maintenance

### Decision

Any major decision made by an AI coding agent must be recorded in this file.

### Rationale

The repository must preserve the reasoning behind important decisions, regardless of whether they were made by a human or AI.

### Alternatives Considered

#### Keep Decisions Only in Chat or Pull Requests

Rejected because those contexts may not remain available to future maintainers.

### Consequences

Positive:

- transparent history
- easier future review
- fewer repeated decisions
- controlled AI autonomy

Negative:

- requires documentation discipline

### Implementation Notes

AI agents must update `docs/DECISIONS.md` when they:

- add a major dependency
- change architecture
- change state ownership
- change loading strategy
- change camera behavior
- change asset format
- change quality strategy
- change testing strategy

### Related Documents

- `AGENTS.md`

---

# ADR-021: Use Tailwind CSS for Component Styling

### Status

Accepted

### Date

2026-08-10

### Decision

Use Tailwind CSS utility classes for component-level presentation. Keep `globals.css` limited to the Tailwind import, shared design tokens, and truly global browser rules such as the visible keyboard-focus treatment.

### Rationale

Colocating presentation with semantic JSX keeps component styles isolated and avoids an expanding global selector surface.

### Consequences

- Shared tokens remain global.
- Component selectors such as station and interface layout rules belong in utility classes.
- Accessibility states remain explicit through Tailwind focus and responsive variants.

### Related Documents

- `docs/ARCHITECTURE.md`
- `docs/ACCESSIBILITY.md`

---

---

# ADR-022: Keep Journey Content and Sources in Typed Local Modules

### Status

Accepted

### Date

2026-08-12

### Context

The bilingual journey needs narrative copy, interface copy, uncertainty notes, terminology, and source references without placing historical prose in React components. Source IDs and claim strength also need to remain equivalent across Persian and English.

### Decision

Store English and Persian journey content in typed local modules. Keep cited sources in one source registry and terminology in one bilingual glossary. Validate source references, required factual citations, safe text fields, label limits, and cross-locale parity when the journey content module is loaded.

### Consequences

- React components receive localized content objects instead of hard-coded narrative copy.
- A factual station cannot be introduced without at least one registry source.
- The current placeholder GLBs are described with explicit uncertainty rather than as reconstructions.
- A future CMS must preserve these contracts at its import boundary.

### Related Documents

- `docs/CONTENT_GUIDE.md`
- `docs/ACCESSIBILITY.md`
- `docs/TEST_PLAN.md`

---

# 3. Decision Index

| ADR | Title | Status |
|---|---|---|
| ADR-001 | Use One Persistent WebGL Canvas | Accepted |
| ADR-002 | Use Scroll Progress as the Source of Truth | Accepted |
| ADR-003 | Separate Camera Position and Target | Accepted |
| ADR-004 | Keep Primary Narrative Content in Semantic HTML | Accepted |
| ADR-005 | Build the Experience Before Final Assets | Accepted |
| ADR-006 | Use Blender Only for Asset Cleanup and Optimization | Accepted |
| ADR-007 | Use GLB as the Primary Runtime Model Format | Accepted |
| ADR-008 | Use KTX2 for Production Texture Compression | Accepted |
| ADR-009 | Use Data-Driven Station Configuration | Accepted |
| ADR-010 | Use Zustand Only for Lightweight Shared State | Accepted |
| ADR-011 | Support Persian and English from the Beginning | Accepted |
| ADR-012 | Respect Reduced Motion as a First-Class Mode | Accepted |
| ADR-013 | Provide a Complete WebGL Fallback | Accepted |
| ADR-014 | Use Explicit Quality Profiles | Accepted |
| ADR-015 | Keep Only Nearby Stations Loaded | Accepted |
| ADR-016 | Limit Each Station to One Motion Hero | Accepted |
| ADR-017 | Avoid Full Environment Reconstruction | Accepted |
| ADR-018 | Use Vitest and Playwright as the Only Test Frameworks | Accepted |
| ADR-019 | Limit Code Quality Tooling | Accepted |
| ADR-020 | Record Major AI Decisions | Accepted |
| ADR-021 | Use Tailwind CSS for Component Styling | Accepted |
| ADR-022 | Keep Journey Content and Sources in Typed Local Modules | Accepted |

---

# 4. Superseding a Decision

Do not delete an accepted ADR when the decision changes.

Instead:

1. mark the previous ADR as `Superseded`
2. add a new ADR
3. reference the replacement ADR
4. explain why the original decision changed

Example:

```md
### Status

Superseded by ADR-024
```

---

# 5. Pending Decisions

The following decisions should be recorded when implementation reaches the relevant stage:

- exact mesh compression strategy: Meshopt or Draco
- final audio implementation: Web Audio API or Howler.js
- post-processing package and allowed effects
- automatic quality downgrade strategy
- source citation storage format
- artifact detail panel architecture
- analytics provider
- error monitoring provider
- deployment platform
- content management strategy, if any
- visual regression tooling
