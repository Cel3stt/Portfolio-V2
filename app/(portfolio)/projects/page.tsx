import React from "react";
import Image from "next/image";
import Link from "next/link";
import { File } from "lucide-react";
import projectFolder from "@/public/project-folder.svg";
import { Button } from "@/components/ui/button";
import PageHeading from "@/components/sections/page-heading";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY, type Project } from "@/sanity/queries/sections";

export default async function ProjectsPage() {
  const { data } = await sanityFetch({ query: PROJECTS_QUERY });
  const projects = (data as Project[]) ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      <PageHeading
        title="Projects"
        subtitle="Click each folder to view the details of the project"
      />

      {projects.length === 0 ? (
        <p className="text-sm text-neutral-600">No projects yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {projects.map((item) => {
            const detailsHref = item.slug
              ? `/project-details/${item.slug}`
              : "#";
            return (
              <div
                key={item._id}
                className="flex flex-col items-center gap-2"
              >
                <Link
                  href={detailsHref}
                  className="relative flex w-full items-center justify-center"
                >
                  <Image
                    src={projectFolder}
                    alt={item.projectName ?? "Project"}
                    className="h-auto w-full max-w-[200px]"
                  />
                  <span className="absolute max-w-[80%] truncate px-1 text-center text-sm font-medium">
                    {item.projectName}
                  </span>
                </Link>

                <Link
                  href={detailsHref}
                  className="flex w-full items-start gap-1.5 px-2"
                >
                  <File className="mt-0.5 size-3.5 shrink-0 text-neutral-600" />
                  <p className="min-w-0 flex-1 text-center text-xs leading-snug text-neutral-600 line-clamp-2">
                    {item.projectDescription}
                  </p>
                </Link>

                {item.projectURL && (
                  <Button variant={"outline"} size={"xs"} asChild>
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
            );
          })}
        </div>
      )}
    </div>
  );
}
