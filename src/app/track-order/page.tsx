'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, PackageCheck, Truck, CheckCircle2, Clock, MapPin, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderNo = searchParams.get('orderNumber') || '';

  const [orderNumber, setOrderNumber] = useState(initialOrderNo);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(null);
  const [error, setError] = useState('');

  const fetchTracking = async (orderNo: string) => {
    if (!orderNo) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(orderNo)}`);
      const data = await res.json();
      if (data.success) {
        setTrackingData(data.order);
      } else {
        setError(data.message || 'Order not found. Please verify your Order Number.');
      }
    } catch (err) {
      setError('Failed to fetch tracking details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderNo) {
      fetchTracking(initialOrderNo);
    }
  }, [initialOrderNo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(orderNumber);
  };

  const statuses = ['CONFIRMED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];

  const getStatusIndex = (currentStatus: string) => {
    const idx = statuses.indexOf(currentStatus);
    return idx === -1 ? 1 : idx;
  };

  return (
    <div className="space-y-10">
      {/* Lookup Form */}
      <form onSubmit={handleSubmit} className="bg-sand/30 p-6 rounded border border-sand space-y-4 max-w-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Order Number *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. PRB-123456"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum uppercase"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Mobile or Email
            </label>
            <input
              type="text"
              placeholder="Associated Mobile or Email"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors"
        >
          {loading ? 'Searching Courier API...' : 'Track Order Status'}
        </button>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </form>

      {/* Tracking Results View */}
      {trackingData && (
        <div className="bg-ivory border border-sand rounded p-6 sm:p-8 space-y-8 animate-fade-in shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-sand pb-4 gap-2">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-500">Order ID</span>
              <h3 className="font-serif-luxury text-xl text-luxury-black font-semibold">#{trackingData.orderNumber}</h3>
            </div>
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">Courier Status</span>
              <span className="px-3 py-1 bg-plum/10 text-plum font-semibold text-xs rounded uppercase">
                {trackingData.orderStatus}
              </span>
            </div>
          </div>

          {/* Visual Status Timeline */}
          <div className="py-6">
            <div className="relative flex items-center justify-between">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-sand -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-1 bg-plum -translate-y-1/2 z-0 transition-all duration-700"
                style={{
                  width: `${(getStatusIndex(trackingData.orderStatus) / (statuses.length - 1)) * 100}%`,
                }}
              />

              {statuses.map((st, i) => {
                const isPassed = getStatusIndex(trackingData.orderStatus) >= i;
                return (
                  <div key={st} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                        isPassed ? 'bg-plum text-ivory shadow-md' : 'bg-sand text-charcoal'
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-charcoal mt-2 text-center hidden sm:block">
                      {st.replace(/_/g, ' ')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shipment Info Card */}
          <div className="bg-sand/30 p-4 rounded text-xs space-y-2 border border-sand">
            <div className="flex justify-between">
              <span>Customer:</span>
              <strong className="text-luxury-black">{trackingData.customerName}</strong>
            </div>
            <div className="flex justify-between">
              <span>Destination Pincode:</span>
              <strong className="text-luxury-black">Available</strong>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery:</span>
              <strong className="text-plum font-semibold">3-5 Business Days</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-2 max-w-lg mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-dusty-rose font-semibold">Live Shipment Tracking</span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-luxury-black uppercase tracking-wide">
          Track Your PREEBHA Order
        </h1>
        <p className="text-xs text-charcoal/70 font-light">
          Enter your Order Number (e.g. PRB-123456) to view real-time courier tracking updates.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-8 text-xs text-charcoal">Loading tracking system...</div>}>
        <TrackOrderContent />
      </Suspense>
    </div>
  );
}
