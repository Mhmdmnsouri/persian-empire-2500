# ROADMAP.md

## Project

**Persian Empire 2500**

## Document Status

- **Status:** Active planning document
- **Version:** 1.0.0
- **Audience:** Developers, AI coding agents, designers, 3D asset contributors, QA engineers, technical reviewers
- **Primary Goal:** Deliver a performant, accessible, bilingual, scroll-driven 3D storytelling experience
- **Related Documents:**
  - `docs/SPEC.md`
  - `docs/MOTION_STORYBOARD.md`
  - `docs/ARCHITECTURE.md`
  - `docs/CAMERA_SYSTEM.md`
  - `docs/ASSET_PIPELINE.md`
  - `docs/PERFORMANCE_BUDGET.md`
  - `docs/ACCESSIBILITY.md`
  - `docs/TEST_PLAN.md`
  - `docs/CONTENT_GUIDE.md`
  - `docs/DECISIONS.md`

---

# 1. Purpose

This roadmap defines the recommended implementation order for the Persepolis experience.

The roadmap is designed to reduce project risk by validating the motion system, camera behavior, architecture, accessibility, and performance before final 3D assets are produced.

The core delivery strategy is:

```text
Documentation
    ↓
Technical Foundation
    ↓
Motion Prototype
    ↓
MVP Vertical Slice
    ↓
Visual System
    ↓
Remaining Stations
    ↓
Production Assets
    ↓
Optimization
    ↓
Accessibility and QA
    ↓
Release
```

---

# 2. Delivery Principles

## 2.1 Build the Experience Before the Final Assets

Final asset production must not begin until:

- station framing is approved
- camera behavior is approved
- visible detail requirements are known
- mobile composition is validated
- performance budgets are confirmed

## 2.2 Validate Risk Early

The highest-risk systems must be tested first:

1. scroll synchronization
2. reversible progress-driven animation
3. camera smoothing
4. station transitions
5. mobile performance
6. reduced-motion behavior
7. lazy asset loading

## 2.3 Keep the MVP Small

The MVP includes only:

- Intro
- Grand Stairway
- Lamassu
- Bull Capital
- Minimal Outro

The remaining stations are implemented after the MVP is approved.

## 2.4 Every Phase Has an Exit Gate

A phase is complete only when its deliverables and acceptance criteria are satisfied.

Starting the next phase before the exit gate is approved should be treated as an exception.

---

# 3. Milestone Overview

| Milestone | Outcome |
|---|---|
| M0 | Documentation and repository rules are ready |
| M1 | Project foundation builds and tests successfully |
| M2 | Scroll and camera prototype works with placeholders |
| M3 | Intro motion language is approved |
| M4 | MVP vertical slice is complete |
| M5 | Mobile, reduced motion, and fallback paths are stable |
| M6 | Full visual and interface system is approved |
| M7 | All planned stations are implemented with placeholders |
| M8 | Production assets replace placeholders |
| M9 | Performance, accessibility, and QA gates pass |
| M10 | Public release is deployed |

---

# 4. Phase 0: Documentation and Project Definition

## Objective

Create a stable source of truth before implementation begins.

## Required Documents

```text
AGENTS.md
docs/SPEC.md
docs/MOTION_STORYBOARD.md
docs/ARCHITECTURE.md
docs/CAMERA_SYSTEM.md
docs/ASSET_PIPELINE.md
docs/PERFORMANCE_BUDGET.md
docs/ACCESSIBILITY.md
docs/CONTENT_GUIDE.md
docs/TEST_PLAN.md
docs/ROADMAP.md
docs/DECISIONS.md
```

## Tasks

- Finalize product scope.
- Confirm MVP stations.
- Confirm technology stack.
- Confirm bilingual requirements.
- Confirm accessibility target.
- Confirm performance budgets.
- Confirm asset strategy.
- Confirm station naming.
- Record accepted architectural decisions.
- Define AI coding-agent rules in `AGENTS.md`.

