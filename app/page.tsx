import Hero from "@/components/sections/hero";
import Image from "next/image";
import defaultBg from '@/public/default-bg.png'

export default function Home() {
  return (
    <div className="">
      <div className='relative w-full h-72'>
        <Image src={defaultBg} alt="Default Background" fill className='object-cover' />
      </div>

      <div className="mx-70">
<Hero />
      </div>
     
    </div>
  );
}
