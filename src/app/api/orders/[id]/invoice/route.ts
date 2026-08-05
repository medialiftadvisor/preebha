import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) {
      return new NextResponse('Order not found', { status: 404 });
    }

    // Fetch Legal Business Settings
    const settingsList = await prisma.siteSetting.findMany();
    const settingsMap = new Map(settingsList.map((s) => [s.key, s.value]));

    const legalName = settingsMap.get('LEGAL_NAME') || 'PREEBHA LIFESTYLE PRIVATE LIMITED';
    const gstin = settingsMap.get('GSTIN') || '07AAAAA0000A1Z5';
    const address = settingsMap.get('REGISTERED_ADDRESS') || 'Connaught Place, New Delhi - 110001, India';
    const careEmail = settingsMap.get('CARE_EMAIL') || 'care@preebhalifestyle.com';

    const shippingAddress = JSON.parse(order.shippingAddressJson || '{}');

    // Calculate Tax Details
    const taxableValue = Math.round((order.grandTotal / 1.05) * 100) / 100;
    const gstTotal = Math.round((order.grandTotal - taxableValue) * 100) / 100;
    const cgst = Math.round((gstTotal / 2) * 100) / 100;
    const sgst = cgst;

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>GST Tax Invoice - #${order.orderNumber}</title>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 40px; color: #0A0A0A; background: #fff; font-size: 12px; }
        .invoice-box { max-width: 800px; margin: auto; border: 1px solid #EFE8E1; padding: 30px; }
        .header { border-b: 2px solid #410F29; padding-bottom: 20px; margin-bottom: 20px; display: flex; justify-content: space-between; }
        .brand { font-size: 24px; font-weight: bold; letter-spacing: 3px; color: #0A0A0A; }
        .tagline { font-size: 10px; color: #410F29; letter-spacing: 2px; text-transform: uppercase; }
        .grid-2 { display: flex; justify-content: space-between; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #410F29; color: #fff; text-align: left; padding: 8px; font-size: 11px; text-transform: uppercase; }
        td { padding: 8px; border-bottom: 1px solid #EFE8E1; }
        .text-right { text-align: right; }
        .total-box { float: right; width: 300px; margin-top: 10px; }
        .btn-print { background: #410F29; color: #fff; border: none; padding: 10px 20px; font-size: 11px; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; }
        @media print { .btn-print { display: none; } }
      </style>
    </head>
    <body>
      <div className="invoice-box">
        <div style="text-align: right; margin-bottom: 10px;">
          <button onclick="window.print()" class="btn-print">Print / Download Invoice PDF</button>
        </div>

        <div class="header">
          <div>
            <div class="brand">PREEBHA</div>
            <div class="tagline">LIFESTYLE • ELEGANCE, REDEFINED.</div>
            <div style="margin-top: 8px; font-size: 10px; color: #555;">
              <strong>${legalName}</strong><br>
              GSTIN: <strong>${gstin}</strong><br>
              ${address}<br>
              Email: ${careEmail}
            </div>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; color: #410F29; font-size: 18px; text-transform: uppercase;">TAX INVOICE</h2>
            <p style="margin: 4px 0 0 0; font-size: 11px;">Invoice No: <strong>INV-${order.orderNumber}</strong></p>
            <p style="margin: 2px 0 0 0; font-size: 11px;">Invoice Date: <strong>${new Date(order.createdAt).toLocaleDateString('en-IN')}</strong></p>
            <p style="margin: 2px 0 0 0; font-size: 11px;">Order Ref: <strong>#${order.orderNumber}</strong></p>
          </div>
        </div>

        <div class="grid-2">
          <div>
            <strong style="color: #410F29; text-transform: uppercase;">Billed To:</strong><br>
            <strong>${order.customerName}</strong><br>
            Phone: ${order.customerPhone}<br>
            Email: ${order.customerEmail}
          </div>
          <div>
            <strong style="color: #410F29; text-transform: uppercase;">Shipping Address:</strong><br>
            ${shippingAddress.addressLine || ''}<br>
            ${shippingAddress.city || ''}, ${shippingAddress.state || ''} - ${shippingAddress.pincode || ''}<br>
            Country: ${shippingAddress.country || 'India'}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              <th>SKU</th>
              <th>HSN</th>
              <th>Qty</th>
              <th>Rate (₹)</th>
              <th class="text-right">Taxable Value (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map(
                (item) => `
              <tr>
                <td><strong>${item.productName}</strong><br><small>Size: ${item.size} | Color: ${item.color}</small></td>
                <td>${item.sku}</td>
                <td>${item.hsnCode || '6204'}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price.toLocaleString('en-IN')}</td>
                <td class="text-right">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        <div class="total-box">
          <table style="margin: 0;">
            <tr><td>Taxable Subtotal:</td><td class="text-right">₹${taxableValue.toLocaleString('en-IN')}</td></tr>
            <tr><td>CGST (2.5%):</td><td class="text-right">₹${cgst.toLocaleString('en-IN')}</td></tr>
            <tr><td>SGST (2.5%):</td><td class="text-right">₹${sgst.toLocaleString('en-IN')}</td></tr>
            <tr><td>Shipping Fee:</td><td class="text-right">${order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</td></tr>
            <tr style="font-weight: bold; font-size: 14px; color: #410F29; border-top: 2px solid #410F29;">
              <td>Grand Total:</td>
              <td class="text-right">₹${order.grandTotal.toLocaleString('en-IN')}</td>
            </tr>
          </table>
        </div>

        <div style="clear: both; margin-top: 40px; border-top: 1px solid #EFE8E1; padding-top: 10px; font-size: 10px; color: #777;">
          <p>Payment Method: <strong>${order.paymentMethod}</strong> | Payment Status: <strong>${order.paymentStatus}</strong></p>
          <p>This is a computer-generated GST tax invoice issued by ${legalName}.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error: any) {
    return new NextResponse('Error generating invoice', { status: 500 });
  }
}
