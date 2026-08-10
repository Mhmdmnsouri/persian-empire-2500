# ACCESSIBILITY.md

## Project

**Persian Empire 2500**

## Document Status

- **Status:** Draft for implementation
- **Version:** 1.0.0
- **Audience:** Developers, AI coding agents, designers, content writers, QA engineers, accessibility reviewers, and technical reviewers
- **Target Standard:** WCAG 2.2 Level AA where applicable
- **Supported Languages:** English and Persian
- **Related Documents:**
  - `AGENTS.md`
  - `docs/SPEC.md`
  - `docs/MOTION_STORYBOARD.md`
  - `docs/ARCHITECTURE.md`
  - `docs/CAMERA_SYSTEM.md`
  - `docs/PERFORMANCE_BUDGET.md`
  - `docs/CONTENT_GUIDE.md`
  - `docs/TEST_PLAN.md`
  - `docs/DECISIONS.md`

---

# 1. Purpose

This document defines the accessibility requirements for the Persepolis experience.

The project combines:

- scroll-driven motion
- 3D rendering
- animated typography
- camera movement
- optional audio
- bilingual content
- responsive layouts
- dynamic station transitions

Accessibility must therefore be designed into the architecture from the beginning.

The experience must remain understandable and usable when:

- motion is reduced
- WebGL is unavailable
- sound is disabled
- a keyboard is used
- a screen reader is used
- text is zoomed
- the viewport is narrow
- the user is on a touch device
- the user switches between Persian and English
- a 3D asset fails to load

The visual journey may be enhanced by WebGL, but essential historical content must never depend on WebGL.

---

# 2. Accessibility Goals

The project must provide:

- semantic HTML content
- keyboard-accessible controls
- visible focus
- reduced-motion support
- complete WebGL fallback
- screen-reader-readable narrative
- accessible language switching
- correct RTL and LTR behaviour
- readable contrast
- usable touch targets
- zoom and reflow support
- audio controls
- non-audio equivalents
- graceful failure handling
- predictable navigation
- accessible loading and error states

---

# 3. Core Principles

## 3.1 Content Before Effects

Historical content must remain available independently from animation, sound, and 3D rendering.

## 3.2 Motion Must Be Optional

The full story must remain understandable with reduced or minimal motion.

## 3.3 Canvas Is Enhancement

The Canvas enhances the story but does not contain the only copy of essential information.

## 3.4 Keyboard Is a First-Class Input

All controls must be usable without a mouse or touch input.

## 3.5 Screen Readers Receive Structure, Not Noise

Assistive technologies should receive:

- headings
- paragraphs
- labels
- status changes
- controls
- meaningful fallback descriptions

They should not receive:

- decorative particle announcements
- repeated canvas updates
- every camera movement
- every scroll progress change
- duplicate visual-only labels

## 3.6 Accessibility Must Survive Localisation

English and Persian versions must provide equivalent accessibility behaviour.

---

# 4. Target Standard

The project targets WCAG 2.2 Level AA where applicable.

Key areas include:

- perceivable content
- operable controls
- understandable navigation
- robust semantic structure
- motion sensitivity
- contrast
- keyboard access
- focus visibility
- reflow
- pointer target size
- status messages

Accessibility review must include both automated and manual testing.

Automated tools cannot confirm complete accessibility.

---

# 5. Semantic Page Structure

## 5.1 Main Landmark

The page must contain one primary `<main>` landmark.

Example:

```tsx
<main id="main-content">
  <JourneyExperience />
</main>
```

## 5.2 Heading Structure

Use a logical heading hierarchy.

Recommended structure:

```text
h1
Project title

h2
Station title

h3
Optional extended-detail heading
```

Do not skip heading levels for visual styling.

## 5.3 Station Sections

Every station should use a semantic section.

```tsx
<section
  id="station-lamassu"
  aria-labelledby="station-lamassu-title"
  data-station="lamassu"
>
  <h2 id="station-lamassu-title">
    Lamassu
  </h2>

  <p>
    Historical description...
  </p>
</section>
```

