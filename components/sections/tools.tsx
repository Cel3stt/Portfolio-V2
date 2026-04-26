import React from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Car } from "lucide-react";

export default function Tools() {
  const tools = [
    {
      category: "Libraries",
      items: [
        "Material-UI",
        "Shadcn",
        "Radix-UI",
        "Daisy UI",
        "React Native Reusables UI",
      ],
    },
    {
      category: "Development Tools",
      items: ["Git", "VS Code", "Postman", "Figma"],
    },
    { category: "Project Management Tools", items: ["Trello", "Notion"] },
  ];
  return (
    <div className="mt-5">
      <Label className="bg-secondary py-1 px-2 rounded-sm  items-center justify-center flex text-lg font-bold    ">
        {" "}
        TOOLS / TECHNOLOGIES
      </Label>

      <Card className="mt-3">
        {tools.map((group) => (
          <div key={group.category}>
            <Label className="text-sm font-mono font-normal">
              {group.category}:
            </Label>
            <div className="mt-1 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Label className="text-sm font-normal text-neutral-800 after:content-[','] last:after:content-['']" key={item}>
                  {item}
                </Label>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
