import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

export async function GET() {
  try {
    const startTime = Date.now();

    // Query counts to test database connectivity
    const [products, categories, orders, users] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.order.count(),
      prisma.user.count(),
    ]);

    const responseTimeMs = Date.now() - startTime;

    return NextResponse.json({
      status: 'healthy',
      database: 'CONNECTED',
      responseTimeMs,
      timestamp: new Date().toISOString(),
      stats: {
        productsCount: products,
        categoriesCount: categories,
        ordersCount: orders,
        usersCount: users,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        database: 'DISCONNECTED_OR_READONLY',
        error: error.message || 'Database connection error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
