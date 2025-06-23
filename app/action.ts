'use server';

import { prisma } from '@/prisma/prisma-client';
import { CheckoutFormValues } from '@/shared/components/shared/checkout/checkout-form-schema';
import { OrderStatus, Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { createPayment, sendEmail } from '@/shared/lib';
import { PayOrderTemplate } from '@/shared/components/shared/email-templates/pay-order';
import { getUserSession } from '@/shared/lib/get-user-session';
import { hashSync } from 'bcrypt';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/auth-options';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value;
    const currentUser = await getUserSession();

    console.log('Session check:', {
      currentUser,
      sessionId: currentUser?.id,
      isAuthenticated: !!currentUser,
      cookies: cookieStore.getAll().map((c) => c.name),
    });

    console.log('Creating order with data:', {
      cartToken,
      userId: currentUser?.id,
      formData: data,
    });

    if (!currentUser) {
      throw new Error('Необходима авторизация');
    }

    if (!cartToken) {
      console.error('Cart token not found');
      throw new Error('Cart token not found');
    }

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            services: true,
            variation: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error('Корзина не найдена');
    }

    if (userCart.items.length === 0) {
      throw new Error('Корзина пуста');
    }

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        userId: Number(currentUser.id),
        status: OrderStatus.PENDING,
        totalAmount: userCart.totalAmount,
        deliveryMethod: data.deliveryMethod,
        fullName:
          data.firstName && data.lastName
            ? `${data.firstName} ${data.lastName}`
            : 'Клиент',
        email: data.email || '',
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        items: JSON.stringify(
          userCart.items.map((item) => ({
            productId: item.variation.product.id,
            variationId: item.variation.id,
            quantity: item.quantity,
            price: item.variation.price,
            services: item.services.map((service) => ({
              serviceId: service.id,
              price: service.price,
            })),
          }))
        ),
      },
    });

    /* Очищаем корзину */
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    /* Обновляем общую сумму корзины */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    return {
      success: true,
      orderId: order.id,
    };
  } catch (err) {
    console.error('Error [CREATE_ORDER]', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Не удалось создать заказ',
    };
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('User not found');
    }

    const findUser = await prisma.user.findFirst({
      where: { id: Number(currentUser.id) },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    console.log('Registering user with email:', body.email);

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      throw new Error('Пользователь уже существует');
    }

    const hashedPassword = hashSync(body.password, 10);
    console.log('Password hashed successfully');

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashedPassword,
        verified: new Date(), // Сразу подтверждаем пользователя
      },
    });

    console.log('User created successfully:', {
      id: createdUser.id,
      email: createdUser.email,
    });

    // Больше не создаем код верификации и не отправляем email
    console.log('User registered successfully without email verification');
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}
