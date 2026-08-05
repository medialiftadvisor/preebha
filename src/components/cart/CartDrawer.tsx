'use client';

import { useCart } from '@/context/CartContext';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Tag, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingFee,
    amountNeededForFreeShipping,
    grandTotal,
    totalItemsCount,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback(res);
    if (res.success) {
      setCouponCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-luxury-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory text-luxury-black shadow-2xl flex flex-col justify-between animate-slide-right border-l border-sand">
          {/* Header */}
          <div className="p-6 border-b border-sand flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5 text-plum" />
              <h2 className="font-serif-luxury text-xl tracking-wider uppercase">Your Shopping Bag ({totalItemsCount})</h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-sand rounded-full transition-colors text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-blush/30 p-4 border-b border-blush/40 text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <div>
                <p className="text-charcoal mb-2">
                  Add <span className="font-semibold text-plum">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</span> more to qualify for <span className="font-semibold uppercase text-plum">Free Express Shipping</span>
                </p>
                <div className="w-full bg-sand h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-plum h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / 2999) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-emerald-800 font-medium">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>You have unlocked Complimentary Express Shipping!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center text-plum/60 mb-2">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-2xl tracking-wide">Your bag is empty</h3>
                <p className="text-sm text-charcoal/70 max-w-xs">
                  Explore our luxury collection of handcrafted ethnic wear, kurta sets, and dresses.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-4 px-6 py-3 bg-plum text-ivory text-xs uppercase tracking-widest hover:bg-luxury-black transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex space-x-4 border-b border-sand pb-6">
                  <div className="w-20 h-28 relative rounded overflow-hidden bg-sand shrink-0">
                    <img
                      src={item.product.images[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300'}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif-luxury text-base text-luxury-black line-clamp-1 pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-charcoal/70 mt-1 space-x-3">
                        <span>Size: <strong className="text-luxury-black">{item.variant.size}</strong></span>
                        <span>Color: <strong className="text-luxury-black">{item.variant.color}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-sand bg-ivory">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-sm text-charcoal hover:bg-sand"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-sm text-charcoal hover:bg-sand"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-medium text-sm text-plum">
                          ₹{(item.product.sellingPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.product.mrp > item.product.sellingPrice && (
                          <span className="block text-[11px] text-neutral-400 line-through">
                            ₹{(item.product.mrp * item.quantity).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-sand/30 border-t border-sand space-y-4">
              {/* Coupon Section */}
              {appliedCoupon ? (
                <div className="bg-blush/20 p-3 rounded flex items-center justify-between text-xs border border-blush">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-plum" />
                    <span>Coupon <strong className="text-plum uppercase">{appliedCoupon.code}</strong> Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-rose-700 hover:underline font-medium text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. PREEBHA10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-luxury-black text-ivory text-xs uppercase tracking-wider hover:bg-plum transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponFeedback && (
                <p className={`text-[11px] ${couponFeedback.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {couponFeedback.message}
                </p>
              )}

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-charcoal">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-luxury-black">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Discount</span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-luxury-black">
                    {shippingFee === 0 ? <span className="text-emerald-700 font-semibold">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-luxury-black pt-2 border-t border-sand">
                  <span>Grand Total</span>
                  <span className="text-plum text-base">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout CTAs */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium flex items-center justify-center space-x-2 hover:bg-luxury-black transition-colors shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full py-2.5 border border-luxury-black text-luxury-black text-xs uppercase tracking-widest font-medium flex items-center justify-center hover:bg-luxury-black hover:text-ivory transition-colors"
                >
                  View Shopping Bag
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-charcoal/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Secure & Encrypted Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
