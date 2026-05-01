export namespace SanityTypes {
  export interface Slug {
    current: string;
  }

  export interface SanityImageAssetRef {
    _ref: string;
    _type: "reference";
  }

  export interface SanityImage {
    _type: "image";
    asset: SanityImageAssetRef;
  }

  export interface Project {
    projectName: string;
    slug: Slug;
    projectDescription: string;
    projectLabel?: string;
    projectURL?: string;
  }

  export interface ProjectDetails {
    projectName: string;
    projectDate: string;
    techStack: string[];
    projectRole: string;
    projectOverview: string;
    projectImage: SanityImage[];
    projectFeatures: string[];
  }

  export interface Experience {
    companyName: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    companyLocation: string;
    jobDescription: string;
  }

  export interface CurrentBuilding {
    taskName: string;
    techstackUsed: string[];
    status: string;
  }

  export interface Technologies {
    technologyCategory: string;
    technologyList: string[];
  }

  export interface TechStack {
    techstack: string[];
  }

  export interface ContactItem {
    contactType: string;
    contactUrl: string;
  }

  export type Contact = ContactItem[];

  export interface Certification {
    certificationName: string;
    certificationIssuer: string;
    certificationDate: string;
  }

  export interface Hero {
    backgroundImage: SanityImage;
    avatarImage: SanityImage;
    title: string;
    subtitle: string;
    welcomeMessage: string;
  }

  export interface Profile {
    profileImage: SanityImage;
    about: string;
  }
}