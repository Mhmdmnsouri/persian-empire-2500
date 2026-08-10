# CONTENT_GUIDE.md

## Project

**Persian Empire 2500**

## Document Status

- **Status:** Draft for implementation
- **Version:** 1.0.0
- **Audience:** Content writers, translators, historians, developers, AI coding agents, UX writers, and reviewers
- **Primary Languages:** English and Persian
- **Related Documents:**
  - `AGENTS.md`
  - `docs/SPEC.md`
  - `docs/MOTION_STORYBOARD.md`
  - `docs/ARCHITECTURE.md`
  - `docs/ACCESSIBILITY.md`
  - `docs/TEST_PLAN.md`
  - `docs/DECISIONS.md`

---

# 1. Purpose

This document defines the content system for the Persepolis experience.

It establishes:

- the narrative voice
- the structure of each station
- content length limits
- bilingual writing rules
- historical naming conventions
- translation principles
- source and citation requirements
- uncertainty language
- accessibility requirements
- interface copy rules
- developer-facing content contracts
- review and approval workflows

The goal is to keep every station concise, cinematic, historically responsible, and compatible with the motion design.

The experience must not become a long-form article placed beside 3D objects.

The content should guide attention, provide context, and leave space for the artifact itself to speak.

---

# 2. Content Principles

## 2.1 Write for a Guided Experience

Content is experienced while the camera, lighting, and artifact are moving.

Text must be:

- concise
- readable at a glance
- emotionally controlled
- synchronized with visual reveals
- easy to pause and resume
- understandable without specialist knowledge

## 2.2 One Idea at a Time

Each visible text moment should communicate one clear idea.

Do not combine:

- historical date
- construction technique
- symbolism
- political interpretation
- material detail

inside one dense paragraph.

## 2.3 The Artifact Is the Main Character

Text supports the artifact.

Text must not compete with the 3D object through:

- excessive length
- overly poetic language
- too many labels
- repeated facts
- large blocks of statistics

## 2.4 Historical Responsibility Comes Before Drama

Cinematic writing must not invent history.

Do not exaggerate or fabricate:

- motives
- emotions
- exact meanings
- reconstruction details
- numbers
- ceremonial functions
- identities of figures

When evidence is uncertain, say so clearly.

## 2.5 Meaning Must Survive Without Motion

All essential content must remain understandable:

- with reduced motion
- without WebGL
- with sound disabled
- on mobile
- through a screen reader

---

# 3. Narrative Voice

## 3.1 Overall Tone

The voice should feel:

- intelligent
- restrained
- cinematic
- clear
- respectful
- curious
- modern
- historically grounded

The voice should not feel:

- academic and inaccessible
- touristic and promotional
- nationalistic
- mystical without evidence
- overly dramatic
- childish
- encyclopedic
- robotic
- decorative for its own sake

## 3.2 Emotional Range

The narrative may evoke:

- silence
- discovery
- scale
- continuity
- craftsmanship
- order
- memory
- cultural encounter
- historical distance

Avoid language that instructs the user what to feel.

Weak:

> You will be amazed by the incredible greatness of Persepolis.

Preferred:

> The scale becomes clear only when the column is seen as part of a repeated forest of stone.

## 3.3 Sentence Style

Prefer:

- short to medium sentences
- active voice
- concrete nouns
- precise verbs
- limited adjectives
- varied rhythm
- direct explanation

Avoid:

- stacked subordinate clauses
- excessive passive voice
- abstract filler
- repeated superlatives
- unsupported emotional claims

---

# 4. Content Hierarchy

Each station uses the following content hierarchy:

```text
Station Title
Emotional Lead
Historical Explanation
Optional Facts or Labels
Optional Extended Detail
Sources
```

## 4.1 Station Title

Purpose:

- identify the artifact or architectural element
- remain clear in navigation
- work in isolation

Recommended length:

```text
English:
2 to 6 words

Persian:
2 to 7 words
```

Examples:

```text
The Grand Stairway
Lamassu
The Bull Capital
Delegations in Stone
The Apadana Column
Words in Stone
The Achaemenid Rhyton
The Lotus Motif
The Gate of All Nations
The Immortal Guard
```

## 4.2 Emotional Lead

Purpose:

- connect the artifact to a human or conceptual idea
- prepare the visual reveal
- remain short enough to read during motion

Recommended length:

```text
English:
8 to 18 words

Persian:
8 to 20 words
```

Example:

> Before it became a monument, it was a carefully staged approach to power.

## 4.3 Historical Explanation

Purpose:

- explain the most important historical meaning
- provide enough context for a general audience
- avoid overwhelming the station

Recommended length:

```text
English:
35 to 75 words

Persian:
45 to 95 words
```

Maximum:

```text
English:
100 words

Persian:
125 words
```

Longer content belongs in an optional detail panel.

## 4.4 Facts and Labels

Use up to three visible facts or labels.

Each label should contain:

```text
1 short heading
1 short value or explanation
```

Recommended length:

```text
Heading:
1 to 3 words

Value:
1 to 8 words
```

Example:

```text
Function
Roof support

Material
Limestone

Visual Form
Paired bulls
```

## 4.5 Extended Detail

Extended content is optional.

It may include:

- longer historical context
- source notes
- reconstruction uncertainty
- terminology
- related artifacts
- architectural explanation

Recommended length:

```text
150 to 350 words per station
```

Extended content must not be required to understand the primary journey.

---

# 5. Station Content Template

Use this structure for every station.

```md
## Station ID

### Navigation Title

Short title used in chapter navigation.

### Display Title

Main title shown in the station.

### Lead

One short emotional or conceptual line.

### Main Description

One concise historical explanation.

### Labels

1. Label title: value
2. Label title: value
3. Label title: value

### Extended Detail

Optional longer explanation.

### Uncertainty Note

Optional clarification about disputed or reconstructed details.

### Sources

- Source ID
- Source ID
```

---

# 6. Content Data Contract

Content must be stored as structured data, not embedded inside rendering components.

## 6.1 TypeScript Contract

```ts
export type ContentSourceRef = {
  id: string;
};

export type StationLabel = {
  id: string;
  title: string;
  value: string;
  anchorId?: string;
};

export type StationContent = {
  id: string;
  navigationTitle: string;
  title: string;
  lead: string;
  description: string;
  labels: StationLabel[];
  extended?: string[];
  uncertaintyNote?: string;
  sourceIds: string[];
};

export type JourneyContent = {
  intro: IntroContent;
  stations: Record<string, StationContent>;
  outro: OutroContent;
  interface: InterfaceContent;
};
```

## 6.2 Content Location

Recommended structure:

```text
src/content/
├── content.types.ts
├── en.ts
├── fa.ts
├── sources.ts
├── validate-content.ts
└── content.test.ts
```

## 6.3 No Hard-Coded Narrative Copy

Do not place user-facing narrative text directly inside:

- station components
- camera configuration
- asset files
- animation utilities
- shader code

---

# 7. English Writing Rules

## 7.1 English Variant

Use clear international English.

Prefer consistent spelling.

Recommended default:

```text
British English or neutral international English
```

Do not mix spelling styles within the same project.

Examples:

```text
civilisation / civilization
centre / center
honour / honor
```

The project team must choose one style before final copy approval.

## 7.2 Capitalisation

Use title case for main station titles only when visually appropriate.

Use sentence case for:

- buttons
- labels
- descriptions
- navigation actions
- accessibility text

Preferred:

```text
The Gate of All Nations
Explore the artifact
Restart journey
```

Avoid:

```text
EXPLORE THE ARTIFACT
RESTART JOURNEY
```

unless uppercase is a purely visual CSS treatment.

## 7.3 Terminology

Use precise language.

Preferred:

```text
Achaemenid
Persepolis
Apadana
Lamassu
cuneiform inscription
relief
capital
delegation
ceremonial
```

Avoid vague replacements such as:

```text
ancient empire object
old Persian sculpture
mysterious writing
```

## 7.4 Dates

Use clear date formats.

Preferred:

```text
c. 500 BCE
fifth century BCE
reign of Darius I
reign of Xerxes I
```

Avoid:

```text
500 BC / BCE
```

mixed inconsistently.

Use `BCE` and `CE` throughout unless editorial policy changes.

## 7.5 Numbers

Spell out numbers from one to nine in narrative text when they are not measurements.

Use numerals for:

- dates
- dimensions
- counts
- percentages
- chapter counters

Example:

> The composition includes three visible groups.

> The column may have reached approximately 20 metres.

## 7.6 Measurements

Use metric units.

Preferred:

```text
20 metres
4.5 metres
```

UI labels may use:

```text
20 m
4.5 m
```

Do not include precise measurements unless verified.

---

# 8. Persian Writing Rules

## 8.1 Tone

Persian should feel natural, contemporary, and formal without becoming bureaucratic.

Prefer:

- روان
- دقیق
- کوتاه
- خوش‌خوان
- فاقد ترجمه‌زدگی
- متناسب با روایت تصویری

Avoid:

- نثر اداری
- واژه‌های بسیار ثقیل
- جملات بیش‌ازحد طولانی
- ترجمه تحت‌اللفظی از انگلیسی
- لحن تبلیغاتی
- اغراق تاریخی

## 8.2 Persian Script

Use standard Persian characters:

```text
ی
ک
```

Do not use Arabic variants:

```text
ي
ك
```

## 8.3 Half-Space

Use half-space consistently.

Examples:

```text
نقش‌برجسته
هخامنشی
می‌سازد
به‌تدریج
هم‌زمان
سه‌بعدی
```

## 8.4 Punctuation

Use Persian punctuation where appropriate:

```text
،
؛
؟
```

Use quotation marks consistently.

Recommended:

```text
«دروازه ملل»
```

## 8.5 Numerals

The implementation should define one consistent numeral policy.

Recommended:

- Persian numerals inside Persian narrative text
- Latin numerals for technical values only when required by UI consistency

Examples:

```text
حدود ۲۰ متر
سده پنجم پیش از میلاد
```

## 8.6 Dates

Preferred phrasing:

```text
حدود ۵۰۰ پیش از میلاد
سده پنجم پیش از میلاد
دوران داریوش یکم
دوران خشایارشا
```

## 8.7 Translation Quality

Persian copy must be written as Persian, not assembled word-for-word from English.

The Persian and English versions must preserve:

- the same historical meaning
- the same uncertainty level
- the same narrative intention

They do not need identical sentence structure.

---

# 9. Naming and Transliteration

## 9.1 Canonical Names

Use one canonical English and Persian form for each major term.

Suggested initial glossary:

| English | Persian |
|---|---|
| Persepolis | تخت جمشید / پرسپولیس |
| Achaemenid Empire | شاهنشاهی هخامنشی |
| Apadana | آپادانا |
| Lamassu | لاماسو |
| Bull Capital | سرستون گاوی |
| Gate of All Nations | دروازه ملل |
| Grand Stairway | پلکان بزرگ |
| Delegation Relief | نقش‌برجسته هیئت‌ها |
| Cuneiform Inscription | کتیبه میخی |
| Achaemenid Rhyton | ریتون هخامنشی |
| Lotus Motif | نقش نیلوفر |
| Immortal Guard | سرباز جاویدان |

The historical review may revise these terms.

## 9.2 Persepolis vs Takht-e Jamshid

Use according to language:

```text
English:
Persepolis

Persian:
تخت جمشید
```

The first English extended description may mention:

> Persepolis, known in Persian as Takht-e Jamshid...

The first Persian extended description may mention:

> تخت جمشید، که در منابع جهانی با نام پرسپولیس شناخته می‌شود...

Do not alternate randomly between names.

## 9.3 Royal Names

Use consistent English forms:

```text
Darius I
Xerxes I
Artaxerxes I
```

Use approved Persian forms:

```text
داریوش یکم
خشایارشا
اردشیر یکم
```

## 9.4 Transliteration

Do not create inconsistent transliterations.

Maintain a glossary in the content system.

---

# 10. Historical Accuracy Rules

## 10.1 Claim Categories

Every historical statement should belong to one category.

### Confirmed

Supported by strong archaeological, epigraphic, or scholarly evidence.

Example language:

> The reliefs depict delegations bringing gifts.

### Widely Accepted Interpretation

Supported by common scholarly interpretation but not directly proven.

Example language:

> The scene is generally understood as part of a ceremonial procession.

### Possible Interpretation

Plausible but uncertain.

Example language:

> The motif may have represented renewal or royal order.

### Reconstruction

Based on incomplete remains.

Example language:

> This reconstruction suggests how the capital may have supported the roof beams.