## Deliverables

- Complete documentation set
- Initial ADR index
- Approved MVP scope
- Approved project structure

## Exit Criteria

- No major architectural question blocks repository initialization.
- MVP scope is fixed.
- The distinction between placeholder and production assets is documented.
- Codex can implement the foundation without guessing major requirements.

---

# 5. Phase 1: Repository Foundation

## Objective

Create a clean, testable, production-ready project foundation.

## Stack

- Next.js
- React
- TypeScript
- React Three Fiber
- Three.js
- Drei
- GSAP
- ScrollTrigger
- Zustand
- Vitest
- Playwright
- ESLint
- Prettier
- Husky

## Tasks

### Project Setup

- Initialize Next.js with TypeScript.
- Configure the App Router.
- Create `/fa` and `/en` routes.
- Configure global styles.
- Configure strict TypeScript settings.
- Add path aliases.
- Add environment validation if needed.

### Code Quality

- Configure ESLint.
- Configure Prettier.
- Configure Husky.
- Add pre-commit checks.
- Add consistent scripts.

### Testing

- Configure Vitest.
- Configure Playwright.
- Add one unit smoke test.
- Add one route smoke test.
- Add production build validation.

### Folder Structure

Create the initial structure defined in `ARCHITECTURE.md`.

### Documentation

- Add `docs/DECISIONS.md`.
- Record deviations from the agreed architecture.
- Add repository setup instructions to `README.md`.

## Suggested Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "typecheck": "tsc --noEmit"
}
```

## Deliverables

- Running application
- Working localized routes
- Passing lint
- Passing typecheck
- Passing unit test
- Passing Playwright smoke test
- Passing production build

## Exit Criteria

```text
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

All commands pass.

---

# 6. Phase 2: Journey and Scroll Foundation

## Objective

Implement the core progress-driven journey system without final visuals.

## Tasks

### Global Progress

- Create normalized global progress from `0` to `1`.
- Detect scroll direction.
- Prevent invalid ranges.
- Support direct refresh at arbitrary scroll positions.

### Station Configuration

- Define typed station configuration.
- Add Intro, Grand Stairway, Lamassu, Bull Capital, and Outro.
- Define scroll ranges.
- Define station IDs and indexes.
- Add content and asset keys.

### Local Progress

- Resolve the active station.
- Calculate station-local progress.
- Support transition overlap.
- Add unit tests.

### Story Layer

- Create semantic HTML station sections.
- Use station sections to provide scroll height.
- Add temporary headings and descriptions.
- Add a minimal chapter progress indicator.

### State Management

- Add the lightweight Zustand journey store.
- Keep per-frame transforms outside Zustand.

## Deliverables

- Stable global progress
- Active station detection
- Local station progress
- Forward and backward direction support
- Semantic HTML story structure
- Unit test coverage

## Exit Criteria

- Forward scrolling activates stations in order.
- Reverse scrolling restores stations correctly.
- No station depends on one-time callbacks.
- Reloading at a mid-page position resolves the correct station.
- Progress functions pass unit tests.

---

# 7. Phase 3: Persistent Canvas and Camera Prototype

## Objective

Validate the shared WebGL and camera architecture.

## Tasks

### Persistent Canvas

- Add one fixed React Three Fiber Canvas.
- Add a shared scene root.
- Add error boundary and fallback.
- Add centralized renderer configuration.
- Add visibility pause behavior.

### Camera Rig

- Create the shared camera rig.
- Separate camera position and target.
- Add damped interpolation.
- Add station-level camera poses.
- Add subtle FOV support.
- Prevent stations from mutating the camera directly.

### Debug Tools

Add development-only controls:

- current global progress
- active station
- local progress
- camera position
- camera target
- FOV
- quality profile
- reduced-motion status

Optional:

- visible camera target helper
- keyframe markers
- station boundary overlays

### Placeholder Scene

