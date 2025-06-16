import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/auth-options';
import { createPayment } from '@/shared/lib/create-payment';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { orderId, amount, description } = body;

    const payment = await createPayment({
      orderId,
      amount,
      description,
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error('[PAYMENT_CREATE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
