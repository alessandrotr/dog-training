import React from 'react';
import { Sparkles, Instagram, Facebook, Mail, Phone, MapPin, Award } from 'lucide-react';
import { useNavigate } from '../../lib/navigation';

export default function Footer() {
  const setCurrentPage = useNavigate();

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <footer className="bg-stone-900 text-stone-200 border-t border-stone-850 pt-16 pb-24 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top visual board */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8 pb-12 border-b border-stone-800">
          
          {/* Logo & Bio Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-800 text-stone-100">
                <Sparkles className="h-5 w-5 rotate-12" />
              </div>
              <div>
                <span className="block font-sans text-lg font-bold tracking-tight text-white">NORDDOG</span>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-stone-400 -mt-1">Gentle Education</span>
              </div>
            </div>
            <p className="text-sm text-stone-400 max-w-xs leading-relaxed">
              Premium, evidence-based, force-free canine education. Bringing Scandinavian warmth and peaceful training methodologies into Seattle and Bellevue homes.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                id="social-instagram"
                href="https://instagram.com/norddog.canine"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 bg-stone-800 hover:bg-amber-800 transition-colors text-stone-400 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                id="social-facebook"
                href="https://facebook.com/norddog.canine"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 bg-stone-800 hover:bg-amber-800 transition-colors text-stone-400 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4">Directories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  id="foot-link-home"
                  onClick={() => handleNavClick('home')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Home Dashboard
                </button>
              </li>
              <li>
                <button
                  id="foot-link-about"
                  onClick={() => handleNavClick('about')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  About Clara
                </button>
              </li>
              <li>
                <button
                  id="foot-link-services"
                  onClick={() => handleNavClick('services')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Training programs
                </button>
              </li>
              <li>
                <button
                  id="foot-link-blog"
                  onClick={() => handleNavClick('blog')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Behavior Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4 font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  id="foot-link-testimonials"
                  onClick={() => handleNavClick('testimonials')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Success Stories
                </button>
              </li>
              <li>
                <button
                  id="foot-link-faq"
                  onClick={() => handleNavClick('faq')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  id="foot-link-booking"
                  onClick={() => handleNavClick('booking')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400 text-left"
                >
                  Calendly Booking portal
                </button>
              </li>
              <li>
                <button
                  id="foot-link-contact"
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Emergency Contact & Enquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Trust Certifications Column */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-1 font-semibold">Accreditations</h3>
            <div className="space-y-3.5">
              <div className="flex items-start space-x-3 text-stone-450 text-xs">
                <Award className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-stone-200">CCPDT-KA Certified</p>
                  <p className="text-stone-500">Certification for Professional Dog Trainers</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-stone-450 text-xs">
                <Award className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-stone-200">IAABC Consultant</p>
                  <p className="text-stone-500">Intl Association of Animal Behavior Consultants</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-stone-450 text-xs">
                <Award className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-stone-200">Fear-Free Certified</p>
                  <p className="text-stone-500">Dedicated to preventing fear, stress, & anxiety</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-stone-800 text-sm font-mono text-stone-400">
          <div className="flex items-center space-x-2.5">
            <MapPin className="h-4 w-4 text-amber-700" />
            <span>42 Moss Ridge Road, Bellevue, WA 98004</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Phone className="h-4 w-4 text-amber-700" />
            <span>+1 (555) 019-2819</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Mail className="h-4 w-4 text-amber-700" />
            <span>hello@norddogcanine.com</span>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-xs text-stone-500 leading-normal">
          <p>© 2026 NordDog Canine Academy LLC. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Force-Free & Scientifically Aligned</span>
            <span>Scandinavian Philosophy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
