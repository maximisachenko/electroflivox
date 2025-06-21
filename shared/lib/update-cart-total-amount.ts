import { prisma } from '@/prisma/prisma-client';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

export const updateCartTotalAmount = async (token: string, userId?: string) => {
  const userCart = await prisma.cart.findFirst({
    where: {
      OR: [
        // Если пользователь авторизован - ищем по userId
        ...(userId ? [{ userId: Number(userId) }] : []),
        // Ищем по токену
        { token },
      ],
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

  if (!userCart) {
    return;
  }

  const totalAmount = userCart.items.reduce((acc, item) => {
    return acc + calcCartItemTotalPrice(item);
  }, 0);

  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount,
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
};
