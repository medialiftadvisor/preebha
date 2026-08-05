import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Editorial Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-luxury-black text-ivory overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=2000"
            alt="THE WORLD OF PREEBHA"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-blush font-semibold block">THE WORLD OF PREEBHA</span>
          <h1 className="font-serif-luxury text-5xl sm:text-7xl uppercase tracking-tight text-ivory">
            ELEGANCE, REDEFINED.
          </h1>
          <p className="text-base sm:text-lg text-ivory/80 font-light max-w-2xl mx-auto leading-relaxed">
            PREEBHA Lifestyle is a contemporary women&apos;s fashion and lifestyle brand shaped by a simple belief — true elegance should feel effortless.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-plum font-semibold block">OUR STORY</span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl text-luxury-black uppercase leading-tight">
              CRAFTED FOR MOMENTS THAT MATTER.
            </h2>
            <p className="text-sm text-charcoal/80 font-light leading-relaxed">
              Founded with a passion for modern Indian craftsmanship, PREEBHA Lifestyle celebrates femininity through clean lines, tactile textiles, and graceful silhouettes.
            </p>
            <p className="text-sm text-charcoal/80 font-light leading-relaxed">
              Every tunic, kurta set, and flowing co-ord ensemble in our atelier is thoughtfully developed to transition seamlessly from quiet everyday moments to festive boutique celebrations.
            </p>
          </div>

          <div className="relative aspect-4/5 rounded overflow-hidden shadow-xl bg-sand">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200"
              alt="PREEBHA Story Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY & DESIGNED FOR HER */}
      <section className="bg-sand/30 py-20 border-y border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-plum font-semibold">OUR PHILOSOPHY</span>
            <h2 className="font-serif-luxury text-4xl text-luxury-black uppercase">
              MODERN INDIA, GLOBAL VISION.
            </h2>
            <p className="text-xs text-charcoal/70 font-light">
              We bridge traditional artisanal handloom embroidery with contemporary international luxury aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-ivory p-8 rounded border border-sand space-y-3 text-center">
              <h3 className="font-serif-luxury text-xl text-plum uppercase font-semibold">DESIGNED FOR HER</h3>
              <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                Tailored cuts and flattering lengths created specifically around the proportions of the modern woman.
              </p>
            </div>

            <div className="bg-ivory p-8 rounded border border-sand space-y-3 text-center">
              <h3 className="font-serif-luxury text-xl text-plum uppercase font-semibold">TACTILE SILKS & LINENS</h3>
              <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                Handpicked breathable Chanderi silks, pure cottons, and soft micro velvet fabrics that feel as divine as they look.
              </p>
            </div>

            <div className="bg-ivory p-8 rounded border border-sand space-y-3 text-center">
              <h3 className="font-serif-luxury text-xl text-plum uppercase font-semibold">HERITAGE ZARI EMBROIDERY</h3>
              <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                Intricate gold zari, pearl motifs, and scalloped organza borders created by master Indian artisans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif-luxury text-4xl text-luxury-black uppercase tracking-wide">
          EXPLORE THE NEW COLLECTION
        </h2>
        <p className="text-xs text-charcoal/70 font-light max-w-md mx-auto">
          Discover hand-sculpted zari tunic sets and modern feminine co-ords.
        </p>
        <div>
          <Link
            href="/shop"
            className="px-8 py-4 bg-plum text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-luxury-black transition-colors inline-block shadow-md"
          >
            DISCOVER THE CATALOG
          </Link>
        </div>
      </section>
    </div>
  );
}
