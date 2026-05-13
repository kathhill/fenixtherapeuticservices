import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {z} from 'astro/zod'

const blog = defineCollection({
  // Use glob loader for local Markdown files
  loader: glob({
    base: './src/content/blog', pattern: '**/*.{md,mdx}'
  }),
  // Pass a function to schema to access the image helper
  schema: z.object({
    id: z.number(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().optional(),
    imageAlt: z.string().optional(),
    pubDate: z.string(),
    author: z.string().default('Gregory Harmeling, Psy.D., LMFT'),
    category: z.string().default('General'),
    readTime: z.number().optional(),
    tags: z.array(z.string()).optional()
  })
})

export const collections = { blog };