Render basic placeholders:

- simple step
- simple Lamassu volume
- simple Bull Capital group

## Deliverables

- Persistent Canvas
- Working shared camera
- Reversible camera movement
- Debug overlay
- Placeholder station rendering

## Exit Criteria

- Canvas does not remount during station changes.
- Camera position and target interpolate independently.
- Rapid forward and backward scrolling does not break framing.
- Camera motion has no visible raw-scroll jitter.
- Mobile viewport does not produce invalid framing.

---

# 8. Phase 4: Intro Motion Prototype

## Objective

Establish the project's visual and motion language.

## Tasks

### Intro Typography

- Begin from near-black.
- Reveal words in controlled sequence.
- Add depth illusion.
- Add slow camera push.
- Move selected words out of frame.
- Reveal the first stair through the resulting negative space.

### Atmospheric Layer

- Add restrained particles.
- Add minimal volumetric or gradient light.
- Add near-black background treatment.
- Add optional muted ambient sound entry.

### Accessibility

- Keep the complete sentence semantic.
- Add reduced-motion version.
- Add skip intro control.
- Confirm keyboard operation.
- Confirm screen-reader behavior.

### Responsive Behavior

- Simplify depth and word count on mobile.
- Avoid strong FOV changes.
- Prevent text clipping in Persian and English.

## Deliverables

- Approved dark intro
- Approved typography motion
- Approved transition into Grand Stairway
- Mobile version
- Reduced-motion version

## Exit Criteria

- Intro remains readable in both languages.
- Words animate without harming semantic structure.
- Reverse scrolling reconstructs the intro correctly.
- No motion causes severe discomfort in reduced-motion mode.
- Intro establishes the intended premium visual direction.

---

# 9. Phase 5: MVP Station 01, Grand Stairway

## Objective

Validate procedural architectural assembly.

## Tasks

### Procedural Asset

- Build a reusable step geometry.
- Use instancing or generated geometry.
- Add simple side walls.
- Add temporary relief panels.

### Motion

- Reveal one step.
- Assemble the remaining steps.
- Move camera forward and upward.
- Reveal relief surface with side light.
- Transition into Lamassu silhouette.

### Performance

- Compare instancing and merged geometry.
- Select the better runtime approach.
- Test desktop and mobile.
- Record the decision in `DECISIONS.md`.

### Testing

- Test local progress mapping.
- Test reverse assembly.
- Add Playwright milestone screenshot.

## Deliverables

- Complete Grand Stairway station
- Reversible assembly
- Approved camera path
- Mobile simplification
- Transition to Lamassu

## Exit Criteria

- Station works with procedural assets only.
- Reverse scrolling shows no broken step order.
- Mobile maintains target performance.
- The scene does not require Blender.

---

# 10. Phase 6: MVP Station 02, Lamassu

## Objective

Validate hero-artifact loading, orbit behavior, focus, and labels.

## Tasks

### Temporary Asset

- Add a low-detail temporary GLB or placeholder.
- Register it in the asset manifest.
- Add fallback poster image.
- Normalize scale, orientation, and origin in the wrapper.

### Motion

- Reveal silhouette.
- Reveal face.
- Reveal body and wings.
- Apply controlled orbit.
- Add focus target changes.
- Add up to three labels.
- Transition into Bull Capital.

### Loading

- Preload before station entry.
- Handle loading failure.
- Test fallback.
- Avoid transition interruption.

### Mobile

- Rotate the artifact instead of orbiting the camera where needed.
- Reduce labels.
- Simplify shadows.
- Use lower-detail asset variant.

## Deliverables

- Complete Lamassu station
- Working asset manifest entry
- Hero artifact wrapper contract
- Fallback behavior
- Mobile behavior

## Exit Criteria

- Loading failure does not break the journey.
- Camera and object rotation remain coordinated.
- Labels remain readable.
- Station works in English and Persian.
- Asset replacement requires no journey-logic change.

