import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookMarked } from 'lucide-react';

export function baseOptions(): BaseLayoutProps {
  return {
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
