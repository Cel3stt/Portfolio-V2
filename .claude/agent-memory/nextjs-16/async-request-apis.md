---
name: async-request-apis
description: In this Next.js 16, cookies()/draftMode()/headers()/params are async Promises and must be awaited in server components
metadata:
  type: project
---

In this project's Next.js 16, the request APIs are async and must be `await`ed:
`const cookieStore = await cookies()`, `await draftMode()`, `await headers()`, and
route/page `params` are `Promise<...>`. Confirmed against
`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/cookies.md`.

**Why:** AGENTS.md warns this is "NOT the Next.js you know" — pre-15 sync
signatures from training data are wrong here.

**How to apply:** When reading request state in a server component/layout, await
the call. Example in `app/(portfolio)/layout.tsx`: it awaits both `cookies()`
(to read the `sidebar_state` cookie for shadcn SidebarProvider `defaultOpen`) and
`draftMode()`. Reading the sidebar cookie server-side is required so SSR open/closed
state matches the client and avoids hydration flicker.
