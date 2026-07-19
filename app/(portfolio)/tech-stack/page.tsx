import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import starIcon from "@/public/star-icon.svg";
import PageHeading from "@/components/sections/page-heading";
import { sanityFetch } from "@/sanity/lib/live";
import {
  TECHSTACK_QUERY,
  TECHNOLOGIES_QUERY,
  type TechStackData,
  type TechnologiesData,
  type TechnologyCategory,
} from "@/sanity/queries/sections";

export default async function TechStackPage() {
  const { data: stackData } = await sanityFetch({ query: TECHSTACK_QUERY });
  const { data: techData } = await sanityFetch({ query: TECHNOLOGIES_QUERY });

  const techstack = stackData as TechStackData;
  const technologies = techData as TechnologiesData;

  const stackItems = techstack?.techstack ?? [];
  const categories = technologies?.technologyCategory ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      <PageHeading title="Tech Stack" />

      <div className="flex flex-col">
        <Label className="bg-secondary py-1 px-2 rounded-sm items-center justify-center flex text-lg font-bold">
          {" "}
          TECH STACK
        </Label>

        {stackItems.length === 0 ? (
          <p className="mt-4 text-sm text-neutral-600">
            No tech stack added yet.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 mt-4 items-center justify-center">
            {stackItems.map((techstackItem: string) => (
              <Badge
                key={techstackItem}
                variant="outline"
                className="mr-1 text-md font-normal text-neutral-700"
              >
                <Image src={starIcon} alt="Star Icon" className="size-3" />
                {techstackItem}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <Label className="bg-secondary py-1 px-2 rounded-sm items-center justify-center flex text-lg font-bold">
          {" "}
          TOOLS / TECHNOLOGIES
        </Label>

        {categories.length === 0 ? (
          <p className="mt-4 text-sm text-neutral-600">
            No tools / technologies added yet.
          </p>
        ) : (
          <Card className="mt-3">
            {categories.map((group: TechnologyCategory) => (
              <div key={group._key} className="">
                <Label className="text-sm font-mono font-normal">
                  {group.technologyCategory}:
                </Label>
                <div className="mt-1 flex flex-wrap gap-2 space-x-1">
                  {group.technologyList?.map((item: string) => (
                    <Label
                      className="text-sm font-normal text-neutral-800 after:content-[','] last:after:content-['']"
                      key={`${group._key}-${item}`}
                    >
                      {item}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}
