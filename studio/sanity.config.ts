'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {schema} from '../src/sanity/schemaTypes'
import {structure} from '../src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION }),
  ],
})
