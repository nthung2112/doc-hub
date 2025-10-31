import mdx from 'fumadocs-mdx/vite';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';

import * as MdxConfig from './source.config';

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [mdx(MdxConfig), tailwindcss(), reactRouter(), tsconfigPaths()],
    base: process.env.VITE_BASE_URL ?? '/',
  });
};
