import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists in Prisma DB
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists in the database. Please Sign In.' },
        { status: 400 }
      );
    }

    // Create user in Prisma DB
    const newUser = await prisma.user.create({
      data: {
        name,
        email: cleanEmail,
        password, // For production, bcrypt/argon2 hashing can be applied
        phone: phone || '+91 9876543210',
        role: 'USER',
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    console.error('Error creating user in database:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server error creating user.' },
      { status: 500 }
    );
  }
}
