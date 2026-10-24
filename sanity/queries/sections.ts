import { defineQuery } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

/**
 * Shared GROQ queries + hand-written result types for the portfolio section
 * pages. Query shapes mirror the field selections already used by the
 * components in `components/sections/*` so results stay consistent.
 *
 * Field names are verified against `sanity/schemaTypes/*.ts`.
 */

// 1. Projects -----------------------------------------------------------------
export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(_updatedAt asc){ _id, "slug": coalesce(slug.current, _id), projectName, projectDescription, projectURL, projectDate, projectRole, techStack, "cover": projectImage[0] }`,
);

export type Project = {
  _id: string;
  slug?: string;
  projectName?: string;
  projectDescription?: string;
  projectURL?: string;
  projectDate?: string;
  projectRole?: string;
  techStack?: string[];
  cover?: SanityImageSource | null;
};

// 2. Experience ---------------------------------------------------------------
export const EXPERIENCE_QUERY = defineQuery(
  `*[_id == 'experience'][0]{
    experienceName[]{ _key, companyName, jobTitle, startDate, endDate, companyLocation, jobDescription, skills },
    educationList[]{ _key, schoolName, degree, startDate, endDate, awards }
  }`,
);

export type ExperienceEntry = {
  _key: string;
  companyName?: string;
  jobTitle?: string;
  startDate?: string;
  endDate?: string;
  companyLocation?: string;
  jobDescription?: string;
  skills?: string[];
};

export type EducationEntry = {
  _key: string;
  schoolName?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  awards?: string[];
};

export type ExperienceData = {
  experienceName?: ExperienceEntry[];
  educationList?: EducationEntry[];
} | null;

// 3. Certifications -----------------------------------------------------------
export const CERTIFICATIONS_QUERY = defineQuery(
  `*[_id == 'certifications'][0]{ certificationName[]{ _key, certificationName, certificationIssuer, certificationDate } }`,
);

export type Certification = {
  _key: string;
  certificationName?: string;
  certificationIssuer?: string;
  certificationDate?: string;
};

export type CertificationsData = { certificationName?: Certification[] } | null;

// 4. Tech stack ---------------------------------------------------------------
export const TECHSTACK_QUERY = defineQuery(
  `*[_id == "techstack"][0]{ techstack }`,
);

export type TechStackData = { techstack?: string[] } | null;

// 5. Technologies / Tools -----------------------------------------------------
export const TECHNOLOGIES_QUERY = defineQuery(
  `*[_id == "technologies"][0]{ technologyCategory[]{ _key, technologyCategory, technologyList } }`,
);

export type TechnologyCategory = {
  _key: string;
  technologyCategory?: string;
  technologyList?: string[];
};

export type TechnologiesData = {
  technologyCategory?: TechnologyCategory[];
} | null;

// 6. Gallery ------------------------------------------------------------------
export const GALLERY_QUERY = defineQuery(
  `*[_type == "gallery"]{ _id, "slug": coalesce(slug.current, _id), galleryTitle, galleryDescription }`,
);

export type GalleryCard = {
  _id: string;
  slug?: string;
  galleryTitle?: string;
};

// 7. Contacts -----------------------------------------------------------------
export const CONTACTS_QUERY = defineQuery(
  `*[_id == 'contacts'][0]{ contacts[]{ _key, contactType, contactUrl } }`,
);

export type ContactLink = {
  _key: string;
  contactType?: string;
  contactUrl?: string;
};

export type ContactsData = { contacts?: ContactLink[] } | null;

// 8. Current building / Build tracker -----------------------------------------
export const CURRENT_BUILDING_QUERY = defineQuery(
  `*[_id == 'currentBuilding'][0]{ taskName[]{ _key, taskName, techstackUsed, status } }`,
);

export type BuildTask = {
  _key: string;
  taskName?: string;
  techstackUsed?: string[];
  status?: string;
};

export type CurrentBuildingData = { taskName?: BuildTask[] } | null;

// 9. Recommendations ----------------------------------------------------------
// Field names verified against sanity/schemaTypes/recommendations.ts:
// recommendationList[]{ recommenderName, recommenderTitle, recommenderCompany,
// recommendationText, recommenderImage, recommendationUrl }.
export const RECOMMENDATIONS_QUERY = defineQuery(
  `*[_id == "recommendations"][0]{ recommendationList[]{ _key, recommenderName, recommenderTitle, recommenderCompany, recommendationText, recommenderImage, recommendationUrl } }`,
);

export type Recommendation = {
  _key: string;
  recommenderName?: string;
  recommenderTitle?: string;
  recommenderCompany?: string;
  recommendationText?: string;
  recommenderImage?: SanityImageSource;
  recommendationUrl?: string;
};

export type RecommendationsData = {
  recommendationList?: Recommendation[];
} | null;

// 10. Gear --------------------------------------------------------------------
// Field names verified against sanity/schemaTypes/gear.ts:
// gearCategory[]{ categoryName, gearList[]{ gearName, gearDescription,
// gearUrl, gearImage } }.
export const GEAR_QUERY = defineQuery(
  `*[_id == "gear"][0]{ gearCategory[]{ _key, categoryName, gearList[]{ _key, gearName, gearDescription, gearUrl, gearImage } } }`,
);

export type GearItem = {
  _key: string;
  gearName?: string;
  gearDescription?: string;
  gearUrl?: string;
  gearImage?: SanityImageSource;
};

export type GearCategory = {
  _key: string;
  categoryName?: string;
  gearList?: GearItem[];
};

export type GearData = { gearCategory?: GearCategory[] } | null;
