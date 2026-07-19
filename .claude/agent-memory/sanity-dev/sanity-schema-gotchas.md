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
- `project.projectDate` and `certificationDate`/`startDate`/`endDate` are **strings**,
  not date types — sorting by them is lexical, not reliable chronological.