## 5.4 Lists

Use semantic lists for:

- facts
- sources
- navigation indexes
- artifact labels when presented as text

Do not simulate lists using decorative spans.

## 5.5 Buttons and Links

Use:

- `<button>` for actions
- `<a>` for navigation

Do not use clickable `<div>` or `<span>` elements.

---

# 6. Skip Navigation

Provide a visible-on-focus skip link.

Recommended target:

```text
Skip to main content
```

Persian:

```text
رفتن به محتوای اصلی
```

Example:

```tsx
<a className="skip-link" href="#main-content">
  Skip to main content
</a>
```

If the experience includes a persistent navigation panel, an additional skip link may target the first station.

---

# 7. Canvas Accessibility

## 7.1 Canvas Role

The WebGL Canvas should usually be treated as decorative or supplementary.

Recommended:

```tsx
<div
  aria-hidden="true"
  className="experience-canvas"
>
  <Canvas />
</div>
```

This prevents screen readers from encountering meaningless rendering output.

## 7.2 Equivalent Content

All meaningful information shown in Canvas must have an HTML equivalent.

Examples:

```text
Visual artifact label
→ HTML label or descriptive text

3D structural assembly
→ Text explanation

Highlighted inscription
→ Accessible translation

Fallback image
→ Meaningful alt text
```

## 7.3 Interactive 3D Controls

If free artifact rotation is added later:

- provide keyboard controls
- provide instructions
- provide reset orientation
- provide a noninteractive equivalent
- do not require precise pointer movement
- do not make rotation essential for understanding

The main guided journey does not require user-controlled 3D navigation.

---

# 8. Reduced Motion

## 8.1 System Preference

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

The system preference must be detected before major motion begins where practical.

## 8.2 Manual Preference

A manual reduced-motion setting may be provided.

When available:

- manual choice takes precedence
- choice should persist at least for the current session
- control must be keyboard accessible
- label must clearly describe the setting

## 8.3 Reduced Motion Requirements

Reduced-motion mode must:

- preserve all stations
- preserve all historical content
- preserve chapter navigation
- reduce camera travel
- disable strong orbit
- remove camera shake
- remove deep parallax
- replace long assembly with staged visibility
- reduce typography depth movement
- reduce blur
- simplify transitions
- avoid large full-screen zoom
- reduce continuous particle motion
- keep timing short and predictable

## 8.4 Motion That Must Never Be Used

Do not use:

- rapid full-screen flashing
- repeated aggressive zoom
- large camera roll
- uncontrolled camera shake
- continuous 360-degree rotation
- motion that cannot be paused by stopping scroll
- strong oscillation
- repeated bounce

## 8.5 Reduced Motion Notice

A brief notice may be shown once.

English:

> Motion has been simplified based on your accessibility preference.

Persian:

> حرکت‌ها بر اساس تنظیمات دسترس‌پذیری شما ساده‌تر شده‌اند.

The notice should not interrupt the user repeatedly.

---

# 9. Scroll Accessibility

## 9.1 Native Scrolling

Prefer native browser scrolling.

Do not replace native scrolling with a fully custom input system unless essential.

## 9.2 Scroll Lock

Do not trap users inside a station.

Avoid long scroll locks.

If a temporary pinned section is used:

- normal page progress must remain clear
- keyboard scrolling must still work
- touch scrolling must remain predictable
- the user must be able to reverse direction
- the section must not feel stuck

## 9.3 Scroll Reversal

All major visual states must work backward.

Reverse scrolling must not:

- hide content permanently
- trap focus
- produce blank sections
- reset controls
- duplicate announcements

## 9.4 Scroll Position and Focus

Scrolling does not automatically move keyboard focus.

When direct chapter navigation is used:

- scroll to the chapter
- move focus only when helpful and expected
- avoid unexpected focus jumps
- preserve browser history behaviour where applicable

---

# 10. Keyboard Navigation

## 10.1 Required Keyboard-Accessible Controls

At minimum:

