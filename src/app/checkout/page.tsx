'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Logo from '@/components/brand/Logo';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Truck,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, shippingFee, grandTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'COD'>('ONLINE');

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.phone || '',
    addressLine: '',
    apartment: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email address is required';
    if (!formData.mobile || formData.mobile.length < 10) newErrors.mobile = 'Valid 10-digit mobile number required';
    if (!formData.addressLine) newErrors.addressLine = 'Shipping address line is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode || formData.pincode.length < 6) newErrors.pincode = 'Valid 6-digit Pincode required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (cart.length === 0) return;

    setLoading(true);

    try {
      const orderPayload = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.mobile,
        shippingAddress: formData,
        subtotal,
        discountAmount,
        shippingFee,
        grandTotal,
        paymentMethod: paymentMethod === 'ONLINE' ? 'RAZORPAY_UPI_ONLINE' : 'CASH_ON_DELIVERY',
        items: cart,
      };

      // Call server verification & order creation route
      const response = await fetch('/api/checkout/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: paymentMethod === 'ONLINE' ? `RZP_DEMO_${Date.now()}` : undefined,
          razorpay_payment_id: paymentMethod === 'ONLINE' ? `PAY_DEMO_${Date.now()}` : undefined,
          razorpay_signature: paymentMethod === 'ONLINE' ? 'DEMO_HMAC_SIGNATURE' : undefined,
          orderData: orderPayload,
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        clearCart();
        router.push(`/orders/success/${resData.orderId}`);
      } else {
        alert(resData.error || 'Payment failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      alert('An error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase">Your Bag Is Empty</h1>
        <p className="text-xs text-charcoal/70">Please add items to your cart before proceeding to checkout.</p>
        <Link href="/shop" className="px-6 py-3 bg-plum text-ivory text-xs uppercase tracking-widest inline-block">
          Return To Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Checkout Brand Header */}
      <div className="flex items-center justify-between border-b border-sand pb-6 mb-8">
        <Link href="/cart" className="text-xs uppercase tracking-widest text-charcoal hover:text-plum flex items-center space-x-1">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Shopping Bag</span>
        </Link>
        <Logo size="sm" />
        <div className="flex items-center space-x-1 text-xs text-emerald-800 font-medium">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Shipping Address & Payment Selection (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Info */}
          <div className="space-y-4">
            <h2 className="font-serif-luxury text-xl uppercase tracking-wider text-luxury-black border-b border-sand pb-2">
              1. Contact & Customer Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-sand/30 border border-sand focus:outline-none focus:border-plum"
                />
                {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-sand/30 border border-sand focus:outline-none focus:border-plum"
                />
                {errors.mobile && <p className="text-[11px] text-rose-600 mt-1">{errors.mobile}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Email Address (for order tracking & invoice) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ananya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-sand/30 border border-sand focus:outline-none focus:border-plum"
                />
                {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Address */}
          <div className="space-y-4 pt-4 border-t border-sand">
            <h2 className="font-serif-luxury text-xl uppercase tracking-wider text-luxury-black border-b border-sand pb-2">
              2. Shipping Address
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                  Street Address & House/Flat No. *
                </label>
                <input
                  type="text"
                  required
                  placeholder="House No., Building Name, Street Name"
                  value={formData.addressLine}
                  onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-sand/30 border border-sand focus:outline-none focus:border-plum"
                />
                {errors.addressLine && <p className="text-[11px] text-rose-600 mt-1">{errors.addressLine}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Apartment / Suite (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Apt 4B"
                    value={formData.apartment}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-sand/30 border border-sand focus:outline-none focus:border-plum"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Near City Park"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-sand/30 border border-sand focus:outline-none focus:border-plum"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Delhi"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-sand/30 border border-sand focus:outline-none focus:border-plum"
                  />
                  {errors.city && <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Delhi / Rajasthan"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-sand/30 border border-sand focus:outline-none focus:border-plum"
                  />
                  {errors.state && <p className="text-[11px] text-rose-600 mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="6-digit PIN code"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-sand/30 border border-sand focus:outline-none focus:border-plum"
                  />
                  {errors.pincode && <p className="text-[11px] text-rose-600 mt-1">{errors.pincode}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    disabled
                    value="India"
                    className="w-full px-3 py-2.5 text-xs bg-sand/60 border border-sand text-charcoal"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Architecture Options */}
          <div className="space-y-4 pt-4 border-t border-sand">
            <h2 className="font-serif-luxury text-xl uppercase tracking-wider text-luxury-black border-b border-sand pb-2">
              3. Payment Option Architecture
            </h2>

            <div className="space-y-3">
              {/* Razorpay Online Option */}
              <label
                onClick={() => setPaymentMethod('ONLINE')}
                className={`p-4 border rounded flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'ONLINE' ? 'border-plum bg-blush/20 shadow-xs' : 'border-sand bg-ivory hover:border-plum'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'ONLINE'}
                    onChange={() => setPaymentMethod('ONLINE')}
                    className="text-plum focus:ring-plum"
                  />
                  <div>
                    <h4 className="font-serif-luxury text-sm font-semibold text-luxury-black">
                      Razorpay Online Payment (UPI, Credit/Debit Card, NetBanking, Wallets)
                    </h4>
                    <p className="text-[11px] text-charcoal/70">Fast, 100% Instant & Secure Payment Gateway</p>
                  </div>
                </div>
                <CreditCard className="w-5 h-5 text-plum" />
              </label>

              {/* Cash On Delivery Option */}
              <label
                onClick={() => setPaymentMethod('COD')}
                className={`p-4 border rounded flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'COD' ? 'border-plum bg-blush/20 shadow-xs' : 'border-sand bg-ivory hover:border-plum'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="text-plum focus:ring-plum"
                  />
                  <div>
                    <h4 className="font-serif-luxury text-sm font-semibold text-luxury-black">
                      Cash On Delivery (COD)
                    </h4>
                    <p className="text-[11px] text-charcoal/70">Pay in cash upon doorstep delivery</p>
                  </div>
                </div>
                <Truck className="w-5 h-5 text-plum" />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors shadow-lg flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span>Processing Order Security...</span>
            ) : (
              <>
                <span>COMPLETE ORDER — ₹{grandTotal.toLocaleString('en-IN')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Right Column: Order Summary Preview (5 Cols) */}
        <div className="lg:col-span-5 bg-sand/30 p-6 rounded border border-sand space-y-6 self-start">
          <h3 className="font-serif-luxury text-xl uppercase tracking-wider text-luxury-black border-b border-sand pb-3">
            Order Items ({cart.length})
          </h3>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex space-x-3 text-xs">
                <div className="w-14 h-18 bg-sand rounded overflow-hidden shrink-0">
                  <img
                    src={item.product.images[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=200'}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 justify-between">
                  <h4 className="font-serif-luxury text-sm text-luxury-black line-clamp-1">{item.product.name}</h4>
                  <p className="text-charcoal/70">Qty: {item.quantity} | Size: {item.variant.size} | Color: {item.variant.color}</p>
                  <span className="font-semibold text-plum">₹{(item.product.sellingPrice * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs border-t border-sand pt-4 text-charcoal">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-luxury-black">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Coupon Discount</span>
                <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Charge</span>
              <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-luxury-black pt-2 border-t border-sand">
              <span>Total Payable</span>
              <span className="text-plum text-lg">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