### Unknown or Disputed

Evidence is insufficient or scholarly views differ.

Example language:

> The exact ritual use of the vessel remains uncertain.

## 10.2 Do Not Upgrade Certainty

Do not turn:

```text
may have
is often interpreted as
possibly
probably
```

into:

```text
was
definitely meant
proved
always represented
```

during translation or editing.

## 10.3 Avoid Mind Reading

Do not claim the exact thoughts or emotions of ancient people.

Avoid:

> The builders wanted every visitor to feel terrified.

Preferred:

> The scale and controlled approach may have reinforced the authority of the court.

## 10.4 Avoid Unsupported Symbolism

Symbols must not be assigned one definitive meaning without evidence.

Weak:

> The lotus symbolised eternal life.

Preferred:

> The lotus appears repeatedly in Achaemenid decoration and is often associated with order, renewal, or ceremonial continuity.

## 10.5 AI Is Not a Source

AI-generated text, imagery, or 3D output must never be listed as historical evidence.

---

# 11. Uncertainty Language

Use uncertainty language precisely.

## 11.1 Strong Evidence

```text
shows
records
identifies
was built during
is inscribed with
```

## 11.2 Moderate Evidence

```text
is generally understood as
is widely interpreted as
was probably used for
appears to represent
```

## 11.3 Limited Evidence

```text
may have
could have
possibly
one interpretation suggests
```

## 11.4 Disputed

```text
scholars disagree about
the exact meaning remains uncertain
the surviving evidence does not confirm
```

## 11.5 Reconstruction Notice

Use an explicit note when the 3D model includes reconstruction.

Example:

> The surviving remains are incomplete. This digital model presents a restrained reconstruction based on available architectural evidence.

Persian equivalent:

> بخش‌هایی از اثر به‌طور کامل باقی نمانده‌اند. این مدل دیجیتال، بازسازی‌ای محتاطانه بر پایه شواهد معماری موجود است.

---

# 12. Source System

## 12.1 Source Registry

All sources should be stored in a structured registry.

```ts
export type HistoricalSource = {
  id: string;
  title: string;
  author?: string;
  publisher?: string;
  year?: number;
  url?: string;
  accessedAt?: string;
  type:
    | "book"
    | "article"
    | "museum"
    | "institution"
    | "catalogue"
    | "archaeological-report"
    | "inscription"
    | "other";
  notes?: string;
};
```

## 12.2 Source IDs

Use stable IDs.

Examples:

```text
OI-PERSEPOLIS-OVERVIEW
MET-ACHAEMENID-RHYTON
LIVIUS-PERSEPOLIS-APADANA
UNESCO-PERSEPOLIS
SCHMIDT-PERSEPOLIS-I
```

Do not use display titles as IDs.

## 12.3 Source Quality

Prefer:

- archaeological publications
- peer-reviewed research
- museum collections
- university resources
- institutional cultural heritage sources
- primary inscriptions
- scholarly catalogues

Use general websites only for orientation, not as the sole source for important claims.

## 12.4 Source Display

The main journey should not show full citations during motion.

Sources may appear in:

- extended detail panel
- dedicated source section
- artifact index
- final credits

## 12.5 Source Minimum

Each station should have:

```text
At least 1 authoritative source
Preferably 2 or more sources for interpretive claims
```

---

# 13. Content for Motion

Content must be timed to the visual sequence.

## 13.1 Reveal Order

A station may reveal content in this order:

```text
1. Title
2. Lead
3. Main description
4. Labels
5. Optional fact
```

Do not display all text immediately.

## 13.2 Reading Time

Approximate reading speed:

```text
English:
180 to 220 words per minute

Persian:
160 to 200 words per minute
```

Motion timing must allow reasonable reading.

## 13.3 Text During Camera Movement

Use short text during stronger camera movement.

Use longer text during:

- pauses
- hero poses
- reduced motion
- stable framing

## 13.4 Label Timing

Labels should appear only when the related detail is visible.

Examples:

```text
Face label:
after face lighting reveal

Wing label:
after wing edge light

Load support label:
during Bull Capital assembly

Inscription translation:
after reading light reaches selected line
```

---

# 14. Intro Content Rules

The intro should be emotionally concise.

## 14.1 Word Count

Preferred:

```text
3 to 8 visible words before the complete line
1 final sentence
```

## 14.2 Suggested English Direction

Possible final line:

> Stone remembers what time cannot erase.

Alternative:

> What survives in stone still speaks.

Do not use both.

## 14.3 Suggested Persian Direction

Possible final line:

> سنگ، آنچه را زمان پاک نمی‌کند، به یاد می‌سپارد.

Alternative:

> آنچه در سنگ مانده، هنوز سخن می‌گوید.

The final copy requires literary and historical review.

## 14.4 Accessibility

The full sentence must exist as one accessible string even when words animate independently.

---

# 15. Outro Content Rules

The outro should provide reflection, not a summary of every station.

## 15.1 Suggested English Line

> What remains is not only stone. It is the memory of a world.

## 15.2 Suggested Persian Line

> آنچه باقی مانده، تنها سنگ نیست؛ حافظه یک جهان است.

## 15.3 Actions

Recommended actions:

```text
Restart journey
Explore artifacts
View sources
Toggle sound
Change language
```

Persian:

```text
شروع دوباره
مشاهده آثار
مشاهده منابع
صدا
تغییر زبان
```

---

# 16. Station-by-Station Content Direction

This section defines the main content idea for each station.

It does not replace historical research.

---

## 16.1 Grand Stairway

### Main Idea

The approach to Persepolis was carefully staged.

### Content Focus

- gradual ascent
- ceremonial movement
- architectural order
- reliefs as part of the approach

### Avoid

- claiming an exact emotional effect on every visitor
- describing all relief groups at once
- overstating reconstruction certainty

### Suggested Lead

> The ascent was part of the ceremony.

---

## 16.2 Lamassu

### Main Idea

The guardian combines human, animal, and winged forms.

### Content Focus

- location near an entrance
- hybrid visual form
- protective or authoritative function
- controlled symbolism

### Avoid

- presenting Mesopotamian symbolism as identical in every context
- assigning exact psychological meanings without evidence
- calling it a mythological monster in a sensational tone

### Suggested Lead

> Intelligence, strength, and vigilance meet in one guardian form.

---

## 16.3 Bull Capital

### Main Idea

The sculpture was also structural architecture.

### Content Focus

- paired animal forms
- support for roof beams
- column system
- unity of engineering and art

### Avoid

- reducing the object to decoration only
- claiming exact structural calculations without sources

### Suggested Lead

> The sculpture carried meaning, but it also carried weight.

---

## 16.4 Delegation Relief Panel

### Main Idea

The carved procession presents controlled diversity within an imperial ceremony.

### Content Focus

- delegations
- clothing and gifts
- orderly procession
- representation rather than battle

### Avoid

- calling figures conquered prisoners without evidence
- identifying every group with certainty
- reducing the scene to propaganda without nuance

### Suggested Lead

> Difference is shown through dress, objects, and gesture, but the procession follows one order.

---

## 16.5 Apadana Column

### Main Idea

One column becomes meaningful when imagined as part of a monumental hall.

### Content Focus

- height
- repetition
- roof support
- scale of the audience hall

### Avoid

- unsupported exact counts
- measurements without source confirmation
- describing the original hall as fully preserved

### Suggested Lead

> A single column hints at the scale of an entire hall.

---

## 16.6 Cuneiform Tablet or Inscription

### Main Idea

Written language records authority, construction, identity, and memory.

### Content Focus

- script
- language where verified
- royal inscription
- relationship between text and monument

### Avoid

- calling all marks a secret code
- presenting a translation without source
- combining inscriptions from different locations

### Suggested Lead

> Architecture shaped the space. Writing named its makers and meanings.

---

## 16.7 Achaemenid Rhyton

### Main Idea

The vessel combines material skill, animal form, and ceremonial use.

### Content Focus

- material
- craftsmanship
- animal-shaped terminal
- possible ceremonial or elite context

### Avoid

- claiming exact ritual use when uncertain
- describing every vessel as royal property
- excessive luxury language

### Suggested Lead

> Metal becomes animal, vessel, and ceremony at once.

---

## 16.8 Lotus Motif

### Main Idea

Repeated decoration creates rhythm and visual order.

### Content Focus

- repetition
- symmetry
- architectural use
- possible symbolic associations

### Avoid

