import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/auth-options';
import { prisma } from '@/prisma/prisma-client';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const data = await req.json();
    const { message } = data;

    const originalMessage = await prisma.chatMessage.findUnique({
      where: { id: Number(params.id) },
    });

    if (!originalMessage) {
      return new NextResponse('Message not found', { status: 404 });
    }

    // Создаем ответное сообщение
    const reply = await prisma.chatMessage.create({
      data: {
        type: originalMessage.type,
        orderId: originalMessage.orderId,
        name: 'Администратор',
        email: 'admin@example.com',
        message,
        userId: Number(session.user.id),
        isFromAdmin: true,
      },
    });

    return NextResponse.json(reply);
  } catch (error) {
    console.error('[CHAT_REPLY_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
