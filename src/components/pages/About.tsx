import React from 'react';
import { Award, CheckCircle, Sparkles, Star, Milestone, Building, BrainCircuit, HeartHandshake } from 'lucide-react';
import { IMAGES } from '../../data';

interface AboutProps {
  setCurrentPage: (page: string) => void;
}

export default function About({ setCurrentPage }: AboutProps) {
  
  const coreValues = [
    {
      id: 'val-1',
      title: 'Evidence-Based Methods',
      description: 'We strictly align our methods with modern canine cognitive science. We utilize positive reinforcement to alter underlying emotional responses rather than masking behaviors through fear or intimidation.',
      icon: <BrainCircuit className="h-6 w-6 text-amber-830" />
    },
    {
      id: 'val-2',
      title: 'Empathy for Handlers',
      description: 'Living with an anxious or reactive dog is emotionally taxing. We never shame or judge. We cultivate an inclusive, encouraging learning environment for the human end of the leash.',
      icon: <HeartHandshake className="h-6 w-6 text-amber-830" />
    },
    {
      id: 'val-3',
      title: 'Clarity & Consistency',
      description: 'Dogs thrive on routine. We break down complex behavioral mechanics into clean worksheets, direct visual markers, and step-by-step guides so consistency is trivial for your household.',
      icon: <Milestone className="h-6 w-6 text-amber-830" />
    },
  ];

  return (
    <div className="space-y-24 py-12 pb-24">
      
      {/* Bio / Brand Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Column 1: Image & Cred Box */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-[380px] mx-auto lg:max-w-none">
              <div className="absolute -inset-1 rounded-3xl bg-amber-905/10 blur-xl"></div>
              
              <div className="relative overflow-hidden rounded-3xl border-8 border-white shadow-2xl aspect-square bg-stone-100">
                <img
                  src={IMAGES.trainerAvatar}
                  alt="Clara Sorensen Head Trainer"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Verified badge */}
              <div className="absolute -bottom-6 -right-4 bg-emerald-50 text-emerald-950 border border-emerald-250 p-4 rounded-2xl shadow-lg flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="font-mono text-xs font-semibold">Active Practice WA State</span>
              </div>
            </div>
          </div>

          {/* Column 2: Narrative text */}
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-700">FOUNDING BEHAVIORIST BIOGRAPHY</span>
            <h1 className="font-sans text-3xl font-extrabold tracking-tight text-amber-955 sm:text-4xl">
              Meet Clara Sorensen
            </h1>
            
            <p className="font-sans text-stone-600 leading-relaxed text-base">
              Hi, I’m Clara. My journey into canine behavior started twelve years ago when I adopted standard reactive GSD mix Baxter. Walks were incredibly painful, stressful, and loaded with embarrassment. Despite following classic advice of using quick physical checks and loud corrections, Baxter’s reactivity only worsened.
            </p>

            <blockquote className="border-l-4 border-amber-800 pl-4 font-serif text-lg text-amber-950 italic">
              “I realized then that classical canine instruction was deeply outdated. We were trying to physically suppress a dog’s panic rather than addressing the root emotional source.”
            </blockquote>

            <p className="font-sans text-stone-600 leading-relaxed text-base">
              This drove me to study behavioral psychology and earn clinical certifications with CCPDT and IAABC. Today, I combine academic canine behavior science with a clean, gentle Scandinavian design philosophy: stripping away the noise, focusing on core communication, and constructing peaceful, trustworthy systems.
            </p>

            {/* Signature signoff */}
            <div className="pt-4 flex items-center space-x-4">
              <div className="text-left">
                <p className="font-serif italic text-lg text-amber-950 leading-none">Clara Sorensen</p>
                <p className="text-[10px] uppercase font-mono tracking-widest text-stone-400 mt-1">Founder & Head Consultant • CCPDT-KA</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Accreditation & Education Track */}
      <section className="bg-stone-100 py-16 border-y border-stone-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            
            {/* Certs List */}
            <div className="space-y-6">
              <h2 className="font-sans text-2xl font-extrabold text-amber-950">Accredited Pedigree</h2>
              <p className="text-sm text-stone-500">
                Canine training is fundamentally unregulated. Anyone can buy a leash and declare themselves a "behavior expert." Always protect your dog’s wellness by verifying active professional certifications.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-white p-4 border border-stone-200 flex gap-3">
                  <Award className="h-6 w-6 text-amber-800 shrink-0" />
                  <div className="text-left font-sans">
                    <p className="text-sm font-bold text-stone-900 leading-tight">CCPDT-KA</p>
                    <p className="text-[11px] text-stone-450 leading-relaxed mt-0.5">Certified Professional Dog Trainer - Knowledge Assessed. License #412093.</p>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-4 border border-stone-200 flex gap-3">
                  <Award className="h-6 w-6 text-amber-800 shrink-0" />
                  <div className="text-left font-sans">
                    <p className="text-sm font-bold text-stone-900 leading-tight">IAABC-ADT</p>
                    <p className="text-[11px] text-stone-450 leading-relaxed mt-0.5">Accredited Dog Trainer by the International Association of Animal Behavior Consultants.</p>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-4 border border-stone-200 flex gap-3">
                  <Award className="h-6 w-6 text-amber-800 shrink-0" />
                  <div className="text-left font-sans">
                    <p className="text-sm font-bold text-stone-900 leading-tight">Fear-Free Pets</p>
                    <p className="text-[11px] text-stone-450 leading-relaxed mt-0.5">Certified Professional handling protocols dedicated to complete emotional welfare.</p>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-4 border border-stone-200 flex gap-3">
                  <Award className="h-6 w-6 text-amber-800 shrink-0" />
                  <div className="text-left font-sans">
                    <p className="text-sm font-bold text-stone-900 leading-tight">Fear-Free Veterinary</p>
                    <p className="text-[11px] text-stone-450 leading-relaxed mt-0.5">Specialized clinical behavior and animal restraint certification for vet practices.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Continuing Education List */}
            <div className="rounded-2xl bg-white border border-stone-200 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-sans text-lg font-bold text-stone-900 mb-4 flex items-center space-x-1.5">
                  <Sparkles className="h-5 w-5 text-amber-805" />
                  <span>Clinical Training Focus</span>
                </h3>
                <ul className="space-y-3 font-sans text-sm text-stone-600">
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><b>Separation Anxiety Pro:</b> Specialized conditioning for severe isolated panic levels in urban apartments.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><b>Resource Guarding:</b> Safe protocols for toy, space, and food boundary guarding.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><b>Multi-Dog Household Dynamics:</b> Creating peaceful thresholds between sibling canine models.</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-stone-100 pt-6 mt-6">
                <button
                  id="about-cta-book"
                  onClick={() => setCurrentPage('booking')}
                  className="w-full text-center rounded-xl bg-stone-900 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-sm hover:bg-amber-950"
                >
                  Schedule 1-on-1 Consultation
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values / Philosophy Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 animate-fade-in">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-700">FOUNDATIONAL PILLARS</span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-amber-955">
            The NordDog Framework
          </h2>
          <p className="font-sans text-sm text-stone-500">
            How we think, act, and coach every day. No exceptions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-left">
          {coreValues.map((val) => (
            <div
              key={val.id}
              id={`val-card-${val.id}`}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm flex flex-col justify-start"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 border border-stone-250">
                {val.icon}
              </div>
              <h3 className="font-sans text-lg font-bold text-stone-900 mb-2">{val.title}</h3>
              <p className="font-sans text-sm text-stone-500 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
