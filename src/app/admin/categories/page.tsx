import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Layers, Plus, ChevronRight } from 'lucide-react';

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      subcategories: true,
      products: true,
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex justify-between items-center border-b border-sand pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-plum font-semibold">Taxonomy Control</span>
          <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
            Product Categories & Subcategories ({categories.length})
          </h1>
        </div>

        <button className="px-6 py-3 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-sand/30 border border-sand rounded p-6 space-y-4 shadow-xs">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-16 bg-sand rounded overflow-hidden shrink-0">
                <img src={cat.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400'} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl text-luxury-black font-semibold uppercase">{cat.name}</h3>
                <p className="text-xs text-plum font-semibold">{cat.products.length} Products</p>
              </div>
            </div>

            <div className="border-t border-sand pt-3 space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-charcoal/70 font-semibold block">Subcategories:</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.subcategories.map((sub) => (
                  <span key={sub.id} className="px-2 py-1 bg-ivory text-[11px] text-luxury-black border border-sand rounded">
                    {sub.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