- assigning one fixed universal meaning
- calling it uniquely Persian without context
- unsupported religious interpretation

### Suggested Lead

> Repetition turns a small motif into an architectural rhythm.

---

## 16.9 Gate of All Nations

### Main Idea

The gate framed arrival and entry into the ceremonial complex.

### Content Focus

- threshold
- royal inscriptions
- guardian forms
- movement of visitors and delegations

### Avoid

- romanticising political unity
- claiming equal status among all represented peoples
- confusing the digital miniature with a complete reconstruction

### Suggested Lead

> Before the palaces, there was a threshold designed to be remembered.

---

## 16.10 Immortal Guard

### Main Idea

The guard represents discipline and continuity in royal imagery.

### Content Focus

- military appearance
- clothing and equipment
- ordered repetition
- historical naming uncertainty where relevant

### Avoid

- treating Greek descriptions as direct visual labels without explanation
- dramatic battle claims
- presenting the figure as an individual portrait

### Suggested Lead

> Power is expressed here through repetition, discipline, and stillness.

---

# 17. Interface Copy

Interface copy should be direct and minimal.

## 17.1 Navigation

English:

```text
Next chapter
Previous chapter
Skip intro
Restart journey
Explore artifacts
View sources
```

Persian:

```text
بخش بعد
بخش قبل
رد کردن مقدمه
شروع دوباره
مشاهده آثار
مشاهده منابع
```

## 17.2 Sound

English:

```text
Enable sound
Mute sound
Sound on
Sound off
```

Persian:

```text
فعال کردن صدا
قطع صدا
صدا روشن
صدا خاموش
```

## 17.3 Loading

English:

```text
Preparing the next artifact
Loading the experience
Using a simplified view
```

Persian:

```text
آماده‌سازی اثر بعدی
در حال بارگذاری تجربه
نمایش نسخه ساده‌شده
```

Avoid playful loading copy that breaks the museum-like tone.

## 17.4 Errors

English:

```text
The 3D artifact could not be loaded. A simplified view is shown instead.
```

Persian:

```text
مدل سه‌بعدی بارگذاری نشد. نسخه ساده‌شده اثر نمایش داده می‌شود.
```

Do not show technical error codes in the main interface.

---

# 18. Accessibility Copy

## 18.1 Canvas Description

The Canvas itself should not create repetitive screen-reader content.

Provide a concise experience description.

English:

> An interactive visual journey through selected artifacts and architectural elements of Persepolis. All historical text is available in the page content.

Persian:

> سفری تعاملی و تصویری میان شماری از آثار و عناصر معماری تخت جمشید. تمام توضیحات تاریخی در محتوای صفحه در دسترس است.

## 18.2 Chapter Announcements

When appropriate, announce:

```text
Chapter 3 of 10: The Bull Capital
```

Persian:

```text
بخش ۳ از ۱۰: سرستون گاوی
```

Do not announce every scroll movement.

## 18.3 Reduced Motion Notice

English:

> Motion has been simplified based on your accessibility preference.

Persian:

> حرکت‌ها بر اساس تنظیمات دسترس‌پذیری شما ساده‌تر شده‌اند.

---

# 19. Content and Visual Labels

## 19.1 Label Count

Maximum visible labels per station:

```text
Desktop:
3

Mobile:
1 to 2
```

## 19.2 Label Style

Labels should name visible features.

Good:

```text
Wing
Human face
Bull body
```

Weak:

```text
Power
Majesty
Mystery
```

Conceptual labels may appear only when clearly identified as interpretation.

## 19.3 Anchor Stability

Label IDs must match stable artifact anchor IDs.

Example:

```ts
{
  id: "lamassu-wing",
  title: "Wing",
  value: "Vigilant, elevated form",
  anchorId: "wing"
}
```

---

# 20. Facts and Statistics

## 20.1 Use Sparingly

Each station may show one major number.

Examples:

- approximate height
- approximate date
- number of surviving elements
- inscription language count

## 20.2 Verification

Every number must have:

- source
- date or context
- uncertainty level
- unit

## 20.3 Approximation

Use:

```text
approximately
about
around
c.
```

when required.

Do not display false precision.

Weak:

```text
20.37 metres
```

Preferred:

```text
approximately 20 metres
```

when evidence supports only an approximate value.

