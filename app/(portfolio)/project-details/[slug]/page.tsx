import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import projectBg from "@/public/project-bg.svg";
import icon from "@/public/details-avatar.svg";
import { Label } from "@/components/ui/label";
import { CalendarDays, Cpu, User } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";

const PROJECT_QUERY = `*[_type == "project" && (slug.current == $slug || _id == $slug)][0]{
  projectName,
  projectDate,
  techStack,
  projectRole,
  projectOverview,
  projectImage[]{
    _key,
    asset->{
      _ref,
      _id,
    }
  },
  projectFeatures
}`;

type SanityImage = {
  _key?: string;
  asset?: {
    _ref?: string;
    _id?: string;
    metadata?: { dimensions?: { width?: number; height?: number } };
  };
};

type Project = {
  projectName?: string;
  projectDate?: string;
  techStack?: string[];
  projectRole?: string;
  projectOverview?: PortableTextBlock[];
  projectImage?: SanityImage[];
  projectFeatures?: string[];
};

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug },
  });
  const project = data as Project | null;

  if (!project) {
    notFound();
  }

  const details = [
    {
      icon: CalendarDays,
      label: "Created",
      value: project.projectDate ?? "—",
    },
    {
      icon: Cpu,
      label: "Tech Stack",
      value: project.techStack?.length
        ? project.techStack.join(" | ")
        : "—",
    },
    {
      icon: User,
      label: "Role",
      value: project.projectRole ?? "—",
    },
  ];

  return (
    <div>
      <div>
        <div className="relative w-full h-48 sm:h-60 md:h-72">
          <Image
            src={projectBg}
            alt="Default Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-40">
          <Image src={icon} alt="Project Icon" width={80} height={80} />

          <div className="mt-5">
            <Label className="text-4xl font-bold font-mono text-neutral-800 uppercase">
              {project.projectName}
            </Label>
          </div>

          <div className="mt-7 max-w-4xl space-y-4">
            {details.map((item) => (
              <div
                key={item.label}
                className="flex flex-wrap items-center gap-y-2 sm:flex-nowrap sm:gap-8"
              >
                <div className="flex w-40 shrink-0 items-center gap-2 text-neutral-600">
                  <item.icon size={16} />
                  <Label className="font-bold">{item.label}</Label>
                </div>
                <Label className="font-bold text-neutral-800">
                  {item.value}
                </Label>
              </div>
            ))}
          </div>

          {project.projectOverview && project.projectOverview.length > 0 && (
            <div className="mt-10">
              <Label className="bg-primary py-1 px-2 text-lg font-semibold">
                Project Overview
              </Label>

              <div className="mt-3 max-w-4xl space-y-3 text-justify leading-normal text-neutral-800 [&_p]:indent-7">
                <PortableText value={project.projectOverview} />
              </div>
            </div>
          )}

          {project.projectImage && project.projectImage.length > 0 && (
            <div className="mt-10">
              <Label className="bg-primary py-1 px-2 text-lg font-semibold">
                PREVIEW
              </Label>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-2">
                {project.projectImage.map((img, idx) => {
                
                  return (
                    <div
                      key={img._key ?? idx}
                      className="relative aspect-video w-full overflow-hidden rounded-md border border-neutral-200"
                    >
                      <Image
                        src={urlFor(img).url()}
                        alt={`${project.projectName ?? "Project"} preview ${idx + 1}`}
                        fill
                        className=""
                       
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {project.projectFeatures && project.projectFeatures.length > 0 && (
            <div className="mt-10 mb-10">
              <Label className="bg-primary py-1 px-2 text-lg font-semibold">
                FEATURES
              </Label>

              <ul className="mt-3 max-w-4xl list-disc space-y-2 pl-7 text-neutral-800">
                {project.projectFeatures.map((feature, idx) => (
                  <li key={idx} className="leading-normal">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
