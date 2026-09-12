import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * `revalidatePath` / `revalidateTag` throw when called outside a Next request
 * or render scope — from a seed script, a CLI task or a queued job. The write
 * itself has already succeeded by the time a collection hook runs, so losing
 * a cache hint must not take the whole operation down with it.
 */
export const safeRevalidatePath = (path: string): void => {
  try {
    revalidatePath(path)
  } catch {
    // Not in a request scope — nothing to invalidate.
  }
}

// Next 16 requires an explicit cache profile alongside the tag.
export const safeRevalidateTag = (tag: string, profile: 'max' = 'max'): void => {
  try {
    revalidateTag(tag, profile)
  } catch {
    // Not in a request scope — nothing to invalidate.
  }
}