---

# 11. Phase 7: MVP Station 03, Bull Capital

## Objective

Validate exploded assembly and structural storytelling.

## Tasks

### Placeholder Structure

- Add procedural column base.
- Add procedural shaft.
- Add temporary capital.
- Add connector.
- Add simplified roof beam.

### Motion

- Reveal capital.
- Separate structural parts.
- Grow or assemble shaft.
- Position roof beam.
- Lock final structure.
- Add concise structural labels.
- Transition into Outro.

### Accessibility

- Provide textual structural explanation.
- Add reduced-motion staged reveal.
- Ensure labels are available outside Canvas.

### Testing

- Test assembly progress mapping.
- Test reverse scrolling.
- Test mobile simplified component count.

## Deliverables

- Complete Bull Capital station
- Exploded assembly system
- Mobile and reduced-motion variants
- Transition to Outro

## Exit Criteria

- The structural function is understandable without long text.
- Assembly remains stable in both scroll directions.
- Placeholder capital can later be replaced by GLB.
- No per-frame animation values are stored globally.

---

# 12. Phase 8: MVP Outro and Journey Completion

## Objective

Complete the first coherent end-to-end experience.

## Tasks

- Fade Bull Capital into darkness.
- Show faint echoes of previous MVP artifacts.
- Display final sentence.
- Add restart action.
- Add optional artifact index action.
- Add language and sound controls.
- Add completion analytics event placeholder.
- Confirm focus behavior after journey completion.

## Deliverables

- Complete MVP journey
- Restart support
- Completion state
- Minimal navigation

## Exit Criteria

The user can complete:

```text
Intro
→ Grand Stairway
→ Lamassu
→ Bull Capital
→ Outro
```

without broken transitions, loading gaps, or inaccessible content.

---

# 13. Milestone M4: MVP Vertical Slice Review

## Review Areas

### Product

- Does the experience feel dynamic rather than static?
- Does every station have a distinct motion identity?
- Is the scope still achievable?

### Motion

- Is camera movement calm and intentional?
- Does reverse scrolling work?
- Do transitions feel connected?

### Technical

- Is the architecture modular?
- Can placeholders be replaced?
- Are stations isolated?
- Is loading predictable?

### Performance

- Is mobile stable?
- Is initial loading acceptable?
- Are memory and draw calls controlled?

### Accessibility

- Does reduced motion preserve the story?
- Is keyboard navigation complete?
- Is the fallback usable?

## Decision

At the end of M4, choose one:

```text
Approved
Approved with revisions
Return to prototype
Stop project
```

Final asset production begins only after approval.

---

# 14. Phase 9: Quality Profiles and Runtime Adaptation

## Objective

Stabilize behavior across device classes.

## Tasks

### Quality Profiles

Implement:

```text
high
standard
mobile
reduced
```

### Profile Controls

Configure:

- DPR
- shadow resolution
- particle count
- model LOD
- texture resolution
- active light count
- post-processing
- motion complexity

### Adaptive Downgrade

- Sample sustained runtime performance.
- Downgrade quality when necessary.
- Avoid rapid profile switching.
- Record performance decisions.

### Device Testing

Test:

- capable desktop
- standard laptop
- tablet
- mid-range mobile
- low-end supported mobile

## Deliverables

- Stable quality selection
- Mobile quality profile
- Reduced profile
- Optional automatic downgrade

## Exit Criteria

- No supported device is forced into the high profile.
- Quality differences do not remove historical content.
- Sustained low performance can trigger a safe downgrade.
- Profile choice is visible in development diagnostics.

---

# 15. Phase 10: Accessibility and Fallback Completion

## Objective

Complete all non-visual access paths before expanding the station count.

## Tasks

### Reduced Motion

- Implement all MVP reduced-motion mappings.
- Add manual preference if approved.
- Test system preference changes.

### Keyboard

