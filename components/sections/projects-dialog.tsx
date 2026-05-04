"use client"

import React from "react"
import { File } from "lucide-react"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"


interface ProjectsDialogProps {
    projectlist: any[]
}

export default function ProjectsDialog({ projectlist }: ProjectsDialogProps){

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#2783DE] text-white hover:bg-blue-400 rounded-sm px-3 py-1 ml-2">
                    View All
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>All Projects</DialogTitle>
                    <DialogDescription>
                        A complete list of my projects.
                    </DialogDescription>
                </DialogHeader>

                <ul className="flex max-h-[60vh] flex-col gap-3 overflow-y-auto pr-1">
                    {projectlist?.map((item) => (
                        <li
                            key={item._id}
                            className="flex flex-col gap-1 rounded-md border border-border p-3"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium">
                                    {item.projectName ?? "Untitled project"}
                                </span>
                                {item.projectURL && (
                                    <Button variant="outline" size="xs" asChild>
                                        <a
                                            href={item.projectURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Visit
                                        </a>
                                    </Button>
                                )}
                            </div>
                            {item.projectDescription && (
                                <div className="flex items-start gap-1.5">
                                    <File className="mt-0.5 size-3.5 shrink-0 text-neutral-600" />
                                    <p className="min-w-0 flex-1 text-xs leading-snug text-neutral-600">
                                        {item.projectDescription}
                                    </p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </DialogContent>
        </Dialog>
    )
}
