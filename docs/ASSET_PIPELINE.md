# ASSET_PIPELINE.md

## Project

**Persian Empire 2500**

## Document Status

- **Status:** Draft for implementation
- **Version:** 1.0.0
- **Audience:** Developers, AI coding agents, 3D artists, technical reviewers
- **Primary Runtime Format:** GLB
- **Primary Texture Format:** KTX2
- **Related Documents:**
  - `docs/SPEC.md`
  - `docs/MOTION_STORYBOARD.md`
  - `docs/ARCHITECTURE.md`
  - `docs/CAMERA_SYSTEM.md`
  - `docs/PERFORMANCE_BUDGET.md`
  - `docs/DECISIONS.md`

---

# 1. Purpose

This document defines the complete asset workflow for the Persepolis experience.

The project begins with procedural and temporary assets so that motion, camera behavior, transitions, and performance can be validated before final 3D production begins.

The asset pipeline must support this progression:

```text
Procedural Placeholder
        ↓
Temporary Visual Asset
        ↓
AI-Generated or Ready-Made Base Asset
        ↓
Blender Cleanup
        ↓
Optimization
        ↓
Texture Compression
        ↓
GLB Export
        ↓
Validation
        ↓
Runtime Integration
        ↓
Performance Review
```

The pipeline must allow placeholder assets to be replaced by production assets without rewriting the station, camera, or journey logic.

---

# 2. Pipeline Goals

The asset pipeline must:

- keep the MVP independent from Blender
- prioritize developer-friendly workflows
- minimize custom modeling
- use AI only where it adds clear value
- use procedural geometry for simple architecture
- use optimized production models for hero artifacts
- enforce consistent scale, orientation, and origin
- produce predictable runtime assets
- support desktop, mobile, and fallback variants
- keep file size and GPU cost within budget
- preserve visual consistency across stations
- document historical uncertainty
- make asset replacement safe and repeatable

---

# 3. Non-Goals

The project does not require:

- full archaeological reconstruction
- complete environment modeling
- photogrammetry of the entire Persepolis site
- cinematic offline rendering
- film-quality subdivision models at runtime
- unique geometry for every repeated architectural element
- 8K textures
- uncompressed FBX files in production
- direct runtime use of raw AI-generated meshes
- complex character animation for the MVP
- skeletal animation unless specifically approved

---

# 4. Asset Categories

Assets are divided into six categories.

## 4.1 Procedural Architecture

Created directly in React Three Fiber or Three.js.

Examples:

- steps
- walls
- platforms
- simple columns
- roof beams
- pedestals
- architectural blockouts
- label anchors
- guide geometry

Preferred tools:

- `BoxGeometry`
- `CylinderGeometry`
- `PlaneGeometry`
- `InstancedMesh`
- merged buffer geometry
- reusable procedural components

These assets do not require Blender during the prototype phase.

---

## 4.2 Hero Artifacts

High-value objects that receive close camera attention.

Examples:

- Lamassu
- Bull Capital
- Achaemenid Rhyton
- Immortal Guard
- Cuneiform Tablet
- selected relief figures

Hero artifacts may come from:

- AI image-to-3D generation
- licensed ready-made models
- custom 3D artist work
- simplified reconstruction from references

Hero assets must be cleaned and optimized before runtime use.

---

## 4.3 Relief and Surface Assets

Objects whose visual identity depends mainly on surface detail.

Examples:

- delegation relief panels
- stone inscriptions
- carved borders
- decorative stone motifs
- shallow architectural carvings

Preferred implementation:

```text
Low-depth Mesh
+ Base Color
+ Normal Map
+ Roughness Map
+ Optional Height or Displacement
```

Full high-density geometry should be used only for very close views where silhouette depth matters.

---

## 4.4 Repeated Assets

Objects used multiple times.

Examples:

- columns
- steps
- architectural blocks
- decorative units
- background guards
- repeated motifs

Repeated assets should use:

- `InstancedMesh`
- shared geometry
- shared materials
- texture variation
- small transform variation when historically appropriate

Do not export dozens of identical copies as independent meshes unless there is a verified runtime reason.

---

## 4.5 Materials and Textures

Shared visual materials include:

- clean stone
- weathered stone
- polished stone
- dark stone
- carved stone
- gold
- aged metal
- wood
- dust
- subtle floor reflection

Materials should be reused across stations whenever possible.

---

## 4.6 Fallback Assets

Fallback assets preserve the experience when:

