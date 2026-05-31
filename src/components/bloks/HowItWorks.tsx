import {storyblokEditable} from '@storyblok/react/rsc';
import Section from '../ui/section';

interface HowItWorksBlok {
  _uid: string;
  component: string;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  step1_title?: string;
  step1_desc?: string;
  step2_title?: string;
  step2_desc?: string;
  step3_title?: string;
  step3_desc?: string;
  step4_title?: string;
  step4_desc?: string;
}

export default function HowItWorks({blok}: {blok: HowItWorksBlok}) {
  const steps = [
    {title: blok.step1_title, desc: blok.step1_desc},
    {title: blok.step2_title, desc: blok.step2_desc},
    {title: blok.step3_title, desc: blok.step3_desc},
    {title: blok.step4_title, desc: blok.step4_desc},
  ].filter((s) => s.title || s.desc);

  return (
    <Section {...storyblokEditable(blok as any)}>
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
        {blok.eyebrow && (
          <span className="font-mono text-xs uppercase tracking-widest text-amber-700">{blok.eyebrow}</span>
        )}
        {blok.headline && (
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-amber-950 sm:text-4xl">
            {blok.headline}
          </h2>
        )}
        {blok.subheadline && (
          <p className="font-sans text-stone-500 text-base leading-relaxed">{blok.subheadline}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-4 relative">
        <div className="hidden md:block absolute top-12 left-12 right-12 h-0.5 bg-stone-200 z-0"></div>
        {steps.map((step, i) => (
          <div key={i} className="relative flex flex-col items-center text-center space-y-4 z-10 px-2 group">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 border border-stone-250 text-amber-950 text-lg font-bold font-mono transition-colors group-hover:bg-amber-700 group-hover:text-white">
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3 className="font-sans text-lg font-bold text-stone-900 mt-2">{step.title}</h3>
            <p className="text-sm text-stone-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
