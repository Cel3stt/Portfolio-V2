import Image from "next/image";
import projectBg from "@/public/project-bg.svg";
import icon from "@/public/details-avatar.svg";
import { Label } from "@/components/ui/label";
import { CalendarDays, Cpu, User } from "lucide-react";

export default function ProjectDetails() {
  const details = [
    { icon: CalendarDays, label: "Created", value: "Sep 2025 - Mar 2026" },
    {
      icon: Cpu,
      label: "Tech Stack",
      value: "Laravel | React Native | React Typescript",
    },
    {
      icon: User,
      label: "Role",
      value: "Lead Frontend Developer & UI/UX Specialist",
    },
  ];

  return (
    <div>
      <div>
        <div className="relative w-full h-48 sm:h-60 md:h-72">
          <Image
            src={projectBg}
            alt="Default Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-40">
          <Image src={icon} alt="Project Icon" width={80} height={80} />

          <div className="mt-5">
            <Label className="text-4xl font-bold font-mono text-neutral-800">HYDRONEW</Label>
          </div>

          <div className="mt-7 max-w-4xl space-y-4">
            {details.map((item) => (
              <div
                key={item.label}
                className="flex flex-wrap items-center gap-y-2 sm:flex-nowrap sm:gap-8"
              >
                <div className="flex w-40 shrink-0 items-center gap-2 text-neutral-600">
                  <item.icon size={16} />
                  <Label className="font-bold">{item.label}</Label>
                </div>
                <Label className="font-bold text-neutral-800">{item.value}</Label>
              </div>
            ))}
          </div>

          

          <div className="mt-10">
            <Label className="bg-primary py-1 px-2 text-lg font-semibold">Project Overview</Label>

            <Label className="mt-3 text-justify leading-normal indent-7">
              To develop Hydronew, a smart, IoT-integrated Microbial Fuel Cell (MFC) and multi-stage filtration system that efficiently treats organic greywater for safe reuse in hydroponic farming, utilizing a Random Forest Regression algorithm to predict treatment efficiency and ensure water quality standards are met for sustainable crop production.
            </Label>
          </div>


          {/* --- IMAGES -------------------------------------------------------- */}

          <div className="mt-10">
          <Label className="bg-primary py-1 px-2 text-lg font-semibold">PREVIEW</Label>

          </div>


          {/* --- FEATURES -------------------------------------------------------- */}

          <div className="mt-10">
          <Label className="bg-primary py-1 px-2 text-lg font-semibold">FEATURES</Label>

          

          </div>

        </div>
      </div>
    </div>
  );
}
