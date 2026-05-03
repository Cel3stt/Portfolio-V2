import Image from "next/image";
import projectBg from "@/public/project-bg.svg";

export default function ProjectDetails() {
  return (
    <div>
      <div className="relative w-full h-48 sm:h-60 md:h-72">
        <Image
          src={projectBg}
          alt="Project Background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
