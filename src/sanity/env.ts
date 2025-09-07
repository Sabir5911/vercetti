

export const apiVersion =
process.env.SANITY_STUDIO_API_VERSION || '2025-08-10'

export const dataset = assertValue(
 process.env.SANITY_STUDIO_DATASET ,
  'Missing NEXT_PUBLIC_SANITY_DATASET environment variable',
)

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID ,
  'Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable',
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