- Add next and previous chapter controls.
- Confirm skip, restart, language, and sound controls.
- Confirm focus indicators.
- Test modal focus if detail panels exist.

### Screen Reader

- Validate headings.
- Validate chapter announcements.
- Hide decorative Canvas.
- Validate animated typography alternatives.

### WebGL Fallback

- Add static artifact images.
- Preserve chapter navigation.
- Preserve localized content.
- Test forced WebGL failure.

### Zoom and Reflow

Test:

- browser zoom
- narrow viewport
- large text
- RTL reflow
- no horizontal overflow

## Deliverables

- Complete accessible MVP
- Complete WebGL fallback
- Accessibility test report

## Exit Criteria

- The complete MVP story is usable without WebGL.
- The complete MVP story is usable with reduced motion.
- All controls are keyboard accessible.
- Text is readable at supported zoom levels.
- Critical WCAG 2.2 AA issues are resolved.

---

# 16. Phase 11: Visual Design System

## Objective

Finalize the visual rules shared by all stations.

## Tasks

### Typography

- Select English typeface.
- Select Persian typeface.
- Define responsive scale.
- Define title, lead, body, label, and fact styles.

### Color

- Finalize background, stone, gold, text, and muted colors.
- Validate contrast.
- Document color tokens.

### Lighting

- Finalize shared lighting system.
- Define station lighting profiles.
- Limit shadow-casting lights.

### Materials

- Finalize shared stone material.
- Finalize aged metal material.
- Finalize reflective floor strategy.
- Define mobile material simplifications.

### Interface

- Finalize progress indicator.
- Finalize chapter counter.
- Finalize buttons.
- Finalize labels.
- Finalize language and sound controls.

### Transitions

- Approve transition vocabulary.
- Avoid repeating the same effect.
- Standardize duration and easing families.

## Deliverables

- Visual design tokens
- Shared material library
- Shared lighting profiles
- Final UI component styles
- Transition guidelines

## Exit Criteria

- All MVP stations feel visually connected.
- Persian and English typography are balanced.
- Interface never competes with artifacts.
- Contrast and accessibility requirements pass.

---

# 17. Phase 12: Remaining Placeholder Stations

## Objective

Implement the complete planned journey with temporary or procedural assets.

## Recommended Order

1. Delegation Relief Panel
2. Apadana Column
3. Cuneiform Tablet
4. Achaemenid Rhyton
5. Lotus Motif
6. Gate of All Nations
7. Immortal Guard

## Station Completion Requirements

Every station must include:

- semantic HTML section
- local progress mapping
- camera configuration
- artifact motion
- lighting behavior
- text and labels
- mobile behavior
- reduced-motion behavior
- transition in
- transition out
- loading fallback
- smoke coverage

## Deliverables

- Complete placeholder journey
- Full chapter navigation
- Full bilingual story structure
- All transitions connected

## Exit Criteria

- The complete journey works before production assets.
- No station blocks another station.
- All chapters support reverse scroll.
- Mobile users receive the full story.
- All production asset requirements are now known.

---

# 18. Phase 13: Historical Content Review

## Objective

Finalize accurate and consistent narrative content.

## Tasks

- Review artifact names.
- Review chronology.
- Review symbolic interpretations.
- Mark uncertain reconstructions.
- Confirm translations.
- Add source IDs.
- Confirm Persian terminology.
- Confirm English transliterations.
- Remove unsupported superlatives.
- Review labels against visible artifact details.

## Deliverables

- Approved English content
- Approved Persian content
- Source registry
- Historical uncertainty notes

## Exit Criteria

- Every factual claim has an approved source.
- Interpretations are clearly distinguished from confirmed facts.
- Persian and English versions communicate the same meaning.
- Content length matches motion timing.

---

# 19. Phase 14: Production Asset Creation

## Objective

Replace placeholders with optimized production assets.

## Priority Order

### Priority 1

- Lamassu
- Bull Capital
- Shared stone material

### Priority 2

