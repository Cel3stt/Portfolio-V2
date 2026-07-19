"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ExternalLink,
  FolderOpen,
  LayoutGrid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ProjectRow = {
  id: string;
  slug: string | null;
  name: string;
  description: string;
  url: string | null;
  date: string | null;
  role: string | null;
  techStack: string[];
  coverUrl: string | null;
};

type View = "gallery" | "table";

// Pastel tint palette derived from theme tokens via color-mix (no hardcoded hex).
// Used for tech pills; role pill uses a fixed distinct tint.
const PILL_TINTS = [
  "color-mix(in oklch, var(--primary) 70%, white)", // soft pink
  "color-mix(in oklch, var(--secondary) 70%, white)", // sage
  "color-mix(in oklch, var(--primary) 45%, white)", // blush
  "color-mix(in oklch, var(--primary) 50%, var(--secondary))", // lavender-ish
  "color-mix(in oklch, var(--secondary) 45%, white)", // pale sage
];

const ROLE_TINT = "color-mix(in oklch, var(--primary) 55%, var(--secondary))";

function tintFor(tech: string): string {
  const sum = Array.from(tech).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return PILL_TINTS[sum % PILL_TINTS.length];
}

function Pill({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-foreground/80"
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  );
}

export default function ProjectsDatabase({ rows }: { rows: ProjectRow[] }) {
  const [view, setView] = useState<View>("gallery");

  const tabs: { id: View; label: string; icon: typeof LayoutGrid }[] = [
    { id: "gallery", label: "Gallery", icon: LayoutGrid },
    { id: "table", label: "Table", icon: List },
  ];

  return (
    <div className="mt-6">
      {/* View switcher tabs */}
      <div className="flex items-center gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = view === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setView(tab.id)}
              className={cn(
                "-mb-px inline-flex items-center gap-1.5 border-b-2 pb-2 font-heading text-sm transition-colors",
                active
                  ? "border-primary font-semibold text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-b border-border" />

      {/* Content */}
      <div className="mt-6 mb-4">
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No projects yet.</p>
        ) : view === "gallery" ? (
          <GalleryView rows={rows} />
        ) : (
          <TableView rows={rows} />
        )}
      </div>
    </div>
  );
}

function GalleryView({ rows }: { rows: ProjectRow[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {rows.map((row) => {
        const detailsHref = row.slug
          ? `/project-details/${row.slug}`
          : "#";
        return (
          <Link
            key={row.id}
            href={detailsHref}
            className="group flex flex-col overflow-hidden rounded-lg border border-border transition-colors hover:bg-accent"
          >
            {/* Cover */}
            {row.coverUrl ? (
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                  src={row.coverUrl}
                  alt={row.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className="flex aspect-video w-full items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklch, var(--primary) 80%, white), color-mix(in oklch, var(--secondary) 80%, white))",
                }}
              >
                <FolderOpen className="size-8 text-foreground/40" />
              </div>
            )}

            {/* Body */}
            <div className="flex flex-1 flex-col gap-2 p-3">
              <h3 className="font-heading text-sm font-medium">
                {row.name}
              </h3>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                {row.techStack.map((tech) => (
                  <Pill key={tech} color={tintFor(tech)}>
                    {tech}
                  </Pill>
                ))}
                {row.role && <Pill color={ROLE_TINT}>{row.role}</Pill>}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function TableView({ rows }: { rows: ProjectRow[] }) {
  const router = useRouter();

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            {["Name", "Tech", "Role", "Date", "Link"].map((col) => (
              <th
                key={col}
                className="px-3 py-2 text-left font-heading text-xs font-medium tracking-wide text-muted-foreground"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border font-sans">
          {rows.map((row) => {
            const detailsHref = row.slug
              ? `/project-details/${row.slug}`
              : "#";
            const navigate = () => {
              if (row.slug) router.push(detailsHref);
            };
            return (
              <tr
                key={row.id}
                role="link"
                tabIndex={0}
                onClick={navigate}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate();
                }}
                className="h-10 cursor-pointer transition-colors hover:bg-accent"
              >
                <td className="px-3 py-2 font-medium">
                  {row.name || "—"}
                </td>
                <td className="px-3 py-2">
                  {row.techStack.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {row.techStack.map((tech) => (
                        <Pill key={tech} color={tintFor(tech)}>
                          {tech}
                        </Pill>
                      ))}
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-3 py-2 text-muted-foreground">
                  {row.role ?? "—"}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">
                  {row.date ?? "—"}
                </td>
                <td className="px-3 py-2">
                  {row.url ? (
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="size-3.5" />
                      <span className="sr-only">Visit {row.name}</span>
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
