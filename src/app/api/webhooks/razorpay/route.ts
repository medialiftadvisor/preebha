import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const webhookSignature = req.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'preebha_webhook_secret_key';

    // Verify webhook signature if secret configured
    if (webhookSignature && webhookSecret && webhookSecret !== 'preebha_webhook_secret_key') {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== webhookSignature) {
        return NextResponse.json({ success: false, error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event;

    if (eventType === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const razorpayOrderId = payment.order_id;

      // Find order and update idempotently
      const order = await prisma.order.findFirst({
        where: { razorpayOrderId },
      });

      if (order && order.paymentStatus !== 'SUCCESS') {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: 'SUCCESS',
            orderStatus: 'CONFIRMED',
            paymentId: payment.id,
          },
        });

        await prisma.orderStatusHistory.create({
          data: {
            orderId: order.id,
            status: 'CONFIRMED',
            comment: 'Payment verified via Razorpay webhook.',
          },
        });
      }
    } else if (eventType === 'refund.processed') {
      const refund = event.payload.refund.entity;
      const paymentId = refund.payment_id;

      const order = await prisma.order.findFirst({
        where: { paymentId },
      });

      if (order) {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: 'REFUNDED',
            orderStatus: 'REFUNDED',
          },
        });
      }
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