- Delegation Relief Panel
- Achaemenid Rhyton
- Cuneiform Tablet

### Priority 3

- Immortal Guard
- Gate guardian details
- Apadana capital detail
- secondary decorative assets

## Asset Workflow

```text
Historical References
→ Neutral Concept Views
→ AI, Licensed, or Custom Base
→ Blender Cleanup
→ Transform Normalization
→ Topology Optimization
→ UV and Baking
→ LOD Creation
→ KTX2 Compression
→ GLB Export
→ Validation
→ Runtime Integration
```

## Required Asset Review

Each asset must pass:

- historical review
- transform review
- geometry budget
- texture budget
- runtime load test
- mobile test
- transition test
- fallback test
- licensing review

## Deliverables

- Production GLB assets
- LOD variants
- compressed textures
- fallback posters
- license records
- asset reports

## Exit Criteria

- Final assets do not require camera or journey rewrites.
- Assets remain within budget.
- Mobile variants are available.
- License information is complete.
- Visual quality is consistent.

---

# 20. Phase 15: Performance Optimization

## Objective

Meet production performance targets across supported devices.

## Tasks

### Network

- Analyze initial JavaScript.
- Analyze initial 3D payload.
- Verify lazy loading.
- Verify preloading.
- Compress GLB files.
- Compress textures.
- Remove unused assets.

### GPU

- Reduce draw calls.
- reduce material count.
- limit shadow casters.
- verify triangle budgets.
- verify particle counts.
- simplify post-processing.
- verify DPR profiles.

### CPU

- remove per-frame allocations.
- reduce React rerenders.
- move high-frequency values to refs.
- profile scroll handlers.
- profile animation mapping.
- suspend hidden-tab work.

### Memory

- verify station disposal.
- verify texture cleanup.
- verify shared cache behavior.
- test full journey repeatedly.
- test reverse traversal.

## Deliverables

- Performance reports by station
- Device test matrix
- Final quality configuration
- Documented exceptions

## Exit Criteria

- Mobile target is at least stable 30 FPS on supported devices.
- Desktop targets 60 FPS where practical.
- Initial payload meets approved budget or documented exception.
- No major memory leak appears after repeated journeys.
- Transitions do not create severe frame drops.

---

# 21. Phase 16: Test Completion

## Objective

Complete the automated and manual quality gates.

## Unit Tests

Cover:

- progress normalization
- active station resolution
- station-local progress
- direction detection
- motion state functions
- quality selection
- asset variant resolution
- fallback resolution
- content validation

## Integration Tests

Cover:

- Journey Controller
- Camera Rig state resolution
- Station lifecycle
- Asset loading failure
- Reduced-motion configuration
- Locale switching

## Playwright Tests

Cover:

- page load
- route localization
- intro
- forward journey
- reverse journey
- direct chapter navigation
- language switch
- sound toggle
- skip intro
- restart
- mobile layout
- reduced motion
- WebGL fallback
- no horizontal overflow

## Visual Regression

Capture stable milestones:

- intro beginning
- stairway midpoint
- Lamassu hero pose
- Bull Capital assembled
- relief focus
- Rhyton hero pose
- final Outro
- mobile state
- reduced-motion state

## Manual QA

- Safari
- Chromium
- Firefox
- iOS Safari
- Android Chromium
- keyboard-only
- screen reader spot checks
- high zoom
- slow connection
- GPU-disabled fallback

## Exit Criteria

- All required automated tests pass.
- Critical manual scenarios pass.
- No release-blocking accessibility issue remains.
- Visual regressions are reviewed.
- Production build passes.

---

# 22. Phase 17: SEO, Metadata, and Sharing

## Objective

Ensure the experience can be discovered and shared.

## Tasks

- Add localized titles and descriptions.
- Add canonical routes.
- Add Open Graph image.
- Add social sharing metadata.
- Add semantic chapter content.
- Add artifact headings.
- Add crawlable source links.
- Add sitemap.
- Add robots configuration.
- Validate structured metadata if used.