- skip intro
- next chapter
- previous chapter
- restart journey
- language switch
- sound toggle
- reduced-motion toggle when present
- artifact detail panel
- source panel
- close panel
- return to journey

## 10.2 Activation

Controls must respond to:

- Enter
- Space where appropriate

Native buttons provide this behaviour automatically.

## 10.3 Tab Order

Tab order must follow the visual and logical reading order.

Avoid:

- positive `tabindex`
- hidden focusable controls
- focusable decorative elements
- duplicate controls with identical purpose

## 10.4 Keyboard Chapter Navigation

Optional keyboard shortcuts may support:

```text
Arrow Down or Page Down:
Next chapter

Arrow Up or Page Up:
Previous chapter

Home:
Intro

End:
Outro
```

These shortcuts must not override expected browser behaviour without careful review.

Visible controls remain required.

## 10.5 Escape

Escape should close:

- detail panels
- source panels
- menus
- modal dialogs

Escape must not unexpectedly reset the journey.

---

# 11. Focus Management

## 11.1 Visible Focus

All interactive elements must have a clear focus indicator.

Do not remove focus outlines without replacing them.

The focus indicator must remain visible against:

- black backgrounds
- stone-coloured elements
- gold accents
- images
- gradients

## 11.2 Focus Style

Recommended properties:

- clear outline
- sufficient contrast
- visible offset
- not dependent on colour alone

Example:

```css
:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 4px;
}
```

## 11.3 Modal Focus

When a modal or dialog opens:

1. move focus into the dialog
2. trap focus inside while open
3. close with Escape
4. restore focus to the triggering control

Use native `<dialog>` where appropriate and tested.

## 11.4 Route Changes

When language routes change:

- preserve context where specified
- update document language
- update direction
- avoid losing focus to the browser body without reason

---

# 12. Screen Reader Support

## 12.1 Document Language

Set the correct `lang` attribute.

English:

```html
<html lang="en" dir="ltr">
```

Persian:

```html
<html lang="fa" dir="rtl">
```

## 12.2 Station Announcements

Do not announce every scroll change.

A chapter announcement may be made when the active station settles.

Example:

```text
Chapter 3 of 10: The Bull Capital
```

Persian:

```text
بخش ۳ از ۱۰: سرستون گاوی
```

Announcements must be:

- concise
- infrequent
- noninterruptive
- tested with screen readers

## 12.3 Live Regions

Use live regions only for meaningful status changes.

Appropriate uses:

- asset fallback activated
- loading completed when user action depends on it
- language changed
- reduced-motion mode enabled

Avoid live regions for:

- scroll percentage
- camera movement
- particles
- every station animation phase

## 12.4 Animated Typography

When visual words animate separately, provide one complete accessible sentence.

Example:

```tsx
<p aria-label="Stone remembers what time cannot erase.">
  <span aria-hidden="true">Stone</span>
  <span aria-hidden="true">remembers</span>
  <span aria-hidden="true">what time</span>
  <span aria-hidden="true">cannot erase.</span>
</p>
```

## 12.5 Decorative Content

Use `aria-hidden="true"` for:

- decorative particles
- visual separators
- duplicate chapter numbers
- duplicate labels
- purely visual ornament

---

# 13. WebGL Fallback

## 13.1 Requirement

A complete non-WebGL path is mandatory.

The fallback must be used when:

- WebGL is unsupported
- context creation fails
- rendering crashes
- a critical station cannot render
- a constrained quality mode requires it

## 13.2 Fallback Structure

Each station fallback must include:

```text
Artifact image or simplified visual
Station title
Lead
Description
Facts or labels
Sources or source access
Chapter navigation
Language control
```

## 13.3 Fallback Image Alt Text

Alt text should describe the artifact meaningfully.

Weak:

```text
Image
3D model
Ancient object
```

Preferred:

```text
Stone Lamassu guardian with a human head, bull body, and carved wings.
```

Persian equivalent must be provided.

## 13.4 Fallback Error Message

English:

> The 3D artifact could not be displayed. A simplified view is shown instead.

