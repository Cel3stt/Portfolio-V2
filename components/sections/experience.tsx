import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import Image from 'next/image'
import { Label } from '../ui/label'
import headerIcon from '@/public/header-icon.svg'



export default function Experience() {

    const experience = [
        {
            id:1, 
            role: "Software Engineer Intern",
            company: "Tech Company",
            duration: "June 2025 - August 2025",
            description: "Designed and improved UI/UX for better usability."
        },
        {
            id:2, 
            role: "Frontend Developer Intern",  
            company: "Startup Inc.",
            duration: "Jan 2025 - May 2025",
            description: "Developed a e-commerce experience for showcasing coffee tools and machines."
        },
    ]
    
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
            {experience.map((exp) => (
                <div key={exp.id} className='mb-3 space-y-1 text-neutral-700 font-mono'>
                    <Label className='text-sm font-semibold'>{exp.role} </Label>
                    <Label className='text-xs font-medium'> - {exp.company}</Label>
                    <Label className='text-xs italic'>{exp.duration}</Label>
                    <Label className='text-xs pl-4 leading-relaxed text-neutral-600 mt-3'> • {exp.description}</Label>
                </div>
            ))}
            
         </CardContent>

     
      </Card>
    </div>
  )
}
