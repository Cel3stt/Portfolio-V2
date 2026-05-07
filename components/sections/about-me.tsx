import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import defaultProfile from '@/public/default-profile.png'

const PROFILE_QUERY = defineQuery(`*[_id == "profile"][0]{
  profileImage,
  about
}`)

export default async function AboutMe() {

  const { data: profile } = await sanityFetch({ query: PROFILE_QUERY })

  if (!profile) {
    return null;
  }

  const profileImageSrc = profile.profileImage
    ? urlFor(profile.profileImage).width(280).height(280).url()
    : defaultProfile;



  return (
    <div className="flex flex-col">
      {profileImageSrc ? (
        <Image
          src={profileImageSrc}
          alt="Profile Image"
          className="w-full max-w-[280px] mx-auto h-auto"
          width={280}
          height={280}
        />
      ) : null}

      <Card className="flex flex-col mt-5">
        <Label className="bg-primary py-1 px-2 rounded-sm text-xl items-center justify-center flex">
          {" "}
          ABOUT ME
        </Label>

        <div>
          <Label className="text-xs font-mono font-light text-justify">
           {profile.about}
          </Label>
        </div>
      </Card>
    </div>
  );
}
