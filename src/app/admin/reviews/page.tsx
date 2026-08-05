import { prisma } from '@/lib/prisma';
import { Star, CheckCircle2, Trash2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-sand pb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-plum font-semibold">Social Proof</span>
        <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
          Product Reviews ({reviews.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-sand/30 border border-sand rounded p-6 space-y-3 shadow-xs">
            <div className="flex justify-between items-center border-b border-sand pb-2">
              <span className="font-semibold text-xs text-luxury-black">{rev.userName}</span>
              <div className="flex text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <p className="text-xs text-plum font-semibold uppercase">{rev.product.name}</p>
            {rev.title && <p className="text-xs font-semibold text-luxury-black">{rev.title}</p>}
            <p className="text-xs text-charcoal/80 font-light">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
