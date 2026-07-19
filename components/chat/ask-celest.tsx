"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Clock, Loader2, MessageCircle, Send, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SUGGESTIONS = [
  "What has Celest built?",
  "What's her tech stack?",
  "What's her experience?",
] as const;

export default function AskCelest() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [transport] = useState(
    () => new DefaultChatTransport({ api: "/api/chat" })
  );

  const { messages, sendMessage, status, error } = useChat({ transport });

  const busy = status === "submitted" || status === "streaming";

  // A 429 from the rate-limiter surfaces as error.message === the route's
  // response body (the AI SDK throws `new Error(await response.text())` on a
  // non-OK response). Match it to show the friendly limit line; anything else
  // (network/model errors) falls back to the generic message.
  const isRateLimited = !!error && /reached the limit/i.test(error.message);
  const errorText = isRateLimited
    ? "You've reached the limit for now — try again shortly."
    : "Something went wrong — please try again in a moment.";

  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Mirror the text-extraction approach used in app/api/chat/route.ts so the
  // parts-based UIMessage shape narrows cleanly across the installed versions.
  const lastMessage = messages[messages.length - 1];
  const lastAssistantText =
    lastMessage && lastMessage.role === "assistant"
      ? lastMessage.parts
          .filter((part) => part.type === "text")
          .map((part) => (part as { text: string }).text)
          .join("")
      : "";
  const showTyping = busy && lastAssistantText.length === 0;

  // Focus the input whenever the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Draw attention to the bubble once, a couple seconds after load: reveal a
  // label pill + pulse glow, then settle back to just the icon. Mount-only, so
  // it runs once per page load and never reappears after being dismissed.
  useEffect(() => {
    const show = setTimeout(() => setShowHint(true), 2000);
    const hide = setTimeout(() => setShowHint(false), 8000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  // Keep the newest message in view.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, showTyping]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(input);
  }

  return (
    <>
      {!open && (
        <div className="fixed right-4 bottom-4 z-50">
          {/* Attention label pill — fades in ~2s after load, then away */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-1/2 right-16 -translate-y-1/2 whitespace-nowrap rounded-full bg-background px-3 py-1.5 text-xs font-medium shadow-md ring-1 ring-border transition-all duration-500",
              showHint ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
            )}
          >
            Ask about Celest 💬
          </div>

          {/* Pulsing glow during the initial attention window only */}
          {showHint && (
            <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-pink-400 opacity-60" />
          )}

          <Button
            type="button"
            size="icon-lg"
            aria-label="Ask about Celest"
            aria-expanded={open}
            onClick={() => {
              setOpen(true);
              setShowHint(false);
            }}
            className="relative size-14 rounded-full border-5 border-primary cursor-pointer bg-pink-300 text-white shadow-lg ring-1 ring-black/5 hover:bg-pink-400"
          >
            <MessageCircle className="size-6" />
          </Button>
        </div>
      )}

      {open && (
        <Card
          role="dialog"
          aria-label="Ask about Celest"
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
          className="fixed right-4 bottom-4 z-50 flex h-[500px] max-h-[calc(100vh-6rem)] w-[360px] max-w-[calc(100vw-2rem)] flex-col gap-0 p-0"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="size-4 text-muted-foreground" />
              <h2 className="font-heading text-sm font-medium">
                Ask about Celest
              </h2>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          </div>

          {/* Message list */}
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4">
            {messages.length === 0 && !error && (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="space-y-1">
                  <p className="font-heading text-sm font-medium">Hi there!</p>
                  <p className="text-sm text-muted-foreground">
                    Ask me anything about Celest&apos;s work, skills, and
                    background.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((question) => (
                    <Button
                      key={question}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => send(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => {
              const isUser = message.role === "user";
              const text = message.parts
                .filter((part) => part.type === "text")
                .map((part) => (part as { text: string }).text)
                .join("");

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    isUser ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3 py-2 text-sm break-words whitespace-pre-wrap",
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {text}
                  </div>
                </div>
              );
            })}

            {showTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-secondary px-3 py-2 text-secondary-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  <span className="text-xs">Typing...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <p
                  className={cn(
                    "flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs",
                    isRateLimited
                      ? "bg-amber-100 text-amber-800"
                      : "bg-destructive/10 text-destructive"
                  )}
                >
                  {isRateLimited && <Clock className="size-3.5 shrink-0" />}
                  {errorText}
                </p>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input row */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={busy}
              autoComplete="off"
              aria-label="Type your message"
              placeholder="Ask about Celest"
              className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            />
            <Button
              type="submit"
              size="icon"
              aria-label="Send message"
              disabled={busy || input.trim().length === 0}
            >
              <Send />
            </Button>
          </form>
        </Card>
      )}
    </>
  );
}
