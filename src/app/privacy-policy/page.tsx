export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-charcoal font-light leading-relaxed">
      <div className="border-b border-sand pb-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-plum font-semibold block">Legal Notice</span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-wide">
          Privacy Policy
        </h1>
        <p className="text-[11px] text-neutral-500 mt-1">Last Updated: August 2026</p>
      </div>

      <div className="bg-blush/20 p-4 border border-blush rounded text-charcoal font-normal">
        <p className="font-semibold text-plum uppercase text-[11px]">Notice to Customer:</p>
        <p>This Privacy Policy applies to PREEBHA Lifestyle. Please note that legal corporate identifiers below are presented with designated placeholders for formal execution review.</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif-luxury text-xl text-luxury-black uppercase">1. Information We Collect</h2>
        <p>When you visit preebhalifestyle.com or make a purchase, we collect necessary customer details to process your boutique orders:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Account Details:</strong> Full Name, Email Address, Password, Phone Number.</li>
          <li><strong>Shipping Information:</strong> Doorstep address, City, State, PIN code, Landmark.</li>
          <li><strong>Payment Processing Data:</strong> Payment transaction tokens processed via 256-bit encrypted Razorpay integration.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif-luxury text-xl text-luxury-black uppercase">2. Use of Information</h2>
        <p>We utilize your personal information strictly to fulfill orders, process payments, provide shipping updates via courier partners (e.g. Shiprocket), and communicate exclusive drop announcements.</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif-luxury text-xl text-luxury-black uppercase">3. Legal Entity & Contact Details</h2>
        <div className="bg-sand/40 p-4 rounded border border-sand space-y-1 font-mono text-[11px]">
          <p><strong>Legal Entity Name:</strong> [LEGAL LLP NAME]</p>
          <p><strong>Registered Office:</strong> [REGISTERED OFFICE]</p>
          <p><strong>GSTIN Identifier:</strong> [GSTIN]</p>
          <p><strong>Official Contact Email:</strong> [CONTACT EMAIL]</p>
          <p><strong>Official Contact Number:</strong> [CONTACT NUMBER]</p>
        </div>
      </section>
    </div>
  );
}
