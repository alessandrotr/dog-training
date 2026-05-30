'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Award, Star, ArrowLeft, ArrowUpRight, MessageSquareQuote } from 'lucide-react';
import { useNavigate, usePostNavigate } from '../../lib/navigation';
import type { ServiceItem, TestimonialItem, BlogPost, Localized } from '../../types';

interface HomeProps {
  servicesByLang: Localized<ServiceItem>;
  testimonialsByLang: Localized<TestimonialItem>;
  postsByLang: Localized<BlogPost>;
}

export default function Home({ servicesByLang, testimonialsByLang, postsByLang }: HomeProps) {
  const setCurrentPage = useNavigate();
  const goToPost = usePostNavigate();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'de' ? 'de' : 'en') as 'en' | 'de';

  const testimonials = testimonialsByLang[lang];
  const services = servicesByLang[lang];
  const blogPosts = postsByLang[lang];

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const activeTestimonial = testimonials[currentTestimonialIndex];

  const handleNavigateToService = (slug: string) => {
    setCurrentPage('services');
  };

  const handleNavigateToPost = (slug: string) => {
    goToPost(slug);
  };

  return (
    <div className="space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 to-stone-50 pt-16 md:pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-1.5 rounded-full bg-stone-200 px-3.5 py-1 text-xs font-mono text-stone-700">
                <span>SCANDINAVIAN CANINE EDUCATION</span>
              </div>
              
              <h1 className="font-sans text-4xl font-extrabold tracking-tight text-amber-950 sm:text-5xl md:text-6xl leading-[1.08]">
                Cultivating Calm, <br />
                <span className="text-amber-800 font-serif italic font-normal">Connected</span> Companions
              </h1>
              
              <p className="font-sans text-lg text-stone-600 max-w-2xl leading-relaxed">
                Crafting premium, scientifically backed, force-free canine education. Specialized private training and behavior modification shaped around your unique family lifestyle.
              </p>
              
              {/* Action Rows */}
              <div className="flex flex-col sm:flex-row gap-4 pt-3">
                <button
                  id="hero-primary-cta"
                  onClick={() => setCurrentPage('booking')}
                  className="rounded-xl bg-amber-900 px-6 py-4 text-sm font-semibold text-white shadow-md hover:bg-amber-950 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Book Free Consult</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
                
                <button
                  id="hero-secondary-cta"
                  onClick={() => setCurrentPage('services')}
                  className="rounded-xl border border-stone-300 bg-white px-6 py-4 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-all cursor-pointer flex items-center justify-center"
                >
                  Browse Services
                </button>
              </div>

              {/* Direct line trust under key */}
              <div className="flex items-center space-x-1.5 text-xs text-stone-400 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Clara is available for in-person consults in Seattle & Bellevue</span>
              </div>
            </div>

            {/* Right Image Layout Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                {/* Visual back glow */}
                <div className="absolute -inset-1 rounded-3xl bg-amber-900/10 blur-xl"></div>
                
                {/* Primary Premium Image */}
                <div className="relative overflow-hidden rounded-3xl border-8 border-white bg-stone-105 shadow-2xl aspectRatio-16/9">
                  <img
                    src="/assets/images/hero_trainer_1780093921073.png"
                    alt="Clara training a dynamic dog"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Overlapping Certifications Badge */}
                <div className="absolute -bottom-6 -left-6 rounded-2xl bg-stone-900 p-4 text-stone-100 shadow-xl border border-stone-800 flex items-center space-x-3.5 max-w-[240px]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-800 text-amber-100">
                    <Award className="h-5.5 w-5.5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold leading-tight font-sans text-stone-100">Certified Behavior Professional</p>
                    <p className="text-[10px] font-mono text-stone-400">CCPDT & IAABC Accredited</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST INDICATORS SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-stone-100 p-8 md:p-12 border border-stone-200/60 shadow-sm">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x md:divide-stone-200">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <span className="font-serif italic text-4xl font-semibold text-amber-950">12+ Years</span>
              <p className="font-sans text-sm text-stone-600 font-medium">Expert Canine Instruction</p>
              <p className="font-mono text-[10px] text-stone-400 uppercase tracking-wider">Clinical Behavior Background</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <span className="font-serif italic text-4xl font-semibold text-amber-950">1,400+ Dogs</span>
              <p className="font-sans text-sm text-stone-600 font-medium">Rehabilitated & Welcomed</p>
              <p className="font-mono text-[10px] text-stone-400 uppercase tracking-wider">From Puppies to Reactive Seniors</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <span className="font-serif italic text-4xl font-semibold text-amber-950 text-emerald-800 flex items-center justify-center">
                4.9 <Star className="h-5 w-5 fill-emerald-700 stroke-none ml-1 shrink-0" />
              </span>
              <p className="font-sans text-sm text-stone-600 font-medium font-semibold">180+ Google Reviews</p>
              <p className="font-mono text-[10px] text-stone-400 uppercase tracking-wider">100% Force-Free Methodology</p>
            </div>

          </div>

          {/* Trusted Badges */}
          <div className="mt-8 border-t border-stone-200/80 pt-8 text-center">
            <p className="font-sans text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Credentials & Safe methods verified by</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-stone-400 text-xs font-mono">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-700" />
                <span>Association of Professional Dog Trainers</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-700" />
                <span>CCPDT Governing Body</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-700" />
                <span>Fear-Free Pets Association</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-700">EXPERTISE TAILORED FOR INDIVIDUALS</span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-amber-950 sm:text-4xl">
            Our Core In-Home Disciplines
          </h2>
          <p className="font-sans text-stone-500 text-base leading-relaxed">
            Every canine is completely unique. Rather than uniform templates, we implement specialized science based habit coaching aligned with your dog’s age, emotional threshold, and goals.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.slice(0, 3).map((svc, idx) => (
            <div
              key={svc.id}
              id={`service-card-${svc.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-amber-900/20"
            >
              {/* Image box preview */}
              <div className="relative overflow-hidden rounded-xl bg-stone-100 mb-5 max-h-48 aspect-video">
                <img
                  src={svc.imageUrl}
                  alt={svc.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 rounded-md bg-stone-900/90 text-stone-100 text-[10px] font-mono px-2 py-1 uppercase tracking-wide">
                  {svc.duration}
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 space-y-2 text-left">
                <h3 className="font-sans text-lg font-bold text-stone-900 group-hover:text-amber-950 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs font-mono text-amber-850 font-semibold">{svc.price}</p>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {svc.shortDescription}
                </p>
              </div>

              {/* Mini specs list */}
              <ul className="my-4 space-y-1.5 border-t border-stone-100 pt-4 text-left">
                {svc.features.slice(0, 3).map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center space-x-2 text-xs text-stone-600">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-800"></span>
                    <span className="truncate">{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Action */}
              <button
                id={`btn-service-view-${svc.id}`}
                onClick={() => handleNavigateToService(svc.slug)}
                className="mt-2 flex w-full items-center justify-center space-x-1 rounded-xl bg-stone-50 py-2.5 text-xs font-semibold text-stone-700 transition-colors group-hover:bg-amber-900 group-hover:text-white"
              >
                <span>View Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            id="view-all-services-btn"
            onClick={() => handleNavigateToService('')}
            className="inline-flex items-center space-x-2 font-mono text-xs font-bold tracking-wider text-amber-900 hover:text-amber-950 transition-colors cursor-pointer group"
          >
            <span>VIEW ALL COMPREHENSIVE PROGRAMS</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* 4. TESTIMONIALS CAROUSEL SECTION */}
      <section className="bg-stone-105 border-y border-stone-200/80 py-20 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-150 mb-4 text-amber-900">
            <MessageSquareQuote className="h-6 w-6" />
          </div>

          <span className="block font-mono text-xs uppercase tracking-widest text-amber-700 mb-2">Google Verified Client Reviews</span>
          
          {/* Active story visual module */}
          {activeTestimonial && (
          <div className="min-h-[220px] flex flex-col justify-between max-w-2xl mx-auto space-y-6 pt-4">
            <blockquote className="font-serif text-xl sm:text-2xl font-normal text-amber-950 leading-relaxed italic">
              “{activeTestimonial.text}”
            </blockquote>

            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-0.5">
                {[...Array(activeTestimonial.rating)].map((_, rIdx) => (
                  <Star key={rIdx} className="h-4 w-4 fill-amber-600 stroke-none" />
                ))}
              </div>
              <div className="flex items-center space-x-3.5 pt-1.5">
                <img
                  src={activeTestimonial.imageUrl}
                  alt={activeTestimonial.name}
                  className="h-10 w-10 rounded-full object-cover border border-stone-200"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left font-sans">
                  <p className="text-sm font-bold text-stone-900leading-none">{activeTestimonial.name}</p>
                  <p className="text-xs text-stone-500 font-mono -mt-0.5">{activeTestimonial.dogBreed}</p>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Nav handlers */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              id="testimonial-prev"
              onClick={prevTestimonial}
              className="rounded-full border border-stone-300 bg-white p-2.5 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono text-stone-400">
              {currentTestimonialIndex + 1} of {testimonials.length}
            </span>
            <button
              id="testimonial-next"
              onClick={nextTestimonial}
              className="rounded-full border border-stone-300 bg-white p-2.5 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors focus:outline-none"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8">
            <button
              id="view-all-testimonials-btn"
              onClick={() => setCurrentPage('testimonials')}
              className="text-xs font-mono tracking-widest font-semibold text-stone-500 hover:text-amber-800 underline underline-offset-4 cursor-pointer"
            >
              Browse more Google Reviews
            </button>
          </div>
        </div>
      </section>

      {/* 5. "HOW IT WORKS" SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-700">OUR SIMPLE ROADMAP</span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-amber-950 sm:text-4xl">
            Success in Four Phases
          </h2>
          <p className="font-sans text-stone-500 text-base leading-relaxed">
            Rehabilitating behavior or raising a puppy doesn’t happen overhead. We partner continuously with you to create lasting canine composure.
          </p>
        </div>

        {/* Steps display in grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 relative">
          
          {/* Connector line (desktop-only) */}
          <div className="hidden md:block absolute top-12 left-12 right-12 h-0.5 bg-stone-200 z-0"></div>

          {/* Card Step 1 */}
          <div className="relative flex flex-col items-center text-center space-y-4 z-10 px-2 group">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 border border-stone-250 text-amber-950 text-lg font-bold font-mono transition-colors group-hover:bg-amber-900 group-hover:text-white">
              01
            </div>
            <h3 className="font-sans text-lg font-bold text-stone-900 mt-2">Dynamic Consult</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              We coordinate an initial, deep-dive 60-minute evaluation to map environmental stressors and behavioral thresholds in your house.
            </p>
          </div>

          {/* Card Step 2 */}
          <div className="relative flex flex-col items-center text-center space-y-4 z-10 px-2 group">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 border border-stone-250 text-amber-950 text-lg font-bold font-mono transition-colors group-hover:bg-amber-900 group-hover:text-white">
              02
            </div>
            <h3 className="font-sans text-lg font-bold text-stone-900 mt-2">Bespoke Blueprint</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              We design a beautiful, itemized clinical training roadmap detailing trigger management protocols, treat metrics, and physical layouts.
            </p>
          </div>

          {/* Card Step 3 */}
          <div className="relative flex flex-col items-center text-center space-y-4 z-10 px-2 group">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 border border-stone-250 text-amber-950 text-lg font-bold font-mono transition-colors group-hover:bg-amber-900 group-hover:text-white">
              03
            </div>
            <h3 className="font-sans text-lg font-bold text-stone-900 mt-2">Continuous Coaching</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              Our professional coaches work side-by-side with you during direct in-home lessons to build core communication and physical handling confidence.
            </p>
          </div>

          {/* Card Step 4 */}
          <div className="relative flex flex-col items-center text-center space-y-4 z-10 px-2 group">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 border border-stone-250 text-amber-950 text-lg font-bold font-mono transition-colors group-hover:bg-amber-900 group-hover:text-white">
              04
            </div>
            <h3 className="font-sans text-lg font-bold text-stone-900 mt-2">Lifetime Support</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              Receive direct WhatsApp support and custom homework checklists after every session. Join an exclusive list of local dog guardians.
            </p>
          </div>
          
        </div>
      </section>

      {/* 6. LATEST BLOG POSTS SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-2 text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-700">LATEST FREE CANINE RESOURCES</span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-amber-950">
              The Behavioral Study
            </h2>
          </div>
          <button
            id="all-blogs-btn"
            onClick={() => setCurrentPage('blog')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 font-mono text-xs font-bold tracking-wider text-amber-900 hover:text-amber-950 transition-colors"
          >
            <span>EXPLORE ALL RESEARCH ARTICLES</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Blog layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              id={`blog-card-${post.slug}`}
              className="group flex flex-col md:flex-row overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition-all hover:shadow-md cursor-pointer"
              onClick={() => handleNavigateToPost(post.slug)}
            >
              {/* Image */}
              <div className="md:w-1/3 relative h-48 md:h-full overflow-hidden rounded-xl bg-stone-150">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Words */}
              <div className="md:w-2/3 p-4 flex flex-col justify-between text-left space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                    <span className="uppercase text-amber-750 font-bold">{post.category}</span>
                    <span>{post.publishDate}</span>
                  </div>
                  <h3 className="font-sans text-base font-bold text-stone-900 group-hover:text-amber-950 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-stone-100 pt-3 text-[11px] font-mono">
                  <span className="text-amber-900 font-semibold group-hover:underline">Read Article →</span>
                  <span className="text-stone-400">{post.readingTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-amber-950 px-6 py-16 text-center text-stone-100 shadow-xl md:px-12 md:py-20">
          
          <div className="absolute top-0 right-0 h-64 w-64 bg-amber-900/20 blur-3xl rounded-full"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="font-sans text-3xl font-extrabold tracking-tight sm:text-4xl text-stone-50">
              Ready for a Peaceful Household?
            </h2>
            <p className="font-sans text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
              Schedule a comprehensive and completely free behavior consult Call to walk through your dog’s triggers and receive instant, actionable feedback.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <button
                id="cta-book-consult-btn"
                onClick={() => setCurrentPage('booking')}
                className="rounded-xl bg-amber-800 px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-md hover:bg-amber-700 transition"
              >
                Schedule Consultation
              </button>
              <button
                id="cta-contact-btn"
                onClick={() => setCurrentPage('contact')}
                className="rounded-xl border border-stone-700 bg-stone-900 px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider text-stone-200 hover:bg-stone-850 hover:text-white transition"
              >
                Send Direct Message
              </button>
            </div>
            <p className="text-[10px] text-stone-450 font-mono">
              In-home assessment times are strictly limited each week. Zero obligation.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
