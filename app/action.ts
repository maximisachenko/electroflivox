'use server';

import { prisma } from '@/prisma/prisma-client';
import { CheckoutFormValues } from './(checkout)/checkout/checkout-form-schema';
import { OrderStatus, Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { sendEmail } from '@/shared/lib';
import { PayOrderTemplate } from '@/shared/components/shared/email-templates/pay-order';
import { getUserSession } from '@/shared/lib/get-user-session';
import { hashSync } from 'bcrypt';
import { VerificationUserTemplate } from '@/shared/components/shared/email-templates/verification-user';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

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

    /* Если корзина не найдена возвращаем ошибку */
    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    /* Если корзина пуста */
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    /* Создаём заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart ? userCart.totalAmount : 0,
        status: OrderStatus.PENDING,
        items: userCart ? JSON.stringify(userCart.items) : '[]',
      },
    });

    /* Очищаем корзину */
    await prisma.cart.update({
      where: {
        id: userCart?.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart?.id,
      },
    });

    const paymentUrl = 'https://imgur.com/a/JRH8M7E';

    await sendEmail(
      data.email,
      'Flivox / Оплатите заказ #' + order.id,
      await PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: paymentUrl,
      })
    );

    return paymentUrl;
  } catch (err) {
    console.log('[CreateOrder} Server Error', err);
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
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Flivox / 📝 Подтверждение регистрации',
      await VerificationUserTemplate({
        code,
      })
    );
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}
