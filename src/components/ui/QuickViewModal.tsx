'use client';

import { useState } from 'react';
import { Product, ProductVariant } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Truck, Star } from 'lucide-react';
import Link from 'next/link';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const [selectedImage, setSelectedImage] = useState(product.images[0]?.url || '');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(
    product.variants[0]?.color || 'Dusty Rose'
  );
  const [added, setAdded] = useState(false);

  const availableSizes = Array.from(new Set(product.variants.map((v) => v.size)));
  const availableColors = Array.from(new Set(product.variants.map((v) => v.color)));

  const handleAddToCart = () => {
    const variant = product.variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor
    ) || product.variants[0];

    addToCart(product, variant, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-luxury-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-ivory rounded shadow-2xl overflow-hidden animate-fade-in border border-sand">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-luxury-black hover:text-plum rounded-full bg-sand/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Image Gallery */}
            <div className="p-6 bg-sand/30 flex flex-col justify-between">
              <div className="aspect-3/4 relative rounded overflow-hidden bg-sand mb-4">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.url)}
                    className={`w-16 h-20 relative rounded overflow-hidden border-2 shrink-0 ${
                      selectedImage === img.url ? 'border-plum' : 'border-transparent'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info & Variant Picker */}
            <div className="p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-dusty-rose uppercase tracking-widest font-semibold mb-2">
                  <span>{product.category?.name || 'Women Ethnic'}</span>
                  <span>SKU: {product.sku}</span>
                </div>

                <h2 className="font-serif-luxury text-2xl text-luxury-black mb-2">
                  {product.name}
                </h2>

                <div className="flex items-center space-x-3 mb-4">
                  <span className="font-semibold text-xl text-plum">
                    ₹{product.sellingPrice.toLocaleString('en-IN')}
                  </span>
                  {product.mrp > product.sellingPrice && (
                    <span className="text-sm text-neutral-400 line-through">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discountPercent > 0 && (
                    <span className="px-2 py-0.5 bg-dusty-rose text-luxury-black text-xs font-semibold">
                      SAVE {product.discountPercent}%
                    </span>
                  )}
                </div>

                <p className="text-xs text-charcoal/80 leading-relaxed mb-6 line-clamp-3">
                  {product.description}
                </p>

                {/* Color Selector */}
                {availableColors.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-2">
                      Color: <span className="text-luxury-black">{selectedColor}</span>
                    </label>
                    <div className="flex space-x-2">
                      {availableColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 text-xs border uppercase tracking-wider ${
                            selectedColor === color
                              ? 'border-plum bg-plum text-ivory'
                              : 'border-sand bg-ivory text-luxury-black hover:border-plum'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-wider text-charcoal font-medium">
                      Select Size
                    </label>
                    <span className="text-[11px] text-plum underline">Inclusive Size Chart</span>
                  </div>
                  <div className="flex space-x-2">
                    {(availableSizes.length > 0 ? availableSizes : ['XS', 'S', 'M', 'L', 'XL', 'XXL']).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 text-xs border font-medium uppercase transition-all ${
                          selectedSize === size
                            ? 'border-plum bg-plum text-ivory shadow-xs'
                            : 'border-sand bg-ivory text-luxury-black hover:border-plum'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-sand">
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center space-x-2 ${
                      added
                        ? 'bg-emerald-800 text-ivory'
                        : 'bg-plum text-ivory hover:bg-luxury-black'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add To Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 border transition-colors ${
                      isWishlisted
                        ? 'border-plum bg-plum text-ivory'
                        : 'border-sand text-luxury-black hover:border-plum'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="block text-center text-xs uppercase tracking-widest text-charcoal hover:text-plum underline pt-1"
                >
                  View Full Product Details & Delivery Checker →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