Persian:

> مدل سه‌بعدی نمایش داده نشد. نسخه ساده‌شده اثر در دسترس است.

Do not show technical stack traces.

---

# 14. Images and Alternative Text

## 14.1 Informative Images

Provide concise alt text that communicates:

- object type
- important form
- relevant visible feature

## 14.2 Decorative Images

Use empty alt text:

```html
alt=""
```

Do not repeat adjacent visible text in alt text.

## 14.3 Complex Images

For complex diagrams or reconstruction views, provide:

- short alt text
- nearby longer explanation

## 14.4 Reconstruction Disclosure

When an image shows a digital reconstruction, say so.

Example:

> Digital reconstruction of a bull capital and roof-beam relationship based on surviving architectural evidence.

---

# 15. Colour and Contrast

## 15.1 Text Contrast

Target WCAG AA contrast:

```text
Normal text:
4.5:1 minimum

Large text:
3:1 minimum

UI components and focus indicators:
3:1 minimum against adjacent colours
```

## 15.2 Actual Background Testing

Test contrast against the real rendered background.

Do not validate only design tokens.

Backgrounds may include:

- gradients
- images
- moving light
- stone textures
- Canvas content

Use solid or semi-opaque text backplates when needed.

## 15.3 Colour Is Not the Only Signal

Do not communicate state only through colour.

Examples:

```text
Active chapter:
colour + position + label

Sound state:
icon + text label

Error:
colour + text message

Focus:
outline + contrast
```

## 15.4 Gold Accents

Gold may fail contrast against warm stone or black depending on brightness.

Test every gold text usage.

Gold should remain mostly decorative or used for large high-contrast UI elements.

---

# 16. Typography and Readability

## 16.1 Minimum Text Size

Recommended minimums:

```text
Body text:
16 CSS px minimum

Labels:
14 CSS px minimum where contrast and spacing are sufficient

Primary controls:
16 CSS px preferred
```

Avoid tiny museum-style captions that become unreadable on mobile.

## 16.2 Line Length

Recommended body text line length:

```text
45 to 75 characters
```

## 16.3 Line Height

Recommended:

```text
1.5 for body text
1.2 to 1.35 for large headings
```

Persian may require slightly more line height.

## 16.4 Font Weight

Avoid very thin font weights.

Use weights that remain readable on dark backgrounds.

## 16.5 Text Over Moving Visuals

When text overlaps Canvas:

- maintain a stable readable region
- use sufficient contrast
- reduce movement behind text
- use subtle background gradient or panel
- avoid placing critical text over detailed geometry

---

# 17. Zoom and Reflow

## 17.1 Browser Zoom

The page must remain usable at 200% browser zoom.

## 17.2 Reflow

Content should reflow at narrow viewport widths without requiring horizontal scrolling for normal reading.

## 17.3 Fixed UI

Fixed controls must not cover:

- station titles
- main text
- chapter controls
- system browser controls on mobile

## 17.4 Canvas Scaling

Canvas may resize, but text and controls must remain HTML and responsive.

## 17.5 Large Text

Test increased text size and operating-system text settings where practical.

---

# 18. RTL and LTR

## 18.1 Direction

English:

```text
LTR
```

Persian:

```text
RTL
```

## 18.2 Layout

Support mirrored alignment for:

- story text
- chapter navigation
- labels
- control groups
- source panels

## 18.3 3D Composition

The 3D scene may remain shared between languages.

However:

- labels may need repositioning
- text-safe areas may change
- progress UI may mirror
- control order may mirror

## 18.4 Mixed Content

Technical terms, dates, and Latin names inside Persian text must render correctly.

Use appropriate bidi isolation where needed.

Example:

```html
<bdi>GLB</bdi>
```

---

# 19. Touch Accessibility

## 19.1 Target Size

Interactive targets should meet or exceed:

```text
24 × 24 CSS px minimum

44 × 44 CSS px preferred for primary touch controls
```

## 19.2 Spacing

Provide enough spacing between adjacent controls to avoid accidental activation.

