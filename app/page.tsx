import Hero from "@/components/sections/hero";
import Image from "next/image";
import defaultBg from "@/public/default-bg.png";
import AboutMe from "@/components/sections/about-me";
import Projects from "@/components/sections/projects";
import BuildTracker from "@/components/sections/build-tracker";
import TechStack from "@/components/sections/tech-stack";
import Tools from "@/components/sections/tools";
import Experience from "@/components/sections/experience";
import Certifications from "@/components/sections/certifications";
import Contact from "@/components/sections/contact";
import Gallery from "@/components/sections/gallery";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div>
      <div className="relative w-full h-48 sm:h-60 md:h-72">
        <Image
          src={defaultBg}
          alt="Default Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-40">
        <Hero />

        <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-4 m-0 sm:m-4">
          <div className="md:col-span-1">
            <AboutMe />
            <TechStack />
            <Tools/>  
          </div>

          <div className="md:col-span-3 space-y-4">
            <Projects />
            <BuildTracker/>

            <div className="flex flex-col lg:flex-row gap-4">
         <div className="w-full">
                 <Experience />
                                  <Contact />
                                  </div>


             
              <div className="flex flex-col w-full lg:w-3/4 gap-4">
                   <Certifications />
                           

                           
              </div>
             </div>
          </div>

       
        </div>

           <div className="">
            <Gallery/>
          </div>

          <Footer/>
          
      </div>
    </div>
  );
}
