import React from "react";
import { File, Loader, Wrench } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import PageHeading from "@/components/sections/page-heading";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CURRENT_BUILDING_QUERY,
  type CurrentBuildingData,
  type BuildTask,
} from "@/sanity/queries/sections";

export default async function CurrentlyBuildingPage() {
  const { data } = await sanityFetch({ query: CURRENT_BUILDING_QUERY });
  const currentBuilding = data as CurrentBuildingData;
  const tasks = currentBuilding?.taskName ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      <PageHeading
        title="Currently Building"
        subtitle="List of projects I'm currently building and tracking progress on."
      />

      {tasks.length === 0 ? (
        <p className="text-sm text-neutral-600">Nothing in progress yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[480px]">
            <TableHeader>
              <TableRow className="font-mono text-xs">
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
              {tasks.map((task: BuildTask) => (
                <TableRow key={task._key}>
                  <TableCell className="font-medium">{task.taskName}</TableCell>
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
        </div>
      )}
    </div>
  );
}
