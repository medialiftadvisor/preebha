import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      sku,
      description,
      mrp,
      sellingPrice,
      fabric,
      categorySlug,
      imageUrl,
    } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Find category
    let category = await prisma.category.findUnique({
      where: { slug: categorySlug || 'kurta-sets' },
    });

    if (!category) {
      category = await prisma.category.findFirstOrThrow();
    }

    const discountPercent = Math.round(((mrp - sellingPrice) / mrp) * 100);

    const product = await prisma.product.create({
      data: {
        name,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        sku,
        description: description || name,
        fabric: fabric || 'Pure Silk Blend',
        mrp,
        sellingPrice,
        discountPercent: Math.max(0, discountPercent),
        isNewArrival: true,
        isFeatured: true,
        categoryId: category.id,
        images: {
          create: [
            {
              url: imageUrl || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
              isPrimary: true,
            },
          ],
        },
        variants: {
          create: ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => ({
            color: 'Dusty Rose',
            size,
            sku: `${sku}-${size}`,
            stock: 12,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error creating product.' },
      { status: 500 }
    );
  }
}
