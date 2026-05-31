import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the tracing root to this project (a lockfile exists in a parent dir).
  outputFileTracingRoot: __dirname,
  images: {
    // Remote hosts allowed for next/image optimization (Storyblok assets + the
    // Unsplash placeholders used in seeds).
    remotePatterns: [
      {protocol: 'https', hostname: '**.storyblok.com'},
      {protocol: 'https', hostname: 'images.unsplash.com'},
    ],
  },
};

export default nextConfig;
