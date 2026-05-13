import type { CollectionEntry } from 'astro:content'

// Estimate read time based on average reading speed
export function calculateReadTime(text: string | undefined): number {
  if (!text) return 1
  const wordsPerMinute = 200
  const words = text.trim().split(/\\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Get posts in the same category, falling back to others if needed
export function getRelatedPosts(
  posts: CollectionEntry<'blog'>[],
  currentSlug: string,
  currentCategory: string,
  limit = 3
): CollectionEntry<'blog'>[] {
  const sameCategory = posts.filter(p => p.data.category === currentCategory && p.id !== currentSlug)

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit)
  }

  const others = posts.filter(p => p.data.category !== currentCategory && p.id !== currentSlug)

  return [...sameCategory, ...others].slice(0, limit)
}

// Get previous and next posts for navigation links
export function getPostNavigation(posts: CollectionEntry<'blog'>[], currentSlug: string) {
  const sorted = [...posts].sort((a, b) => a.data.id - b.data.id)
  const index = sorted.findIndex(p => p.id === currentSlug)

  return {
    previous: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null
  }
}