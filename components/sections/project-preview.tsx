"use client";

import { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";

type SanityImage = { _key?: string; asset?: { _ref?: string; _id?: string } };

const LIMIT = 4;

export default function ProjectPreview({
  images,
  projectName,
}: {
  images: SanityImage[];
  projectName?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? images : images.slice(0, LIMIT);
  const hidden = images.length - LIMIT;

  return (
    <div className="mt-10">
      <Label className="bg-primary py-1 px-2 text-lg font-semibold">
        PREVIEW
      </Label>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {visible.map((img, idx) => (
          <div
            key={img._key ?? idx}
            className="relative aspect-video w-full overflow-hidden rounded-md border border-neutral-200"
          >
            <Image
              src={urlFor(img).url()}
              alt={`${projectName ?? "Project"} preview ${idx + 1}`}
              fill
            />
          </div>
        ))}
      </div>

      {hidden > 0 && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setExpanded((v) => !v)}
            className="bg-pink-200 border-black/40 hover:bg-pink-300 cursir-pointer"
          >
            {expanded ? "Show less" : `Show more (${hidden})`}
          </Button>
        </div>
      )}
    </div>
  );
}
