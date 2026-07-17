---
name: ai-sdk-version-api
description: Installed Vercel AI SDK versions and the exact v7 API shape for the chatbot route (verify against package.json before trusting)
metadata:
  type: reference
---

Installed (as of 2026-07-17, package.json — reconfirm there before relying):
- `ai@^7.0.30`
- `@ai-sdk/google@^4.0.17`
- `@ai-sdk/react@^4.0.33`

Version-specific quirks that caused trial-and-error and are NOT obvious from the code:

- Server route imports from `ai`: `streamText`, `convertToModelMessages`, `toUIMessageStream`, `createUIMessageStreamResponse`, `type UIMessage`. Provider from `@ai-sdk/google`: `google`.
- `convertToModelMessages` is **async** — you MUST `await` it. Passing the un-awaited Promise to `streamText({ messages })` type-errors.
- Return via the **standalone** helpers: `createUIMessageStreamResponse({ stream: toUIMessageStream({ stream: result.stream }) })`. The instance method `result.toUIMessageStreamResponse()` is deprecated in this version — do not use it.
- `streamText(...)` returns a result whose `.stream` property feeds `toUIMessageStream`.
- `UIMessage` is **parts-based**: to read a message's text, sum `msg.parts` where `part.type === "text"` (cast to `{ text: string }`), not a top-level `.content` string.
- Do NOT use v3/v4-era APIs: `StreamingTextResponse`, `result.toAIStream()`, or `useChat` from `ai/react`.
- Client (not yet built here): `useChat` from `@ai-sdk/react` with `new DefaultChatTransport({ api: "/api/chat" })`, render each message's `parts`.

Model in use: `google("gemini-flash-lite-latest")`. Key `GOOGLE_GENERATIVE_AI_API_KEY` is read automatically by the provider from env — never referenced in code, server-only.

The pinned `gemini-2.5-flash-lite` AND `gemini-2.5-flash` are NO LONGER available to new API keys — `generateContent` returns AI_APICallError NOT_FOUND ("no longer available to new users"), even though they still appear in the ListModels response. Verified 2026-07-17. Use the rolling alias `gemini-flash-lite-latest` (tested working) so a future pinned model can't deprecate out from under the route.
