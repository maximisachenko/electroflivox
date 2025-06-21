import { prisma } from '@/prisma/prisma-client';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';
import { validateCartItemAccess } from '@/shared/lib/find-or-creeate-cart';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/auth-options';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;
    const session = await getServerSession(authOptions);

    if (!token) {
      return NextResponse.json(
        { error: 'Cart token not found' },
        { status: 401 }
      );
    }

    // Проверяем права доступа к элементу корзины
    const cartItem = await validateCartItemAccess(id, token, session?.user?.id);

    if (!cartItem) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(
      token,
      session?.user?.id
    );

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_PATCH] Server error', error);

    if (
      error instanceof Error &&
      error.message === 'Нет доступа к этому элементу корзины'
    ) {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }

    return NextResponse.json(
      {
        message: 'Не удалось обновить корзину',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get('cartToken')?.value;
    const session = await getServerSession(authOptions);

    if (!token) {
      return NextResponse.json(
        { error: 'Cart token not found' },
        { status: 401 }
      );
    }

    // Проверяем права доступа к элементу корзины
    const cartItem = await validateCartItemAccess(id, token, session?.user?.id);

    if (!cartItem) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({
      where: {
        id: Number(params.id),
      },
    });

    const updatedUserCart = await updateCartTotalAmount(
      token,
      session?.user?.id
    );
    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_DELETE] Server error', error);

    if (
      error instanceof Error &&
      error.message === 'Нет доступа к этому элементу корзины'
    ) {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }

    return NextResponse.json(
      { message: 'Не удалось удалить товар из корзины' },
      { status: 500 }
    );
  }
}
