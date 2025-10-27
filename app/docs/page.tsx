import type { Route } from './+types/page';
import { toClientRenderer } from 'fumadocs-mdx/runtime/vite';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';

import { docs } from '@/.source';
import { getMDXComponents } from '@/components/mdx-components';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

import type * as PageTree from 'fumadocs-core/page-tree';

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = params['*'].split('/').filter((v) => v.length > 0);
  const page = source.getPage(slugs);
  if (!page) throw new Response('Not found', { status: 404 });

  return {
    path: page.path,
    tree: source.getPageTree(),
  };
}

const renderer = toClientRenderer(
  docs.doc,
  ({ toc, default: Mdx, frontmatter }) => {
    return (
      <DocsPage toc={toc}>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <DocsBody>
          <Mdx components={getMDXComponents()} />
        </DocsBody>
      </DocsPage>
    );
  },
);

export default function Page({ loaderData }: Route.ComponentProps) {
  const { tree, path } = loaderData;
  const Content = renderer[path];

  return (
    <DocsLayout {...baseOptions()} tree={tree as PageTree.Root}>
      <Content />
    </DocsLayout>
  );
}