- WebGL is unavailable
- a model fails to load
- the device uses a very low quality profile
- the user is on a constrained connection
- reduced complexity is required

Fallback formats:

- WebP
- AVIF where supported
- simple procedural geometry
- low-detail GLB
- static poster image

---

# 5. Development Phases

## 5.1 Phase One: Procedural Placeholder Assets

The first implementation uses simple geometry.

Examples:

```text
Grand Stairway
- repeated BoxGeometry steps

Lamassu
- simplified combined primitive volume

Bull Capital
- grouped boxes, cylinders, and temporary forms

Relief Panel
- PlaneGeometry with temporary texture

Apadana Column
- CylinderGeometry and placeholder capital

Rhyton
- simple vessel placeholder

Immortal Guard
- low-detail human silhouette
```

Goals:

- validate composition
- validate camera framing
- validate scale relationships
- validate station timing
- validate mobile performance
- identify which details are actually visible

No production model should be commissioned before these questions are answered.

---

## 5.2 Phase Two: Temporary Visual Assets

Temporary assets may improve visual clarity before final production.

Possible sources:

- AI-generated low-detail 3D models
- free or commercial models with valid licenses
- simplified custom meshes
- generated textures
- concept renders used as temporary planes

Temporary assets must still follow the runtime transform contract.

---

## 5.3 Phase Three: Production Asset Replacement

Replace placeholders in priority order.

Recommended order:

1. Lamassu
2. Bull Capital
3. Delegation Relief Panel
4. Achaemenid Rhyton
5. Cuneiform Tablet
6. Immortal Guard
7. Gate details
8. Apadana details
9. secondary decorative assets

An asset is replaced only after:

- camera framing is approved
- station motion is approved
- visible detail requirements are known
- performance budget is available

---

# 6. Source and Reference Policy

## 6.1 Reference Requirements

Every production asset should have a reference folder containing:

- front view
- side view
- rear view when available
- three-quarter view
- close-up details
- scale reference
- historical notes
- uncertainty notes
- source links or citations

Suggested structure:

```text
references/
└── lamassu/
    ├── front.jpg
    ├── side.jpg
    ├── rear.jpg
    ├── detail-wing.jpg
    ├── detail-face.jpg
    └── NOTES.md
```

## 6.2 Historical Accuracy

AI-generated outputs must not be treated as authoritative references.

AI may assist with:

- concept exploration
- missing-view estimation
- texture ideation
- visual style testing
- base mesh generation

Final form decisions must be checked against historical references.

## 6.3 Historical Uncertainty

When reconstruction is uncertain:

- document the uncertainty
- avoid presenting speculation as fact
- prefer restrained interpretation
- record the decision in `docs/DECISIONS.md`
- include a content note where relevant

---

# 7. Asset Creation Strategy by Type

## 7.1 Grand Stairway

### Prototype

Build with code:

```text
One step mesh
→ repeated with InstancedMesh
→ optional merged geometry after assembly
```

### Production

The final stair section may remain procedural.

Only replace or enhance:

- side walls
- relief areas
- edge wear
- stone materials

Blender is optional.

---

## 7.2 Lamassu

### Base Creation Options

Preferred order:

1. licensed historical model
2. AI image-to-3D base
3. custom artist model

### Required Cleanup

- remove hidden internal geometry
- correct symmetry where appropriate
- repair broken surfaces
- correct wings and legs
- correct face and beard
- simplify topology
- fix normals
- create LOD variants
- generate UVs if necessary
- bake high-detail maps
- export clean GLB

### Runtime Use

- one hero model
- optional mirrored or duplicated instance
- no unnecessary skeletal rig
- no full continuous rotation

---

## 7.3 Bull Capital

### Base Creation

The animal capital may be:

- AI-generated
- custom modeled
- derived from a licensed asset

The shaft and structural parts should remain procedural or modular.

### Runtime Structure

```text
BullCapitalGroup
├── CapitalHeroModel
├── ConnectorMesh
├── ColumnShaft
├── Base
└── RoofBeamPlaceholder
```

This separation supports the exploded assembly motion.

---

## 7.4 Relief Panel

### Preferred Runtime Method

```text
Simple panel geometry
+ high-quality normal map
+ base color map
+ roughness map
+ optional shallow displacement
```

### High-Detail Variant

Use more geometry only if the camera gets close enough for silhouette depth to matter.

### Avoid

- millions of sculpted polygons
- uncompressed height geometry
- unique heavy geometry for every figure
- excessive transparent overlays

