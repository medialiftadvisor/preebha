'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle2, ChevronDown } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>('orders');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      id: 'orders',
      q: 'How long does shipping take for PREEBHA orders?',
      a: 'Domestic orders across India are dispatched within 24-48 hours via premium express couriers (BlueDart / Delhivery). Delivery typically takes 3-5 business days.',
    },
    {
      id: 'returns',
      q: 'What is PREEBHA’s return & exchange policy?',
      a: 'We offer a 7-day hassle-free doorstep return and size exchange policy. Simply initiate a request from your Customer Account dashboard.',
    },
    {
      id: 'custom',
      q: 'Can I request custom size tailoring?',
      a: 'For boutique custom sizing requests or bridal ensemble inquiries, please reach out to our Atelier team via WhatsApp at +91 98765 43210.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-3 border-b border-sand pb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-plum font-semibold block">ATELIER CONCIERGE</span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl text-luxury-black uppercase tracking-wide">
          WE&apos;D LOVE TO HEAR FROM YOU.
        </h1>
        <p className="text-xs text-charcoal/70 max-w-md mx-auto font-light">
          Have a question about fit, fabric care, or your recent order? Our concierge team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Contact Info */}
        <div className="lg:col-span-5 space-y-8 bg-sand/30 p-8 rounded border border-sand">
          <h2 className="font-serif-luxury text-2xl text-luxury-black uppercase tracking-wide border-b border-sand pb-3">
            Customer Care
          </h2>

          <div className="space-y-6 text-xs text-charcoal">
            <div className="flex items-start space-x-3">
              <Mail className="w-4 h-4 text-plum shrink-0 mt-0.5" />
              <div>
                <strong className="block text-luxury-black uppercase tracking-wider mb-0.5">Email Concierge</strong>
                <a href="mailto:care@preebhalifestyle.com" className="hover:text-plum underline font-medium">
                  care@preebhalifestyle.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="w-4 h-4 text-plum shrink-0 mt-0.5" />
              <div>
                <strong className="block text-luxury-black uppercase tracking-wider mb-0.5">Phone & WhatsApp</strong>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-plum shrink-0 mt-0.5" />
              <div>
                <strong className="block text-luxury-black uppercase tracking-wider mb-0.5">Registered Atelier Address</strong>
                <p className="font-light">
                  PREEBHA Atelier, 42 Fashion Avenue, Connaught Place, New Delhi - 110001, India
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-plum shrink-0 mt-0.5" />
              <div>
                <strong className="block text-luxury-black uppercase tracking-wider mb-0.5">Concierge Hours</strong>
                <p className="font-light">Monday – Saturday: 10:00 AM – 7:00 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-ivory p-8 rounded border border-sand shadow-xs space-y-6">
          <h2 className="font-serif-luxury text-2xl text-luxury-black uppercase tracking-wide border-b border-sand pb-3">
            Send A Message
          </h2>

          {submitted ? (
            <div className="p-8 bg-sand/30 rounded border border-sand text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
              <h3 className="font-serif-luxury text-2xl text-luxury-black uppercase">Message Received</h3>
              <p className="text-xs text-charcoal/70">
                Thank you for contacting PREEBHA. Our concierge team will respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ananya Sharma"
                    className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@example.com"
                    className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Order Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="#PRB-1002"
                    className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you today?"
                  className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-luxury-black transition-colors shadow-md"
              >
                SEND MESSAGE
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto space-y-6 border-t border-sand pt-12">
        <h2 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-sand rounded bg-ivory p-4">
              <button
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-luxury-black text-left"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-plum transition-transform ${openFaq === faq.id ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === faq.id && (
                <p className="text-xs text-charcoal/80 font-light mt-3 leading-relaxed animate-fade-in border-t border-sand/60 pt-2">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
