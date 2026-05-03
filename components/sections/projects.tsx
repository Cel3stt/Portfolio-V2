import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Label } from '../ui/label'
import Image from 'next/image'
import headerIcon from '@/public/header-icon.svg'
import { Button } from '../ui/button'
import { ArrowUpDown, File } from 'lucide-react'
import projectFolder from '@/public/project-folder.svg'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'


const PROJECTS_QUERY = `*[_type == "project"] | order(_updatedAt desc) {
  _id,
  projectName,
  projectDescription,
  projectURL
}`

export default async function Projects() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });


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


           <CardContent className='grid grid-cols-2 gap-4 pb-4 sm:grid-cols-4'>
        {(projects as any[])?.map((item) => (
            <div key={item._id} className='flex flex-col items-center gap-2'>

                <Link href={item.projectURL ?? '#'} target='_blank' rel='noopener noreferrer' className='relative flex w-full items-center justify-center'>
                    <Image src={projectFolder} alt={item.projectName ?? 'Project'} className='h-auto w-full max-w-[200px]'/>
                    <span className='absolute max-w-[80%] truncate px-1 text-center text-sm font-medium'>{item.projectName}</span>
                </Link>

                <div className='flex w-full items-start gap-1.5 px-2'>
                    <File className='mt-0.5 size-3.5 shrink-0 text-neutral-600' />
                    <p className='min-w-0 flex-1 text-center text-xs leading-snug text-neutral-600 line-clamp-2'>{item.projectDescription}</p>
                </div>

                {item.projectURL && (
                <Button variant={'outline'} size={'xs'} asChild>
                    <a href={item.projectURL} target='_blank' rel='noopener noreferrer'>Visit</a>
                </Button>
                )}

            </div>
        ))}

           </CardContent>
        </Card>
    </div>
  )
}