---

## 7.5 Apadana Column

### Runtime Structure

```text
Column
├── Base
├── Shaft
├── Neck
└── Capital
```

The shaft and base should be procedural where practical.

The capital may use a production model.

Repeated columns must use instancing.

---

## 7.6 Cuneiform Tablet

A tablet may use:

- simple stone mesh
- high-quality inscription normal map
- limited displacement
- close-reading texture variant

The inscription must remain readable at the approved camera distance.

---

## 7.7 Achaemenid Rhyton

The rhyton is a reflective hero object.

Requirements:

- clean silhouette
- optimized reflective material
- controlled metal roughness
- accurate animal detail
- no real-time ray tracing dependency
- simplified environment reflections
- mobile LOD

---

## 7.8 Lotus Motif

The lotus may remain procedural.

Options:

- radial geometry generation
- simple reusable mesh
- shallow relief model
- vector-to-mesh conversion
- instanced petals

The assembly should support radial reveal animation.

---

## 7.9 Gate of All Nations

Use modular procedural architecture.

Production models should be limited to:

- guardian details
- inscriptions
- decorative fragments
- selected edge damage

The gate should not be one monolithic heavy model.

---

## 7.10 Immortal Guard

Possible implementations:

- optimized static sculpt
- simplified relief-inspired figure
- lightly rigged model only if approved
- static pose with lighting-driven reveal

The MVP should not require character animation.

---

# 8. AI Image-to-3D Workflow

AI-generated meshes are base assets, not production-ready assets.

## 8.1 Input Image Requirements

Use images with:

- plain background
- complete object visible
- neutral lighting
- minimal cast shadow
- low perspective distortion
- clear separation of limbs or wings
- front, side, and three-quarter consistency
- no cinematic fog or dramatic cropping

## 8.2 Generation Workflow

```text
Historical References
        ↓
Neutral Concept Views
        ↓
Image-to-3D Generation
        ↓
Best Candidate Selection
        ↓
Blender Cleanup
        ↓
Optimization
        ↓
Validation
```

## 8.3 Common AI Mesh Problems

Expect:

- excessive polygon density
- fused geometry
- missing backs
- incorrect symmetry
- broken UVs
- texture artifacts
- internal faces
- incorrect scale
- incorrect origin
- unstable material setup
- historically invented details

These issues must be resolved before production use.

---

# 9. Blender Scope

The developer is not expected to become a full 3D modeler.

Blender is used primarily as an asset cleanup and export tool.

## 9.1 Required Blender Skills

The minimum supported workflow includes:

1. import GLB, glTF, OBJ, or FBX
2. inspect geometry
3. move, rotate, and scale
4. apply transforms
5. set origin
6. delete unwanted geometry
7. merge or separate objects
8. recalculate normals
9. use Shade Smooth
10. use Auto Smooth or normal correction
11. use Decimate carefully
12. validate materials
13. export GLB

## 9.2 Optional Blender Skills

May be used later:

- simple retopology
- UV unwrapping
- normal map baking
- ambient occlusion baking
- geometry nodes
- texture painting
- sculpt cleanup
- LOD creation

## 9.3 Not Required Initially

- advanced character rigging
- full sculpting from scratch
- complex animation
- simulation
- procedural world creation
- cinematic rendering

---

# 10. Coordinate, Scale, and Origin Contract

All production assets must follow a consistent transform contract.

## 10.1 Coordinate System

Use:

```text
Y-up
Forward direction documented per artifact
Meters as conceptual scale
```

## 10.2 Transform Requirements

Before export:

- apply scale
- apply rotation when appropriate
- use scale `[1, 1, 1]`
- use predictable world orientation
- center or anchor the asset intentionally
- remove accidental transform offsets

## 10.3 Origin Rules

The origin depends on the asset type.

```text
Standing sculpture:
Origin at ground contact center

Column:
Origin at base center

Floating artifact:
Origin at visual center

Relief panel:
Origin at panel center

Gate:
Origin at base center of entrance axis

Rhyton:
Origin at visual center or pedestal contact
```

## 10.4 Anchor Metadata

Each artifact wrapper should document:

```ts
export type ArtifactTransformContract = {
  scale: number;
  rotation: [number, number, number];
  offset: [number, number, number];
  focusTarget: [number, number, number];
  groundOffset?: number;
};
```

---

# 11. Geometry Budgets

Budgets are initial targets and may be revised after profiling.

## 11.1 Hero Assets

