import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import ProductCard from '@/components/ui/ProductCard';

export const revalidate = 60;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: any = null;
  let relatedProducts: any[] = [];

  try {
    product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        collections: { include: { collection: true } },
        images: { orderBy: { displayOrder: 'asc' } },
        variants: true,
        reviews: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (product) {
      relatedProducts = await prisma.product.findMany({
        where: {
          categoryId: product.categoryId,
          NOT: { id: product.id },
        },
        take: 4,
        include: {
          category: true,
          images: true,
          variants: true,
        },
      });
    }
  } catch (error) {
    console.warn('Database query notice (PDP fallback):', error);
  }

  // Fallback demo product if DB uninitialized
  if (!product) {
    product = {
      id: 'demo-1',
      name: 'Gilded Rose Zari Embroidered Silk Kurta Set',
      slug: 'gilded-rose-zari-embroidered-silk-kurta-set',
      sku: 'PRB-KS-001',
      description: 'An exquisite Dusty Rose Chanderi silk kurta embellished with hand-sculpted gold zari floral embroidery along the neckline and cuffs. Paired with wide-leg silk trousers and an organza scalloped dupatta.',
      mrp: 6999,
      sellingPrice: 4999,
      discountPercent: 28,
      fabric: 'Chanderi Silk & Organza',
      fit: 'Straight Regal Fit',
      length: 'Calf Length (46 inches)',
      neck: 'V-Neckline with Zari Work',
      occasion: 'Festive & Weddings',
      category: { name: 'Kurta Sets', slug: 'kurta-sets' },
      images: [
        { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000' },
        { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000' },
      ],
      variants: [
        { id: 'v1', size: 'M', color: 'Dusty Rose', stock: 10 },
        { id: 'v2', size: 'L', color: 'Dusty Rose', stock: 10 },
      ],
    };
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-charcoal/70 uppercase tracking-wider flex items-center space-x-2">
        <a href="/" className="hover:text-plum">Home</a>
        <span>/</span>
        <a href="/shop" className="hover:text-plum">Shop</a>
        <span>/</span>
        <a href={`/shop?category=${product.category?.slug}`} className="hover:text-plum font-medium text-plum">
          {product.category?.name}
        </a>
        <span>/</span>
        <span className="text-luxury-black font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Client Component */}
      <ProductDetailClient product={product as any} />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8 border-t border-sand pt-12">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-plum font-semibold block">YOU MAY ALSO LIKE</span>
            <h2 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
              Complete Your Wardrobe
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel as any} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
