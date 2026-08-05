'use client';

import { useState } from 'react';
import { Settings, Save, Check } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    brandName: 'PREEBHA Lifestyle',
    legalName: 'PREEBHA LIFESTYLE PRIVATE LIMITED',
    gstin: '07AAAAA0000A1Z5',
    address: 'PREEBHA Atelier, 42 Fashion Avenue, Connaught Place, New Delhi - 110001, India',
    email: 'care@preebhalifestyle.com',
    phone: '+91 98765 43210',
    codEnabled: true,
    codFee: '99',
    freeShippingThreshold: '2999',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-sand pb-4">
        <span className="text-xs uppercase tracking-[0.25em] text-plum font-semibold">Store Configuration</span>
        <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
          Business & Store Settings
        </h1>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs rounded flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>Business settings successfully updated and saved!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-sand/30 p-8 rounded border border-sand space-y-6 shadow-xs">
        <h3 className="font-serif-luxury text-xl text-luxury-black uppercase border-b border-sand pb-2">
          Legal & Tax Identity
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Brand Name
            </label>
            <input
              type="text"
              value={form.brandName}
              onChange={(e) => setForm({ ...form, brandName: e.target.value })}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Legal Business Name (for Invoice)
            </label>
            <input
              type="text"
              value={form.legalName}
              onChange={(e) => setForm({ ...form, legalName: e.target.value })}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum font-mono"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              GSTIN Tax Identifier
            </label>
            <input
              type="text"
              value={form.gstin}
              onChange={(e) => setForm({ ...form, gstin: e.target.value })}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum font-mono uppercase"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Customer Care Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Registered Office Address
            </label>
            <textarea
              rows={2}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            />
          </div>
        </div>

        <h3 className="font-serif-luxury text-xl text-luxury-black uppercase border-b border-sand pb-2 pt-4">
          Shipping & COD Settings
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Free Shipping Threshold (₹)
            </label>
            <input
              type="number"
              value={form.freeShippingThreshold}
              onChange={(e) => setForm({ ...form, freeShippingThreshold: e.target.value })}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              COD Convenience Fee (₹)
            </label>
            <input
              type="number"
              value={form.codFee}
              onChange={(e) => setForm({ ...form, codFee: e.target.value })}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="flex items-center space-x-2 text-xs text-charcoal cursor-pointer">
              <input
                type="checkbox"
                checked={form.codEnabled}
                onChange={(e) => setForm({ ...form, codEnabled: e.target.checked })}
                className="text-plum focus:ring-plum"
              />
              <span>Enable Cash On Delivery (COD) Option</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors shadow-md flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </form>
    </div>
  );
}
