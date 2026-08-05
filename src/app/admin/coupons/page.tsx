import { prisma } from '@/lib/prisma';
import { Tag, Plus, Check, Percent } from 'lucide-react';

export const revalidate = 0;

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { isActive: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex justify-between items-center border-b border-sand pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-plum font-semibold">Promotion Engine</span>
          <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
            Coupons & Promotional Discounts ({coupons.length})
          </h1>
        </div>

        <button className="px-6 py-3 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div key={c.id} className="bg-sand/30 border border-sand rounded p-6 space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-sand pb-2">
              <span className="font-mono text-base font-bold text-plum bg-blush px-3 py-1 rounded tracking-wider">
                {c.code}
              </span>
              <span className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded ${
                c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {c.isActive ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>

            <div className="text-xs space-y-1 text-charcoal/80">
              <p>Type: <strong>{c.discountType}</strong></p>
              <p>Discount Value: <strong>{c.discountType === 'PERCENTAGE' ? `${c.discountValue}%` : `₹${c.discountValue}`}</strong></p>
              <p>Min Order Value: <strong>₹{c.minOrderValue}</strong></p>
              <p>Times Used: <strong>{c.timesUsed}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
