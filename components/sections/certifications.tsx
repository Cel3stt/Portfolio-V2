import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import Image from 'next/image'
import { Label } from '../ui/label'
import headerIcon from '@/public/header-icon.svg'
import { sanityFetch } from '@/sanity/lib/live'



const CERTIFICATIONS_QUERY = `*[_type == 'certifications'][0]{
certificationName[]{
_key,
certificationName,
certificationIssuer,
certificationDate
}}`


export default async function Certifications() {

    const {data: certifications} = await sanityFetch({query: CERTIFICATIONS_QUERY});

   
  return (
    <div className='w-full'>
        <Card className="">
        <CardHeader className="flex flex-row items-center">
          <div className="flex flex-col">
            <div className="flex flex-row space-x-2 items-center">
              <Image src={headerIcon} alt="Projects" className="size-5" />
              <Label className="text-base font-heading">Certifications</Label>
            </div>
           
          </div>
        </CardHeader>

         <CardContent className='flex flex-col gap-4'>
            {certifications?.certificationName?.map((group: any) => (
                <div key={group._key} className='mb-3 space-y-1 text-neutral-700 '>
                    <Label className='text-md bg-primary'>{group.certificationName}</Label>
                    <Label className='text-sm'>{group.certificationIssuer}</Label>
                    <Label className='text-sm'>Issued: {group.certificationDate}</Label>
                </div>
            ))}
         </CardContent>

     
      </Card>
    </div>
  )
}
