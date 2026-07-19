import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PageHeading from "@/components/sections/page-heading";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  RECOMMENDATIONS_QUERY,
  type RecommendationsData,
  type Recommendation,
} from "@/sanity/queries/sections";

export default async function RecommendationsPage() {
  const { data } = await sanityFetch({ query: RECOMMENDATIONS_QUERY });
  const recommendations = data as RecommendationsData;
  const list = recommendations?.recommendationList ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      <PageHeading
        title="Recommendations"
        subtitle="Kind words from people I've worked with."
      />

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
          <Label className="text-base font-heading text-neutral-700">
            Coming soon
          </Label>
          <p className="text-sm text-neutral-600">No recommendations yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {list.map((rec: Recommendation) => (
            <Card key={rec._key}>
              <CardContent className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-3">
                  {rec.recommenderImage && (
                    <Image
                      src={urlFor(rec.recommenderImage).width(96).height(96).url()}
                      alt={rec.recommenderName ?? "Recommender"}
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover"
                    />
                  )}
                  <div className="flex flex-col">
                    <Label className="text-sm font-semibold text-neutral-800">
                      {rec.recommenderName}
                    </Label>
                    <Label className="text-xs text-neutral-600">
                      {rec.recommenderTitle}
                      {rec.recommenderCompany
                        ? ` — ${rec.recommenderCompany}`
                        : ""}
                    </Label>
                  </div>
                </div>

                {rec.recommendationText && (
                  <p className="text-sm leading-relaxed text-neutral-700">
                    {rec.recommendationText}
                  </p>
                )}

                {rec.recommendationUrl && (
                  <Button variant={"outline"} size={"xs"} asChild>
                    <a
                      href={rec.recommendationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
