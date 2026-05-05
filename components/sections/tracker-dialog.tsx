import React from 'react'
import { Dialog, DialogTrigger, DialogContent,DialogTitle,DialogDescription, DialogHeader} from '../ui/dialog'
import { Button } from '../ui/button'
import { ToolCase } from 'lucide-react'


interface BuildTrackerItem {
    _id: string
    taskName?: string
    techstackUsed?: string[]
    status?: string
}

interface BuildTrackerDialogProps {
    trackerList: BuildTrackerItem[]
}


export default function TrackerDialog({ trackerList }: BuildTrackerDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#2783DE] text-white hover:bg-blue-400 rounded-sm px-3 py-1 ml-2">
                    View All
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>All Current Builds</DialogTitle>
                    <DialogDescription>
                        A complete list of my current builds.
                    </DialogDescription>
                </DialogHeader>

                <ul className="flex max-h-[60vh] flex-col gap-3 overflow-y-auto pr-1">
                    {trackerList?.map((item) => (
                        <li
                            key={item._id}
                            className="flex flex-col gap-1 rounded-md border border-border p-3"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium">
                                    {item.taskName ?? "Untitled project"}
                                </span>
                               
                            </div>
                            {item.techstackUsed && (
                                <div className="flex items-start gap-1.5">
                                    <ToolCase className="mt-0.5 size-3.5 shrink-0 text-neutral-600" />
                                    <p className="min-w-0 flex-1 text-xs leading-snug text-neutral-600">
                                        {item.techstackUsed.join(", ")}
                                    </p>
                                </div>

                              

                              
                            )}

                              <div>
                                     
                                    <p className="min-w-0 flex-1 text-xs leading-snug text-neutral-600">
                                        Status: {item.status}
                                    </p>
                                
                                </div>
                        </li>
                    ))}
                </ul>
            </DialogContent>
        </Dialog>
    )
}
