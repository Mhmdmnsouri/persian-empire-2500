# TEST_PLAN.md
## Project
**Persian Empire 2500**

- **Version:** 1.1.0
- **Frameworks:** Vitest + Playwright
- **Related:** `AGENTS.md`, `docs/SPEC.md`, `docs/ARCHITECTURE.md`, `docs/CAMERA_SYSTEM.md`, `docs/ACCESSIBILITY.md`, `docs/DECISIONS.md`

## 1. Purpose
Keep the project reliable with the smallest useful test suite.

Protect these risks:
- wrong station/progress resolution
- broken reverse scrolling
- incorrect camera state
- localisation regressions
- mobile/reduced-motion regressions
- WebGL or asset failures blocking content
- production build failures

## 2. Rules
- Test observable behaviour, not private implementation.
- Keep critical motion calculations pure and unit-testable.
- Test critical motion forward and backward.
- Essential text/navigation must work without WebGL.
- Never commit `.skip`, `.only`, swallowed failures, or arbitrary fixed waits.
- Use only Vitest and Playwright unless an ADR approves another framework.

## 3. Test Stack
### Vitest
Use for:
- progress/station resolution
- camera interpolation
- quality profile selection
- content validation
- asset manifest validation

### Playwright
Use for:
- route loading
- scrolling and reverse scrolling
- localisation
- mobile
- reduced motion
- WebGL fallback
- keyboard smoke tests

## 4. Structure
```text
tests/
├── unit/
│   ├── journey/
│   ├── camera/
│   ├── quality/
│   ├── content/
│   └── assets/
├── integration/
│   └── journey/
├── e2e/
│   ├── journey.spec.ts
│   ├── localization.spec.ts
│   ├── mobile.spec.ts
│   ├── reduced-motion.spec.ts
│   └── fallback.spec.ts
├── fixtures/
└── helpers/
```
Add more structure only when a real need appears.

## 5. Required Unit Tests
### Progress
- before range → `0`
- after range → `1`
- midpoint
- exact boundaries
- invalid zero-length range

### Active Station
- first, middle, final
- exact boundary
- invalid overlap/gap when prohibited

### Direction
- forward
- backward
- unchanged

### Camera
- exact keyframes
- midpoint interpolation
- independent position/target
- FOV interpolation
- reverse progress
- first/last clamping

### Quality
- desktop
- mobile
- reduced motion
- default fallback

### Content
- required stations exist in English and Persian
- required titles exist
- source IDs resolve
- unresolved placeholders fail

### Assets
- required manifest key exists
- fallback exists
- invalid entry fails

## 6. Required Integration Tests
### Journey Resolution
Verify:
```text
global progress
→ active station
→ local progress
→ direction
```

### Camera Resolution
Verify:
```text
station config
+ local progress
+ quality profile
+ reduced motion
→ desired camera pose
```

### Station Recovery
After leaving and returning:
- station activates again
- required asset can be reused/reloaded
- scene is not permanently blank

Do not test every lifecycle state unless lifecycle bugs appear.

## 7. Required Playwright Tests
### Route Smoke
For `/en` and `/fa`:
- page loads
- main content and intro title exist
- no horizontal overflow
- no critical console error

### Forward Journey
Scroll:
```text
Intro
→ Grand Stairway
→ Lamassu
→ Bull Capital
→ Outro
```
Verify station order, title changes, and no permanent blank scene.

### Reverse Journey
Scroll Outro → Intro:
- station order restores
- titles restore
- camera resolves correctly
- no reload
- no stuck scene

### Refresh
Refresh at one representative middle station:
- correct station/content restores
- camera does not start from an unrelated default pose

### Localisation
- English ↔ Persian
- route changes
- RTL/LTR changes
- station is preserved where required

### Mobile
Required:
- `390 × 844`
- `768 × 1024`

Verify:
- no horizontal overflow
- readable text
- reachable controls
- mobile quality profile
- native scrolling

### Reduced Motion
- reduced profile activates
- major camera travel is reduced/removed
- all chapters remain accessible
- navigation works

### WebGL Fallback
Force WebGL failure:
- title/description remain visible
- fallback appears
- navigation/language still work
- no blocking uncaught error

### Asset Failure
Mock one representative critical asset failure:
- fallback is used
- text remains
- journey continues

### Keyboard Smoke
Verify:
- skip intro
- previous/next chapter
- language
- restart

