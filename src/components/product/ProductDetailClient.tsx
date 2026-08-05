'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/components/ui/ToastProvider';
import SizeGuideModal from '@/components/ui/SizeGuideModal';
import { checkShiprocketServiceability } from '@/lib/shiprocket';
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  ChevronDown,
  Star,
  Check,
} from 'lucide-react';

interface ProductDetailClientProps {
  product: any;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0].color : 'Default'
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<any>(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);

  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  const inWishlist = isInWishlist(product.id);
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [{ url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200' }];

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = (directBuy: boolean = false) => {
    const variant =
      product.variants?.find(
        (v: any) => v.size === selectedSize && v.color === selectedColor
      ) || product.variants?.[0] || { id: `v-${product.id}`, size: selectedSize, color: selectedColor };

    addToCart(product, variant, 1);

    showToast(`Added ${product.name} (${selectedSize}) to Bag`, 'success');

    if (directBuy) {
      window.location.href = '/checkout';
    } else {
      openCart();
    }
  };

  const handleCheckPincode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || !/^\d{6}$/.test(pincode)) {
      showToast('Please enter a valid 6-digit Indian PIN code', 'error');
      return;
    }

    setPincodeLoading(true);
    const res = await checkShiprocketServiceability({ deliveryPincode: pincode });
    setPincodeResult(res);
    setPincodeLoading(false);
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Product Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Mobile Swipe Gallery View */}
          <div className="block lg:hidden relative aspect-4/5 w-full bg-sand/30 rounded overflow-hidden">
            <img
              src={images[selectedImageIndex]?.url}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 px-3 py-1 bg-luxury-black/70 backdrop-blur-xs text-ivory text-[10px] uppercase tracking-widest rounded font-semibold">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Mobile Thumbnail Switcher */}
          <div className="flex lg:hidden space-x-2 overflow-x-auto pb-2">
            {images.map((img: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-16 h-20 rounded overflow-hidden shrink-0 border-2 ${
                  selectedImageIndex === idx ? 'border-plum' : 'border-transparent'
                }`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Desktop 2-Column Editorial Image Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {images.map((img: any, idx: number) => (
              <div key={idx} className="aspect-4/5 w-full bg-sand/30 rounded overflow-hidden group">
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sticky Product Info */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div className="border-b border-sand pb-4 space-y-2">
            {product.category && (
              <span className="text-[11px] uppercase tracking-[0.25em] text-plum font-semibold block">
                {product.category.name}
              </span>
            )}
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-wide leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center space-x-3 pt-1">
              <div className="flex text-amber-500 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-charcoal/70 font-medium">(16 Customer Reviews)</span>
            </div>

            {/* Price & Tax info */}
            <div className="flex items-baseline space-x-3 pt-2">
              <span className="text-2xl font-bold text-luxury-black">
                ₹{product.sellingPrice?.toLocaleString('en-IN')}
              </span>
              {product.mrp > product.sellingPrice && (
                <span className="text-sm text-charcoal/50 line-through">
                  ₹{product.mrp?.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercent && (
                <span className="px-2 py-0.5 bg-blush text-luxury-black text-xs font-semibold uppercase">
                  Save {product.discountPercent}%
                </span>
              )}
            </div>
            <p className="text-[11px] text-charcoal/60">Inclusive of all taxes. Free Shipping nationwide.</p>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase tracking-wider text-luxury-black font-semibold">Select Size</span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-plum text-[11px] uppercase tracking-wider font-semibold underline flex items-center space-x-1 hover:text-luxury-black"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {availableSizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`py-3 text-xs uppercase tracking-wider font-semibold border transition-all text-center ${
                    selectedSize === sz
                      ? 'bg-plum text-ivory border-plum shadow-xs'
                      : 'bg-ivory text-luxury-black border-sand hover:border-plum'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs Desktop */}
          <div className="space-y-3 pt-2">
            <div className="flex space-x-3">
              <button
                onClick={() => handleAddToCart(false)}
                className="flex-1 py-4 bg-plum text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-luxury-black transition-colors shadow-md flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG</span>
              </button>

              <button
                onClick={() => {
                  toggleWishlist(product);
                  showToast(inWishlist ? 'Removed from Wishlist' : 'Saved to Wishlist', 'info');
                }}
                className="p-4 border border-sand hover:border-plum text-luxury-black transition-colors"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-plum text-plum' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => handleAddToCart(true)}
              className="w-full py-4 bg-luxury-black text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-plum transition-colors shadow-sm"
            >
              BUY NOW WITH 1-CLICK CHECKOUT
            </button>
          </div>

          {/* Pincode Serviceability Checker */}
          <div className="bg-sand/30 p-4 rounded border border-sand space-y-3">
            <span className="text-xs uppercase tracking-wider text-charcoal font-semibold flex items-center space-x-1.5">
              <Truck className="w-4 h-4 text-plum" />
              <span>Check Delivery & COD Availability</span>
            </span>

            <form onSubmit={handleCheckPincode} className="flex space-x-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-Digit PIN Code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum uppercase tracking-widest font-mono"
              />
              <button
                type="submit"
                disabled={pincodeLoading}
                className="px-4 py-2 bg-luxury-black text-ivory text-xs uppercase tracking-wider font-semibold hover:bg-plum transition-colors"
              >
                {pincodeLoading ? 'Checking...' : 'Check'}
              </button>
            </form>

            {pincodeResult && (
              <div className="text-xs space-y-1 text-emerald-800 font-medium animate-fade-in pt-1">
                <p>✓ Serviceable to {pincodeResult.deliveryPincode} via {pincodeResult.courierName}</p>
                <p>Est. Delivery by {pincodeResult.deliveryDate} • COD Available</p>
              </div>
            )}
          </div>

          {/* Accordion Tabs */}
          <div className="border-t border-sand pt-4 space-y-3 text-xs">
            <div className="border-b border-sand pb-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'details' ? null : 'details')}
                className="w-full flex justify-between items-center font-semibold text-luxury-black uppercase tracking-wider text-left"
              >
                <span>Product Specifications & Details</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'details' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'details' && (
                <div className="pt-3 text-charcoal/80 space-y-1.5 font-light animate-fade-in">
                  <p><strong>Fabric:</strong> {product.fabric || '100% Pure Chanderi Silk'}</p>
                  <p><strong>Fit:</strong> {product.fit || 'Straight Regal Silhouette'}</p>
                  <p><strong>Length:</strong> {product.length || 'Calf Length (46 inches)'}</p>
                  <p><strong>Neckline:</strong> {product.neck || 'V-Neck with Zari Details'}</p>
                  <p><strong>Occasion:</strong> {product.occasion || 'Festive & Boutique Celebrations'}</p>
                  <p className="pt-1">{product.description}</p>
                </div>
              )}
            </div>

            <div className="border-b border-sand pb-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                className="w-full flex justify-between items-center font-semibold text-luxury-black uppercase tracking-wider text-left"
              >
                <span>Complimentary Shipping & Doorstep Returns</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'shipping' && (
                <div className="pt-3 text-charcoal/80 space-y-1 font-light animate-fade-in">
                  <p>Free standard express shipping on all domestic orders above ₹2,999.</p>
                  <p>Easy 7-day hassle-free doorstep return & exchange policy.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-md border-t border-sand p-3 flex items-center space-x-3 lg:hidden shadow-2xl">
        <button
          onClick={() => handleAddToCart(false)}
          className="flex-1 py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>ADD TO BAG</span>
        </button>

        <button
          onClick={() => handleAddToCart(true)}
          className="flex-1 py-3.5 bg-luxury-black text-ivory text-xs uppercase tracking-widest font-semibold"
        >
          BUY NOW
        </button>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
