import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import { BookMarked } from 'lucide-react';

export const githubLink = 'https://github.com/nthung2112/doc-hub';

export function baseOptions(): Omit<DocsLayoutProps, 'tree'> {
  return {
    sidebar: {
      defaultOpenLevel: 1,
    },
    nav: {
      title: (
        <>
          <BookMarked className="size-5" />
          <span className="font-normal text-muted-foreground/50">/</span>
          <span className="font-medium">DocHub</span>
        </>
      ),
    },
  };
}
