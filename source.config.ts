import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import { remarkMdxMermaid, remarkMdxFiles } from 'fumadocs-core/mdx-plugins';
import { z } from 'zod';

export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema.omit({ title: true }).extend({
      title: z.string().optional(),
    }),
  },
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMdxMermaid, remarkMdxFiles],
    // MDX options
  },
});
