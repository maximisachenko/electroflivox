import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { hashSync } from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Хешируем пароль
    const hashedPassword = hashSync(password, 10);
    console.log('Original password:', password);
    console.log('Hashed password:', hashedPassword);

    // Создаем пользователя
    const user = await prisma.user.create({
      data: {
        email,
        fullName: 'Test User',
        password: hashedPassword,
        role: 'USER',
        verified: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        hashedPassword,
      },
    });
  } catch (error) {
    console.error('Error creating test user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create test user' },
      { status: 500 }
    );
  }
}
