import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import Image from 'next/image'
import { Label } from '../ui/label'
import headerIcon from '@/public/header-icon.svg'
import { sanityFetch } from '@/sanity/lib/live'



const EXPERIENCE_QUERY = `*[_type == 'experience'][0]{
experienceName[]{
_key,
companyName,
jobTitle,
startDate,
endDate,
companyLocation,
jobDescription
}
}`

export default async function Experience() {

  const {data: experience} = await sanityFetch({ query: EXPERIENCE_QUERY});

    
  return (
    <div className='w-full'>
      <Card className="">
        <CardHeader className="flex flex-row items-center">
          <div className="flex flex-col">
            <div className="flex flex-row space-x-2 items-center">
              <Image src={headerIcon} alt="Projects" className="size-5" />
              <Label className="text-base font-heading">Experience</Label>
            </div>
           
          </div>
        </CardHeader>

         <CardContent>
            {experience?.experienceName?.map((group: any) => (
                <div key={group._key} className='mb-3 space-y-1 text-neutral-700 font-mono'>
                    <Label className='text-sm font-semibold'>{group.jobTitle} </Label>
                    <Label className='text-xs font-medium'> - {group.companyName}</Label>
                    <Label className='text-xs italic'>{group.companyLocation} | {group.startDate} - {group.endDate}</Label>
                    <Label className='text-xs pl-4 leading-relaxed text-neutral-600 mt-3'> • {group.jobDescription}</Label>
                </div>
            ))}
            
         </CardContent>

     
      </Card>
    </div>
  )
}