```text
Desktop LOD0:
30,000 to 80,000 triangles preferred

Standard LOD1:
12,000 to 35,000 triangles preferred

Mobile LOD2:
3,000 to 12,000 triangles preferred
```

Higher counts require justification and profiling.

## 11.2 Relief Panels

```text
Close hero panel:
10,000 to 40,000 triangles if geometry is necessary

Standard panel:
500 to 5,000 triangles with normal maps

Background panel:
2 triangles to several hundred triangles
```

## 11.3 Procedural Architecture

Keep geometry simple.

Prefer:

- instancing
- merged static geometry
- shared materials
- limited bevel segments
- normal maps for small detail

## 11.4 Repeated Objects

Repeated geometry must not multiply CPU and GPU cost unnecessarily.

Use `InstancedMesh` when objects share geometry and material.

---

# 12. Texture Budgets

## 12.1 Preferred Resolutions

```text
Hero desktop asset:
Up to 2048 × 2048 per essential texture set

Standard artifact:
1024 × 1024 preferred

Mobile artifact:
512 × 512 or 1024 × 1024

Small repeated detail:
256 × 256 to 512 × 512
```

4K textures require explicit approval.

## 12.2 Texture Sets

Use only required maps.

Possible maps:

- base color
- normal
- roughness
- metallic
- ambient occlusion
- emissive when justified

Avoid separate maps that can be packed.

## 12.3 Channel Packing

Where practical:

```text
R = Ambient Occlusion
G = Roughness
B = Metallic
```

Document the packing convention.

## 12.4 Texture Compression

Production textures should use KTX2 where supported.

Fallback images may use:

- WebP
- AVIF
- PNG only when transparency or lossless detail requires it

---

# 13. Material Standards

## 13.1 Stone

Stone materials should avoid plastic appearance.

Recommended characteristics:

- moderate to high roughness
- restrained specular response
- subtle color variation
- readable normal detail
- limited displacement
- calibrated lighting response

## 13.2 Metal

Metal materials should use:

- physically plausible metallic values
- controlled roughness
- simplified environment reflections
- no excessive mirror-like appearance
- mobile-friendly reflection strategy

## 13.3 Shared Materials

Prefer shared materials:

```text
MAT_STONE_CLEAN
MAT_STONE_WEATHERED
MAT_STONE_DARK
MAT_STONE_POLISHED
MAT_GOLD_AGED
MAT_METAL_AGED
MAT_WOOD_DARK
```

Avoid creating unique material instances without a clear visual reason.

---

# 14. LOD Strategy

## 14.1 LOD Levels

```text
LOD0:
Desktop hero view

LOD1:
Desktop standard and tablet

LOD2:
Mobile and distant view

Fallback:
Static image or procedural replacement
```

## 14.2 LOD Selection

LOD may be selected using:

- quality profile
- viewport size
- estimated screen size
- camera distance
- runtime performance

## 14.3 Transition

LOD changes must avoid visible popping.

Possible approaches:

- change outside the visible station range
- crossfade materials
- swap during darkness
- swap during a transition
- preload the next LOD

---

# 15. Export Format

## 15.1 Runtime Model Format

Use `.glb`.

Reasons:

- one binary file
- standard Three.js support
- embedded material references
- efficient transfer
- compatible with compression tools

## 15.2 Source Formats

Source files may include:

- `.blend`
- `.fbx`
- `.obj`
- `.gltf`
- high-resolution texture sources

Source files must not be placed in the runtime public directory.

## 15.3 Export Settings

Before export:

- apply transforms
- remove unused objects
- remove unused materials
- remove hidden geometry
- verify normals
- verify UVs
- confirm scale
- confirm origin
- confirm texture paths
- verify animation state
- export selected objects only
- disable unnecessary cameras and lights

---

# 16. Compression

## 16.1 Mesh Compression

Use one approved mesh compression strategy:

- Meshopt
- Draco

The project should not mix strategies without a documented reason.

## 16.2 Texture Compression

Use KTX2 and Basis Universal where appropriate.

## 16.3 Compression Validation

Compression must be checked for:

- visible geometry damage
- UV distortion
- normal map artifacts
- unacceptable load time
- decoder cost on mobile
- browser compatibility

---

# 17. Naming Conventions

## 17.1 File Names

Use lowercase kebab-case.

```text
lamassu-lod0.glb
lamassu-lod1.glb
lamassu-lod2.glb
lamassu-poster.webp
lamassu-basecolor.ktx2
lamassu-normal.ktx2
lamassu-orm.ktx2
```

