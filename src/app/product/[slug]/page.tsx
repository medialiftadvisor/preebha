import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import ProductCard from '@/components/ui/ProductCard';

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      collections: { include: { collection: true } },
      images: { orderBy: { displayOrder: 'asc' } },
      variants: true,
      reviews: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!product) {
    return notFound();
  }

  // Fetch related products from the same category
  const relatedProducts = await prisma.product.findMany({
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
        <section className="pt-10 border-t border-sand">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-dusty-rose font-semibold">You May Also Like</span>
            <h2 className="font-serif-luxury text-3xl text-luxury-black uppercase tracking-wide">
              Complete Your Ensemble
            </h2>
            <div className="w-12 h-0.5 bg-plum mx-auto mt-2" />
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
