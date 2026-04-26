import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import Image from 'next/image'
import { Label } from '../ui/label'
import headerIcon from '@/public/header-icon.svg'


export default function Certifications() {

    const certifications = [
        {
            id: 1,
            name: "Cyber Security 101 Certificate",
            issuer: "TryHackMe",
            date: "Feb 2026 "
        },
        {
            id: 2,
            name: "Postman API Fundamentals Certificate",
            issuer: "Postman",
            date: "Dec 2025"
        },
        {
            id: 3,
            name: "Introduction to SQl",
            issuer: "Sololearn",
            date: "Dec 2025"
        },
        {
            id: 4,
            name: "Generative AI in Practice",
            issuer: "Sololearn",
            date: "Dec 2025"
        }
    ]
  return (
    <div className='w-full'>
        <Card className="">
        <CardHeader className="flex flex-row items-center">
          <div className="flex flex-col">
            <div className="flex flex-row space-x-2 items-center">
              <Image src={headerIcon} alt="Projects" className="size-5" />
              <Label className="text-base font-mono">Certifications</Label>
            </div>
           
          </div>
        </CardHeader>

         <CardContent>
            {certifications.map((cert) => (
                <div key={cert.id} className='mb-3 space-y-1 text-neutral-700 '>
                    <Label className='text-sm bg-primary'>{cert.name}</Label>
                    <Label className='text-sm'>{cert.issuer}</Label>
                    <Label className='text-sm'>Issued: {cert.date}</Label>
                </div>
            ))}
         </CardContent>

     
      </Card>
    </div>
  )
}
