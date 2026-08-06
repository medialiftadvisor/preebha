import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, error: 'userId is required.' }, { status: 400 });
    }

    const addresses = await prisma.address.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' },
    });

    return NextResponse.json({ success: true, addresses });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      name,
      mobile,
      addressLine,
      apartment,
      landmark,
      city,
      state,
      pincode,
      country,
      isDefault,
    } = body;

    if (!userId || !name || !addressLine || !city || !pincode) {
      return NextResponse.json({ success: false, error: 'Missing required address fields.' }, { status: 400 });
    }

    // Save address in Address table
    const address = await prisma.address.create({
      data: {
        userId,
        name,
        mobile: mobile || '+91 9876543210',
        addressLine,
        apartment: apartment || '',
        landmark: landmark || '',
        city,
        state: state || 'Delhi',
        pincode,
        country: country || 'India',
        isDefault: isDefault ?? true,
      },
    });

    return NextResponse.json({ success: true, address });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
