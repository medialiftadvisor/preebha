import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: true,
      },
    });

    const headers = ['ID', 'Name', 'SKU', 'Category', 'MRP', 'SellingPrice', 'Fabric', 'Fit', 'TotalStock'].join(',');

    const rows = products.map((p) => {
      const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);
      return [
        `"${p.id}"`,
        `"${p.name.replace(/"/g, '""')}"`,
        `"${p.sku}"`,
        `"${p.category?.name || ''}"`,
        p.mrp,
        p.sellingPrice,
        `"${p.fabric || ''}"`,
        `"${p.fit || ''}"`,
        totalStock,
      ].join(',');
    });

    const csvContent = [headers, ...rows].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="preebha_catalog_export.csv"',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
