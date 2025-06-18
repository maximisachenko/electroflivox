import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { findOrCreateCart } from '@/shared/lib';
import { CreateCartItemValues } from '@/shared/services/dto/cart-dto';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/auth-options';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const token = req.cookies.get('cartToken')?.value;

    if (!session && !token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          // Если пользователь авторизован - ищем по userId
          session?.user?.id ? { userId: session.user.id } : null,
          // Если нет - по токену
          token ? { token } : null,
        ].filter(Boolean),
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            variation: {
              include: {
                product: true,
              },
            },
            services: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось получить корзину' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'Необходимо авторизоваться' },
        { status: 401 }
      );
    }

    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        variationId: data.variationId,
        services: {
          every: {
            id: {
              in: data.services,
            },
          },
        },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: { id: findCartItem.id },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });

      const updatedUserCart = await updateCartTotalAmount(token);

      const resp = NextResponse.json(updatedUserCart);
      resp.cookies.set('cartToken', token);
      return resp;
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          variationId: data.variationId,
          quantity: 1,
          services: {
            connect: data.services?.map((id) => ({ id })),
          },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token);
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось добавить товар в корзину' },
      { status: 500 }
    );
  }
}
