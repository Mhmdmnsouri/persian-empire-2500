# AGENTS.md

## Project

**Persian Empire 2500**

## Purpose

This file defines the operating rules for all AI coding agents and automated contributors working in this repository.

Agents must treat this document as a binding implementation contract.

The goals are to:

- preserve the approved architecture
- prevent uncontrolled scope growth
- keep implementation decisions traceable
- enforce testing and documentation discipline
- maintain performance and accessibility requirements
- ensure placeholder assets can later be replaced safely
- produce reviewable, production-quality changes

---

# 1. Required Reading Order

Before changing code, read the following files in this order:

```text
1. AGENTS.md
2. docs/SPEC.md
3. docs/MOTION_STORYBOARD.md
4. docs/ARCHITECTURE.md
5. docs/CAMERA_SYSTEM.md
6. docs/ASSET_PIPELINE.md
7. docs/PERFORMANCE_BUDGET.md
8. docs/ACCESSIBILITY.md
9. docs/CONTENT_GUIDE.md
10. docs/TEST_PLAN.md
11. docs/ROADMAP.md
12. docs/DECISIONS.md
```

For a focused task, read all documents that directly govern that task.

Examples:

```text
Camera task:
AGENTS.md
SPEC.md
ARCHITECTURE.md
CAMERA_SYSTEM.md
MOTION_STORYBOARD.md
PERFORMANCE_BUDGET.md
DECISIONS.md

Asset task:
AGENTS.md
SPEC.md
ARCHITECTURE.md
ASSET_PIPELINE.md
PERFORMANCE_BUDGET.md
DECISIONS.md

Accessibility task:
AGENTS.md
SPEC.md
ARCHITECTURE.md
ACCESSIBILITY.md
CONTENT_GUIDE.md
TEST_PLAN.md
DECISIONS.md
```

Do not begin implementation while a relevant governing document remains unread.

---

# 2. Source of Truth

When documents conflict, use the following priority:

```text
1. Explicit user instruction in the current task
2. AGENTS.md
3. docs/DECISIONS.md
4. docs/SPEC.md
5. docs/ARCHITECTURE.md
6. Specialized documents
7. docs/ROADMAP.md
8. Existing implementation
```

Specialized documents include:

- `CAMERA_SYSTEM.md`
- `ASSET_PIPELINE.md`
- `PERFORMANCE_BUDGET.md`
- `ACCESSIBILITY.md`
- `CONTENT_GUIDE.md`
- `TEST_PLAN.md`
- `MOTION_STORYBOARD.md`

If a current user instruction conflicts with an accepted architectural decision, do not silently override the decision.

Instead:

1. explain the conflict
2. propose the smallest safe resolution
3. update `docs/DECISIONS.md` when the new direction is approved
4. update affected documentation
5. then implement the change

---

# 3. Project Scope

The project is a bilingual, scroll-driven, cinematic 3D storytelling experience focused on selected artifacts and architectural elements of Persepolis.

The project is not:

- a full reconstruction of Persepolis
- an open-world environment
- a free-roaming virtual tour
- a game
- a physics simulation
- a full museum database
- a character-animation project
- a terrain-generation project
- a VR-first application

The approved main experience uses:

- one persistent WebGL canvas
- semantic HTML narrative content
- scroll-derived progress
- controlled camera movement
- one main artifact per station
- one dominant motion concept per station
- procedural placeholders before production assets
- explicit desktop, mobile, and reduced-motion behavior

---

# 4. Approved Technology Stack

## Core

Use:

- Next.js
- React
- TypeScript
- Three.js
- React Three Fiber
- Drei
- GSAP
- ScrollTrigger
- Zustand

## Testing

Use only:

- Vitest
- Playwright

Do not add Jest, Cypress, or another test framework.

## Code Quality

Use only:

- ESLint
- Prettier
- Husky

Do not add overlapping formatters, linters, or commit frameworks without an approved ADR.

## Asset Runtime

Use:

- GLB / glTF
- KTX2 where appropriate
- one approved mesh-compression strategy
- WebP or AVIF for fallback imagery

## Package Manager

Use the package manager already established by the repository lockfile.

Do not change the package manager unless explicitly requested and documented.

---

# 5. Architectural Invariants

The following rules must not be violated.

## 5.1 One Persistent Canvas

There must be only one primary React Three Fiber Canvas for the journey.

Do not create one Canvas per station.

Do not remount the renderer during station transitions.

## 5.2 Progress Is the Source of Truth

Major visual state must be derived from normalized progress.

This includes:

