import Hero from "@/components/sections/hero";
import Image from "next/image";
import defaultBg from "@/public/default-bg.png";
import AboutMe from "@/components/sections/about-me";
import Projects from "@/components/sections/projects";
import BuildTracker from "@/components/sections/build-tracker";

export default function Home() {
  return (
    <div>
      <div className="relative w-full h-72">
        <Image
          src={defaultBg}
          alt="Default Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-40">
        <Hero />

        <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-4">
          <div className="md:col-span-1">
            <AboutMe />
          </div>

          <div className="md:col-span-3 space-y-4">
            <Projects />
            <BuildTracker/>
          </div>
        </div>
      </div>
    </div>
  );
}
