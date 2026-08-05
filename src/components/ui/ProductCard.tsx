'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/components/ui/ToastProvider';
import QuickAddModal from '@/components/ui/QuickAddModal';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    mrp: number;
    sellingPrice: number;
    discountPercent?: number;
    isNewArrival?: boolean;
    isBestSeller?: boolean;
    category?: { name: string; slug: string };
    images?: { url: string; isPrimary?: boolean }[];
    variants?: any[];
    rating?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [isHovered, setIsHovered] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  const primaryImage =
    product.images && product.images.length > 0
      ? product.images[0].url
      : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800';

  const secondaryImage =
    product.images && product.images.length > 1
      ? product.images[1].url
      : primaryImage;

  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product as any);
    showToast(
      inWishlist ? `Removed ${product.name} from Wishlist` : `Saved ${product.name} to Wishlist`,
      'info'
    );
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickAddOpen(true);
  };

  return (
    <>
      <div
        className="group relative flex flex-col space-y-3 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 4:5 Editorial Image Frame */}
        <div className="relative aspect-4/5 w-full bg-sand/40 overflow-hidden rounded-luxury">
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            <img
              src={isHovered ? secondaryImage : primaryImage}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-103"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col space-y-1 z-10">
            {product.isNewArrival && (
              <span className="px-2 py-0.5 bg-luxury-black text-ivory text-[9px] uppercase tracking-widest font-semibold">
                NEW
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-2 py-0.5 bg-plum text-ivory text-[9px] uppercase tracking-widest font-semibold">
                BESTSELLER
              </span>
            )}
            {product.discountPercent && product.discountPercent > 0 ? (
              <span className="px-2 py-0.5 bg-blush text-luxury-black text-[9px] uppercase tracking-widest font-semibold">
                {product.discountPercent}% OFF
              </span>
            ) : null}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-ivory/80 backdrop-blur-xs text-luxury-black hover:text-plum hover:bg-ivory transition-all shadow-xs z-10"
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-plum text-plum' : ''}`} />
          </button>

          {/* Quick Add Floating Overlay Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button
              onClick={handleQuickAddClick}
              className="w-full py-2.5 bg-ivory/95 backdrop-blur-xs text-luxury-black text-[11px] uppercase tracking-widest font-semibold hover:bg-plum hover:text-ivory transition-colors shadow-md flex items-center justify-center space-x-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>QUICK ADD</span>
            </button>
          </div>
        </div>

        {/* Product Meta */}
        <div className="space-y-1">
          {product.category && (
            <span className="text-[10px] uppercase tracking-widest text-dusty-rose font-medium block">
              {product.category.name}
            </span>
          )}

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif-luxury text-sm text-luxury-black font-semibold line-clamp-1 group-hover:text-plum transition-colors uppercase tracking-wide">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center space-x-2 text-xs">
            <span className="font-semibold text-luxury-black">
              ₹{product.sellingPrice.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.sellingPrice && (
              <span className="text-charcoal/50 line-through text-[11px]">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Add Modal */}
      <QuickAddModal
        product={product}
        isOpen={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
      />
    </>
  );
}