- active station
- local station progress
- camera pose
- artifact pose
- lighting state
- typography state
- transition state

Do not rely only on one-time lifecycle callbacks.

## 5.3 Camera Ownership Is Centralized

Stations define desired camera states.

Only the shared Camera Rig mutates the actual Three.js camera.

Stations must not directly mutate:

- camera position
- camera quaternion
- camera FOV
- camera look target

## 5.4 Position and Target Are Independent

Camera position and camera target must be separate tracks.

Do not treat camera movement as position-only animation.

## 5.5 Primary Text Remains HTML

Titles, descriptions, facts, and historical narrative must remain semantic HTML.

Do not render essential text only inside WebGL.

## 5.6 Stations Are Isolated

A station must not import or directly mutate another station.

Shared behavior belongs in shared infrastructure.

## 5.7 Final Assets Must Be Replaceable

Station logic must not depend on the internal mesh hierarchy of a temporary asset unless documented as part of an explicit asset contract.

## 5.8 High-Frequency Animation State Stays Outside Global React State

Do not store per-frame values in Zustand or React state.

Examples of forbidden global state:

- camera transform every frame
- mesh transform every frame
- particle positions
- material opacity every frame
- shader uniform values every frame

Use refs, pure motion mapping, or local controllers.

---

# 6. Implementation Priorities

When tradeoffs are required, prioritize in this order:

```text
1. Correctness
2. Accessibility
3. Performance
4. Architectural consistency
5. Reversibility of motion
6. Maintainability
7. Visual polish
8. Additional effects
```

A visually impressive effect must be rejected when it breaks:

- reverse scrolling
- mobile performance
- reduced-motion behavior
- semantic content
- station isolation
- loading reliability

---

# 7. Task Execution Workflow

For every implementation task, follow this workflow.

## Step 1: Understand the Task

Identify:

- requested outcome
- affected phase
- affected stations
- relevant documents
- acceptance criteria
- performance impact
- accessibility impact
- testing requirements

Do not expand the task beyond its stated scope.

## Step 2: Inspect the Repository

Before editing:

- inspect existing folder structure
- inspect relevant components
- inspect existing tests
- inspect package scripts
- inspect current decisions
- inspect reusable utilities
- inspect current implementation status

Do not recreate infrastructure that already exists.

## Step 3: Define the Smallest Safe Change

Prefer:

- focused modules
- typed contracts
- pure functions
- reusable utilities
- minimal dependency additions
- reversible migration steps

Avoid:

- broad rewrites
- speculative abstractions
- unrelated cleanup
- renaming large parts of the repository without need
- creating duplicate systems

## Step 4: Implement

Implementation must:

- follow existing conventions
- preserve strict typing
- include error handling
- support mobile where relevant
- support reduced motion where relevant
- preserve reverse scrolling
- preserve localized content contracts
- avoid per-frame allocations where practical

## Step 5: Test

Run all checks relevant to the change.

## Step 6: Review the Diff

Before completion:

- inspect all changed files
- remove dead code
- remove debugging logs
- remove unused dependencies
- verify no unintended files changed
- verify documentation remains accurate

## Step 7: Update Documentation

Update documentation when:

- architecture changes
- a dependency is added
- a major performance decision is made
- a motion contract changes
- an asset contract changes
- a phase or milestone is completed
- a previous decision is superseded

## Step 8: Report Completion

Use the completion format defined later in this file.

---

# 8. Scope Control

Do not implement any of the following unless explicitly requested:

- full desert environment
- mountains or terrain system
- free-roaming camera
- first-person controls
- physics
- collisions
- character locomotion
- complex rigged animation
- full CMS
- user accounts
- database
- server-side artifact management
- WebXR
- multiplayer
- procedural world generation
- final production models during MVP foundation tasks
- new stations before the current phase is approved

Do not interpret "make it more dynamic" as permission to add uncontrolled effects.

Dynamic behavior must remain aligned with `MOTION_STORYBOARD.md`.

---

# 9. Dependency Rules

## 9.1 Adding Dependencies

Before adding a dependency:

1. verify the existing stack cannot solve the problem cleanly
2. verify the package is actively maintained
3. verify browser compatibility
4. evaluate bundle size
5. evaluate performance impact
6. evaluate accessibility impact
7. explain why it is necessary

A major dependency requires an ADR.

## 9.2 Forbidden Dependency Behavior

Do not:

- add multiple libraries for the same responsibility
- replace approved libraries without authorization
- add a library only to avoid writing a small utility
- add heavy UI frameworks for a minimal interface
- add an animation library that duplicates GSAP
- add a state library that duplicates Zustand
- add a test framework that duplicates Vitest

