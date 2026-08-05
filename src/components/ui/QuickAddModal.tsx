'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/ToastProvider';
import { X, ShoppingBag, Check } from 'lucide-react';

interface QuickAddModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickAddModal({ product, isOpen, onClose }: QuickAddModalProps) {
  const { addToCart, openCart } = useCart();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0].color : 'Default'
  );

  if (!isOpen || !product) return null;

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleAdd = () => {
    // Find matching variant
    const variant = product.variants?.find(
      (v: any) => v.size === selectedSize && v.color === selectedColor
    ) || product.variants?.[0] || { id: `v-${product.id}`, size: selectedSize, color: selectedColor };

    addToCart(product, variant, 1);

    showToast(`Added ${product.name} (${selectedSize}) to Bag`, 'success');
    onClose();
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-luxury-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Container - Bottom Sheet on Mobile, Overlay Modal on Desktop */}
      <div className="relative w-full sm:max-w-md bg-ivory text-luxury-black rounded-t-lg sm:rounded-sm border border-sand shadow-2xl p-6 z-10 animate-slide-up sm:animate-fade-in space-y-5">
        <div className="flex justify-between items-start border-b border-sand pb-4">
          <div className="flex space-x-3 items-center">
            <div className="w-12 h-14 bg-sand rounded overflow-hidden shrink-0">
              <img
                src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400'}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif-luxury text-base uppercase text-luxury-black font-semibold line-clamp-1">
                {product.name}
              </h3>
              <p className="text-xs text-plum font-semibold">₹{product.sellingPrice?.toLocaleString('en-IN')}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-charcoal/70 hover:text-luxury-black">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Size Selection */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="uppercase tracking-wider text-charcoal font-semibold">Select Size</span>
            <span className="text-plum text-[11px] font-medium">Standard Fit</span>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {availableSizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 text-xs uppercase tracking-wider font-semibold border transition-all text-center ${
                    isSelected
                      ? 'bg-plum text-ivory border-plum shadow-xs'
                      : 'bg-ivory text-luxury-black border-sand hover:border-plum'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleAdd}
          className="w-full py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors shadow-md flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>ADD TO BAG</span>
        </button>
      </div>
    </div>
  );
}
