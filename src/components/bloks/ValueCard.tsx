import {storyblokEditable} from '@storyblok/react/rsc';
import {
  Award,
  BrainCircuit,
  HeartHandshake,
  Milestone,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Building,
} from 'lucide-react';
import Card from '../ui/card';
import type {BlokBase} from '../../types';

const ICONS: Record<string, any> = {
  Award,
  BrainCircuit,
  HeartHandshake,
  Milestone,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Building,
};

interface ValueCardBlok extends BlokBase {
  icon?: string;
  title?: string;
  description?: string;
}

export default function ValueCard({blok}: {blok: ValueCardBlok}) {
  const Icon = ICONS[blok.icon || 'Sparkles'] || Sparkles;
  return (
    <Card
      {...storyblokEditable(blok as any)}
      padding="md"
      className="flex flex-col justify-start shadow-sm"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 border border-stone-250">
        <Icon className="h-6 w-6 text-amber-800" />
      </div>
      {blok.title && <h3 className="font-sans text-lg font-bold text-stone-900 mb-2">{blok.title}</h3>}
      {blok.description && (
        <p className="font-sans text-sm text-stone-500 leading-relaxed">{blok.description}</p>
      )}
    </Card>
  );
}
