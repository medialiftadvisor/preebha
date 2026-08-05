'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag, Truck } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    savings,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingFee,
    amountNeededForFreeShipping,
    grandTotal,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setFeedback(res);
    if (res.success) setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-sand flex items-center justify-center text-plum mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-wide">
          Your Shopping Bag Is Empty
        </h1>
        <p className="text-sm text-charcoal/70 max-w-md mx-auto font-light">
          Your luxury shopping bag is currently waiting to be filled with handcrafted ethnic wear and boutique dresses.
        </p>
        <div>
          <Link
            href="/shop"
            className="px-8 py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors inline-block shadow-md"
          >
            EXPLORE COLLECTIONS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-sand pb-4">
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-wide">
          Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </h1>
      </div>

      {/* Free Shipping Progress */}
      <div className="bg-blush/20 p-4 border border-blush/60 rounded text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
        {amountNeededForFreeShipping > 0 ? (
          <span>
            Add <strong className="text-plum">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more to unlock Complimentary Express Shipping!
          </span>
        ) : (
          <span className="text-emerald-800 font-semibold flex items-center space-x-2">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>Complimentary Express Shipping Unlocked!</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Cart Items Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="divide-y divide-sand border-y border-sand">
            {cart.map((item) => (
              <div key={item.id} className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex space-x-4">
                  <div className="w-20 h-28 relative rounded overflow-hidden bg-sand shrink-0">
                    <img
                      src={item.product.images[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300'}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <Link href={`/product/${item.product.slug}`} className="font-serif-luxury text-lg text-luxury-black hover:text-plum line-clamp-1">
                      {item.product.name}
                    </Link>
                    <div className="text-xs text-charcoal/70 space-x-3">
                      <span>Size: <strong>{item.variant.size}</strong></span>
                      <span>Color: <strong>{item.variant.color}</strong></span>
                    </div>
                    <p className="text-xs text-charcoal/60">SKU: {item.variant.sku}</p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-rose-700 hover:underline flex items-center space-x-1 pt-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Item</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-8 w-full sm:w-auto">
                  {/* Quantity */}
                  <div className="flex items-center border border-sand bg-ivory">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-sm text-charcoal hover:bg-sand"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-sm text-charcoal hover:bg-sand"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <span className="font-serif-luxury text-lg text-plum font-semibold">
                      ₹{(item.product.sellingPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                    {item.product.mrp > item.product.sellingPrice && (
                      <span className="block text-xs text-neutral-400 line-through">
                        ₹{(item.product.mrp * item.quantity).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 bg-sand/30 p-6 rounded border border-sand space-y-6">
          <h2 className="font-serif-luxury text-xl uppercase tracking-wider text-luxury-black border-b border-sand pb-3">
            Order Summary
          </h2>

          {/* Coupon */}
          <div>
            {appliedCoupon ? (
              <div className="bg-blush/30 p-3 rounded flex items-center justify-between text-xs border border-blush">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-plum" />
                  <span>Coupon <strong className="text-plum uppercase">{appliedCoupon.code}</strong> Applied</span>
                </div>
                <button onClick={removeCoupon} className="text-rose-700 hover:underline text-[11px]">
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleCouponSubmit} className="space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-luxury-black text-ivory text-xs uppercase tracking-wider hover:bg-plum transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {feedback && (
                  <p className={`text-[11px] ${feedback.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {feedback.message}
                  </p>
                )}
              </form>
            )}
          </div>

          <div className="space-y-2 text-xs text-charcoal border-t border-sand pt-4">
            <div className="flex justify-between">
              <span>Bag Subtotal</span>
              <span className="font-semibold text-luxury-black">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {savings > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Total Product Savings</span>
                <span>- ₹{savings.toLocaleString('en-IN')}</span>
              </div>
            )}

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Coupon Discount</span>
                <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-semibold text-luxury-black">
                {shippingFee === 0 ? <span className="text-emerald-700 font-semibold">FREE</span> : `₹${shippingFee}`}
              </span>
            </div>

            <div className="flex justify-between text-sm font-semibold text-luxury-black pt-3 border-t border-sand">
              <span>Grand Total</span>
              <span className="text-plum text-lg">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full py-4 bg-plum text-ivory text-xs uppercase tracking-widest font-medium flex items-center justify-center space-x-2 hover:bg-luxury-black transition-colors shadow-md"
          >
            <span>PROCEED TO CHECKOUT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center space-x-2 text-[11px] text-charcoal/60">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Razorpay Secure & 256-Bit Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