## 8. Helpers and Test Mode
Recommended helpers:
```text
scrollToGlobalProgress
scrollToStationProgress
waitForActiveStation
waitForCameraSettled
forceWebGLFallback
mockAssetFailure
assertNoHorizontalOverflow
```

Test mode may:
- fix random seeds
- disable audio
- use fixed DPR
- expose camera diagnostics
- settle camera deterministically
- force WebGL/asset failures

Wait for observable state instead of fixed sleeps.

## 9. Console and Network
Fail Playwright on unexpected:
- uncaught exceptions
- unhandled promise rejections
- failed critical requests
- missing localisation content

Expected mocked failures must be explicitly scoped.

## 10. Performance and Visual Checks
These are release checks, not PR requirements.

### Performance
- production build succeeds
- mobile journey does not freeze
- no obvious repeated asset loading
- deeper FPS/GPU/memory profiling only before major releases or after relevant changes

### Visual Regression
Optional. If needed, keep only:
- English Intro
- Persian Intro
- one hero station
- one mobile station
- WebGL fallback

Do not screenshot every animation state.

## 11. CI Gates
### Pull Request
```text
format
lint
typecheck
Vitest
content validation
asset validation
production build
Playwright smoke tests
```

### Main / Release
Additionally:
```text
forward journey
reverse journey
mobile
reduced motion
WebGL fallback
asset failure
```

Full browser matrix, deep accessibility, visual regression, and performance profiling are release activities only.

## 12. Scripts
```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:unit": "vitest run tests/unit",
  "test:integration": "vitest run tests/integration",
  "test:e2e": "playwright test",
  "test:e2e:smoke": "playwright test --grep @smoke",
  "typecheck": "tsc --noEmit",
  "build": "next build"
}
```

## 13. MVP Acceptance
### Functional
- forward journey works
- reverse journey works
- restart works
- stations activate correctly
- representative refresh works
- asset fallback works

### Localisation
- `/en` and `/fa` work
- RTL/LTR works
- required content exists in both languages

### Accessibility
- critical controls work by keyboard
- reduced motion works
- essential content survives WebGL failure

### Mobile
- primary mobile viewport works
- no horizontal overflow
- content/controls remain usable

### Technical
- lint passes
- typecheck passes
- Vitest passes
- required Playwright tests pass
- production build passes
- no disabled tests

## 14. Manual Release Review
For each station manually check:
- readable text
- comfortable camera motion
- reverse-scroll quality
- mobile usability
- obvious transition problems

Historical accuracy must be reviewed against approved source material.

## 15. Defect Severity
### Critical
- page cannot load
- journey blocked
- build fails
- essential content disappears after WebGL failure
- critical keyboard path unusable

### High
- reverse journey breaks
- station remains blank
- locale route unusable
- reduced-motion mode broken
- asset failure crashes journey

Medium/Low issues are non-blocking visual, spacing, content, or animation defects.

Critical and High defects block release.

## 16. Initial Testing Task
```text
Create the initial test infrastructure.

Read:
- AGENTS.md
- docs/SPEC.md
- docs/ARCHITECTURE.md
- docs/CAMERA_SYSTEM.md
- docs/ACCESSIBILITY.md
- docs/TEST_PLAN.md
- docs/DECISIONS.md

Implement:
1. Vitest configuration
2. Playwright configuration
3. minimal unit/integration/e2e structure
4. progress normalisation tests
5. active station resolution tests
6. camera interpolation tests
7. quality profile tests
8. bilingual content validation
9. /en and /fa smoke tests
10. one mobile overflow test
11. one reduced-motion smoke test
12. one WebGL fallback smoke test
13. Playwright critical console-error handling

Requirements:
- only Vitest and Playwright
- no disabled tests
- no arbitrary waits
- deterministic helpers
- production build must pass
- document new architectural decisions only when necessary

At completion:
1. summarise implementation
2. list changed files
3. report lint, typecheck, Vitest, Playwright, and build results
4. provide an English commit message
```

## 17. Completion Report
```md
## Summary
- Tests added:
- Behaviour covered:
- Known exclusions:

## Results
- Lint:
- Typecheck:
- Vitest:
- Playwright:
- Build:

## Known Risks
- Manual review still required:
- Untested environment/device:

## Commit Message
`test(scope): concise description`
```

## 18. Summary
```text
Vitest protects deterministic logic.
Playwright protects critical browser journeys.
Forward and reverse navigation are mandatory.
Mobile and reduced motion are mandatory.
Essential content must survive WebGL or asset failure.
Deep visual/performance testing belongs to release review.
```

Add tests only when a real regression, risk, or requirement justifies them.
