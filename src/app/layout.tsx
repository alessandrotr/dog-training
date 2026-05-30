import type {Metadata} from 'next';
import SiteChrome from '../components/SiteChrome';
import StoryblokProvider from '../components/StoryblokProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'NordDog Canine Academy',
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
          <SiteChrome>{children}</SiteChrome>
        </StoryblokProvider>
      </body>
    </html>
  );
}
