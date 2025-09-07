'use client'

/**
 * Sanity Studio configuration for Next.js
 * Mounted on `/studio` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Your schema + structure
import { schema } from '../src/sanity/schemaTypes'
import { structure } from '../src/sanity/structure'

export default defineConfig({
  basePath: '/studio',

  // 🔥 Hardcoded values (no env vars required)
  projectId: 'jm0fd75g',
  dataset: 'production',
  schema,

  plugins: [
    structureTool({ structure }),
    visionTool({
      // API version (choose one from https://www.sanity.io/docs/api-versioning)
      defaultApiVersion: '2023-10-01',
    }),
  ],
})
