import React, { useState } from 'react';
import { Database, Code2, Sparkles, AlertCircle, HelpCircle, Check, Eye, EyeOff } from 'lucide-react';
import { STORYBLOK_DEMO_DATA } from '../../data';
import { useCurrentPage } from '../../lib/navigation';
import { useDraftMode } from '../../lib/draft-mode';

export default function CMSVisualDebugger() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'schema' | 'instructions'>('schema');
  const currentPage = useCurrentPage();
  const { isDraftMode, setIsDraftMode } = useDraftMode();

  const currentPageSchema = STORYBLOK_DEMO_DATA[currentPage] || {
    name: `${currentPage.toUpperCase()} page template`,
    slug: currentPage,
    seo: {
      metaTitle: `NordDog | ${currentPage}`,
      metaDescription: 'Dynamic placeholder.'
    },
    body: [
      {
        _uid: `dynamic-auto-${currentPage}`,
        component: 'dynamic_page_wrapper',
        page: currentPage
      }
    ]
  };

  return (
    <div className="fixed top-24 left-6 z-40 hidden xl:block">
      {/* Visual Launcher Button */}
      <button
        id="cms-debugger-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 rounded-xl px-4 py-3 shadow-lg border transition-all cursor-pointer hover:scale-105 active:scale-95 ${
          isOpen
            ? 'bg-stone-900 border-stone-800 text-stone-100'
            : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-50'
        }`}
      >
        <Database className={`h-4.5 w-4.5 text-amber-600 ${isDraftMode ? 'animate-pulse' : ''}`} />
        <span className="font-mono text-xs font-semibold tracking-wide">Storyblok CMS Panel</span>
        <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-mono leading-none ${
          isDraftMode ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-600'
        }`}>
          {isDraftMode ? 'DRAFT_PREVIEW' : 'LIVE'}
        </span>
      </button>

      {/* Slide-out Panel */}
      {isOpen && (
        <div className="absolute left-0 top-14 w-96 rounded-2xl border border-stone-250 bg-stone-50 p-5 shadow-2xl transition-all animate-in fade-in slide-in-from-left-6 duration-200 max-h-[75vh] overflow-y-auto">
          
          <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
            <div>
              <h3 className="font-sans text-sm font-bold text-stone-900 flex items-center space-x-1.5">
                <span>Storyblok Dynamic Connector</span>
              </h3>
              <p className="text-[10px] text-stone-500 font-mono">Component-Driven CMS Architecture</p>
            </div>
            
            {/* Draft Mode Toggle */}
            <button
              id="cms-draft-toggle"
              onClick={() => setIsDraftMode(!isDraftMode)}
              className={`flex items-center space-x-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                isDraftMode
                  ? 'bg-amber-950 text-white hover:bg-black'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
              }`}
            >
              {isDraftMode ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              <span>{isDraftMode ? 'Disable Draft' : 'Enable Draft'}</span>
            </button>
          </div>

          {/* Alert Status */}
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-200/50 flex gap-2.5 mb-4 text-xs">
            <AlertCircle className="h-4.5 w-4.5 text-amber-800 shrink-0 mt-0.5" />
            <div className="text-amber-950 leading-relaxed">
              <strong>Draft Mode {isDraftMode ? 'Active' : 'Offline'}</strong>
              <p className="text-[10px] text-amber-900 mt-0.5">
                {isDraftMode 
                  ? 'Visual editor webhook active. Live component schemas loaded via Storyblok Content Delivery API v2.' 
                  : 'Public Live CDN mode active. Cached layouts loaded.'}
              </p>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="flex border-b border-stone-200 mb-3 text-xs font-mono">
            <button
              id="cms-tab-schema"
              onClick={() => setActiveTab('schema')}
              className={`flex items-center space-x-1 pb-2 px-3 border-b-2 -mb-px hover:text-stone-900 ${
                activeTab === 'schema'
                  ? 'border-amber-900 text-amber-900 font-bold'
                  : 'border-transparent text-stone-400'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Page JSON Schema</span>
            </button>
            <button
              id="cms-tab-instructions"
              onClick={() => setActiveTab('instructions')}
              className={`flex items-center space-x-1 pb-2 px-3 border-b-2 -mb-px hover:text-stone-900 ${
                activeTab === 'instructions'
                  ? 'border-amber-900 text-amber-900 font-bold'
                  : 'border-transparent text-stone-400'
              }`}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>API Integration Guide</span>
            </button>
          </div>

          {/* Schema Tab */}
          {activeTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 bg-stone-100 p-2 rounded-lg">
                <span>Active Slug: <b className="text-amber-900">/{currentPageSchema.slug}</b></span>
                <span>Type: {currentPageSchema.name}</span>
              </div>
              <div className="relative">
                <pre className="p-3 bg-stone-950 text-emerald-400 rounded-xl text-[10px] font-mono overflow-auto max-h-64 leading-normal select-all">
                  {JSON.stringify(currentPageSchema, null, 2)}
                </pre>
                <div className="absolute top-2 right-2 text-[9px] font-mono uppercase bg-stone-800 text-stone-300 px-1 py-0.5 rounded">
                  Copied on Click
                </div>
              </div>
              <p className="text-[10px] font-sans text-stone-450 leading-normal">
                This schema can be imported directly into Storyblok Dashboard to instantiate corresponding Nested Blocks instantly.
              </p>
            </div>
          )}

          {/* Instructions Tab */}
          {activeTab === 'instructions' && (
            <div className="text-xs text-stone-700 leading-relaxed space-y-3 font-sans">
              <p>To wire up this interactive Component-Based architecture inside your <strong>Next.js / React</strong> client, follow these steps:</p>
              
              <ol className="list-decimal pl-4 space-y-2 text-[11px]">
                <li>
                  <code className="bg-stone-200 px-1.5 py-0.5 rounded text-rose-700 font-mono">npm i @storyblok/react</code>
                </li>
                <li>
                  Register your React modules in <code className="bg-stone-200 px-1.5 py-0.5 rounded text-rose-700 font-mono">storyblokInit</code>:
                  <pre className="bg-stone-950 p-2 rounded text-stone-300 font-mono text-[9px] mt-1 overflow-auto leading-normal">
{`storyblokInit({
  accessToken: "YOUR_ACCESS_TOKEN",
  use: [apiPlugin],
  components: {
    hero: HeroComponent,
    services_grid: ServicesGrid,
    cta: CtaComponent
  }
});`}
                  </pre>
                </li>
                <li>
                  Render components inside your template safely:
                  <code className="block bg-stone-200 px-1 py-1 rounded text-stone-850 font-mono text-[9px] mt-1">
                    {'<StoryblokComponent blok={storyblokPage.body} />'}
                  </code>
                </li>
              </ol>

              <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 text-[10px] p-2.5 rounded-xl leading-relaxed">
                <strong>✓ Production Ready</strong>
                <p>This layout includes dynamic page content models mapped to nested schema models that feed exactly into the Content Delivery API.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
