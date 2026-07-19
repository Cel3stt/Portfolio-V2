import React from "react";
import Image from "next/image";
import { Label } from "../ui/label";
import headerIcon from "@/public/header-icon.svg";

type PageHeadingProps = {
  title: string;
  subtitle?: string;
};

export default function PageHeading({ title, subtitle }: PageHeadingProps) {
  return (
    <div className="mb-8 flex flex-col">
      <div className="flex flex-row items-center space-x-2">
        <Image src={headerIcon} alt={title} className="size-6" />
        <h1>
          <Label className="text-2xl font-heading">{title}</Label>
        </h1>
      </div>
      {subtitle && (
        <Label className="ml-8 text-xs font-heading font-extralight text-neutral-600">
          {subtitle}
        </Label>
      )}
    </div>
  );
}
