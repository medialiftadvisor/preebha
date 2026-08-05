# PREEBHA LIFESTYLE — Premium E-Commerce Website

> **“Elegance, Redefined.”**  
> A modern Indian premium women's fashion and lifestyle brand combining elegance, femininity, quality craftsmanship and contemporary ethnic design.

---

## 🎨 Brand Design Tokens
- **Soft Blush Nude**: `#F2D7D0`
- **Dusty Rose**: `#D0A3A6`
- **Deep Plum**: `#410F29`
- **Luxury Black**: `#0A0A0A`
- **Ivory**: `#FAF8F6`

---

## 🚀 Tech Stack
- **Framework**: Next.js 15 (App Router, Server Components & Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database & ORM**: Prisma ORM with SQLite (Local Dev zero setup) / PostgreSQL (Vercel & Supabase compatible)
- **Icons**: Lucide React
- **Payments Integration**: Razorpay API Architecture (`/api/checkout/verify` with HMAC SHA256 signature verification)
- **Logistics Integration**: Shiprocket Serviceability & Live Tracking API Architecture (`/api/orders/track`)

---

## 🛠️ Quick Start & Setup Instructions

### 1. Prerequisites
Ensure Node.js (v18+) is installed on your system.

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Database Initialization & Seeding
Push the Prisma schema to generate the local SQLite database and populate seed data:
```bash
npm run db:push
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Credentials for Testing

### Admin Portal
- **URL**: `http://localhost:3000/admin` or via Sign In page toggle
- **Email**: `admin@preebhalifestyle.com`
- **Password**: `adminpassword123`

### Customer Portal
- **Email**: `ananya@example.com`
- **Password**: `userpassword123`

---

## 📦 Deployment to Vercel
1. Connect your repository to Vercel.
2. Set environment variables (`DATABASE_URL`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`).
3. Deploy! Next.js will automatically optimize images, SSR pages, and API routes.
