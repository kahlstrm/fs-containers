import { z } from 'zod'

export const blog = z.object({
  id: z.number(),
  author: z.string().optional(),
  title: z.string(),
  url: z.string(),
  likes: z.number(),
  user: z
    .object({
      name: z.string(),
      id: z.number().optional(),
    })
    .optional(),
  year: z.number().nullable(),
  comments: z.array(z.string()),
})
export type Blog = z.infer<typeof blog>

export const user = z.object({
  token: z.string(),
  username: z.string(),
  name: z.string(),
  blogs: z.array(blog).optional(),
})
export type User = z.infer<typeof user>
