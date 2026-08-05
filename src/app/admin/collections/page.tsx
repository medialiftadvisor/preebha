import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Layers, Plus } from 'lucide-react';

export const revalidate = 0;

export default async function AdminCollectionsPage() {
  const collections = await prisma.collection.findMany({
    include: {
      products: true,
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex justify-between items-center border-b border-sand pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-plum font-semibold">Curation Center</span>
          <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
            Independent Collections ({collections.length})
          </h1>
        </div>

        <button className="px-6 py-3 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Collection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div key={col.id} className="bg-sand/30 border border-sand rounded p-6 space-y-3">
            <div className="aspect-16/9 rounded overflow-hidden bg-sand mb-2">
              <img src={col.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600'} alt="" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-serif-luxury text-xl text-luxury-black font-semibold uppercase">{col.name}</h3>
            <p className="text-xs text-charcoal/70">{col.description}</p>
            <div className="flex justify-between items-center pt-2 border-t border-sand text-xs">
              <span className="text-plum font-semibold">{col.products.length} Products Assigned</span>
              <Link href={`/collections/${col.slug}`} className="hover:underline font-medium">View Page →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
