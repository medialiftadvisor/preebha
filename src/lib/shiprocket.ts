export interface CheckServiceabilityOptions {
  pickupPincode?: string;
  deliveryPincode: string;
  weight?: number; // in kg
  isCod?: boolean;
}

export async function checkShiprocketServiceability(options: CheckServiceabilityOptions) {
  const pickupPincode = options.pickupPincode || '110001';
  const deliveryPincode = options.deliveryPincode;

  // Validate Indian 6-digit Pincode regex
  if (!deliveryPincode || !/^\d{6}$/.test(deliveryPincode)) {
    return {
      serviceable: false,
      message: 'Invalid 6-digit Indian PIN code.',
    };
  }

  // Calculate estimated delivery days
  const date = new Date();
  date.setDate(date.getDate() + 4);
  const deliveryDateStr = date.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return {
    serviceable: true,
    pickupPincode,
    deliveryPincode,
    courierName: 'Delhivery Express / BlueDart',
    estimatedDays: 4,
    deliveryDate: deliveryDateStr,
    codAvailable: true,
    shippingFee: 0,
  };
}

export async function createShiprocketShipment(order: any) {
  return {
    success: true,
    shipmentId: `SR_SHIP_${Date.now()}`,
    shiprocketOrderId: `SR_ORD_${order.orderNumber}`,
    awbNumber: `AWB${Math.floor(100000000 + Math.random() * 900000000)}`,
    courierName: 'Express Courier Network',
    labelUrl: `/api/orders/${order.id}/invoice`,
    trackingUrl: `https://shiprocket.co/tracking/${order.orderNumber}`,
  };
}
