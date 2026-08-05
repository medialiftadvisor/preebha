import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import { Camera, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-black text-ivory border-t border-sand/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-sand/20">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" variant="light" />
            <p className="text-xs text-ivory/70 font-light max-w-sm leading-relaxed">
              PREEBHA Lifestyle represents modern Indian women&apos;s fashion shaped by timeless femininity, thoughtful craftsmanship, and quiet luxury.
            </p>
            <div className="text-[11px] text-ivory/60 space-y-1 font-mono">
              <p>PREEBHA LIFESTYLE PRIVATE LIMITED</p>
              <p>GSTIN: 07AAAAA0000A1Z5</p>
              <p>Connaught Place, New Delhi - 110001, India</p>
            </div>
          </div>

          {/* SHOP */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm uppercase tracking-widest text-blush font-semibold">
              SHOP
            </h4>
            <ul className="space-y-2 text-xs text-ivory/70 font-light">
              <li><Link href="/shop?filter=new-arrivals" className="hover:text-blush transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop?category=kurtis" className="hover:text-blush transition-colors">Kurtis</Link></li>
              <li><Link href="/shop?category=kurta-sets" className="hover:text-blush transition-colors">Kurta Sets</Link></li>
              <li><Link href="/shop?category=co-ord-sets" className="hover:text-blush transition-colors">Co-ord Sets</Link></li>
              <li><Link href="/shop?category=dresses" className="hover:text-blush transition-colors">Dresses</Link></li>
              <li><Link href="/shop?filter=bestsellers" className="hover:text-blush transition-colors">Bestsellers</Link></li>
            </ul>
          </div>

          {/* CUSTOMER CARE */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm uppercase tracking-widest text-blush font-semibold">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-xs text-ivory/70 font-light">
              <li><Link href="/contact" className="hover:text-blush transition-colors">Contact Us</Link></li>
              <li><Link href="/track-order" className="hover:text-blush transition-colors">Track Order</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-blush transition-colors">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-blush transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/size-guide" className="hover:text-blush transition-colors">Size Guide</Link></li>
              <li><Link href="/faqs" className="hover:text-blush transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* ABOUT & LEGAL */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm uppercase tracking-widest text-blush font-semibold">
              ABOUT PREEBHA
            </h4>
            <ul className="space-y-2 text-xs text-ivory/70 font-light">
              <li><Link href="/about" className="hover:text-blush transition-colors">Our Story</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-blush transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-blush transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cancellation-policy" className="hover:text-blush transition-colors">Cancellation Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Legal statement */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/50 font-light gap-4">
          <p>© {currentYear} PREEBHA Lifestyle. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="uppercase tracking-widest">Made in India</span>
            <span>•</span>
            <span className="uppercase tracking-widest">Elegance, Redefined.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
