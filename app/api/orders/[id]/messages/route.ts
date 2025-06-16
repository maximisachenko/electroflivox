import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/auth-options';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Проверяем, имеет ли пользователь доступ к этому заказу
    const order = await prisma.order.findFirst({
      where: {
        id: parseInt(params.id),
        OR: [
          { userId: parseInt(session.user.id) }, // Пользователь - владелец заказа
          { userId: null }, // Или заказ без владельца
        ],
      },
    });

    // Если это админ, даем доступ ко всем заказам
    if (session.user.role !== 'ADMIN' && !order) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const messages = await prisma.message.findMany({
      where: {
        orderId: parseInt(params.id),
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return new NextResponse('Content is required', { status: 400 });
    }

    // Проверяем, имеет ли пользователь доступ к этому заказу
    const order = await prisma.order.findFirst({
      where: {
        id: parseInt(params.id),
        OR: [
          { userId: parseInt(session.user.id) }, // Пользователь - владелец заказа
          { userId: null }, // Или заказ без владельца
        ],
      },
    });

    // Если это админ, даем доступ ко всем заказам
    if (session.user.role !== 'ADMIN' && !order) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const message = await prisma.message.create({
      data: {
        content,
        orderId: parseInt(params.id),
        userId: parseInt(session.user.id),
        isFromAdmin: session.user.role === 'ADMIN',
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
