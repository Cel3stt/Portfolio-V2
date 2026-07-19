import { type SchemaTypeDefinition } from 'sanity'
import certifications from './certifications'
import contacts from './contacts'
import currentBuilding from './current-building'
import experience from './experience'
import gallery from './gallery'
import gear from './gear'
import hero from './hero'
import profile from './profile'
import projects from './projects'
import recommendations from './recommendations'
import techStack from './tech-stack'
import technologies from './technologies'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    certifications,
    currentBuilding,
    experience,
    gallery,
    hero,
    profile,
    projects,
    techStack,
    technologies,
    contacts,
    recommendations,
    gear
  ],
}