---

# 21. Translation Workflow

## 21.1 Source Language

One language may serve as the editorial source, but both versions require independent review.

Recommended workflow:

```text
Historical research
→ approved factual outline
→ English draft
→ Persian adaptation
→ bilingual comparison
→ historical review
→ UX length review
→ final approval
```

The reverse workflow is also acceptable if Persian is the source draft.

## 21.2 Preserve Meaning, Not Syntax

Translation must preserve:

- claim strength
- uncertainty
- historical meaning
- emotional function
- approximate length

Translation does not need identical sentence order.

## 21.3 Bilingual Review Checklist

Check:

- same artifact identity
- same date
- same number
- same uncertainty
- same source IDs
- same labels
- no missing sentence
- no added claim
- natural grammar
- appropriate RTL layout

---

# 22. Content Validation

Automated validation should check:

- all station IDs exist in both languages
- all required fields exist
- labels do not exceed limits
- source IDs are valid
- no duplicate label IDs
- no missing navigation title
- no empty descriptions
- no raw URLs inside narrative copy
- no unresolved placeholder tokens
- no accidental HTML when plain text is expected

## 22.1 Example Validation

```ts
export function validateStationContent(
  content: StationContent
): string[] {
  const errors: string[] = [];

  if (!content.title.trim()) {
    errors.push("Missing title");
  }

  if (content.labels.length > 3) {
    errors.push("Too many visible labels");
  }

  if (content.sourceIds.length === 0) {
    errors.push("Missing source");
  }

  return errors;
}
```

## 22.2 CI

Content validation should run in CI.

Suggested command:

```text
npm run content:validate
```

---

# 23. Content Review Workflow

## 23.1 Draft

Writer creates:

- title
- lead
- description
- labels
- uncertainty note
- source IDs

## 23.2 Historical Review

Reviewer checks:

- names
- dates
- claims
- interpretations
- reconstruction language
- sources

## 23.3 UX Review

Reviewer checks:

- length
- reading time
- relationship to motion
- mobile readability
- repetition across stations

## 23.4 Translation Review

Reviewer checks:

- meaning parity
- natural language
- terminology
- uncertainty parity

## 23.5 Accessibility Review

Reviewer checks:

- semantic clarity
- screen-reader text
- label meaning
- reduced-motion readability

## 23.6 Final Approval

Approved content receives a status.

```ts
export type ContentStatus =
  | "draft"
  | "historical-review"
  | "translation-review"
  | "approved";
```

---

# 24. Content Status and Ownership

Each station should record:

```ts
export type ContentMetadata = {
  status: ContentStatus;
  writer?: string;
  historicalReviewer?: string;
  translator?: string;
  lastReviewedAt?: string;
};
```

This metadata may remain outside the runtime bundle.

---

# 25. Forbidden Content Patterns

Do not use:

- unsupported nationalistic claims
- claims of cultural superiority
- dramatic conquest language without context
- romantic myths presented as fact
- generic tourism slogans
- repeated words such as "magnificent," "incredible," or "mysterious"
- fabricated quotes
- invented inscriptions
- vague AI-generated filler
- unverified dimensions
- absolute symbolic interpretations
- text that treats reconstruction as surviving reality

Examples to avoid:

> The greatest civilisation the world had ever seen.

> Every visitor immediately understood the king's absolute power.

> The lotus always symbolised immortality.

> This is exactly how the gate looked.

---

# 26. Preferred Content Patterns

Use:

- evidence-based description
- precise uncertainty
- artifact-focused observation
- restrained interpretation
- relationship between form and function
- short visual sentences
- human-scale explanations

Examples:

> The paired bulls were not only decorative. They helped support the roof beams above the hall.

> The figures differ in clothing, hair, and the objects they carry, while the composition presents them within a carefully ordered procession.

> The surviving structure is incomplete. The digital assembly shows one plausible relationship between the capital and the roof.

---

# 27. Content Acceptance Criteria

A station's content is ready when:

- title is clear
- lead is concise
- description fits the reading window
- no more than three labels are visible
- facts are sourced
- uncertainty is preserved
- English and Persian match in meaning
- terminology is consistent
- text works on mobile
- text works in reduced motion
- screen-reader content is complete
- no claim relies on AI as a source
- historical reviewer has approved it
- source IDs resolve correctly

