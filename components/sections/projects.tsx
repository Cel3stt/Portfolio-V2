import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Label } from '../ui/label'
import Image from 'next/image'
import headerIcon from '@/public/header-icon.svg'
import { Button } from '../ui/button'
import { ArrowUpDown, File } from 'lucide-react'
import projectFolder from '@/public/project-folder.svg'
import Link from 'next/link'

const projects = [
    {
        id: 1,
        projectName: "Project 1",
        subtitle: "Lorem ipsum egdgbbagdg.",
        website: "example.com/project1"
    },
    {
        id: 2,
        projectName: "Project 2",
        subtitle: "Lorem ipsum ",
        website: "example.com/project2"
    },
    {
        id: 3,
        projectName: "Project 3",
        subtitle: "Lorem ipsum ",
        website: "example.com/project3"
    },
    {
        id: 4,
        projectName: "Project 4",
        subtitle: "Lorem ipsum .",
        website: "example.com/project4"
    }
]

export default function Projects() {
  return (
    <div className=''>

        <Card className=''>
            <CardHeader className='flex flex-col gap-2 sm:flex-row sm:items-center'> 
               
             <div className='flex flex-col'>
                   <div className="flex flex-row space-x-2 items-center">
                    <Image src={headerIcon} alt="Projects" className='size-6'/>
                    <Label className='text-lg font-mono'>Projects</Label>
                </div>
                <Label className='font-heading font-extralight text-neutral-600 text-xs ml-8'>Click each folder to view the details of the project</Label>
             </div>

             <div className='flex-row flex justify-between items-center ml-auto'>
                <Button variant="outline" size="sm" className='ml-auto'>
                    <ArrowUpDown className='font-bold text-neutral-700' />
                </Button>

                <Button className='bg-[#2783DE] text-white  hover:bg-blue-400 rounded-sm px-3 py-1 ml-2'>
                    View All
                </Button>
             </div>

            </CardHeader>


           <CardContent className='flex flex-nowrap gap-4 overflow-x-auto pb-2'>
        {projects.map((project) => (
            <div key={project.id} className='flex flex-col items-start gap-2 sm:items-center'>
                
                <Link href={''} className='relative flex items-center justify-center'>
                    <Image src={projectFolder} alt={project.projectName} className=''/>
                   <Label className='text-sm font-medium absolute'>{project.projectName}</Label>

                </Link>
                <Button variant={'ghost'} className='  '>
                    <File className='mt-0.5 shrink-0 text-neutral-600 ' />
                    <Label className='min-w-0 whitespace-normal text-neutral-600 wrap-break-word text-left'>{project.subtitle}</Label>
                </Button>

                <div className='mt-1 items-center flex'>
                       <Button variant={'outline'} size={'xs'}>{project.website}</Button>
                </div>
                 
             
            </div> 
            
        ))}

           </CardContent>
        </Card>
    </div>
  )
}