'use client';

import Link from 'next/link';
import Image from 'next/image';
import {ArrowLeft, Sparkles, ArrowUpRight, ArrowRight} from 'lucide-react';
import {useHref} from '../../lib/navigation';
import CaseStudyCard from '../bloks/CaseStudyCard';
import Eyebrow from '../ui/eyebrow';
import Avatar from '../ui/avatar';
import {Button} from '../ui/button';
import type {TestimonialItem, ServiceItem} from '../../types';

// Full case-study page: the dog, the challenge, what was done, the outcome,
// and the service it belonged to. Mirrors the service/blog detail pattern.
export default function CaseStudyDetail({
  story,
  service,
  related,
  serviceById,
}: {
  story: TestimonialItem;
  service?: ServiceItem;
  related: TestimonialItem[];
  serviceById: Map<string, ServiceItem>;
}) {
  const href = useHref();
  const paragraphs = story.text.split('\n').map((p) => p.trim()).filter(Boolean);

  return (
    <article className="py-8 text-left">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href={href.page('testimonials')}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-stone-500 transition-colors hover:text-amber-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All case studies
        </Link>

        {/* Header */}
        <header className="mt-8 space-y-5">
          <div className="flex items-center gap-3">
            <Avatar src={story.imageUrl} name={story.name} size="lg" />
            <div className="min-w-0">
              <p className="text-base font-bold leading-tight text-stone-900">{story.name}</p>
              {story.dogBreed && <p className="font-mono text-xs text-stone-500">{story.dogBreed}</p>}
            </div>
          </div>

          {story.challenge && (
            <h1 className="font-sans text-3xl font-extrabold leading-tight tracking-tight text-amber-950 sm:text-4xl">
              {story.challenge}
            </h1>
          )}
        </header>

        {/* Hero image */}
        {story.imageUrl && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-stone-100 shadow-lg">
            <Image
              src={story.imageUrl}
              alt={story.name}
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* The story */}
        <div className="mt-10 space-y-4">
          <Eyebrow>What we did</Eyebrow>
          <div className="prose prose-stone max-w-none prose-p:leading-relaxed prose-p:text-stone-600">
            {paragraphs.length ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : <p>{story.text}</p>}
          </div>
        </div>

        {/* The outcome */}
        {story.outcome && (
          <div className="mt-10 rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200/60">
            <Eyebrow tone="brand" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> The outcome
            </Eyebrow>
            <p className="mt-2 font-serif text-xl italic leading-relaxed text-amber-955">{story.outcome}</p>
          </div>
        )}

        {/* The service this belonged to */}
        {service && (
          <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Eyebrow>This was part of</Eyebrow>
              <p className="mt-1 font-sans text-lg font-bold text-stone-900">{service.title}</p>
            </div>
            <Button render={<Link href={href.service(service.slug)} />} variant="cta" size="lg" className="w-fit rounded-full px-4">
              Explore the service
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
            </Button>
          </div>
        )}

        {/* Booking CTA */}
        <div className="mt-12 rounded-3xl bg-stone-900 px-6 py-10 text-center">
          <h2 className="font-sans text-2xl font-extrabold text-white">Have a dog with a similar story?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-400">
            Every dog is different — let&apos;s talk about what yours needs.
          </p>
          <Button render={<Link href={href.page('contact')} />} variant="cta" size="lg" className="mt-6 rounded-full px-6">
            Get in touch <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Related case studies */}
      {related.length > 0 && (
        <div className="mx-auto mt-20 max-w-7xl border-t border-stone-200 px-4 pt-12 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-sans text-2xl font-extrabold text-amber-955">More case studies</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((r) => (
              <CaseStudyCard key={r.id} story={r} service={serviceById.get(r.serviceId ?? '')} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
