import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-sand pb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-plum font-semibold">Fulfillment Center</span>
        <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
          Order Management ({orders.length})
        </h1>
      </div>

      <div className="bg-ivory border border-sand rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-luxury-black">
            <thead className="bg-sand/60 uppercase font-serif-luxury text-xs text-plum">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone / Email</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-sand/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-plum">#{ord.orderNumber}</td>
                  <td className="px-4 py-3 font-medium">{ord.customerName}</td>
                  <td className="px-4 py-3 text-charcoal/70">
                    <div>{ord.customerPhone}</div>
                    <div className="text-[10px]">{ord.customerEmail}</div>
                  </td>
                  <td className="px-4 py-3 uppercase font-mono text-[10px]">{ord.paymentMethod}</td>
                  <td className="px-4 py-3">{ord.items.length} item(s)</td>
                  <td className="px-4 py-3 font-semibold">₹{ord.grandTotal.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 bg-plum/10 text-plum rounded font-semibold text-[10px] uppercase">
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/track-order?orderNumber=${ord.orderNumber}`}
                      className="text-xs text-plum hover:underline font-medium"
                    >
                      Track Shipment
                    </Link>
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
