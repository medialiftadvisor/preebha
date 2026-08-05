import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ui/ProductCard';
import ShopFilterClient from '@/components/shop/ShopFilterClient';

export const revalidate = 0; // Dynamic route

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    collection?: string;
    filter?: string;
    sort?: string;
    size?: string;
    color?: string;
    minPrice?: string;
    maxPrice?: string;
    q?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  // Build Prisma query where clause
  const where: any = {};

  if (params.category) {
    where.category = { slug: params.category };
  }

  if (params.collection) {
    where.collection = { slug: params.collection };
  }

  if (params.filter === 'new-arrivals') {
    where.isNewArrival = true;
  } else if (params.filter === 'bestsellers') {
    where.isBestSeller = true;
  } else if (params.filter === 'sale') {
    where.discountPercent = { gt: 0 };
  }

  if (params.q) {
    where.OR = [
      { name: { contains: params.q } },
      { description: { contains: params.q } },
      { sku: { contains: params.q } },
      { fabric: { contains: params.q } },
    ];
  }

  // Price range filtering
  if (params.minPrice || params.maxPrice) {
    where.sellingPrice = {};
    if (params.minPrice) where.sellingPrice.gte = parseFloat(params.minPrice);
    if (params.maxPrice) where.sellingPrice.lte = parseFloat(params.maxPrice);
  }

  // Size / Color filtering
  if (params.size || params.color) {
    where.variants = {
      some: {
        ...(params.size ? { size: params.size } : {}),
        ...(params.color ? { color: params.color } : {}),
      },
    };
  }

  // Sorting
  let orderBy: any = { createdAt: 'desc' };
  if (params.sort === 'price-low') {
    orderBy = { sellingPrice: 'asc' };
  } else if (params.sort === 'price-high') {
    orderBy = { sellingPrice: 'desc' };
  } else if (params.sort === 'rating') {
    orderBy = { rating: 'desc' };
  } else if (params.sort === 'newest') {
    orderBy = { createdAt: 'desc' };
  }

  const [products, categories, collections] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Title Banner */}
      <div className="text-center space-y-2 mb-10 pb-8 border-b border-sand">
        <span className="text-xs uppercase tracking-[0.3em] text-dusty-rose font-medium">PREEBHA Boutiques</span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl text-luxury-black uppercase tracking-tight">
          {params.category
            ? params.category.replace('-', ' ')
            : params.filter
            ? params.filter.replace('-', ' ')
            : 'Women’s Luxury Fashion Collection'}
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