---

# 28. MVP Content Scope

The MVP includes content for:

```text
Intro
Grand Stairway
Lamassu
Bull Capital
Outro
Interface controls
Fallback messages
Accessibility notices
```

The MVP does not require final extended essays.

MVP content should validate:

- tone
- bilingual structure
- text timing
- label density
- source workflow
- mobile reading
- uncertainty handling

---

# 29. Example Station Content

## English Example

```ts
export const bullCapital: StationContent = {
  id: "bull-capital",
  navigationTitle: "Bull Capital",
  title: "The Bull Capital",
  lead: "The sculpture carried meaning, but it also carried weight.",
  description:
    "Paired bull forms crowned some of the great columns of Persepolis. Their backs created a support for wooden roof beams, joining structural engineering with monumental sculpture.",
  labels: [
    {
      id: "bull-capital-form",
      title: "Form",
      value: "Paired bulls",
      anchorId: "capital",
    },
    {
      id: "bull-capital-function",
      title: "Function",
      value: "Roof-beam support",
      anchorId: "beam-support",
    },
  ],
  uncertaintyNote:
    "The digital assembly simplifies missing or incomplete architectural elements.",
  sourceIds: [
    "SCHMIDT-PERSEPOLIS-I",
    "OI-PERSEPOLIS-ARCHITECTURE",
  ],
};
```

## Persian Example

```ts
export const bullCapital: StationContent = {
  id: "bull-capital",
  navigationTitle: "سرستون گاوی",
  title: "سرستون گاوی",
  lead: "این پیکره تنها معنا حمل نمی‌کرد؛ وزن سقف را نیز بر دوش داشت.",
  description:
    "بر فراز برخی از ستون‌های بزرگ تخت جمشید، دو گاو پشت‌به‌پشت قرار می‌گرفتند. فضای میان پشت آن‌ها تکیه‌گاهی برای تیرهای چوبی سقف می‌ساخت و مهندسی سازه را با پیکره‌سازی یادمانی پیوند می‌داد.",
  labels: [
    {
      id: "bull-capital-form",
      title: "ساختار",
      value: "دو گاو پشت‌به‌پشت",
      anchorId: "capital",
    },
    {
      id: "bull-capital-function",
      title: "کارکرد",
      value: "تکیه‌گاه تیرهای سقف",
      anchorId: "beam-support",
    },
  ],
  uncertaintyNote:
    "در این بازسازی دیجیتال، برخی اجزای ناقص یا ازمیان‌رفته به‌صورت ساده‌شده نمایش داده شده‌اند.",
  sourceIds: [
    "SCHMIDT-PERSEPOLIS-I",
    "OI-PERSEPOLIS-ARCHITECTURE",
  ],
};
```

This example is a structural model and still requires historical review.

---

# 30. Recommended First Content Task

```text
Create the bilingual content foundation for the Persepolis project.

Read:
- AGENTS.md
- docs/SPEC.md
- docs/MOTION_STORYBOARD.md
- docs/CONTENT_GUIDE.md
- docs/ACCESSIBILITY.md
- docs/DECISIONS.md

Implement:

1. Typed content contracts
2. English and Persian content modules
3. Source registry contracts
4. Content validation
5. Terminology glossary
6. Intro placeholder content
7. Grand Stairway placeholder content
8. Lamassu placeholder content
9. Bull Capital placeholder content
10. Outro placeholder content
11. Interface and fallback copy
12. Unit tests for bilingual parity and source validation

Requirements:

- no narrative text hard-coded inside station components
- every station ID must exist in both languages
- every factual station must include at least one source ID
- uncertainty must be preserved across translation
- visible labels must not exceed three
- all content must remain semantic HTML
- production build must pass

At completion:
1. summarize implementation
2. list changed files
3. report lint, typecheck, unit, Playwright, and build results
4. provide an English commit message
```

---

# 31. Summary

The content system follows this model:

```text
Research establishes the facts.
Editorial structure controls the length.
Motion controls the moment of reveal.
Translation preserves meaning and uncertainty.
HTML preserves readability and access.
Sources preserve trust.
The artifact remains the centre of attention.
```

The writing should never sound larger than the evidence.

It should be precise enough to trust and quiet enough to let the stone remain present.