## Deliverables

- Localized metadata
- Social preview
- Sitemap
- SEO validation report

## Exit Criteria

- `/fa` and `/en` have correct metadata.
- Essential content is crawlable without WebGL.
- Social preview is visually approved.
- No duplicate canonical issue exists.

---

# 23. Phase 18: Analytics and Observability

## Objective

Measure meaningful usage without harming privacy or performance.

## Suggested Events

```text
journey_started
intro_skipped
station_entered
station_completed
journey_completed
journey_restarted
language_changed
sound_enabled
sound_disabled
reduced_motion_used
webgl_fallback_used
asset_details_opened
```

## Rules

- Do not track every scroll event.
- Do not track every animation frame.
- Avoid unnecessary personal identifiers.
- Keep analytics optional and privacy-conscious.
- Monitor asset loading and WebGL failures separately.

## Deliverables

- Analytics event map
- Error monitoring
- Privacy review

## Exit Criteria

- Events are meaningful and limited.
- Analytics does not reduce frame rate.
- Error monitoring captures actionable failures.
- Privacy requirements are documented.

---

# 24. Phase 19: Release Candidate

## Objective

Create a stable release candidate for final review.

## Tasks

- Freeze dependencies.
- Freeze historical content.
- Freeze station order.
- Run complete test suite.
- Run production performance test.
- Run accessibility review.
- Run security review.
- Validate asset licenses.
- Validate source links.
- Validate deployment configuration.
- Test fresh browser session.
- Test slow network.
- Test fallback mode.
- Prepare rollback plan.

## Deliverables

- Release candidate build
- Final test report
- Final performance report
- Final accessibility report
- Deployment checklist
- Rollback plan

## Exit Criteria

- No critical or high-severity issue remains.
- All licenses are documented.
- Release build is reproducible.
- Rollback procedure is verified.
- Stakeholders approve release candidate.

---

# 25. Phase 20: Public Release

## Objective

Deploy the first public version.

## Tasks

- Deploy production build.
- Validate localized routes.
- Validate CDN caching.
- Validate GLB and KTX2 headers.
- Validate compression.
- Validate monitoring.
- Verify social sharing.
- Verify analytics.
- Run post-deployment smoke test.

## Deliverables

- Public production URL
- Release notes
- Version tag
- Deployment record

## Exit Criteria

- Production routes load.
- Critical assets load.
- Journey completes successfully.
- Monitoring receives events.
- No immediate critical regression appears.

---

# 26. Phase 21: Post-Launch Stabilization

## Objective

Resolve real-world issues without immediately expanding scope.

## Recommended Observation Areas

- mobile frame rate
- initial loading
- station abandonment
- WebGL failures
- asset failures
- language usage
- reduced-motion usage
- browser-specific issues
- user confusion
- motion discomfort feedback

## Tasks

- Review production errors.
- Review performance samples.
- Fix critical device issues.
- Refine loading thresholds.
- Refine quality selection.
- Improve unclear content.
- Document new decisions.

## Exit Criteria

- Critical launch issues are resolved.
- Performance is stable.
- No major unsupported device pattern is ignored.
- Future expansion can begin safely.

---

# 27. Future Expansion

Future phases may include:

- artifact index
- optional free artifact rotation
- extended historical detail panels
- source explorer
- full architectural miniature
- map of Persepolis
- additional Achaemenid artifacts
- educational mode
- classroom mode
- museum installation mode
- WebXR experiment
- other Iranian heritage chapters

Future features must not compromise the core guided journey.

Each major expansion requires:

- specification update
- performance review
- accessibility review
- new ADR when architecture changes

---

# 28. Dependency Map

