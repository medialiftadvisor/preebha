export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-charcoal font-light leading-relaxed">
      <div className="border-b border-sand pb-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-plum font-semibold block">Legal Documentation</span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-wide">
          Terms & Conditions
        </h1>
        <p className="text-[11px] text-neutral-500 mt-1">Effective Date: August 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif-luxury text-xl text-luxury-black uppercase">1. Website Use & Intellectual Property</h2>
        <p>All designs, photography, luxury branding elements, graphics, and text on this site belong exclusively to PREEBHA Lifestyle. Unauthorized copying or redistribution is strictly prohibited.</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif-luxury text-xl text-luxury-black uppercase">2. Product Pricing & Availability</h2>
        <p>All prices listed on PREEBHA Lifestyle are in Indian Rupees (INR) and are inclusive of GST. We reserve the right to modify prices or adjust collection availability without prior notice.</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif-luxury text-xl text-luxury-black uppercase">3. Corporate Entity Details</h2>
        <div className="bg-sand/40 p-4 rounded border border-sand space-y-1 font-mono text-[11px]">
          <p><strong>Entity:</strong> [LEGAL LLP NAME]</p>
          <p><strong>Office Address:</strong> [REGISTERED OFFICE]</p>
          <p><strong>GST Registration:</strong> [GSTIN]</p>
          <p><strong>Contact Desk:</strong> [CONTACT EMAIL] | [CONTACT NUMBER]</p>
        </div>
      </section>
    </div>
  );
}
