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
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'jm0fd75g',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: process.env.SANITY_STUDIO_API_VERSION || '2024-06-07',
  schema,

  plugins: [
    structureTool({ structure }),
    visionTool({
      defaultApiVersion: '2023-10-01',
    }),
  ],
})