## 19.3 Hover

Do not require hover.

Anything shown on hover must also be available through:

- focus
- tap
- visible text
- explicit control

## 19.4 Gestures

Do not require complex gestures.

Avoid requiring:

- pinch only
- multi-finger gestures
- precise dragging
- long press

Native scrolling must remain reliable.

---

# 20. Audio Accessibility

## 20.1 Default State

Audio must not begin audibly without user interaction.

## 20.2 Sound Control

Provide a persistent sound control.

The control must expose state:

```text
Sound on
Sound off
```

Persian:

```text
صدا روشن
صدا خاموش
```

## 20.3 Non-Audio Equivalence

No historical meaning may depend only on sound.

Transition sounds and ambient audio are decorative enhancements.

## 20.4 Volume

Avoid sudden loud sounds.

Use controlled fade-in and fade-out.

## 20.5 Hidden Tab

Suspend or reduce sound when the document is hidden.

---

# 21. Loading States

## 21.1 Accessible Status

Loading messages should be concise.

English:

```text
Loading the experience
Preparing the next artifact
```

Persian:

```text
در حال بارگذاری تجربه
آماده‌سازی اثر بعدی
```

## 21.2 Live Region

Use a polite live region only when loading status affects the user's next action.

Do not repeatedly announce preloading that occurs in the background.

## 21.3 Progress Indicators

If a progress indicator is shown:

- provide accessible name
- expose meaningful value when reliable
- avoid fake precision
- do not trap focus

## 21.4 Skeleton and Placeholder

Visual skeletons must not create repetitive screen-reader content.

---

# 22. Error States

## 22.1 Error Requirements

Errors must:

- explain what happened
- preserve usable content
- offer a next action when needed
- avoid technical language
- remain keyboard accessible

## 22.2 Asset Failure

English:

> The artifact could not be loaded. A simplified representation is shown instead.

Persian:

> اثر بارگذاری نشد. نسخه ساده‌شده آن نمایش داده می‌شود.

## 22.3 Audio Failure

The journey should continue silently without blocking the user.

## 22.4 Localisation Failure

Fall back to a complete supported locale.

Do not display raw translation keys.

---

# 23. Controls and Labels

## 23.1 Accessible Names

Every control must have an accessible name.

Examples:

```tsx
<button aria-label="Mute sound">
  <SoundIcon />
</button>
```

Visible text is preferred when space allows.

## 23.2 Icon-Only Controls

Icon-only controls require:

- accessible name
- visible tooltip where appropriate
- clear focus style
- sufficient target size

## 23.3 State

Use:

```text
aria-pressed
aria-expanded
aria-current
aria-controls
```

where semantically appropriate.

## 23.4 Progress Navigation

The active chapter may use:

```html
aria-current="step"
```

---

# 24. Dialogs and Panels

## 24.1 Artifact Detail Panel

A detail panel may contain:

- extended content
- sources
- reconstruction notes
- related artifacts

## 24.2 Dialog Requirements

When modal:

- use appropriate dialog semantics
- provide title
- provide close control
- trap focus
- restore focus
- close with Escape
- prevent background interaction
- avoid background scroll where appropriate

## 24.3 Nonmodal Alternative

On mobile, an inline expandable region may be more accessible than a modal.

---

# 25. Navigation Accessibility

## 25.1 Chapter Navigation

Provide explicit controls.

Recommended:

```text
Previous chapter
Next chapter
Artifact index
```

## 25.2 Active State

The active chapter must not rely on colour only.

## 25.3 Navigation Labels

Use artifact names in accessible labels.

Example:

```text
Next chapter: Lamassu
```

Persian:

```text
بخش بعد: لاماسو
```

## 25.4 Restart

Restart must clearly indicate that the journey returns to the beginning.

Do not activate restart without a deliberate user action.

---

# 26. Language Switching

## 26.1 Control

The language switch must be keyboard accessible.

Recommended visible labels:

```text
English
فارسی
```

## 26.2 State Preservation