```text
Documentation
    ↓
Repository Foundation
    ↓
Journey Progress
    ↓
Persistent Canvas
    ↓
Camera System
    ↓
Intro Motion
    ↓
MVP Stations
    ↓
MVP Review
    ↓
Quality and Accessibility
    ↓
Full Placeholder Journey
    ↓
Historical Review
    ↓
Production Assets
    ↓
Optimization
    ↓
Testing
    ↓
Release
```

Production asset work depends on MVP approval.

Full release depends on accessibility, performance, and test completion.

---

# 29. Scope Control Rules

The following changes require explicit review:

- adding a full environment
- adding free-roaming navigation
- adding character animation
- adding physics
- adding more than one hero artifact per station
- adding a new major dependency
- adding a new station before MVP approval
- using unoptimized AI meshes in production
- exceeding performance budgets
- removing reduced-motion behavior
- moving essential text into WebGL
- adding a CMS
- adding accounts or user data

Any approved scope change must update:

- `SPEC.md`
- `ROADMAP.md`
- `DECISIONS.md`
- related technical documentation

---

# 30. Definition of Done for a Phase

A phase is complete when:

- all required tasks are finished
- deliverables exist in the repository
- acceptance criteria pass
- tests are updated
- documentation matches implementation
- major decisions are recorded
- lint passes
- typecheck passes
- relevant tests pass
- production build passes
- an English commit message is provided

---

# 31. Definition of Done for a Station

A station is complete when:

- historical content is approved
- desktop motion works
- reverse scrolling works
- mobile behavior works
- reduced-motion behavior works
- transition in works
- transition out works
- asset loading works
- fallback works
- localized content works
- labels are accessible
- performance is acceptable
- tests cover critical behavior
- documentation is updated

---

# 32. Recommended Initial Execution Sequence

The first implementation sequence should be:

```text
Step 0
Repository and documentation foundation

Step 1
Global scroll progress

Step 2
Station ranges and local progress

Step 3
Persistent Canvas

Step 4
Shared Camera Rig

Step 5
Dark typographic Intro

Step 6
Procedural Grand Stairway

Step 7
Temporary Lamassu

Step 8
Placeholder Bull Capital

Step 9
Minimal Outro

Step 10
Mobile profile

Step 11
Reduced-motion profile

Step 12
WebGL fallback

Step 13
MVP review

Step 14
Remaining stations

Step 15
Production assets

Step 16
Optimization and release
```

---

# 33. Recommended First Codex Task

```text
Initialize the project foundation for "Persian Empire 2500".

Read and follow:
- AGENTS.md
- docs/SPEC.md
- docs/MOTION_STORYBOARD.md
- docs/ARCHITECTURE.md
- docs/ROADMAP.md
- docs/DECISIONS.md

Implement Phase 1 only.

Requirements:
- Next.js with TypeScript
- localized /fa and /en routes
- React Three Fiber dependencies installed
- GSAP ScrollTrigger installed
- Zustand installed
- Vitest configured
- Playwright configured
- ESLint configured
- Prettier configured
- Husky configured
- repository folder structure created
- initial semantic page shell
- placeholder fixed Canvas shell
- WebGL fallback placeholder
- one unit smoke test
- one Playwright route smoke test
- production build must pass
- do not implement final station motion
- do not add final assets
- update docs/DECISIONS.md only if a new architectural decision is made

At completion:
1. summarize the implementation
2. list changed files
3. report lint, typecheck, test, E2E, and build results
4. provide a concise English commit message
```

---

# 34. Final Delivery Goal

The first public version is complete when users can experience a coherent journey from darkness to historical memory:

```text
Dark Intro
→ Grand Stairway
→ Lamassu
→ Bull Capital
→ Delegation Relief
→ Apadana Column
→ Cuneiform Tablet
→ Achaemenid Rhyton
→ Lotus Motif
→ Gate of All Nations
→ Immortal Guard
→ Reflective Outro
```

The final experience must remain:

- cinematic
- historically responsible
- technically maintainable
- accessible
- bilingual
- performant
- achievable within the defined scope
