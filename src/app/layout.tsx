import type {Metadata} from 'next';
import StoryblokProvider from '../components/StoryblokProvider';
import StoryblokBridge from '../components/StoryblokBridge';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sophia Binder Canine Academy',
  description:
    'Scandinavian-inspired force-free dog training. Professional private obedience coaching, puppy foundations, and complex reactive dog rehabilitation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoryblokProvider>
          {children}
          <StoryblokBridge />
        </StoryblokProvider>
      </body>
    </html>
  );
}
