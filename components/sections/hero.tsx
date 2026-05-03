import Image from "next/image";
import defaultAvatar from "@/public/default-avatar.png";
import { Label } from "../ui/label";
import butterfly from "@/public/butterfly.png";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";



const HERO_QUERY = `*[_type == 'hero'][0]{
avatarImage,
subtitle,
welcomeMessage
}`

export default async function Hero() {


  const { data: hero } = await sanityFetch({ query: HERO_QUERY });

  const avatarSrc =
    hero?.avatarImage?.asset
      ? urlFor(hero.avatarImage).width(200).height(200).url()
      : defaultAvatar;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
        <Image
          src={avatarSrc}
          alt="Avatar"
          width={100}
          height={100}
          className="sm:-mt-14 z-10"
        />

        

        <div className="flex-col items-center mt-2">
          <div className="flex flex-row gap-3">
            <Label className="text-3xl sm:text-4xl md:text-5xl font-light font-heading">
              Hi, I'm{" "}
              <span className="ml-2 inline-block font-cursive">Celest</span>
            </Label>
            <Image
              src={butterfly}
              alt="Butterfly"
              className="hidden sm:block w-8 h-auto mb-5"
            />
          </div>
          <Label className="text-lg font-light -mt-1 mb-2">
            {hero.subtitle}
          </Label>
        </div>
      </div>
      <Label className=" bg-primary py-1.5 px-2 rounded-sm font-mono font-light text-xs">
        {hero.welcomeMessage}

      </Label>
    </div>
  );
}
