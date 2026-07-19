import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PageHeading from "@/components/sections/page-heading";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  GEAR_QUERY,
  type GearData,
  type GearCategory,
  type GearItem,
} from "@/sanity/queries/sections";

export default async function GearPage() {
  const { data } = await sanityFetch({ query: GEAR_QUERY });
  const gear = data as GearData;
  const categories = gear?.gearCategory ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      <PageHeading
        title="Gear"
        subtitle="The tools and hardware I use day to day."
      />

      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
          <Label className="text-base font-heading text-neutral-700">
            Coming soon
          </Label>
          <p className="text-sm text-neutral-600">No gear added yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {categories.map((category: GearCategory) => (
            <div key={category._key} className="flex flex-col gap-3">
              <Label className="bg-secondary py-1 px-2 rounded-sm flex items-center text-lg font-bold">
                {category.categoryName}
              </Label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {category.gearList?.map((item: GearItem) => (
                  <Card key={item._key}>
                    <CardContent className="flex flex-row items-start gap-3">
                      {item.gearImage && (
                        <Image
                          src={urlFor(item.gearImage).width(120).height(120).url()}
                          alt={item.gearName ?? "Gear"}
                          width={60}
                          height={60}
                          className="size-16 rounded-md object-cover"
                        />
                      )}
                      <div className="flex flex-col gap-1">
                        <Label className="text-sm font-semibold text-neutral-800">
                          {item.gearName}
                        </Label>
                        {item.gearDescription && (
                          <p className="text-xs leading-snug text-neutral-600">
                            {item.gearDescription}
                          </p>
                        )}
                        {item.gearUrl && (
                          <Button variant={"outline"} size={"xs"} asChild>
                            <a
                              href={item.gearUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
