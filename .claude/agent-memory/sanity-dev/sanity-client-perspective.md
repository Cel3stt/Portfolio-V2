---
name: sanity-client-perspective
description: Which Sanity client/perspective to use for LLM-context vs page rendering, and the serverClient.fetch signature
metadata:
  type: project
---

Client selection confirmed for this repo (`sanity/lib/`):

- **Feeding text to an LLM / scripts / exports → `serverClient`** with an explicit
  `{ perspective: "published" }`. `serverClient` has no stega and is token-authed;
  `useCdn: true`. It does NOT set a default perspective, so pass it explicitly.
- **Rendering page content → `sanityFetch`** (Live Content API, `sanity/lib/live.ts`).
- `client` (`sanity/lib/client.ts`) has stega enabled — browser/visual-editing only.

**`serverClient.fetch` signature** (verified against installed `@sanity/client`
`fetch<R>(query, params, options)`): options only reachable when params is passed,
so pass `{}` for params:

```ts
serverClient.fetch<T>(QUERY, {}, { perspective: "published" });
```

`perspective: "published"` is a valid `ClientPerspective`. `filterResponse` defaults
true, so the call returns the data directly (not wrapped).

**Why:** stega-encoded strings would pollute LLM prompts, and drafts must never leak
into generated content. See [[sanity-schema-gotchas]] for field names to project.

**How to apply:** any helper that turns Sanity content into a string for a model
should use this exact pattern. `sanity/lib/portfolio-context.ts` now implements it
(`getPortfolioContext(): Promise<string>`, `cache`-wrapped), flattening all
singletons + projects into sectioned prose. `toPlainText` is re-exported from
`@portabletext/react` for flattening Portable Text; in that helper only
`project.projectOverview` is Portable Text — every other field is plain
string/string[]. Note `project.techStack` has a capital S.

**`server-only` resolves fine for tsc** even though it is NOT a root dep — Next
bundles it at `node_modules/next/dist/compiled/server-only/`. `require.resolve`
from cwd fails, but `tsc --noEmit` passes. Do not strip the `import "server-only";`
line thinking the package is missing.
