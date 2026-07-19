import React from "react";
import { Label } from "@/components/ui/label";
import PageHeading from "@/components/sections/page-heading";
import { sanityFetch } from "@/sanity/lib/live";
import {
  EXPERIENCE_QUERY,
  type ExperienceData,
  type ExperienceEntry,
} from "@/sanity/queries/sections";

export default async function ExperiencePage() {
  const { data } = await sanityFetch({ query: EXPERIENCE_QUERY });
  const experience = data as ExperienceData;
  const entries = experience?.experienceName ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      <PageHeading title="Experience" />

      {entries.length === 0 ? (
        <p className="text-sm text-neutral-600">No experience added yet.</p>
      ) : (
        entries.map((group: ExperienceEntry) => (
          <div
            key={group._key}
            className="mb-3 space-y-1 text-neutral-700 font-mono"
          >
            <Label className="text-sm font-semibold">{group.jobTitle} </Label>
            <Label className="text-xs font-medium"> - {group.companyName}</Label>
            <Label className="text-xs italic">
              {group.companyLocation} | {group.startDate} - {group.endDate}
            </Label>
            <Label className="text-xs pl-4 leading-relaxed text-neutral-600 mt-3">
              {" "}
              • {group.jobDescription}
            </Label>
          </div>
        ))
      )}
    </div>
  );
}
