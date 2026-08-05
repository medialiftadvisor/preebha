'use client';

import { useState } from 'react';
import { Layout, Save, Check } from 'lucide-react';

export default function AdminContentPage() {
  const [saved, setSaved] = useState(false);

  const [content, setContent] = useState({
    announcement: 'Welcome to PREEBHA — Elegance, Redefined.',
    heroEyebrow: 'THE NEW COLLECTION',
    heroTitle: 'ELEGANCE, REDEFINED.',
    heroCopy: 'Contemporary silhouettes. Timeless femininity. Thoughtfully designed for the modern woman.',
    heroPrimaryCta: 'SHOP NEW ARRIVALS',
    heroSecondaryCta: 'DISCOVER PREEBHA',
    editorialEyebrow: 'THE WORLD OF PREEBHA',
    editorialHeading: 'DESIGNED FOR THE WAY YOU LIVE.',
    signatureHeading: 'TIMELESS BY DESIGN.',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-sand pb-4">
        <span className="text-xs uppercase tracking-[0.25em] text-plum font-semibold">CMS Manager</span>
        <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
          Homepage Content CMS
        </h1>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs rounded flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>Homepage CMS content published successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-sand/30 p-8 rounded border border-sand space-y-6 shadow-xs">
        {/* Announcement Bar CMS */}
        <div className="space-y-3 border-b border-sand pb-6">
          <h3 className="font-serif-luxury text-xl text-luxury-black uppercase">Announcement Bar</h3>
          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Top Bar Promotional Message
            </label>
            <input
              type="text"
              value={content.announcement}
              onChange={(e) => setContent({ ...content, announcement: e.target.value })}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            />
          </div>
        </div>

        {/* Hero Section CMS */}
        <div className="space-y-4 border-b border-sand pb-6">
          <h3 className="font-serif-luxury text-xl text-luxury-black uppercase">Hero Section Copy</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                Eyebrow Label
              </label>
              <input
                type="text"
                value={content.heroEyebrow}
                onChange={(e) => setContent({ ...content, heroEyebrow: e.target.value })}
                className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum uppercase"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                Main Hero Heading
              </label>
              <input
                type="text"
                value={content.heroTitle}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum uppercase font-serif-luxury"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                Hero Subheading / Body Copy
              </label>
              <textarea
                rows={2}
                value={content.heroCopy}
                onChange={(e) => setContent({ ...content, heroCopy: e.target.value })}
                className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors shadow-md flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>PUBLISH HOMEPAGE CONTENT</span>
        </button>
      </form>
    </div>
  );
}
