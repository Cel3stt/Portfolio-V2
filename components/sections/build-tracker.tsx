import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import headerIcon from "@/public/header-icon.svg";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ArrowUpDown, File, Loader, Wrench } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { sanityFetch } from "@/sanity/lib/live";




const CURRENTBUILDS_QUERY = `*[_type == 'currentBuilding'][0]{
taskName[]{
_key,
taskName,
techstackUsed[],
status
}
}`

export default async function BuildTracker() {

  const {data: currentBuilding} = await sanityFetch({query: CURRENTBUILDS_QUERY}) 
  return (
    <div className="">
      <Card className="">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-col">
            <div className="flex flex-row space-x-2 items-center">
              <Image src={headerIcon} alt="Projects" className="size-6" />
              <Label className="text-lg font-mono">What I’m Building</Label>
            </div>
            <Label className="font-heading font-extralight text-neutral-600 text-xs ml-8">
              Click each folder to view the details of the project
            </Label>
          </div>

          <div className="flex-row flex justify-between items-center ml-auto">
            <Button variant="outline" size="sm" className="ml-auto">
              <ArrowUpDown className="font-bold text-neutral-700" />
            </Button>

            <Button className="bg-[#2783DE] text-white  hover:bg-blue-400 rounded-sm px-3 py-1 ml-2">
              View All
            </Button>
          </div>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table className="min-w-[480px]">
            <TableHeader>
              <TableRow className=" font-mono text-xs">
                <TableHead>
                  <div className="flex items-center gap-1 text-neutral-500">
                    <File className="size-4" /> Project Name
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1 text-neutral-500">
                    <Wrench className="size-4" /> Tech
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1 text-neutral-500">
                    <Loader className="size-4" /> Status
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBuilding?.taskName?.map((task: any) => (
                <TableRow key={task._key}>
                  <TableCell className="font-medium">
                    {task.taskName}
                  </TableCell>
                  <TableCell>{task.techstackUsed?.join(", ")}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-gray-100 text-gray-800 py-1 px-2 border"
                    >
                      {task.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}

              
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