## 9.3 Lockfile

Never delete or regenerate the lockfile without reason.

Do not change dependency versions unrelated to the task.

---

# 10. TypeScript Rules

## 10.1 Strict Typing

Maintain strict TypeScript.

Do not introduce `any` unless:

- an external library type is genuinely incompatible
- the usage is localized
- the reason is documented

Prefer `unknown` with runtime validation.

## 10.2 Public Contracts

Exported contracts must be explicit.

Examples:

- station configuration
- camera poses
- artifact motion states
- asset manifest entries
- quality profiles
- localized content

## 10.3 Exhaustive Logic

Use exhaustive checks for:

- quality profiles
- motion profiles
- mobile profiles
- station IDs
- lifecycle states

## 10.4 Runtime Validation

Validate external or generated data at boundaries.

Do not trust:

- remote content
- asset manifest values
- locale parameters
- environment variables

---

# 11. React Rules

## 11.1 Component Responsibilities

Components should have one clear responsibility.

Avoid components that simultaneously manage:

- scroll calculation
- camera mutation
- artifact loading
- localized content
- UI controls

Split these concerns.

## 11.2 Rendering

Avoid unnecessary rerenders during scroll.

Do not route per-frame values through React state.

## 11.3 Effects

Effects must:

- have correct dependencies
- clean up listeners
- clean up subscriptions
- clean up timers
- clean up GSAP contexts
- clean up asset resources when owned locally

## 11.4 Client Boundaries

Use client components only where browser APIs or interactivity require them.

Do not make the full application client-only without need.

---

# 12. Three.js and React Three Fiber Rules

## 12.1 Shared Resources

Reuse:

- geometry
- materials
- textures
- loaders
- environment maps

## 12.2 Instancing

Use `InstancedMesh` for repeated geometry when objects share geometry and material.

## 12.3 Disposal

Dispose resources only when the station owns them.

Do not dispose shared cached resources while another station may use them.

## 12.4 Frame Loop

Avoid unnecessary work inside `useFrame`.

Inside frame callbacks:

- avoid object allocation
- avoid array allocation
- reuse vectors and quaternions
- avoid state setters
- avoid logging
- avoid expensive traversal

## 12.5 Shadows

Only approved lights may cast shadows.

Do not enable shadows on every object.

## 12.6 Post-Processing

Every post-processing effect must be:

- justified
- quality-profile aware
- mobile tested
- removable in reduced mode

---

# 13. Scroll and Motion Rules

## 13.1 Reversibility

Every major sequence must work in both scroll directions.

Test:

- slow forward
- fast forward
- slow backward
- fast backward
- repeated direction changes
- refresh at midpoint

## 13.2 Pure Mapping

Prefer pure functions:

```ts
localProgress -> camera state
localProgress -> artifact state
localProgress -> lighting state
localProgress -> typography state
```

## 13.3 GSAP Usage

GSAP may be used for:

- ScrollTrigger integration
- HTML typography
- controlled timeline composition
- smooth transitions

GSAP must not hide critical state inside irreversible callbacks.

## 13.4 Easing

Use a small, consistent easing vocabulary.

Do not assign arbitrary easing per element.

## 13.5 Idle Motion

Idle motion must be subtle.

Do not use:

- continuous full rotations
- strong floating
- constant camera movement
- visible looping bounces

---

# 14. Camera Rules

Follow `docs/CAMERA_SYSTEM.md`.

Minimum requirements:

- one shared camera rig
- separate position and target tracks
- damped interpolation
- subtle FOV changes
- no direct station camera mutation
- explicit mobile poses
- explicit reduced-motion poses
- debug visibility in development

Avoid:

- fast camera travel
- repeated zooms
- extreme FOV
- strong roll
- camera shake
- free-flight controls in the main journey

---

# 15. Asset Rules

Follow `docs/ASSET_PIPELINE.md`.

## 15.1 MVP

During MVP:

- use procedural geometry
- use placeholders
- do not block implementation on Blender
- do not add heavy final assets

## 15.2 Runtime URLs

All runtime asset URLs must come from the centralized asset manifest.

Do not hard-code asset paths inside station components.

## 15.3 Production Assets

Production assets must:

- use GLB
- follow naming conventions
- use correct scale and origin
- meet geometry budgets
- meet texture budgets
- include fallback
- include license information
- include mobile variant when required

## 15.4 Raw AI Assets

Do not ship raw AI-generated geometry directly to production.

