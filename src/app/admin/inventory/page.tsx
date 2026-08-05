import { prisma } from '@/lib/prisma';
import { Package, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminInventoryPage() {
  const variants = await prisma.productVariant.findMany({
    include: {
      product: true,
    },
    orderBy: { stock: 'asc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-sand pb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-plum font-semibold">Stock Control</span>
        <h1 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
          Variant Inventory Management ({variants.length} SKU Variants)
        </h1>
      </div>

      <div className="bg-ivory border border-sand rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-luxury-black">
            <thead className="bg-sand/60 uppercase font-serif-luxury text-xs text-plum">
              <tr>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Variant SKU</th>
                <th className="px-4 py-3">Color</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Available Stock</th>
                <th className="px-4 py-3">Reserved</th>
                <th className="px-4 py-3">Sold</th>
                <th className="px-4 py-3">Status Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand">
              {variants.map((v) => (
                <tr key={v.id} className="hover:bg-sand/20 transition-colors">
                  <td className="px-4 py-3 font-semibold text-luxury-black">{v.product.name}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-charcoal">{v.sku}</td>
                  <td className="px-4 py-3">{v.color}</td>
                  <td className="px-4 py-3 font-semibold text-plum">{v.size}</td>
                  <td className="px-4 py-3 font-bold text-sm">{v.stock}</td>
                  <td className="px-4 py-3 text-neutral-500">{v.reservedStock}</td>
                  <td className="px-4 py-3 text-emerald-800">{v.soldQuantity}</td>
                  <td className="px-4 py-3">
                    {v.stock === 0 ? (
                      <span className="px-2.5 py-1 bg-rose-100 text-rose-800 font-semibold text-[10px] uppercase rounded">
                        OUT OF STOCK
                      </span>
                    ) : v.stock <= 5 ? (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-semibold text-[10px] uppercase rounded">
                        ONLY {v.stock} LEFT
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-semibold text-[10px] uppercase rounded">
                        IN STOCK
                      </span>
                    )}
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
