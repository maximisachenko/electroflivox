import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/auth-options';
import { prisma } from '@/prisma/prisma-client';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const data = await req.json();
    const { type, orderId, name, email, message } = data;

    // Если это сообщение по заказу, проверяем существование заказа
    if (type === 'order' && orderId) {
      const order = await prisma.order.findUnique({
        where: { id: Number(orderId) },
      });

      if (!order) {
        return new NextResponse('Заказ не найден', { status: 404 });
      }

      // Если пользователь авторизован, проверяем принадлежность заказа
      if (session?.user?.id && order.userId !== Number(session.user.id)) {
        return new NextResponse('Нет доступа к этому заказу', { status: 403 });
      }
    }

    // Создаем сообщение чата
    const chatMessage = await prisma.chatMessage.create({
      data: {
        type,
        orderId: type === 'order' && orderId ? Number(orderId) : null,
        name,
        email,
        message,
        userId: session?.user?.id ? Number(session.user.id) : null,
        isFromAdmin: false,
      },
    });

    return NextResponse.json(chatMessage);
  } catch (error) {
    console.error('[CHAT_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const orderId = searchParams.get('orderId');

    // Если это сообщения по заказу
    if (type === 'order' && orderId) {
      const order = await prisma.order.findUnique({
        where: { id: Number(orderId) },
      });

      if (!order) {
        return new NextResponse('Заказ не найден', { status: 404 });
      }

      // Если пользователь авторизован, проверяем принадлежность заказа
      if (session?.user?.id && order.userId !== Number(session.user.id)) {
        return new NextResponse('Нет доступа к этому заказу', { status: 403 });
      }

      const messages = await prisma.chatMessage.findMany({
        where: {
          orderId: Number(orderId),
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return NextResponse.json(messages);
    }

    // Если это общие сообщения
    const messages = await prisma.chatMessage.findMany({
      where: {
        type: 'support',
        userId: session?.user?.id ? Number(session.user.id) : null,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('[CHAT_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