It must be reviewed and optimized.

---

# 16. Performance Rules

Follow `docs/PERFORMANCE_BUDGET.md`.

## 16.1 Performance Is a Feature

Do not defer obvious performance problems to the end.

## 16.2 Required Awareness

Every 3D task must consider:

- triangle count
- draw calls
- material count
- texture memory
- station payload
- shadow cost
- particle count
- post-processing cost
- per-frame CPU work
- mobile behavior

## 16.3 Quality Profiles

Every expensive visual feature must define behavior for:

```text
high
standard
mobile
reduced
```

## 16.4 No Silent Budget Violations

If a task exceeds a documented budget:

1. report it
2. explain the reason
3. propose mitigation
4. document the accepted exception

---

# 17. Accessibility Rules

Follow `docs/ACCESSIBILITY.md`.

Accessibility is required, not optional.

Every relevant feature must support:

- keyboard access
- visible focus
- semantic HTML
- reduced motion
- screen-reader readable content
- WebGL fallback
- readable contrast
- Persian RTL
- English LTR
- touch interaction
- zoom and reflow

Do not use hover as the only interaction.

Do not hide essential content inside Canvas.

Do not remove focus outlines.

---

# 18. Localization Rules

The project supports:

```text
fa
en
```

Do not hard-code user-facing narrative text inside station components.

Use structured localized content.

Every new content key must exist in both languages or fail validation.

When exact translation is not yet available, use an explicit placeholder and report it.

Do not silently copy English content into the Persian locale.

---

# 19. Historical Content Rules

Follow `docs/CONTENT_GUIDE.md`.

Do not invent historical facts.

Do not present uncertain reconstruction as confirmed fact.

Every factual claim must be traceable to an approved source.

Distinguish:

- confirmed evidence
- scholarly interpretation
- visual reconstruction
- symbolic interpretation
- unknown or disputed information

AI-generated imagery and text are not historical sources.

---

# 20. Testing Rules

Follow `docs/TEST_PLAN.md`.

## 20.1 Unit Tests

Use Vitest for:

- progress normalization
- station selection
- local progress
- direction detection
- motion mapping
- camera-state resolution
- quality selection
- asset resolution
- content validation

## 20.3 Test Quality

Tests must assert meaningful behavior.

Do not add tests that only increase coverage numbers.

## 20.4 No Disabled Tests

Do not commit:

- `.skip`
- `.only`
- commented-out tests
- tests that silently ignore failures

unless explicitly documented as temporary and requested.

---

# 21. Required Verification Commands

Before declaring a task complete, run the relevant repository scripts.

The full expected verification set is:

```text
lint
typecheck
unit tests
production build
```

Use the repository's package manager.

Typical npm commands:

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```


If a command cannot run:

- state exactly why
- include the error
- do not claim success
- do not hide the failure

---

# 22. Documentation Rules

Update documentation when implementation changes the documented behavior.

## 22.1 Update `DECISIONS.md` When

- adding a major dependency
- changing architecture
- changing camera ownership
- changing progress ownership
- changing asset formats
- changing compression strategy
- changing quality profiles
- changing station lifecycle
- changing accessibility strategy
- changing testing strategy

## 22.2 Update `ARCHITECTURE.md` When

- module boundaries change
- data flow changes
- folder responsibilities change
- state ownership changes
- station contracts change

## 22.3 Update Specialized Documents When

- camera behavior changes
- motion behavior changes
- performance budgets change
- asset workflow changes
- content standards change
- accessibility requirements change
- test scope changes
- roadmap sequencing changes

## 22.4 Do Not Rewrite Documents Casually

Documentation changes must be focused.

Do not remove constraints simply because implementation is difficult.

---

# 23. Git Rules

## 23.1 Focused Changes

Keep commits focused on one logical task.

Do not combine:

- feature implementation
- unrelated refactor
- dependency upgrades
- formatting of unrelated files

## 23.2 Commit Message

At the end of every task, provide one concise English commit message.

Preferred format:

```text
type(scope): concise description
```

Examples:

```text
feat(camera): add progress-driven shared camera rig
feat(stairway): implement reversible procedural assembly
fix(journey): restore station state on reverse scroll
test(accessibility): cover reduced-motion navigation
docs(architecture): record station lifecycle decision
```

## 23.3 Do Not Commit Generated Noise

Do not commit:

- build output
- temporary screenshots
- local debug files
- editor metadata
- uncompressed source assets in `public/`
- secrets
- personal environment files

---

# 24. Security Rules

Do not:

- commit secrets
- expose server credentials
- render unsanitized remote HTML
- execute remote code
- load assets from untrusted origins without review
- add unnecessary third-party scripts
- collect personal data without a documented need

Validate:

- locale route values
- environment variables
- external content
- asset metadata
- user-controlled URL parameters

---

# 25. Error Handling Rules

Every external boundary must fail gracefully.

Examples:

- WebGL initialization
- model loading
- texture loading
- audio initialization
- localization lookup
- unsupported browser feature

A station failure must not crash the complete journey.

Fallback behavior must preserve:

- title
- historical content
- navigation
- locale support

Do not expose raw stack traces to users.

---

# 26. Development Diagnostics

Development-only diagnostics are allowed and encouraged.

Useful diagnostics:

- global progress
- active station
- local progress
- scroll direction
- camera position
- camera target
- FOV
- quality profile
- FPS
- draw calls
- triangle count
- loaded station IDs
- reduced-motion status

Diagnostics must:

- be disabled in production
- avoid affecting layout
- avoid affecting performance tests
- not become a production dependency

---

# 27. Completion Report Format

At the end of every task, report using this structure:

```md
## Summary

