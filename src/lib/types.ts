export interface ProductVariant {
  id: string;
  productId: string;
  color: string;
  colorHex?: string;
  size: string;
  sku: string;
  stock: number;
  isAvailable: boolean;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  banner?: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  fabric?: string;
  fit?: string;
  length?: string;
  pattern?: string;
  neck?: string;
  sleeve?: string;
  occasion?: string;
  careInstructions?: string;
  countryOfOrigin?: string;
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  categoryId: string;
  category?: Category;
  collectionId?: string;
  collection?: Collection;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  variants: ProductVariant[];
  createdAt?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minOrderValue: number;
  maxDiscountAmount?: number;
}

export interface Address {
  id: string;
  name: string;
  mobile: string;
  addressLine: string;
  apartment?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddressJson: string;
  totalMRP: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  grandTotal: number;
  paymentStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  paymentMethod: string;
  orderStatus: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';
  awbNumber?: string;
  trackingUrl?: string;
  items: Array<{
    id: string;
    productName: string;
    productImage: string;
    color: string;
    size: string;
    sku: string;
    price: number;
    quantity: number;
  }>;
  createdAt: string;
}
