'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { RotateCcw, Check, ArrowLeft } from 'lucide-react';

export default function NewReturnRequestPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;

  const [reason, setReason] = useState('Size Issue');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center space-x-3 border-b border-sand pb-4">
        <Link href="/account/orders" className="p-2 text-charcoal hover:text-plum">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-plum font-semibold">Doorstep Returns</span>
          <h1 className="font-serif-luxury text-2xl text-luxury-black uppercase tracking-wide">
            Request Return / Exchange
          </h1>
        </div>
      </div>

      {submitted ? (
        <div className="bg-sand/30 p-8 rounded text-center space-y-4 border border-sand">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-2xl text-luxury-black uppercase">Return Request Submitted</h3>
          <p className="text-xs text-charcoal/70 max-w-sm mx-auto">
            Your return request for order <strong>#{orderId.substring(0, 8)}</strong> has been registered. Our doorstep pickup courier will be assigned shortly.
          </p>
          <div className="pt-2">
            <Link href="/account" className="px-6 py-2.5 bg-plum text-ivory text-xs uppercase tracking-widest inline-block">
              Return To Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-sand/30 p-6 rounded border border-sand space-y-4 shadow-xs">
          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Select Return / Exchange Reason *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            >
              <option value="Size Issue">Size Issue (Prefer different size)</option>
              <option value="Received Wrong Product">Received Wrong Product</option>
              <option value="Damaged Product">Damaged Product on Arrival</option>
              <option value="Quality Issue">Fabric / Quality Issue</option>
              <option value="Changed Mind">Changed Mind</option>
              <option value="Other">Other Reason</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
              Additional Details / Comments (Optional)
            </label>
            <textarea
              rows={4}
              placeholder="Please describe why you are requesting a return..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full px-3 py-2.5 text-xs border border-sand bg-ivory focus:outline-none focus:border-plum"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors shadow-md flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>SUBMIT RETURN REQUEST</span>
          </button>
        </form>
      )}
    </div>
  );
}
