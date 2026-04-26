import React from "react";
import { Card, CardHeader } from "../ui/card";
import Image from "next/image";
import { Label } from "../ui/label";
import galleryIcon from "@/public/gallery-icon.svg";
import galleryBg from "@/public/gallery-bg.svg";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import galleryDesign from '@/public/gallery-design.svg';
export default function Gallery() {
  const galleryItems = [
    {
      id: 1,
      name: "HydroNew Prototype",
    },
    {
      id: 2,
      name: "Research Conference for our Thesis",
    },
    {
      id: 3,
      name: "Codify",
    },
    {
      id: 4,
      name: "Computer Science Council",
    },
  ];
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
              A collection of UI, experiments, and random builds.
            </Label>
          </div>

          <div className="flex-row flex justify-between items-center ml-auto">
            <Image src={galleryDesign} alt="Gallery Design" className="size-24" />
          </div>
        </CardHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 -mt-3">
          {galleryItems.map((item) => (
            <Card
              key={item.id}
              className="rounded-lg flex-col items-center justify-center "
            >
              <Image src={galleryBg} alt={item.name} className=" p-1" />

              <div className="items-center justify-center -mt-4 text-neutral-700">
                <Button variant={"ghost"} className="text-sm ">
                  <File /> {item.name}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
