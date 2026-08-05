export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-charcoal font-light leading-relaxed">
      <div className="border-b border-sand pb-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-plum font-semibold block">Customer Service</span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-wide">
          Shipping & Delivery Policy
        </h1>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif-luxury text-xl text-luxury-black uppercase">1. Pan-India Shipping Charges</h2>
        <p>PREEBHA Lifestyle offers <strong>Complimentary Express Shipping</strong> on all orders above ₹2,999 across India. For orders below ₹2,999, a nominal flat shipping fee of ₹149 is applied at checkout.</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif-luxury text-xl text-luxury-black uppercase">2. Order Processing & Timeline</h2>
        <p>Orders are dispatched within 24 to 48 hours of confirmation. Delivery timelines range between 3 to 6 business days depending on destination pincode serviceability.</p>
      </section>
    </div>
  );
}
