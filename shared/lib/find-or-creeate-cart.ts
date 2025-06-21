import { prisma } from '@/prisma/prisma-client';

export const findOrCreateCart = async (token: string, userId?: string) => {
  let userCart = await prisma.cart.findFirst({
    where: {
      OR: [
        // Если пользователь авторизован - ищем по userId
        ...(userId ? [{ userId: Number(userId) }] : []),
        // Ищем по токену
        { token },
      ],
    },
  });

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token,
        userId: userId ? Number(userId) : undefined,
      },
    });
  } else if (userId && !userCart.userId) {
    // Если нашли корзину по токену, но пользователь теперь авторизован,
    // привязываем корзину к пользователю
    userCart = await prisma.cart.update({
      where: { id: userCart.id },
      data: { userId: Number(userId) },
    });
  }

  return userCart;
};

// Функция для проверки прав доступа к элементу корзины
export const validateCartItemAccess = async (
  itemId: number,
  token: string,
  userId?: string
) => {
  const cartItem = await prisma.cartItem.findFirst({
    where: { id: itemId },
    include: {
      cart: true,
    },
  });

  if (!cartItem) {
    return null;
  }

  // Проверяем, принадлежит ли товар корзине этого пользователя
  const isOwner = userId
    ? cartItem.cart.userId === Number(userId)
    : cartItem.cart.token === token;

  if (!isOwner) {
    throw new Error('Нет доступа к этому элементу корзины');
  }

  return cartItem;
};
