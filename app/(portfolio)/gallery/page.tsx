import React from "react";
import Image from "next/image";
import Link from "next/link";
import { File } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import galleryBg from "@/public/gallery-bg.svg";
import PageHeading from "@/components/sections/page-heading";
import { sanityFetch } from "@/sanity/lib/live";
import { GALLERY_QUERY, type GalleryCard } from "@/sanity/queries/sections";

export default async function GalleryPage() {
  const { data } = await sanityFetch({ query: GALLERY_QUERY });
  const gallery = (data as GalleryCard[]) ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      <PageHeading
        title="Gallery"
        subtitle="A collection experiments, events, and personal life."
      />

      {gallery.length === 0 ? (
        <p className="text-sm text-neutral-600">No gallery items yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.map((item) => {
            const detailsHref = item.slug ? `/gallery/${item.slug}` : "#";
            return (
              <Link key={item._id} href={detailsHref}>
                <Card className="rounded-lg flex-col items-center justify-center transition-colors hover:bg-accent">
                  <Image
                    src={galleryBg}
                    alt={item.galleryTitle ?? "Gallery"}
                    className="p-1"
                  />

                  <div className="items-center justify-center -mt-4 text-neutral-700">
                    <Button variant={"ghost"} className="text-sm" asChild>
                      <span>
                        <File /> {item.galleryTitle}
                      </span>
                    </Button>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
