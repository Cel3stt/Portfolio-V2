import React from "react";
import Link from "next/link";
import { Briefcase, GraduationCap } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import {
  EXPERIENCE_QUERY,
  type ExperienceData,
  type ExperienceEntry,
  type EducationEntry,
} from "@/sanity/queries/sections";
import ExperienceAccordion, {
  type CompanyGroup,
} from "@/components/sections/experience-accordion";

function formatRange(start?: string, end?: string): string | null {
  if (start && end) return `${start} – ${end}`;
  return start ?? end ?? null;
}

export default async function ExperiencePage() {
  const { data } = await sanityFetch({ query: EXPERIENCE_QUERY });
  const experience = data as ExperienceData;
  const entries = experience?.experienceName ?? [];
  const education = experience?.educationList ?? [];

  // Group roles by companyName, preserving first-appearance order.
  const companies: CompanyGroup[] = [];
  const indexByCompany = new Map<string, number>();

  for (const entry of entries as ExperienceEntry[]) {
    const companyName = entry.companyName ?? "";
    const role = {
      key: entry._key,
      jobTitle: entry.jobTitle,
      startDate: entry.startDate,
      endDate: entry.endDate,
      companyLocation: entry.companyLocation,
      jobDescription: entry.jobDescription,
      skills: entry.skills,
    };

    const existing = indexByCompany.get(companyName);
    if (existing === undefined) {
      indexByCompany.set(companyName, companies.length);
      companies.push({ companyName, roles: [role] });
    } else {
      companies[existing].roles.push(role);
    }
  }

  const firstRoleKey = companies[0]?.roles[0]?.key ?? null;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          Home
        </Link>
        <span aria-hidden>/</span>
        <span className="text-foreground">Experience</span>
      </nav>

      {/* Title */}
      <div className="mt-3 flex items-center gap-2.5">
        <Briefcase className="size-6 text-muted-foreground" />
        <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
          Experience
        </h1>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        Where Celest has worked and studied.
      </p>

      {/* Divider */}
      <div className="mt-6 border-b border-border" />

      <ExperienceAccordion companies={companies} firstRoleKey={firstRoleKey} />

      {/* Education */}
      {education.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="size-5 text-muted-foreground" />
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Education
            </h2>
          </div>

          <div className="mt-6 flex flex-col gap-6">
            {(education as EducationEntry[]).map((edu) => {
              const range = formatRange(edu.startDate, edu.endDate);
              return (
                <div key={edu._key} className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="font-heading text-sm font-semibold text-foreground">
                      {edu.schoolName || "Unknown school"}
                    </h3>
                    {range && (
                      <span className="font-sans text-xs text-muted-foreground">
                        {range}
                      </span>
                    )}
                  </div>
                  {edu.degree && (
                    <p className="font-sans text-sm text-muted-foreground">
                      {edu.degree}
                    </p>
                  )}
                  {edu.awards && edu.awards.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {edu.awards.map((award) => (
                        <span
                          key={award}
                          className="rounded-full border border-border px-2 py-0.5 font-sans text-xs text-muted-foreground"
                        >
                          {award}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
