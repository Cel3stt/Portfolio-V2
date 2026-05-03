import React from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";


const TOOLS_QUERY = defineQuery(`*[_id == "technologies"][0]{
  technologyCategory[]{
    _key,
    technologyCategory,
    technologyList
  }
}`)

export default async function Tools() {

  const { data: technologies } = await sanityFetch({ query: TOOLS_QUERY });
 
  return (
    <div className="mt-8">
      <Label className="bg-secondary py-1 px-2 rounded-sm  items-center justify-center flex text-lg font-bold    ">
        {" "}
        TOOLS / TECHNOLOGIES
      </Label>

      <Card className="mt-3">
        {technologies?.technologyCategory?.map(
          (group) => (
            <div key={group._key}>
              <Label className="text-sm font-mono font-normal">
                {group.technologyCategory}:
              </Label>
              <div className="mt-1 flex flex-wrap gap-2">
                {group.technologyList?.map((item) => (
                  <Label
                    className="text-sm font-normal text-neutral-800 after:content-[','] last:after:content-['']"
                    key={`${group._key}-${item}`}
                  >
                    {item}
                  </Label>
                ))}
              </div>
            </div>
          ),
        )}
      </Card>
    </div>
  );
}
