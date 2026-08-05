import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = body;

    // Razorpay HMAC signature verification
    const secret = process.env.RAZORPAY_KEY_SECRET || 'preebha_demo_secret_key_2026';
    
    let isSignatureValid = true;
    if (razorpay_order_id && razorpay_signature) {
      const generated_signature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');
      
      if (generated_signature !== razorpay_signature) {
        isSignatureValid = false;
      }
    }

    if (!isSignatureValid) {
      return NextResponse.json(
        { success: false, error: 'Payment signature verification failed.' },
        { status: 400 }
      );
    }

    // Generate unique order number PREEBHA-YYYYMMDD-XXXX
    const orderNumber = `PRB-${Date.now().toString().slice(-6)}`;

    // Create Order in Prisma DB
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        shippingAddressJson: JSON.stringify(orderData.shippingAddress),
        totalMRP: orderData.totalMRP || orderData.grandTotal,
        discountAmount: orderData.discountAmount || 0,
        shippingFee: orderData.shippingFee || 0,
        taxAmount: orderData.taxAmount || 0,
        grandTotal: orderData.grandTotal,
        paymentStatus: 'SUCCESS',
        paymentMethod: orderData.paymentMethod || 'RAZORPAY_ONLINE',
        paymentId: razorpay_payment_id || `PAY-${Date.now()}`,
        razorpayOrderId: razorpay_order_id || `RZP-${Date.now()}`,
        razorpaySignature: razorpay_signature || 'DEMO_SIGNATURE',
        orderStatus: 'CONFIRMED',
        items: {
          create: orderData.items.map((item: any) => ({
            productId: item.product.id,
            productName: item.product.name,
            productImage: item.product.images[0]?.url || '',
            color: item.variant.color,
            size: item.variant.size,
            sku: item.variant.sku,
            price: item.product.sellingPrice,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server error creating order.' },
      { status: 500 }
    );
  }
}
