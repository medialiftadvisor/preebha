import { prisma } from '@/lib/prisma';
import { CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';

export const revalidate = 0;

export default async function AdminPaymentsPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-sand pb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-plum font-semibold">Payment Reconciliation</span>
        <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
          Razorpay & COD Transactions ({orders.length})
        </h1>
      </div>

      <div className="bg-ivory border border-sand rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-luxury-black">
            <thead className="bg-sand/60 uppercase font-serif-luxury text-xs text-plum">
              <tr>
                <th className="px-4 py-3">Order Number</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Payment ID / Ref</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-sand/20 transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-plum">#{o.orderNumber}</td>
                  <td className="px-4 py-3 font-medium">{o.customerName}</td>
                  <td className="px-4 py-3 font-bold text-sm">₹{o.grandTotal.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 uppercase tracking-wider">{o.paymentMethod}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-charcoal">{o.paymentId || 'N/A'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 font-semibold text-[10px] uppercase rounded ${
                      o.paymentStatus === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {o.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
