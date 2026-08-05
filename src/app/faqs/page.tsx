export default function FAQsPage() {
  const faqs = [
    {
      q: 'What fabrics does PREEBHA Lifestyle use for ethnic wear?',
      a: 'We use premium Chanderi silks, pure cottons, organzas, and raw silks sourced from traditional weaver clusters in Jaipur and Varanasi.',
    },
    {
      q: 'How long does Pan-India shipping take?',
      a: 'Orders are processed within 24 hours. Standard delivery takes 3 to 6 business days across all serviceable Indian pincodes.',
    },
    {
      q: 'Can I return or exchange a size if it doesn’t fit perfectly?',
      a: 'Yes! We offer a 7-day hassle-free doorstep return and exchange policy for all eligible unused products.',
    },
    {
      q: 'What payment methods are accepted?',
      a: 'We accept Razorpay UPI (Google Pay, PhonePe, Paytm), Credit Cards, Debit Cards, Net Banking, and Cash On Delivery (COD).',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2 border-b border-sand pb-6">
        <span className="text-xs uppercase tracking-[0.3em] text-dusty-rose font-semibold">Help Center</span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-wide">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-sand/30 p-6 rounded border border-sand space-y-2">
            <h3 className="font-serif-luxury text-lg text-luxury-black font-semibold">
              {faq.q}
            </h3>
            <p className="text-xs text-charcoal/80 font-light leading-relaxed">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
