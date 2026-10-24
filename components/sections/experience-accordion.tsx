"use client";

import React from "react";
import { Briefcase } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type Role = {
  key: string;
  jobTitle?: string;
  startDate?: string;
  endDate?: string;
  companyLocation?: string;
  jobDescription?: string;
  skills?: string[];
};

export type CompanyGroup = {
  companyName: string;
  roles: Role[];
};

function formatRange(start?: string, end?: string): string | null {
  if (start && end) return `${start} – ${end}`;
  return start ?? end ?? null;
}

export default function ExperienceAccordion({
  companies,
  firstRoleKey,
}: {
  companies: CompanyGroup[];
  firstRoleKey: string | null;
}) {
  if (companies.length === 0) {
    return (
      <p className="mt-6 text-sm text-muted-foreground">
        No experience added yet.
      </p>
    );
  }

  return (
    <Accordion
      type="multiple"
      defaultValue={firstRoleKey ? [firstRoleKey] : []}
      className="mt-6"
    >
      {companies.map((company) => (
        <div key={company.companyName} className="mb-2">
          {/* Company header */}
          <div className="flex items-center gap-2 pt-4">
            <Briefcase className="size-4 text-muted-foreground" />
            <h2 className="font-heading text-base font-semibold text-foreground">
              {company.companyName || "Unknown company"}
            </h2>
            {company.roles[0]?.companyLocation && (
              <span className="font-sans text-xs text-muted-foreground">
                {company.roles[0].companyLocation}
              </span>
            )}
          </div>

          {/* Roles */}
          {company.roles.map((role) => {
            const range = formatRange(role.startDate, role.endDate);
            const lines = (role.jobDescription ?? "")
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean);

            return (
              <AccordionItem key={role.key} value={role.key}>
                <AccordionTrigger className="py-3">
                  <div className="flex w-full items-center justify-between gap-3 pr-3">
                    <span className="font-heading text-sm font-medium text-foreground">
                      {role.jobTitle || "Untitled role"}
                    </span>
                    {range && (
                      <span className="shrink-0 font-sans text-xs text-muted-foreground">
                        {range}
                      </span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="font-sans">
                  {lines.length > 0 ? (
                    <div className="space-y-2">
                      {lines.map((line, i) => (
                        <p
                          key={i}
                          className="text-sm leading-relaxed text-foreground/80"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {role.skills && role.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {role.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-border px-2 py-0.5 font-sans text-xs text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </div>
      ))}
    </Accordion>
  );
}
