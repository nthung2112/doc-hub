import type { Config } from '@react-router/dev/config';
import { glob, rename } from 'node:fs/promises';
import { execSync } from 'node:child_process';

import { replaceInFile } from 'replace-in-file';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';

const getUrl = createGetUrl('/docs');

async function fixFileNames() {
  try {
    const results = await replaceInFile({
      files: 'build/client/**/*.js',
      from: [/_base+/g],
      to: [(match) => match.replaceAll('_base', 'base')],
    });

    const files = results.filter((item) => item.file.includes('_base'));
    for (const fileItem of files) {
      await rename(fileItem.file, fileItem.file.replace('_base', 'base'));
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

export default {
  ssr: false,
  basename: process.env.VITE_BASE_URL ?? '/',
  async prerender({ getStaticPaths }) {
    const paths: string[] = [];
    const excluded: string[] = [];

    for (const path of getStaticPaths()) {
      if (!excluded.includes(path)) paths.push(path);
    }

    for await (const entry of glob('**/*.{md,mdx}', { cwd: 'content/docs' })) {
      paths.push(getUrl(getSlugs(entry)));
    }

    return paths;
  },
  async buildEnd({ reactRouterConfig }) {
    const rootClientPath = `${reactRouterConfig.buildDirectory}/client`;
    const bundleClientPath = `${rootClientPath}${process.env.VITE_BASE_URL}`;
    execSync(`mv ${bundleClientPath}* ${rootClientPath}`);
    await fixFileNames();
    console.log('Build end');
  },
} satisfies Config;
