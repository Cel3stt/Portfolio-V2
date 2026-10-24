---
name: sanity-schema-gotchas
description: Confirmed non-obvious Sanity field names / shapes in this repo (read schemaTypes/*.ts before querying; do not trust sanity.types.ts)
metadata:
  type: project
---

Field-name gotchas confirmed by reading `sanity/schemaTypes/*.ts` (authoritative;
committed `sanity.types.ts` is stale). Only the surprising bits are recorded here —
always re-open the schema file before writing GROQ.

- **`project.techStack`** is camelCase with a **capital S** (`techStack`), unlike
  the singleton doc `techstack` (all-lowercase field `techstack`). Easy to mix up.
- **`technologies`** doc: outer array field is `technologyCategory`, and EACH item
  object ALSO has a field named `technologyCategory` (+ `technologyList`). Same name
  at two nesting levels — query as `technologyCategory[]{ technologyCategory, technologyList }`.
- **Singletons use fixed doc IDs equal to the type name** (`hero`, `profile`,
  `techstack`, `technologies`, `experience`, `certifications`, `currentBuilding`,
  `contacts`) per `sanity/structure.ts`. Existing code fetches via `*[_type=='x'][0]`.
- **Only `projectOverview` (project) and `galleryDescription` (gallery) are Portable
  Text** (block arrays). Everything textual else is plain `string`/`text` — including
  `profile.about`, `hero.subtitle`/`welcomeMessage`, `experience[].jobDescription`,
  `project.projectDescription`. Do NOT run toPlainText on those; do use it on the two PT fields.
- `profile` text field is **`about`** (NOT `aboutText`).
- Array-wrapper field names: experience→`experienceName[]`, certifications→`certificationName[]`,
  currentBuilding→`taskName[]`, contacts→`contacts[]`. Inner objects match the agent field map.
- **`experience` doc extended (2026-07-19):** each `experienceName[]` role now also has
  `skills` (array of string, optional). Doc also has a top-level `educationList[]{ schoolName
  (required), degree, startDate, endDate, awards[] }` — inline object preview
  select { title: schoolName, subtitle: degree }. Types in queries/sections.ts:
  `ExperienceEntry` gained `skills?: string[]`; new `EducationEntry`; `ExperienceData`
  now `{ experienceName?; educationList? } | null`.
- `project.projectDate` and `certificationDate`/`startDate`/`endDate` are **strings**,
  not date types — sorting by them is lexical, not reliable chronological.
- **New singletons (added 2026-07-19):** `recommendations` (fixed id `recommendations`)
  with array field `recommendationList[]{ recommenderName, recommenderTitle,
  recommenderCompany, recommendationText (plain `text`, NOT PT), recommenderImage,
  recommendationUrl }`; and `gear` (fixed id `gear`) with array field
  `gearCategory[]{ categoryName, gearList[]{ gearName, gearDescription, gearUrl, gearImage } }`.
  Both registered in schemaTypes/index.ts + desk entries in structure.ts.
