import {getStoryblokApi} from '@/features/storyblok/lib/client';

// Ensures storyblokInit() has run before any route fetches stories.
export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  getStoryblokApi();
  return children;
}