## 17.2 Source File Names

```text
lamassu-source-v01.blend
lamassu-source-v02.blend
lamassu-highpoly-v01.blend
```

## 17.3 Internal Object Names

Use descriptive names.

```text
LAMASSU_BODY
LAMASSU_LEFT_WING
LAMASSU_RIGHT_WING
LAMASSU_BASE
```

Avoid:

```text
Cube.001
Object23
mesh_final_final2
```

## 17.4 Versioning

Do not include runtime version numbers unless required by deployment.

Use source control for runtime version history.

---

# 18. Runtime Directory Structure

```text
public/
└── assets/
    ├── models/
    │   ├── shared/
    │   ├── grand-stairway/
    │   ├── lamassu/
    │   ├── bull-capital/
    │   ├── relief-panel/
    │   ├── apadana-column/
    │   ├── cuneiform/
    │   ├── rhyton/
    │   ├── lotus/
    │   ├── gate-of-all-nations/
    │   └── immortal-guard/
    ├── textures/
    │   ├── shared/
    │   └── stations/
    ├── audio/
    └── fallback/
```

Source assets should be stored outside `public/`.

Suggested source structure:

```text
assets-source/
├── blender/
├── references/
├── textures/
├── ai-generations/
├── licenses/
└── export/
```

---

# 19. Asset Manifest

All runtime assets must be registered centrally.

```ts
export type AssetVariant = {
  high?: string;
  standard?: string;
  mobile?: string;
  fallback?: string;
};

export type ArtifactAssetEntry = {
  model?: AssetVariant;
  poster?: AssetVariant;
  textures?: Record<string, AssetVariant>;
  preloadPriority?: "critical" | "high" | "normal" | "low";
  estimatedBytes?: number;
};
```

Example:

```ts
export const assetManifest = {
  lamassu: {
    model: {
      high: "/assets/models/lamassu/lamassu-lod0.glb",
      standard: "/assets/models/lamassu/lamassu-lod1.glb",
      mobile: "/assets/models/lamassu/lamassu-lod2.glb",
      fallback: "/assets/fallback/lamassu.webp",
    },
    preloadPriority: "high",
  },
} satisfies Record<string, ArtifactAssetEntry>;
```

No station should hard-code runtime asset URLs.

---

# 20. Asset Loading Strategy

## 20.1 Initial Load

Load only:

- intro-critical textures
- first station placeholder or model
- shared minimal materials
- critical fonts
- required fallback assets

## 20.2 Preloading

Preload the next station before its visible range.

```text
Current station active
        ↓
Next station begins preloading
        ↓
Transition begins only after ready or fallback selected
```

## 20.3 Loaded Window

Prefer keeping:

- previous station
- current station
- next station

in memory when the device allows it.

## 20.4 Failure Handling

If loading fails:

1. capture the failure
2. select fallback asset
3. preserve the station text
4. continue the journey
5. avoid repeated infinite retries

---

# 21. Placeholder Replacement Contract

A production asset must replace a placeholder without changing:

- station ID
- camera keyframes
- scroll range
- motion profile
- journey order
- content structure
- loading API

The artifact wrapper owns normalization.

Example:

```tsx
export function LamassuArtifact({
  state,
  quality,
}: LamassuArtifactProps) {
  const asset = useResolvedArtifactAsset("lamassu", quality);

  return (
    <group
      position={state.position}
      rotation={state.rotation}
      scale={state.scale}
    >
      <NormalizedArtifact asset={asset} contract={lamassuContract} />
    </group>
  );
}
```

---

# 22. Validation Workflow

Every exported asset must pass four validation stages.

## 22.1 Structural Validation

Check:

- file opens
- model loads
- no missing texture references
- expected meshes exist
- no accidental cameras
- no accidental lights
- no hidden high-poly duplicates
- no invalid animation tracks

## 22.2 Transform Validation

Check:

- correct scale
- correct orientation
- correct origin
- expected ground contact
- correct visual center
- correct camera framing

## 22.3 Visual Validation

Check:

- normals
- UV seams
- texture quality
- roughness
- metallic response
- shading
- silhouette
- close-view artifacts

## 22.4 Runtime Validation

Check:

- load time
- decoded memory
- frame rate
- draw calls
- triangle count
- texture memory
- mobile behavior
- fallback behavior
- station transition

---

# 23. Runtime Inspection

Each production asset should be tested in an isolated viewer before integration.

