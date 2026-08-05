import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Heart,
  Truck,
  Camera,
  Star,
  Quote,
  Check,
} from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const [newArrivals, bestSellers, categories] = await Promise.all([
    prisma.product.findMany({
      where: { isNewArrival: true },
      take: 4,
      include: { category: true, images: true, variants: true },
    }),
    prisma.product.findMany({
      where: { isBestSeller: true },
      take: 4,
      include: { category: true, images: true, variants: true },
    }),
    prisma.category.findMany({ take: 5 }),
  ]);

  return (
    <div className="space-y-24 pb-16">
      {/* 01: HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-luxury-black text-ivory overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-55">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=2000"
            alt="PREEBHA Editorial Hero"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <span className="text-xs uppercase tracking-[0.35em] text-blush font-semibold block">
              THE NEW COLLECTION
            </span>

            <h1 className="font-serif-luxury text-5xl sm:text-7xl uppercase tracking-tight leading-none text-ivory">
              ELEGANCE,<br />
              <span className="text-blush italic font-normal">REDEFINED.</span>
            </h1>

            <p className="text-base sm:text-lg text-ivory/80 font-light leading-relaxed max-w-lg">
              Contemporary silhouettes. Timeless femininity. Thoughtfully designed for the modern woman.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <Link
                href="/shop?filter=new-arrivals"
                className="px-8 py-4 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-ivory hover:text-luxury-black transition-all text-center shadow-lg"
              >
                SHOP NEW ARRIVALS
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border border-ivory/60 text-ivory text-xs uppercase tracking-widest font-medium hover:bg-ivory hover:text-luxury-black transition-all text-center"
              >
                DISCOVER PREEBHA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02: CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-wide">
            SHOP BY CATEGORY
          </h2>
          <p className="text-xs text-dusty-rose uppercase tracking-widest font-medium">
            Find your signature style.
          </p>
          <div className="w-12 h-0.5 bg-plum mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {(categories.length > 0
            ? categories
            : [
                { id: '1', name: 'Kurtis', slug: 'kurtis', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800' },
                { id: '2', name: 'Kurta Sets', slug: 'kurta-sets', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800' },
                { id: '3', name: 'Co-ord Sets', slug: 'co-ord-sets', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800' },
                { id: '4', name: 'Dresses', slug: 'dresses', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800' },
                { id: '5', name: 'Ethnic Wear', slug: 'ethnic-wear', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800' },
              ]
          ).map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative aspect-3/4 overflow-hidden bg-sand shadow-sm rounded"
            >
              <img
                src={cat.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800'}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <h3 className="font-serif-luxury text-lg text-ivory uppercase tracking-wider group-hover:text-blush transition-colors">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 03: NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-sand pb-4 mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-plum font-semibold block">JUST IN</span>
            <h2 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
              NEW ARRIVALS
            </h2>
            <p className="text-xs text-charcoal/70 font-light mt-1">
              Fresh silhouettes, thoughtful details and effortless elegance.
            </p>
          </div>

          <Link
            href="/shop?filter=new-arrivals"
            className="px-6 py-2.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors mt-4 sm:mt-0"
          >
            VIEW ALL NEW ARRIVALS
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      </section>

      {/* 04: EDITORIAL BRAND SECTION */}
      <section className="bg-sand/40 py-20 border-y border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-4/5 w-full rounded overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1200"
                alt="THE WORLD OF PREEBHA"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-plum font-semibold">THE WORLD OF PREEBHA</span>
              <h2 className="font-serif-luxury text-4xl sm:text-5xl text-luxury-black leading-tight uppercase">
                DESIGNED FOR THE WAY YOU LIVE.
              </h2>
              <p className="text-sm text-charcoal/80 font-light leading-relaxed">
                At PREEBHA, we believe elegance is more than what you wear — it is how you feel.
              </p>
              <p className="text-sm text-charcoal/80 font-light leading-relaxed">
                Our collections bring together contemporary design, timeless femininity and thoughtful craftsmanship to create pieces that feel as beautiful as they look.
              </p>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="px-8 py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors inline-block shadow-md"
                >
                  DISCOVER OUR STORY
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05: SIGNATURE COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-luxury-black text-ivory rounded-lg overflow-hidden p-8 sm:p-14 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-blush font-semibold block">PREEBHA SIGNATURE</span>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl text-ivory uppercase tracking-wide">
            TIMELESS BY DESIGN.
          </h2>
          <p className="text-sm text-ivory/80 font-light max-w-xl mx-auto leading-relaxed">
            A considered collection of elevated essentials created for moments that deserve something special.
          </p>
          <div className="pt-4">
            <Link
              href="/collections/preebha-signature"
              className="px-8 py-3.5 bg-blush text-luxury-black text-xs uppercase tracking-widest font-semibold hover:bg-ivory transition-colors inline-block"
            >
              EXPLORE THE COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* 06: BESTSELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-wide">
            MOST LOVED
          </h2>
          <p className="text-xs text-charcoal/70 max-w-md mx-auto">
            The PREEBHA pieces our customers keep coming back to.
          </p>
          <div className="w-12 h-0.5 bg-plum mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      </section>

      {/* 07: SHOP THE LOOK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sand/30 p-8 sm:p-12 rounded border border-sand grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative aspect-4/3 rounded overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200"
              alt="THE PREEBHA EDIT"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-plum font-semibold block">THE PREEBHA EDIT</span>
            <h2 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
              Curated Looks For Effortless Elegance
            </h2>
            <p className="text-xs text-charcoal/80 font-light leading-relaxed">
              Explore our editorial styling recommendations pairing handcrafted zari tunic sets with silk organza dupattas.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="px-6 py-3 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors inline-block"
              >
                SHOP THE LOOK
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 08: CRAFT / QUALITY SECTION */}
      <section className="bg-ivory py-16 border-y border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <h2 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
              MADE WITH INTENTION.
            </h2>
            <div className="w-12 h-0.5 bg-plum mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2 p-4 bg-sand/20 rounded border border-sand">
              <h4 className="font-serif-luxury text-base text-plum uppercase font-semibold">THOUGHTFUL DESIGN</h4>
              <p className="text-xs text-charcoal/70 font-light">Contemporary silhouettes created with attention to detail.</p>
            </div>

            <div className="space-y-2 p-4 bg-sand/20 rounded border border-sand">
              <h4 className="font-serif-luxury text-base text-plum uppercase font-semibold">QUALITY FABRICS</h4>
              <p className="text-xs text-charcoal/70 font-light">Materials selected for comfort, feel and lasting elegance.</p>
            </div>

            <div className="space-y-2 p-4 bg-sand/20 rounded border border-sand">
              <h4 className="font-serif-luxury text-base text-plum uppercase font-semibold">DESIGNED FOR HER</h4>
              <p className="text-xs text-charcoal/70 font-light">Fits and styles created around the modern woman.</p>
            </div>

            <div className="space-y-2 p-4 bg-sand/20 rounded border border-sand">
              <h4 className="font-serif-luxury text-base text-plum uppercase font-semibold">MADE IN INDIA</h4>
              <p className="text-xs text-charcoal/70 font-light">A contemporary Indian brand with a global vision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 09: REVIEWS */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center space-y-2 mb-8">
          <h2 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
            LOVED BY YOU
          </h2>
        </div>

        <div className="bg-blush/20 border border-blush p-8 rounded-lg text-center space-y-4">
          <div className="flex justify-center text-amber-500 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className="text-sm text-charcoal/80 font-serif italic max-w-lg mx-auto leading-relaxed">
            &ldquo;Ordering from PREEBHA Lifestyle was such a delight! The Chanderi silk fabric feels so soft and premium, and the zari embroidery gets so many compliments.&rdquo;
          </p>
          <div className="text-xs font-semibold text-plum uppercase tracking-widest flex items-center justify-center space-x-2">
            <span>Priya K.</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] rounded font-semibold flex items-center space-x-1">
              <Check className="w-3 h-3" />
              <span>Verified Buyer</span>
            </span>
          </div>
        </div>
      </section>

      {/* 10: INSTAGRAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="space-y-1">
          <h2 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
            @PREEBHALIFESTYLE
          </h2>
          <p className="text-xs text-charcoal/70 font-light">
            Wear it. Style it. Make it yours.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600',
          ].map((url, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden bg-sand rounded">
              <img src={url} alt="Instagram PREEBHA" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-luxury-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-ivory">
                <Camera className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2.5 border border-luxury-black text-luxury-black text-xs uppercase tracking-widest font-medium hover:bg-luxury-black hover:text-ivory transition-colors inline-block"
        >
          FOLLOW PREEBHA
        </a>
      </section>

      {/* 11: NEWSLETTER */}
      <section className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <div className="bg-sand/40 p-8 sm:p-12 rounded border border-sand space-y-4">
          <h2 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
            ENTER THE WORLD OF PREEBHA
          </h2>
          <p className="text-xs text-charcoal/70 font-light max-w-md mx-auto">
            Be the first to discover new collections, private edits and stories from PREEBHA.
          </p>

          <form className="space-y-3 max-w-md mx-auto">
            <div className="flex space-x-2">
              <input
                type="email"
                required
                placeholder="Your email address"
                className="flex-1 px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors"
              >
                JOIN US
              </button>
            </div>

            <label className="flex items-center justify-center space-x-2 text-[11px] text-charcoal/70 cursor-pointer pt-1">
              <input type="checkbox" defaultChecked className="text-plum focus:ring-plum" />
              <span>I agree to receive PREEBHA marketing announcements and private drop invitations.</span>
            </label>
          </form>
        </div>
      </section>
    </div>
  );
}
