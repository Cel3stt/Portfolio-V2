import React from "react";
import { Card, CardHeader } from "../ui/card";
import Image from "next/image";
import { Label } from "../ui/label";
import galleryIcon from "@/public/gallery-icon.svg";
import galleryBg from "@/public/gallery-bg.svg";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import galleryDesign from '@/public/gallery-design.svg';
import { sanityFetch } from "@/sanity/lib/live";
import Link from "next/link";









const GALLERY_QUERY = `*[_type == "gallery"]{
  _id,
  "slug": coalesce(slug.current, _id),
  galleryTitle,
  galleryDescription
}`;

export default async function Gallery() {

  const {data: gallery} = await sanityFetch({ query: GALLERY_QUERY });


  return (
    <div className="w-full">
      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-col">
            <div className="flex flex-row space-x-2 items-center">
              <Image src={galleryIcon} alt="Gallery" className="size-6" />
              <Label className="text-lg font-cursive">Gallery</Label>
            </div>
            <Label className="bg-primary font-heading font-extralight text-neutral-600 text-xs ml-8">
              A collection experiments, events, and personal life.
            </Label>
          </div>

          <div className="flex-row flex justify-between items-center ml-auto">
            <Image src={galleryDesign} alt="Gallery Design" className="size-24" />
          </div>
        </CardHeader>

   

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 -mt-3">
          {gallery.map((item: any) => {
            const detailsHref = item.slug ? `/gallery/${item.slug}` : "#";
            return (
              <Link key={item._id} href={detailsHref}>
                <Card className="rounded-lg flex-col items-center justify-center transition-colors hover:bg-accent">
                  <Image src={galleryBg} alt={item.galleryTitle} className=" p-1" />

                  <div className="items-center justify-center -mt-4 text-neutral-700">
                    <Button variant={"ghost"} className="text-sm " asChild>
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
      </Card>
    </div>
  );
}
