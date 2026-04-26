import Image from "next/image";
import React from "react";
import defaultProfile from "@/public/default-profile.png";
import { Card } from "../ui/card";
import { Label } from "../ui/label";

export default function AboutMe() {
  return (
    <div className="flex flex-col">
      <Image
        src={defaultProfile}
        alt="Default Profile"
        className="w-full max-w-[280px] mx-auto h-auto"
      />

      <Card className="flex flex-col mt-5">
        <Label className="bg-primary py-1 px-2 rounded-sm text-xl items-center justify-center flex">
          {" "}
          ABOUT ME
        </Label>

        <div>
          <Label className="text-xs font-mono font-light text-justify">
            I’m a frontend developer and UI/UX specialist passionate about
            building intuitive and visually engaging digital experiences. I
            focus on creating web and mobile applications using modern
            technologies. Currently, I’m continuously improving my skills in
            frontend development, exploring new UI frameworks, and working on
            projects that combine functionality with great user experience.
          </Label>
        </div>
      </Card>
    </div>
  );
}
