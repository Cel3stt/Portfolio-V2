import type {StructureResolver} from 'sanity/structure'

import { BriefcaseBusinessIcon, CpuIcon, DroneIcon, FolderDot, KanbanIcon, PhoneIcon, ScrollTextIcon, UserIcon, WallpaperIcon } from 'lucide-react'
// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([


      S.listItem()
      //hero
      .title("Hero")
      .icon(WallpaperIcon)
      .child(
        S.document().schemaType("hero").documentId("hero")
      ),
      S.divider(),

      S.listItem()
      //profile
      .title("Profile")
      .icon(UserIcon)
      .child(
        S.document().schemaType("profile").documentId("profile")
      ),
      S.divider(),

      S.listItem()
      //projects
      .title("Project")
      .icon(FolderDot)
      .child(
        S.document().schemaType("project").documentId("project")
      ),

      S.divider(),

        S.listItem()
      //current building
      .title("CurrentBuilding")
      .icon(KanbanIcon)
      .child(
        S.document().schemaType("currentBuilding").documentId("currentBuilding")
      ),

      S.divider(),

      S.listItem()
      //tech stack
      .title("techstack")
      .icon(CpuIcon)
      .child(
        S.document().schemaType("techstack").documentId("techstack")
      ),
      S.divider(),

      S.listItem()
      //technologies

      .title("technologies")
      .icon(DroneIcon)
      .child(
        S.document().schemaType("technologies").documentId("technologies")
      ),
      S.divider(),

      S.listItem()
      //experience
      .title("experience")
      .icon(BriefcaseBusinessIcon)
      .child(
        S.document().schemaType("experience").documentId("experience")
      ),
      S.divider(),

      S.listItem()
      //certifications
      .title("certifications")
      .icon(ScrollTextIcon)
      .child(
        S.document().schemaType("certifications").documentId("certifications")
      ),

      S.divider(),

      S.listItem()
      //contact
      .title("contact")
      .icon(PhoneIcon)
      .child(
        S.document().schemaType("contact").documentId("contact")
      ),
      S.divider(),





    ])
