'use client';

import React from 'react';
import { Container } from '@/shared/components/shared/container';

import {
  CheckoutItem,
  CheckoutPersonalForm,
  CheckoutSidebar,
  FormInput,
  Title,
  WhiteBlock,
} from '@/shared/components/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/shared/hooks/use-cart';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { CheckoutCart } from '@/shared/components/shared/checkout/checkout-cart';
import { CheckoutAddressForm } from '@/shared/components/shared/checkout/checkout-address-form';
import { checkoutFormSchema } from '@/shared/components/shared/checkout/checkout-form-schema';
import { CheckoutFormValues } from './checkout-form-schema';
import { cn } from '@/shared/lib/utils';
import { createOrder } from '@/app/action';
import { toast } from 'react-hot-toast';

export default function CheckoutPage() {
  const { items, totalAmount, updateItemQuantity, removeCartItem, loading } =
    useCart();
  const [submitting, setSubmitting] = React.useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      comment: undefined,
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      toast.success('Заказ успешно оформлен! 📝 Переход на оплату...', {
        icon: '✅',
      });

      if (typeof url === 'string' && url) {
        location.href = url;
      }
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-fontColor text-[36px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                removeCartItem={removeCartItem}
                onClickCountButton={onClickCountButton}
                loading={loading}
              />

              <CheckoutPersonalForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />

              <CheckoutAddressForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
            </div>

            {/* Правая часть */}
            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                className="sticky top-4"
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
