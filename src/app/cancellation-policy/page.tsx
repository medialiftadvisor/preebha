export default function CancellationPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-charcoal font-light leading-relaxed">
      <div className="border-b border-sand pb-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-plum font-semibold block">Store Policy</span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-wide">
          Cancellation Policy
        </h1>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif-luxury text-xl text-luxury-black uppercase">1. Order Cancellations</h2>
        <p>Orders can be cancelled free of charge prior to shipment dispatch. Once an order is handed over to the courier partner, cancellation requests cannot be processed directly; however, you may refuse delivery or request a return upon arrival.</p>
      </section>
    </div>
  );
}
