import React from "react";
import { Label } from "@/components/ui/label";
import PageHeading from "@/components/sections/page-heading";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CERTIFICATIONS_QUERY,
  type CertificationsData,
  type Certification,
} from "@/sanity/queries/sections";

export default async function CertificationsPage() {
  const { data } = await sanityFetch({ query: CERTIFICATIONS_QUERY });
  const certifications = data as CertificationsData;
  const entries = certifications?.certificationName ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      <PageHeading title="Certifications" />

      {entries.length === 0 ? (
        <p className="text-sm text-neutral-600">No certifications yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {entries.map((group: Certification) => (
            <div
              key={group._key}
              className="mb-3 space-y-1 text-neutral-700"
            >
              <Label className="text-md bg-primary">
                {group.certificationName}
              </Label>
              <Label className="text-sm">{group.certificationIssuer}</Label>
              <Label className="text-sm">
                Issued: {group.certificationDate}
              </Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
