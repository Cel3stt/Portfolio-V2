import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Label } from "../ui/label";
import headerIcon from "@/public/header-icon.svg";
import { Button } from "../ui/button";
import { sanityFetch } from "@/sanity/lib/live";


const CONTACTS_QUERY = `*[_type == 'contacts'][0]{
contacts[]{
_key,
contactType,
contactUrl
}
}`

export default async function Contact() {

  const {data: contacts} = await sanityFetch({query: CONTACTS_QUERY});

  return (
    <div className="w-full mt-3">
      <Card className="bg-[#FBF9F2]">
        <CardHeader className="flex flex-row items-center ">
          <div className="flex flex-col">
            <div className="flex flex-col space-x-2 items-center">
              <div className="flex-row flex gap-2">
                <Image src={headerIcon} alt="Projects" className="size-5" />
                <Label className="text-base font-heading">Contact</Label>
              </div>
              <div>
                <Label className="text-xs bg-primary text-neutral-600">Let's Connect!</Label>
              </div>
             
            </div>
          </div>
        </CardHeader>

        <div className="grid grid-cols-2 gap-1 items-center -mt-2 justify-center">
          {contacts?.contacts?.map((contact: any) => (
            <Button asChild variant={"outline"} key={contact._key} className="text-xs py-1">
              <a href={contact.contactUrl} target="_blank" rel="noopener noreferrer">
                {contact.contactType}
              </a>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
