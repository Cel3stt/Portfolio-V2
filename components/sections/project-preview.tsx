"use client";

import { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { urlFor } from "@/sanity/lib/image";

type SanityImage = { _key?: string; asset?: { _ref?: string; _id?: string } };

const LIMIT = 4;

function getDimensions(img: SanityImage): { width: number; height: number } {
  const ref = img.asset?._ref ?? img.asset?._id ?? "";
  const match = ref.match(/-(\d+)x(\d+)-/);
  if (match) {
    return { width: Number(match[1]), height: Number(match[2]) };
  }
  return { width: 1200, height: 900 };
}

export default function ProjectPreview({
  images,
  projectName,
}: {
  images: SanityImage[];
  projectName?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = expanded ? images : images.slice(0, LIMIT);
  const hidden = images.length - LIMIT;

  const openImage = openIndex !== null ? images[openIndex] : null;
  const openDims = openImage ? getDimensions(openImage) : null;
  const openSrc = openImage?.asset
    ? urlFor(openImage).width(1600).url()
    : null;

  return (
    <div className="mt-10">
      <Label className="bg-primary py-1 px-2 text-lg font-semibold">
        PREVIEW
      </Label>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visible.map((img, idx) => {
          const { width, height } = getDimensions(img);
          return (
            <button
              type="button"
              key={img._key ?? idx}
              onClick={() => setOpenIndex(idx)}
              aria-label={`View ${projectName ?? "Project"} preview ${idx + 1} at full size`}
              className="group overflow-hidden rounded-md border border-neutral-200 cursor-zoom-in transition-transform hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src={urlFor(img).url()}
                alt={`${projectName ?? "Project"} preview ${idx + 1}`}
                width={width}
                height={height}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-auto w-full transition-opacity group-hover:opacity-90"
              />
            </button>
          );
        })}
      </div>

      {hidden > 0 && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setExpanded((v) => !v)}
            className="bg-pink-200 border-black/40 hover:bg-pink-300 cursor-pointer"
          >
            {expanded ? "Show less" : `Show more (${hidden})`}
          </Button>
        </div>
      )}

      <Dialog
        open={openIndex !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setOpenIndex(null);
        }}
      >
        <DialogContent className="sm:max-w-5xl bg-black/90 border-none p-2 gap-2">
          <DialogTitle className="sr-only">
            {projectName ?? "Project"} preview
            {openIndex !== null ? ` ${openIndex + 1}` : ""}
          </DialogTitle>
          {openSrc && openDims && (
            <Image
              src={openSrc}
              alt={`${projectName ?? "Project"} preview ${(openIndex ?? 0) + 1}`}
              width={openDims.width}
              height={openDims.height}
              className="mx-auto h-auto max-h-[85vh] w-auto max-w-full object-contain"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
