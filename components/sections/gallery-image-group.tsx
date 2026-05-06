"use client";

import { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { urlFor } from "@/sanity/lib/image";

type SanityImage = {
  _key?: string;
  asset?: {
    _ref?: string;
    _id?: string;
    metadata?: { dimensions?: { width?: number; height?: number } };
  };
};

interface GalleryImageGroupProps {
  imageTitle?: string;
  images?: SanityImage[];
  groupAlt?: string;
}

const VISIBLE_LIMIT = 4;

export default function GalleryImageGroup({
  imageTitle,
  images,
  groupAlt,
}: GalleryImageGroupProps) {
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const all = images ?? [];
  const visible = expanded ? all : all.slice(0, VISIBLE_LIMIT);
  const hiddenCount = Math.max(0, all.length - VISIBLE_LIMIT);
  const openImage = openIndex !== null ? all[openIndex] : null;
  const openDims = openImage?.asset?.metadata?.dimensions;
  const openWidth = openDims?.width ?? 1600;
  const openHeight = openDims?.height ?? 1200;
  const openSrc = openImage?.asset
    ? urlFor(openImage).width(1600).url()
    : null;

  return (
    <div className="mt-6">
      <Label className="block text-lg font-mono font-semibold text-neutral-700 bg-blue-100 indent-5">
        {imageTitle}
      </Label>
      <div className="my-3 border-t border-neutral-200" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {visible.map((image, index) => {
          if (!image?.asset) return null;
          const src = urlFor(image).width(800).height(800).fit("crop").url();
          return (
            <button
              type="button"
              key={image._key ?? index}
              onClick={() => setOpenIndex(index)}
              aria-label={`View ${groupAlt ?? imageTitle ?? "image"} ${index + 1} at full size`}
              className="group relative aspect-square overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 cursor-zoom-in transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src={src}
                alt={`${groupAlt ?? imageTitle ?? "Image"} ${index + 1}`}
                fill
                className="object-cover transition-opacity group-hover:opacity-90"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
            </button>
          );
        })}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setExpanded((v) => !v)}
            className="bg-rose-100 border-black/20 border-2"
          >
            {expanded ? "Show less" : `Show more (${hiddenCount})`}
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
            {imageTitle ?? "Image"}
            {openIndex !== null ? ` ${openIndex + 1}` : ""}
          </DialogTitle>
          {openSrc && (
            <Image
              src={openSrc}
              alt={`${groupAlt ?? imageTitle ?? "Image"} ${(openIndex ?? 0) + 1}`}
              width={openWidth}
              height={openHeight}
              className="mx-auto h-auto max-h-[85vh] w-auto max-w-full object-contain"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
