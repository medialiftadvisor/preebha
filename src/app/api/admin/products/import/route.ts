import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { csvText } = await req.json();

    if (!csvText) {
      return NextResponse.json({ success: false, error: 'CSV data is required' }, { status: 400 });
    }

    const lines = csvText.split('\n').map((l: string) => l.trim()).filter(Boolean);
    if (lines.length <= 1) {
      return NextResponse.json({ success: false, error: 'CSV file contains no data rows' }, { status: 400 });
    }

    // Default category fallback
    let category = await prisma.category.findFirst();
    if (!category) {
      category = await prisma.category.create({
        data: { name: 'Kurtis', slug: 'kurtis', description: 'Imported Kurtis' },
      });
    }

    let importedCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map((p: string) => p.replace(/^"|"$/g, '').trim());
      if (parts.length >= 4) {
        const name = parts[0] || `Imported Product ${i}`;
        const sku = parts[1] || `PRB-IMP-${Date.now()}-${i}`;
        const mrp = parseFloat(parts[2]) || 3999;
        const sellingPrice = parseFloat(parts[3]) || 2999;

        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + `-${Date.now()}`;

        await prisma.product.create({
          data: {
            name,
            slug,
            sku,
            mrp,
            sellingPrice,
            description: 'Imported via Admin CSV interface.',
            categoryId: category.id,
            variants: {
              create: [
                { size: 'M', color: 'Dusty Rose', sku: `${sku}-M`, stock: 10 },
                { size: 'L', color: 'Dusty Rose', sku: `${sku}-L`, stock: 10 },
              ],
            },
          },
        });
        importedCount++;
      }
    }

    return NextResponse.json({ success: true, count: importedCount });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
