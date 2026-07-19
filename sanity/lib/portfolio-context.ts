import "server-only";

import { cache } from "react";
import { toPlainText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { serverClient } from "./serverClient";

const PORTFOLIO_CONTEXT_QUERY = `{
  "profile": *[_type == "profile"][0]{ about },
  "hero": *[_type == "hero"][0]{ subtitle, welcomeMessage },
  "techstack": *[_type == "techstack"][0].techstack,
  "technologies": *[_type == "technologies"][0].technologyCategory[]{ technologyCategory, technologyList },
  "projects": *[_type == "project"]{ projectName, projectDescription, projectRole, techStack, projectURL, projectDate, projectFeatures, projectOverview },
  "experience": *[_type == "experience"][0].experienceName[]{ jobTitle, companyName, companyLocation, startDate, endDate, jobDescription },
  "certifications": *[_type == "certifications"][0].certificationName[]{ certificationName, certificationIssuer, certificationDate },
  "currentBuilding": *[_type == "currentBuilding"][0].taskName[]{ taskName, techstackUsed, status },
  "contacts": *[_type == "contacts"][0].contacts[]{ contactType, contactUrl }
}`;

interface ProfileData {
  about?: string | null;
}

interface HeroData {
  subtitle?: string | null;
  welcomeMessage?: string | null;
}

interface TechnologyCategoryData {
  technologyCategory?: string | null;
  technologyList?: string[] | null;
}

interface ProjectData {
  projectName?: string | null;
  projectDescription?: string | null;
  projectRole?: string | null;
  techStack?: string[] | null;
  projectURL?: string | null;
  projectDate?: string | null;
  projectFeatures?: string[] | null;
  projectOverview?: PortableTextBlock[] | null;
}

interface ExperienceEntry {
  jobTitle?: string | null;
  companyName?: string | null;
  companyLocation?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  jobDescription?: string | null;
}

interface CertificationEntry {
  certificationName?: string | null;
  certificationIssuer?: string | null;
  certificationDate?: string | null;
}

interface CurrentBuildingTask {
  taskName?: string | null;
  techstackUsed?: string[] | null;
  status?: string | null;
}

interface ContactEntry {
  contactType?: string | null;
  contactUrl?: string | null;
}

export interface PortfolioData {
  profile?: ProfileData | null;
  hero?: HeroData | null;
  techstack?: string[] | null;
  technologies?: TechnologyCategoryData[] | null;
  projects?: ProjectData[] | null;
  experience?: ExperienceEntry[] | null;
  certifications?: CertificationEntry[] | null;
  currentBuilding?: CurrentBuildingTask[] | null;
  contacts?: ContactEntry[] | null;
}

function flattenPortfolio(data: PortfolioData): string {
  const parts: string[] = [];

  // About
  if (data.profile?.about) {
    parts.push(`## About\n${data.profile.about}`);
  }

  // Intro
  const introLines: string[] = [];
  if (data.hero?.subtitle) introLines.push(data.hero.subtitle);
  if (data.hero?.welcomeMessage) introLines.push(data.hero.welcomeMessage);
  if (introLines.length) {
    parts.push(`## Intro\n${introLines.join("\n")}`);
  }

  // Tech Stack
  const techstack = data.techstack ?? [];
  if (techstack.length) {
    parts.push(`## Tech Stack\n${techstack.join(", ")}`);
  }

  // Technologies by Category
  const technologies = data.technologies ?? [];
  if (technologies.length) {
    const categoryLines = technologies
      .map((category) => {
        const list = category?.technologyList ?? [];
        if (!category?.technologyCategory && list.length === 0) return null;
        return `- ${category?.technologyCategory ?? "Uncategorized"}: ${list.join(", ")}`;
      })
      .filter((line): line is string => line !== null);
    if (categoryLines.length) {
      parts.push(`## Technologies by Category\n${categoryLines.join("\n")}`);
    }
  }

  // Projects
  const projects = data.projects ?? [];
  if (projects.length) {
    const projectBlocks = projects.map((project) => {
      const lines: string[] = [`### ${project?.projectName ?? "Untitled Project"}`];
      if (project?.projectDescription) lines.push(`Description: ${project.projectDescription}`);
      if (project?.projectRole) lines.push(`Role: ${project.projectRole}`);
      const stack = project?.techStack ?? [];
      if (stack.length) lines.push(`Tech: ${stack.join(", ")}`);
      if (project?.projectURL) lines.push(`Live URL: ${project.projectURL}`);
      if (project?.projectDate) lines.push(`Date: ${project.projectDate}`);
      const features = project?.projectFeatures ?? [];
      if (features.length) {
        lines.push("Features:");
        for (const feature of features) lines.push(`- ${feature}`);
      }
      const overview = toPlainText(project?.projectOverview ?? []).trim();
      if (overview) lines.push(`Overview: ${overview}`);
      return lines.join("\n");
    });
    parts.push(`## Projects\n${projectBlocks.join("\n\n")}`);
  }

  // Experience
  const experience = data.experience ?? [];
  if (experience.length) {
    const experienceBlocks = experience.map((entry) => {
      const location = entry?.companyLocation ? ` (${entry.companyLocation})` : "";
      const header = `${entry?.jobTitle ?? "Role"} at ${entry?.companyName ?? "Unknown"}${location}`;
      const dates = `${entry?.startDate ?? "?"}–${entry?.endDate ?? "Present"}`;
      const lines = [`${header}, ${dates}`];
      if (entry?.jobDescription) lines.push(entry.jobDescription);
      return lines.join("\n");
    });
    parts.push(`## Experience\n${experienceBlocks.join("\n\n")}`);
  }

  // Certifications
  const certifications = data.certifications ?? [];
  if (certifications.length) {
    const certificationLines = certifications
      .map((certification) => {
        const name = certification?.certificationName;
        if (!name) return null;
        const issuer = certification?.certificationIssuer ? ` — ${certification.certificationIssuer}` : "";
        const date = certification?.certificationDate ? ` (${certification.certificationDate})` : "";
        return `- ${name}${issuer}${date}`;
      })
      .filter((line): line is string => line !== null);
    if (certificationLines.length) {
      parts.push(`## Certifications\n${certificationLines.join("\n")}`);
    }
  }

  // Currently Building
  const currentBuilding = data.currentBuilding ?? [];
  if (currentBuilding.length) {
    const buildingLines = currentBuilding
      .map((task) => {
        const name = task?.taskName;
        if (!name) return null;
        const status = task?.status ? ` [${task.status}]` : "";
        const used = task?.techstackUsed ?? [];
        const usedStr = used.length ? ` — ${used.join(", ")}` : "";
        return `- ${name}${status}${usedStr}`;
      })
      .filter((line): line is string => line !== null);
    if (buildingLines.length) {
      parts.push(`## Currently Building\n${buildingLines.join("\n")}`);
    }
  }

  // Contacts
  const contacts = data.contacts ?? [];
  if (contacts.length) {
    const contactLines = contacts
      .map((contact) => {
        if (!contact?.contactType && !contact?.contactUrl) return null;
        return `- ${contact?.contactType ?? "Contact"}: ${contact?.contactUrl ?? ""}`;
      })
      .filter((line): line is string => line !== null);
    if (contactLines.length) {
      parts.push(`## Contacts\n${contactLines.join("\n")}`);
    }
  }

  return parts.join("\n\n");
}

export const getPortfolioContext = cache(async (): Promise<string> => {
  const data = await serverClient.fetch<PortfolioData>(
    PORTFOLIO_CONTEXT_QUERY,
    {},
    { perspective: "published" },
  );
  return flattenPortfolio(data);
});
