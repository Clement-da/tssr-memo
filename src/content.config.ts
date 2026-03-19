import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const modulesCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/modules" }),
    schema: z.object({
        id: z.string(),
        title: z.string(),
        icon: z.string(),
    }),
});

export const collections = {
  'modules': modulesCollection,
};
