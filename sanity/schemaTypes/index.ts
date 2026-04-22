import { type SchemaTypeDefinition } from 'sanity'
import certifications from './certifications'
import contact from './contact'
import currentBuilding from './current-building'
import experience from './experience'
import hero from './hero'
import profile from './profile'
import projects from './projects'
import techStack from './tech-stack'
import technologies from './technologies'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    certifications,
    contact,
    currentBuilding,
    experience,
    hero,
    profile,
    projects,
    techStack,
    technologies
  ],
}