The viewer should display:

- triangle count
- mesh count
- material count
- texture count
- bounding box
- file size
- quality variant
- origin marker
- focus target marker
- optional wireframe mode
- optional normal visualization

---

# 24. Asset Acceptance Checklist

An asset is accepted when:

- historical references are documented
- license is documented
- source file is stored
- runtime file follows naming conventions
- scale is correct
- orientation is correct
- origin is correct
- focus target is documented
- normals are valid
- materials are valid
- textures are compressed
- geometry meets budget
- LODs exist when required
- fallback exists
- file loads successfully
- mobile profile is tested
- station transition is tested
- performance target is met
- manifest is updated
- relevant decision is recorded

---

# 25. Licensing

Every external model, texture, HDRI, sound, or image must have documented usage rights.

Store license information in:

```text
assets-source/licenses/
```

Each entry should include:

- asset name
- creator
- source
- license
- attribution requirement
- modification permission
- commercial-use permission
- download date

Do not use an asset when its license is unclear.

---

# 26. Quality Review Roles

## Developer

Responsible for:

- placeholder assets
- runtime integration
- manifest updates
- loading behavior
- performance profiling
- fallback behavior
- transform contract

## 3D Artist or Asset Specialist

Responsible for:

- mesh cleanup
- topology
- UVs
- baking
- LODs
- export quality
- visual consistency

## Historical Reviewer

Responsible for:

- source review
- inaccurate details
- uncertainty notes
- artifact naming
- contextual claims

One person may hold multiple roles, but responsibilities should remain explicit.

---

# 27. Automation Opportunities

The pipeline may include scripts for:

- validating file names
- checking missing manifest entries
- calculating file size
- reporting triangle counts
- detecting oversized textures
- verifying expected LOD variants
- generating asset reports
- checking broken runtime URLs

Suggested command:

```text
npm run assets:validate
```

Example output:

```text
lamassu
✓ LOD0 exists
✓ LOD1 exists
✓ LOD2 exists
✓ fallback exists
✓ manifest entry exists
✓ file names valid
! LOD0 exceeds preferred file size
```

---

# 28. Performance Review

After integration, profile each station separately.

Record:

- average FPS
- lowest FPS
- draw calls
- triangles
- texture memory
- total station payload
- load duration
- transition impact
- mobile result

Store reports under:

```text
docs/performance/
```

An asset must not be considered complete based only on visual quality.

---

# 29. MVP Asset Plan

The MVP uses:

```text
Intro
- HTML typography
- procedural particles

Grand Stairway
- procedural steps
- simple procedural side walls

Lamassu
- temporary placeholder or low-detail GLB

Bull Capital
- procedural shaft and temporary capital

Outro
- reused silhouettes
- HTML typography
```

The MVP must not be blocked by:

- custom sculpting
- final textures
- production LODs
- advanced Blender work
- complete historical models

---

# 30. Production Asset Priority

## Priority One

Assets directly affecting the MVP:

1. Lamassu
2. Bull Capital
3. shared stone material

## Priority Two

Assets with strong visual impact:

4. Relief Panel
5. Rhyton
6. Cuneiform Tablet

## Priority Three

Assets used later in the journey:

7. Immortal Guard
8. Gate guardian details
9. Apadana capital detail
10. decorative secondary assets

---

# 31. Recommended First Asset Task

```text
Create the procedural placeholder asset system for the Persepolis project.

Implement:

1. A reusable stone material
2. A procedural Grand Stairway component
3. A placeholder Lamassu volume
4. A modular Bull Capital placeholder
5. Shared artifact transform contracts
6. A centralized asset manifest
7. Quality-specific asset resolution
8. A fallback poster strategy
9. Asset loading error handling
10. Unit tests for asset variant resolution

Requirements:

- no final Blender assets
- no hard-coded asset URLs inside stations
- placeholder and production assets must share the same wrapper contracts
- mobile and reduced quality variants must be supported
- document architectural decisions
- run tests and production build
- provide an English commit message
```

---

# 32. Summary

The asset pipeline follows one core rule:

> Build the experience first, then improve the artifacts without changing the experience architecture.

The intended production path is:

```text
Code defines the scene.
Scroll defines the story.
Camera defines attention.
Placeholders validate the experience.
AI or ready-made assets provide a base.
Blender cleans and optimizes.
GLB and KTX2 deliver the result.
The asset manifest keeps integration predictable.
Performance budgets decide what survives.
```
