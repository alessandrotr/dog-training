import {getStoryblokApi} from '../lib/storyblok';

// Ensures storyblokInit() has run before any route fetches stories.
export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  getStoryblokApi();
  return children;
}
