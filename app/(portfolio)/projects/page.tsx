import React from "react";
import Link from "next/link";
import { FolderOpen } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { PROJECTS_QUERY, type Project } from "@/sanity/queries/sections";
import ProjectsDatabase, {
  type ProjectRow,
} from "@/components/sections/projects-database";

export default async function ProjectsPage() {
  const { data } = await sanityFetch({ query: PROJECTS_QUERY });
  const projects = (data as Project[]) ?? [];

  const rows: ProjectRow[] = projects.map((p) => {
    const coverUrl = p.cover
      ? urlFor(p.cover).width(640).height(400).url()
      : null;

    return {
      id: p._id,
      slug: p.slug ?? null,
      name: p.projectName ?? "",
      description: p.projectDescription ?? "",
      url: p.projectURL ?? null,
      date: p.projectDate ?? null,
      role: p.projectRole ?? null,
      techStack: p.techStack ?? [],
      coverUrl,
    };
  });

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          Home
        </Link>
        <span aria-hidden>/</span>
        <span className="text-foreground">Projects</span>
      </nav>

      {/* Title */}
      <div className="mt-3 flex items-center gap-2.5">
        <FolderOpen className="size-6 text-muted-foreground" />
        <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
          Projects
        </h1>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        All the projects Celest has built.
      </p>

      <ProjectsDatabase rows={rows} />
    </div>
  );
}
