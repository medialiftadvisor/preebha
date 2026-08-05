import { prisma } from '@/lib/prisma';
import { Truck, Package, ExternalLink } from 'lucide-react';

export const revalidate = 0;

export default async function AdminShippingPage() {
  const shipments = await prisma.shipmentRecord.findMany({
    include: { order: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-sand pb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-plum font-semibold">Logistics Control</span>
        <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
          Shiprocket Shipments & Manifests ({shipments.length})
        </h1>
      </div>

      {shipments.length === 0 ? (
        <div className="p-12 text-center bg-sand/20 border border-sand rounded space-y-2">
          <p className="text-xs uppercase text-charcoal/70 tracking-widest">No active shipments in logistics pipeline.</p>
        </div>
      ) : (
        <div className="bg-ivory border border-sand rounded shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-luxury-black">
              <thead className="bg-sand/60 uppercase font-serif-luxury text-xs text-plum">
                <tr>
                  <th className="px-4 py-3">Ref Order</th>
                  <th className="px-4 py-3">Courier Name</th>
                  <th className="px-4 py-3">AWB Number</th>
                  <th className="px-4 py-3">Tracking</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {shipments.map((s) => (
                  <tr key={s.id} className="hover:bg-sand/20 transition-colors">
                    <td className="px-4 py-3 font-mono font-semibold text-plum">#{s.order.orderNumber}</td>
                    <td className="px-4 py-3 font-medium">{s.courierName || 'Delhivery Express'}</td>
                    <td className="px-4 py-3 font-mono">{s.awbNumber || 'Pending'}</td>
                    <td className="px-4 py-3">
                      {s.trackingUrl && (
                        <a href={s.trackingUrl} target="_blank" rel="noreferrer" className="text-plum underline flex items-center space-x-1 font-semibold">
                          <span>Track</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-semibold text-[10px] uppercase rounded">
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
