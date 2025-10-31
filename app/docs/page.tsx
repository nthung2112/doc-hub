import type { Route } from './+types/page';
import { toClientRenderer } from 'fumadocs-mdx/runtime/vite';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { redirect } from 'react-router';

import { docs } from '@/.source';
import { getMDXComponents } from '@/components/mdx-components';
import { baseOptions, githubLink } from '@/lib/layout.shared';
import { source } from '@/lib/source';

import type * as PageTree from 'fumadocs-core/page-tree';
import { PencilLine } from 'lucide-react';

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = params['*'].split('/').filter((v) => v.length > 0);
  const page = source.getPage(slugs);
  if (!page) throw redirect('/docs');

  return {
    path: page.path,
    tree: source.getPageTree(),
  };
}

const renderer = toClientRenderer(
  docs.doc,
  (
    { toc, default: Mdx, frontmatter, structuredData },
    props: Record<string, string>,
  ) => {
    const showTitle = frontmatter.title !== structuredData.headings[0]?.content;

    return (
      <DocsPage toc={toc} tableOfContent={{ style: 'clerk' }}>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        {showTitle && (
          <DocsTitle className="text-3xl">{frontmatter.title}</DocsTitle>
        )}
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <DocsBody>
          <Mdx components={getMDXComponents()} />
        </DocsBody>
        <div className="mt-4 flex gap-2 items-center">
          <PencilLine size={16} />
          <a
            href={`${githubLink}/edit/main/content/docs/${props.path}`}
            rel="noreferrer noopener"
            target="_blank"
            className="text-sm underline"
          >
            Edit this page
          </a>
        </div>
      </DocsPage>
    );
  },
);

export default function Page({ loaderData }: Route.ComponentProps) {
  const { tree, path } = loaderData;
  const Content = renderer[path];

  return (
    <DocsLayout {...baseOptions()} tree={tree as PageTree.Root}>
      <Content path={path} />
    </DocsLayout>
  );
}