When switching language, preserve the current station where practical.

## 26.3 Document Updates

After switching:

- update `lang`
- update `dir`
- update title and metadata where applicable
- update visible content
- update accessible labels

## 26.4 Announcement

A polite announcement may say:

```text
Language changed to Persian.
```

Persian:

```text
زبان به فارسی تغییر کرد.
```

---

# 27. Cognitive Accessibility

## 27.1 Predictability

Keep controls in stable locations.

Do not move essential controls between stations without reason.

## 27.2 Consistent Labels

Use the same wording for the same action.

Do not alternate between:

```text
Restart
Begin again
Start over
Replay
```

Choose one consistent term.

## 27.3 Information Density

Keep visible content concise.

Use extended panels for deeper information.

## 27.4 Time Pressure

The user controls pace through scrolling.

Do not automatically advance stations.

Do not hide content after a fixed timeout.

---

# 28. Flashing and Seizure Safety

Do not use content that flashes more than three times in one second.

Avoid:

- rapid light sweeps
- repeated high-contrast strobe effects
- sudden white flashes
- aggressive transition flicker

Light sweeps must remain slow and controlled.

---

# 29. Performance and Accessibility

Poor performance can become an accessibility barrier.

The accessibility path must remain responsive on constrained devices.

Reduced-motion mode must also reduce:

- GPU load
- animation complexity
- particle count
- post-processing
- camera movement

The fallback path must load quickly and remain readable.

---

# 30. Accessibility Architecture Contracts

## 30.1 Preference Model

```ts
export type MotionPreference =
  | "full"
  | "reduced";

export type AccessibilityState = {
  motionPreference: MotionPreference;
  systemPrefersReducedMotion: boolean;
  manualMotionOverride?: MotionPreference;
  soundEnabled: boolean;
  webglAvailable: boolean;
};
```

## 30.2 Resolution Rule

```text
Manual reduced-motion override
    ↓
System prefers-reduced-motion
    ↓
Default full motion
```

A manual full-motion override must be handled carefully and must not automatically ignore a system accessibility preference unless the user explicitly chooses it.

## 30.3 Station Contract

Each station must define:

```ts
export type StationAccessibilityConfig = {
  reducedMotionProfile: string;
  fallbackImage: string;
  fallbackAltKey: string;
  accessibleDescriptionKey: string;
  labelMode: "html" | "projected-html" | "none";
};
```

---

# 31. Testing Requirements

Detailed test strategy is defined in `TEST_PLAN.md`.

At minimum, test:

## Automated

- semantic landmarks
- heading structure
- control names
- keyboard reachability
- focus visibility
- reduced-motion profile
- WebGL fallback
- language direction
- no horizontal overflow
- valid chapter labels

## Manual

- screen-reader flow
- keyboard-only journey
- reduced-motion comfort
- zoom and reflow
- mobile touch targets
- colour contrast over real backgrounds
- Safari and iOS behaviour
- focus restoration
- dialog behaviour

---

# 32. Screen Reader Test Matrix

At minimum, manually review representative combinations:

```text
Windows:
NVDA + Chromium

macOS:
VoiceOver + Safari

iOS:
VoiceOver + Safari

Android:
TalkBack + Chromium
```

The complete matrix may vary based on available devices.

---

# 33. Keyboard Test Checklist

For each release:

- skip link works
- all controls receive focus
- focus order is logical
- focus indicator is visible
- Enter activates buttons
- Space activates buttons
- Escape closes panels
- focus returns after modal close
- no keyboard trap exists
- chapter navigation works
- language switching works
- sound control works
- restart works
- fallback is usable

---

# 34. Reduced Motion Checklist

For every station:

- long camera travel removed
- orbit removed or simplified
- parallax reduced
- blur reduced
- assembly simplified
- transition shortened
- content preserved
- labels preserved
- keyboard controls preserved
- no unexpected animation loop remains

---

# 35. WebGL Fallback Checklist

For every station:

