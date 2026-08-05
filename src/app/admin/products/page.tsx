import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit3, Trash2, Package } from 'lucide-react';

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      images: true,
      variants: true,
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-sand pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-plum font-semibold">Catalog Control</span>
          <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
            Product Management ({products.length})
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="px-6 py-3 bg-plum text-ivory text-xs uppercase tracking-widest font-medium hover:bg-luxury-black transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Product List Table */}
      <div className="bg-ivory border border-sand rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-luxury-black">
            <thead className="bg-sand/60 uppercase font-serif-luxury text-xs text-plum">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Selling Price</th>
                <th className="px-4 py-3">MRP</th>
                <th className="px-4 py-3">Total Stock</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand">
              {products.map((prod) => {
                const totalStock = prod.variants.reduce((sum, v) => sum + v.stock, 0);
                return (
                  <tr key={prod.id} className="hover:bg-sand/20 transition-colors">
                    <td className="px-4 py-3 flex items-center space-x-3">
                      <div className="w-10 h-14 bg-sand rounded overflow-hidden shrink-0">
                        <img
                          src={prod.images[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=200'}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif-luxury text-sm font-semibold text-luxury-black line-clamp-1">{prod.name}</h4>
                        <span className="text-[10px] text-charcoal/60 uppercase">{prod.isNewArrival ? 'NEW' : ''} {prod.isBestSeller ? '• BESTSELLER' : ''}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-charcoal">{prod.sku}</td>
                    <td className="px-4 py-3">{prod.category?.name || 'Ethnic Wear'}</td>
                    <td className="px-4 py-3 font-semibold text-plum">₹{prod.sellingPrice.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-neutral-400 line-through">₹{prod.mrp.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${totalStock <= 5 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'}`}>
                        {totalStock} units
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <Link
                        href={`/product/${prod.slug}`}
                        target="_blank"
                        className="text-xs text-charcoal hover:text-plum underline"
                      >
                        View Page
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
