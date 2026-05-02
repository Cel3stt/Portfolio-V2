import React from "react";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import starIcon from "@/public/star-icon.svg";
import Image from "next/image";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";


const TECHSTACK_QUERY = defineQuery(`*[_id == "techstack"][0]{
  techstack
}`)

export default async function TechStack() {
  const {data: techstack} = await sanityFetch({ query: TECHSTACK_QUERY})
  return (
    <div>
      <div className="flex flex-col mt-5">
        <Label className="bg-secondary py-1 px-2 rounded-sm  items-center justify-center flex text-lg font-bold    ">
          {" "}
          TECH STACK
        </Label>

        <div className="flex flex-wrap gap-2 mt-4 items-center justify-center">
          {techstack?.techstack?.map((techstackItem: string) => (
            <Badge key={techstackItem} variant="outline" className=" mr-1 text-md font-normal text-neutral-700">
              <Image src={starIcon} alt="Star Icon" className="size-3" />
              {techstackItem}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