- fallback image exists
- alt text exists in both languages
- title exists
- description exists
- labels or facts exist
- navigation works
- sources work
- no Canvas dependency remains
- no blank region remains
- performance remains acceptable

---

# 36. Accessibility Acceptance Criteria

The project is ready for release when:

## Semantic

- one main landmark exists
- headings are logical
- stations use semantic sections
- controls use native semantics
- essential content remains outside Canvas

## Keyboard

- all controls are reachable
- all controls are operable
- no keyboard trap exists
- focus is visible
- modal focus is managed

## Motion

- system reduced-motion preference is respected
- every station has reduced behaviour
- no dangerous flashing exists
- camera motion remains controlled

## Screen Reader

- animated typography has complete accessible text
- station content is readable
- fallback content is complete
- chapter announcements are not excessive
- language and direction are correct

## Visual

- contrast passes
- text remains readable over moving backgrounds
- zoom and reflow work
- mobile targets are usable

## Fallback

- WebGL failure does not block the story
- asset failure does not block the story
- sound failure does not block the story

## Localisation

- English accessibility labels are complete
- Persian accessibility labels are complete
- RTL and LTR layouts are usable
- meaning remains equivalent

---

# 37. Definition of Done for an Accessible Station

A station is accessibility-complete when:

- semantic title exists
- concise description exists
- Canvas information has an HTML equivalent
- reduced-motion state exists
- fallback image exists
- fallback alt text exists in both languages
- keyboard navigation works
- labels do not require hover
- mobile touch targets pass
- contrast passes
- zoom and reflow pass
- screen-reader review passes
- tests are added
- no high-severity accessibility issue remains

---

# 38. Accessibility Defect Severity

## Critical

- essential content unavailable
- complete keyboard trap
- no fallback after WebGL failure
- inaccessible main navigation
- dangerous flashing
- screen reader cannot access the journey

## High

- reduced-motion mode missing
- focus invisible on major controls
- language switch inaccessible
- modal focus broken
- significant contrast failure
- mobile controls unusable

## Medium

- incorrect heading level
- minor focus-order issue
- label missing on secondary control
- noncritical alt text issue
- moderate reflow problem

## Low

- minor wording inconsistency
- decorative announcement
- small spacing issue

Critical and High accessibility defects block release.

---

# 39. Recommended First Accessibility Task

```text
Create the accessibility foundation for the Persepolis project.

Read:
- AGENTS.md
- docs/SPEC.md
- docs/ARCHITECTURE.md
- docs/CAMERA_SYSTEM.md
- docs/PERFORMANCE_BUDGET.md
- docs/CONTENT_GUIDE.md
- docs/ACCESSIBILITY.md
- docs/TEST_PLAN.md
- docs/DECISIONS.md

Implement:

1. Semantic page and station structure
2. Skip navigation
3. English and Persian document language and direction
4. Reduced-motion preference detection
5. Manual motion preference contract
6. Accessible sound toggle contract
7. WebGL fallback shell
8. Accessible loading and error messages
9. Keyboard-accessible chapter controls
10. Visible focus styles
11. Accessible animated typography pattern
12. Unit tests for preference resolution
13. Playwright tests for keyboard navigation
14. Playwright reduced-motion smoke test
15. Playwright forced WebGL fallback test

Requirements:

- essential content must remain outside Canvas
- no hover-only interaction
- no audible autoplay
- no positive tabindex
- no per-scroll screen-reader announcements
- both `/en` and `/fa` must be tested
- production build must pass
- update DECISIONS.md only when a new architectural decision is required

At completion:
1. summarise implementation
2. list changed files
3. report lint, typecheck, unit, Playwright, and build results
4. provide an English commit message
```

---

# 40. Summary

The accessibility system follows this contract:

```text
HTML carries the meaning.
Canvas carries the atmosphere.
Motion remains optional.
Keyboard remains complete.
Sound remains optional.
Fallback remains functional.
Language remains explicit.
Focus remains visible.
The story remains available.
```

The 3D experience should feel cinematic for users who choose the full motion path.

It should remain equally understandable for users who do not.