- What was implemented
- What behavior changed
- What was intentionally not included

## Changed Files

- `path/to/file`
- `path/to/file`

## Verification

- Lint: passed / failed / not run
- Typecheck: passed / failed / not run
- Unit tests: passed / failed / not run
- Production build: passed / failed / not run

## Documentation

- Updated documents
- New ADRs
- No documentation changes required

## Risks or Follow-ups

- Remaining known limitations
- Performance concerns
- Accessibility concerns
- Asset dependencies

## Commit Message

`type(scope): concise description`
```

Do not report a check as passed unless it actually ran successfully.

---

# 28. When to Stop and Ask

Stop and request clarification only when the task cannot be completed safely without a product decision.

Examples:

- two approved documents directly conflict
- historical content requires an unsupported claim
- a requested change breaks an accepted accessibility requirement
- a requested dependency replaces a core approved system
- a requested feature fundamentally changes project scope
- a required source asset or credential is missing

Do not ask for clarification when a reasonable implementation choice is already defined by the documentation.

When uncertainty is minor:

- make the smallest reversible choice
- document the assumption
- continue implementation

---

# 29. Prohibited Agent Behavior

Agents must not:

- claim tests passed without running them
- claim visual correctness without inspecting the result
- silently change scope
- add unnecessary dependencies
- ignore mobile behavior
- ignore reduced motion
- ignore reverse scrolling
- move essential content into WebGL
- hard-code production asset URLs
- ship raw AI meshes
- create multiple competing state systems
- bypass the asset manifest
- mutate the shared camera from stations
- store per-frame values in global state
- delete accepted ADRs
- remove tests to make the suite pass
- weaken TypeScript to avoid fixing errors
- leave hidden debug code in production
- fabricate historical facts or sources

---

# 30. Phase-Specific Restrictions

## Phase 0 and Phase 1

Allowed:

- repository setup
- documentation
- folder structure
- minimal Canvas shell
- fallback shell
- test configuration

Not allowed:

- final station motion
- production assets
- advanced visual effects

## Motion Prototype

Allowed:

- placeholders
- debug UI
- camera experiments
- progress mapping
- simple lighting

Not allowed:

- production model work
- broad art-direction polish
- additional stations outside MVP

## MVP Vertical Slice

Allowed:

- Intro
- Grand Stairway
- Lamassu
- Bull Capital
- minimal Outro
- mobile and reduced variants
- loading architecture

Not allowed:

- full planned journey before MVP review
- production asset expansion before approval

## Production Asset Phase

Allowed only after MVP approval.

All assets must follow `ASSET_PIPELINE.md`.

---

# 31. Definition of Done

A task is done only when:

- requested behavior is implemented
- implementation follows documentation
- code is typed
- error handling exists
- accessibility impact is addressed
- mobile impact is addressed
- reverse motion is addressed
- relevant tests exist
- relevant tests pass
- lint passes
- typecheck passes
- production build passes when required
- documentation is updated
- completion report is accurate
- an English commit message is provided

---

# 32. Core Reminder

The project should always preserve this responsibility model:

```text
Scroll controls progress.
Journey controls sequence.
Stations control local meaning.
Camera controls attention.
Lighting controls discovery.
HTML controls readable narrative.
Assets remain replaceable.
Performance controls ambition.
Accessibility controls inclusion.
Documentation controls consistency.
```

When implementation choices become uncertain, choose the option that best preserves this model.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
