import { prisma } from '@/lib/prisma';
import { RotateCcw, Check, X } from 'lucide-react';

export const revalidate = 0;

export default async function AdminReturnsPage() {
  const returns = await prisma.returnRequest.findMany({
    include: {
      order: true,
      user: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-sand pb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-plum font-semibold">Reverse Logistics</span>
        <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
          Doorstep Return Requests ({returns.length})
        </h1>
      </div>

      {returns.length === 0 ? (
        <div className="p-12 text-center bg-sand/20 border border-sand rounded space-y-2">
          <p className="text-xs uppercase text-charcoal/70 tracking-widest">No pending return requests.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {returns.map((r) => (
            <div key={r.id} className="bg-sand/30 border border-sand rounded p-6 space-y-3">
              <div className="flex justify-between items-center border-b border-sand pb-2">
                <span className="font-mono text-xs font-semibold text-plum">Ref Order: #{r.order.orderNumber}</span>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-semibold text-[10px] uppercase rounded">
                  {r.status}
                </span>
              </div>
              <div className="text-xs space-y-1 text-charcoal">
                <p>Customer: <strong>{r.user.name}</strong> ({r.user.email})</p>
                <p>Reason: <strong>{r.reason}</strong></p>
                {r.comments && <p>Comments: <em>{r.comments}</em></p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
