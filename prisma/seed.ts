import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding PREEBHA Lifestyle Part 2 database...');

  // Clean existing data
  await prisma.review.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.returnRequest.deleteMany();
  await prisma.shipmentRecord.deleteMany();
  await prisma.refundRecord.deleteMany();
  await prisma.orderStatusHistory.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productCollection.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.user.deleteMany();

  // Create Business Settings
  const defaultSettings = [
    { key: 'BRAND_NAME', value: 'PREEBHA Lifestyle' },
    { key: 'LEGAL_NAME', value: 'PREEBHA LIFESTYLE PRIVATE LIMITED' },
    { key: 'GSTIN', value: '07AAAAA0000A1Z5' },
    { key: 'REGISTERED_ADDRESS', value: 'PREEBHA Atelier, 42 Fashion Avenue, Connaught Place, New Delhi - 110001, India' },
    { key: 'CARE_EMAIL', value: 'care@preebhalifestyle.com' },
    { key: 'CARE_PHONE', value: '+91 98765 43210' },
    { key: 'WHATSAPP', value: '+91 98765 43210' },
    { key: 'INSTAGRAM', value: 'https://instagram.com/preebhalifestyle' },
    { key: 'COD_ENABLED', value: 'true' },
    { key: 'COD_FEE', value: '99' },
    { key: 'MIN_COD_VALUE', value: '999' },
    { key: 'MAX_COD_VALUE', value: '15000' },
    { key: 'FREE_SHIPPING_THRESHOLD', value: '2999' },
  ];

  for (const setting of defaultSettings) {
    await prisma.siteSetting.create({ data: setting });
  }

  // Create Admin & Super Admin Users
  await prisma.user.create({
    data: {
      name: 'PREEBHA Admin',
      email: 'admin@preebhalifestyle.com',
      password: 'adminpassword123',
      role: 'SUPER_ADMIN',
      phone: '+91 9876543210',
    },
  });

  await prisma.user.create({
    data: {
      name: 'Ananya Sharma',
      email: 'ananya@example.com',
      password: 'userpassword123',
      role: 'USER',
      phone: '+91 9898989898',
    },
  });

  // Create Categories & Subcategories
  const catKurtis = await prisma.category.create({
    data: {
      name: 'Kurtis',
      slug: 'kurtis',
      description: 'Elegant straight and A-line kurtis designed for everyday grace.',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000',
      subcategories: {
        create: [
          { name: 'Straight Kurtis', slug: 'straight-kurtis' },
          { name: 'A-Line Kurtis', slug: 'a-line-kurtis' },
          { name: 'Anarkali Kurtis', slug: 'anarkali-kurtis' },
          { name: 'Short Kurtis', slug: 'short-kurtis' },
          { name: 'Embroidered Kurtis', slug: 'embroidered-kurtis' },
        ],
      },
    },
    include: { subcategories: true },
  });

  const catKurtaSets = await prisma.category.create({
    data: {
      name: 'Kurta Sets',
      slug: 'kurta-sets',
      description: 'Handcrafted luxury kurta sets with dupattas and detailed embroidery.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
      subcategories: {
        create: [
          { name: '2-Piece Sets', slug: '2-piece-sets' },
          { name: '3-Piece Sets', slug: '3-piece-sets' },
          { name: 'Kurta & Pant Sets', slug: 'kurta-pant-sets' },
          { name: 'Festive Sets', slug: 'festive-sets' },
        ],
      },
    },
    include: { subcategories: true },
  });

  const catCoordSets = await prisma.category.create({
    data: {
      name: 'Co-ord Sets',
      slug: 'co-ord-sets',
      description: 'Contemporary dual-piece ensembles combining modern lines and feminine silhouettes.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000',
      subcategories: {
        create: [
          { name: 'Casual Co-ords', slug: 'casual-co-ords' },
          { name: 'Printed Co-ords', slug: 'printed-co-ords' },
          { name: 'Ethnic Co-ords', slug: 'ethnic-co-ords' },
        ],
      },
    },
    include: { subcategories: true },
  });

  const catDresses = await prisma.category.create({
    data: {
      name: 'Dresses',
      slug: 'dresses',
      description: 'Flowing maxi, midi, and festive dresses featuring rich heritage textiles.',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=1000',
      subcategories: {
        create: [
          { name: 'Midi Dresses', slug: 'midi-dresses' },
          { name: 'Maxi Dresses', slug: 'maxi-dresses' },
          { name: 'Occasion Dresses', slug: 'occasion-dresses' },
        ],
      },
    },
    include: { subcategories: true },
  });

  const catEthnicWear = await prisma.category.create({
    data: {
      name: 'Ethnic Wear',
      slug: 'ethnic-wear',
      description: 'Exclusive artisanal heritage attire, festive suits, and silk tailored sets.',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000',
      subcategories: {
        create: [
          { name: 'Festive Wear', slug: 'festive-wear' },
          { name: 'Traditional Wear', slug: 'traditional-wear' },
        ],
      },
    },
    include: { subcategories: true },
  });

  // Create Collections
  const colNewArrivals = await prisma.collection.create({
    data: {
      name: 'New Arrivals',
      slug: 'new-arrivals',
      description: 'Fresh drops and contemporary silhouettes.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
    },
  });

  const colBestsellers = await prisma.collection.create({
    data: {
      name: 'Bestsellers',
      slug: 'bestsellers',
      description: 'The PREEBHA pieces our customers keep coming back to.',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000',
    },
  });

  const colSignature = await prisma.collection.create({
    data: {
      name: 'PREEBHA Signature',
      slug: 'preebha-signature',
      description: 'A considered collection of elevated essentials.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000',
    },
  });

  const colFestiveEdit = await prisma.collection.create({
    data: {
      name: 'Festive Edit',
      slug: 'festive-edit',
      description: 'Royal zari embroidery and rich Chanderi silks.',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000',
    },
  });

  // Seed Products with Variant Inventory & Collection Junctions
  const products = [
    {
      name: 'Gilded Rose Zari Embroidered Silk Kurta Set',
      slug: 'gilded-rose-zari-embroidered-silk-kurta-set',
      sku: 'PRB-KS-001',
      hsnCode: '6204',
      taxRate: 5.0,
      description: 'An exquisite Dusty Rose Chanderi silk kurta embellished with hand-sculpted gold zari floral embroidery along the neckline and cuffs. Paired with wide-leg silk trousers and an organza scalloped dupatta.',
      fabric: 'Chanderi Silk & Organza',
      fit: 'Straight Regal Fit',
      length: 'Calf Length (46 inches)',
      pattern: 'Floral Zari Embroidery',
      neck: 'V-Neckline with Zari Work',
      sleeve: '3/4th Sleeves',
      occasion: 'Festive & Weddings',
      careInstructions: 'Dry Clean Only',
      mrp: 6999,
      sellingPrice: 4999,
      costPrice: 2100,
      discountPercent: 28,
      isNewArrival: true,
      isBestSeller: true,
      isFeatured: true,
      categoryId: catKurtaSets.id,
      subcategoryId: catKurtaSets.subcategories[1]?.id,
      collections: [colNewArrivals.id, colBestsellers.id, colSignature.id, colFestiveEdit.id],
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000',
      ],
      colors: [
        { color: 'Dusty Rose', colorHex: '#D0A3A6' },
        { color: 'Deep Plum', colorHex: '#410F29' },
      ],
    },
    {
      name: 'Ivory Chanderi Floral Printed Kurta Set with Organza Dupatta',
      slug: 'ivory-chanderi-floral-printed-kurta-set',
      sku: 'PRB-KS-002',
      hsnCode: '6204',
      taxRate: 5.0,
      description: 'Soft ivory base adorned with muted blush botanical prints. Features subtle mirror-work details on the yoke and comes with matching straight pants and a light organza dupatta.',
      fabric: '100% Pure Chanderi Cotton',
      fit: 'Relaxed Fit',
      length: 'Knee Length',
      pattern: 'Handprinted Botanical Floral',
      neck: 'Mandarin Collar',
      sleeve: 'Full Sleeves',
      occasion: 'Boutique Parties & Daytime Celebrations',
      careInstructions: 'Gentle Hand Wash / Dry Clean',
      mrp: 5499,
      sellingPrice: 3999,
      costPrice: 1650,
      discountPercent: 27,
      isNewArrival: true,
      isBestSeller: false,
      isFeatured: true,
      categoryId: catKurtaSets.id,
      subcategoryId: catKurtaSets.subcategories[0]?.id,
      collections: [colNewArrivals.id, colSignature.id],
      images: [
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
      ],
      colors: [
        { color: 'Ivory Blush', colorHex: '#FAF8F6' },
        { color: 'Soft Nude', colorHex: '#F2D7D0' },
      ],
    },
    {
      name: 'Deep Plum Velvet Embroidered Anarkali Dress',
      slug: 'deep-plum-velvet-embroidered-anarkali-dress',
      sku: 'PRB-DR-003',
      hsnCode: '6204',
      taxRate: 5.0,
      description: 'Sensual Deep Plum velvet dress featuring a flared silhouette and hand-embellished dabka work.',
      fabric: 'Micro Velvet',
      fit: 'Flared Anarkali Silhouette',
      length: 'Floor Length (54 inches)',
      pattern: 'Regal Yoke Embroidery',
      neck: 'Sweetheart Neckline',
      sleeve: 'Elbow Length',
      occasion: 'Evening Soiree & Royal Festive',
      careInstructions: 'Dry Clean Only',
      mrp: 8999,
      sellingPrice: 6499,
      costPrice: 2800,
      discountPercent: 27,
      isNewArrival: false,
      isBestSeller: true,
      isFeatured: true,
      categoryId: catDresses.id,
      subcategoryId: catDresses.subcategories[2]?.id,
      collections: [colBestsellers.id, colFestiveEdit.id],
      images: [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=1000',
      ],
      colors: [
        { color: 'Deep Plum', colorHex: '#410F29' },
        { color: 'Luxury Black', colorHex: '#0A0A0A' },
      ],
    },
    {
      name: 'Blush Nude Linen Blend Belted Co-ord Set',
      slug: 'blush-nude-linen-blend-belted-co-ord-set',
      sku: 'PRB-CO-004',
      hsnCode: '6204',
      taxRate: 5.0,
      description: 'Modern sophisticated two-piece co-ord set featuring a structured longline tunic with detachable fabric belt and tailored cropped trousers.',
      fabric: 'Premium Linen Blend',
      fit: 'Tailored Smart Fit',
      length: 'Tunic 32 inches, Trouser 38 inches',
      pattern: 'Solid Minimalist',
      neck: 'Notch Collar',
      sleeve: 'Full Sleeves with Cuffs',
      occasion: 'Resort Wear & Casual Luxury',
      careInstructions: 'Machine Wash Delicate',
      mrp: 4499,
      sellingPrice: 3299,
      costPrice: 1300,
      discountPercent: 26,
      isNewArrival: true,
      isBestSeller: true,
      isFeatured: false,
      categoryId: catCoordSets.id,
      subcategoryId: catCoordSets.subcategories[0]?.id,
      collections: [colNewArrivals.id, colBestsellers.id],
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000',
      ],
      colors: [
        { color: 'Soft Blush', colorHex: '#F2D7D0' },
        { color: 'Ivory', colorHex: '#FAF8F6' },
      ],
    },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  for (const item of products) {
    const product = await prisma.product.create({
      data: {
        name: item.name,
        slug: item.slug,
        sku: item.sku,
        hsnCode: item.hsnCode,
        taxRate: item.taxRate,
        description: item.description,
        fabric: item.fabric,
        fit: item.fit,
        length: item.length,
        pattern: item.pattern,
        neck: item.neck,
        sleeve: item.sleeve,
        occasion: item.occasion,
        careInstructions: item.careInstructions,
        mrp: item.mrp,
        sellingPrice: item.sellingPrice,
        costPrice: item.costPrice,
        discountPercent: item.discountPercent,
        isNewArrival: item.isNewArrival,
        isBestSeller: item.isBestSeller,
        isFeatured: item.isFeatured,
        categoryId: item.categoryId,
        subcategoryId: item.subcategoryId,
        rating: 4.9,
        reviewCount: 16,
      },
    });

    // Link Collections (Many-to-Many)
    for (const colId of item.collections) {
      await prisma.productCollection.create({
        data: {
          productId: product.id,
          collectionId: colId,
        },
      });
    }

    // Images
    for (let i = 0; i < item.images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: item.images[i],
          isPrimary: i === 0,
          displayOrder: i,
        },
      });
    }

    // Variants & Stock
    for (const colorObj of item.colors) {
      for (const size of sizes) {
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            color: colorObj.color,
            colorHex: colorObj.colorHex,
            size,
            sku: `${item.sku}-${colorObj.color.substring(0, 2).toUpperCase()}-${size}`,
            stock: 12,
            reservedStock: 0,
            soldQuantity: 3,
            isAvailable: true,
          },
        });
      }
    }

    // Reviews
    await prisma.review.create({
      data: {
        productId: product.id,
        userName: 'Priya K.',
        rating: 5,
        title: 'Exquisite embroidery & luxurious drape!',
        comment: 'PREEBHA delivers on quiet luxury. The fit and zari finish are outstanding.',
        isVerifiedPurchase: true,
      },
    });
  }

  // Announcement
  await prisma.announcement.create({
    data: {
      message: 'Welcome to PREEBHA — Elegance, Redefined.',
      isActive: true,
    },
  });

  // Coupons
  await prisma.coupon.create({
    data: {
      code: 'PREEBHA10',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      minOrderValue: 1999,
      isActive: true,
    },
  });

  console.log('PREEBHA Lifestyle Part 2 database successfully seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
