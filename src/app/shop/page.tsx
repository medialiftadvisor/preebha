import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import ShopFilterClient from '@/components/shop/ShopFilterClient';

export const revalidate = 0;

export default async function ShopPage() {
  let products: any[] = [];
  let categories: any[] = [];
  let collections: any[] = [];

  try {
    const res = await Promise.all([
      prisma.product.findMany({
        include: {
          category: true,
          collections: { include: { collection: true } },
          images: true,
          variants: true,
        },
      }),
      prisma.category.findMany(),
      prisma.collection.findMany(),
    ]);
    products = res[0];
    categories = res[1];
    collections = res[2];
  } catch (error) {
    console.warn('Database query notice (Shop fallback):', error);
  }

  // Fallback demo items if DB uninitialized on serverless lambda
  if (products.length === 0) {
    products = [
      {
        id: 'demo-1',
        name: 'Gilded Rose Zari Embroidered Silk Kurta Set',
        slug: 'gilded-rose-zari-embroidered-silk-kurta-set',
        mrp: 6999,
        sellingPrice: 4999,
        discountPercent: 28,
        isNewArrival: true,
        isBestSeller: true,
        category: { name: 'Kurta Sets', slug: 'kurta-sets' },
        images: [{ url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800' }],
      },
      {
        id: 'demo-2',
        name: 'Ivory Chanderi Floral Printed Kurta Set',
        slug: 'ivory-chanderi-floral-printed-kurta-set',
        mrp: 5499,
        sellingPrice: 3999,
        discountPercent: 27,
        isNewArrival: true,
        isBestSeller: false,
        category: { name: 'Kurta Sets', slug: 'kurta-sets' },
        images: [{ url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800' }],
      },
    ];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* PLP Header */}
      <div className="border-b border-sand pb-6 text-center space-y-2">
        <span className="text-xs uppercase tracking-[0.3em] text-plum font-semibold block">
          PREEBHA COLLECTION
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl text-luxury-black uppercase tracking-wide">
          Women’s Luxury Fashion Collection
        </h1>
        <p className="text-xs text-charcoal/70 max-w-xl mx-auto font-light">
          Handcrafted ethnic wear, silk kurta sets, contemporary co-ords, and festive dresses designed with quiet luxury.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-xs">Loading Catalog...</div>}>
        <ShopFilterClient
          initialProducts={products as any}
          categories={categories}
          collections={collections}
        />
      </Suspense>
    </div>
  );
}
