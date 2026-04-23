import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Label } from '../ui/label'
import Image from 'next/image'
import headerIcon from '@/public/header-icon.svg'
import { Button } from '../ui/button'
import { ArrowUpDown } from 'lucide-react'
import projectFolder from '@/public/project-folder.svg'

const projects = [
    {
        id: 1,
        projectName: "Project 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. .",
        website: "example.com/project1"
    },
    {
        id: 2,
        projectName: "Project 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. .",
        website: "example.com/project2"
    },
    {
        id: 3,
        projectName: "Project 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. .",
        website: "example.com/project3"
    },
    {
        id: 4,
        projectName: "Project 4",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. .",
        website: "example.com/project4"
    }
]

export default function Projects() {
  return (
    <div className=''>

        <Card className=''>
            <CardHeader className='flex flex-row items-center'> 
               
             <div className='flex flex-col'>
                   <div className="flex flex-row space-x-2 items-center">
                    <Image src={headerIcon} alt="Projects" className='size-6'/>
                    <Label className='text-lg font-mono'>Projects</Label>
                </div>
                <Label className='font-heading font-extralight text-neutral-600 text-xs ml-8'>Click each folder to view the details of the project</Label>
             </div>

             <div className='flex-row flex'>
                <Button variant="outline" size="sm" className='ml-auto'>
                    <ArrowUpDown className='font-bold text-neutral-700' />
                </Button>

                <Button className='bg-[#2783DE] text-white  hover:bg-blue-400 rounded-sm px-3 py-1 ml-2'>
                    View All
                </Button>
             </div>

            </CardHeader>


           <CardContent className='flex flex-row'>
        {projects.map((project) => (
            <div key={project.id} className='space-x-5'>
                
                <div className='relative flex items-center justify-center'>
                    <Image src={projectFolder} alt={project.projectName} className=''/>
                   <Label className='text-sm font-medium absolute'>{project.projectName}</Label>

                </div>
                <CardContent>
                    <Label className='text-xs text-muted-foreground'>{project.description}</Label>
                </CardContent>
            </div> 
            
        ))}

           </CardContent>
        </Card>
    </div>
  )
}