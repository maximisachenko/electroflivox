'use client';

import React, { Suspense } from 'react';
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
import { FormProvider, useForm } from 'react-hook-form';
import { CheckoutCart } from '@/shared/components/shared/checkout/checkout-cart';
import { CheckoutAddressForm } from '@/shared/components/shared/checkout/checkout-address-form';
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/components/shared/checkout/checkout-form-schema';
import { cn } from '@/shared/lib/utils';
import { createOrder } from '@/app/action';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { REGIONS, CITIES } from '@/shared/constants/locations';
import { useSession } from 'next-auth/react';
import { AuthModal } from '@/shared/components/shared/modals/auth-modal/auth-modal';

export default function CheckoutPage() {
  const { items, totalAmount, updateItemQuantity, removeCartItem, loading } = useCart();
  const [submitting, setSubmitting] = React.useState(false);
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      region: 'minsk',
      city: '',
      address: '',
      postIndex: '',
      deliveryMethod: 'belpost',
      comment: undefined,
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!session) {
      setOpenAuthModal(true);
      return;
    }

    try {
      setSubmitting(true);
      const result = await createOrder(data);

      if (result.success) {
        toast.success('Заказ успешно оформлен!', {
          icon: '✅',
        });
        router.push('/');
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error(err);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const deliveryMethod = form.watch('deliveryMethod');
  const selectedRegion = form.watch('region');
  const deliveryCost = deliveryMethod === 'minsk' ? 0 : deliveryMethod === 'belpost' ? 5 : 7;
  const isMinskDelivery = deliveryMethod === 'minsk';

  if (status === 'loading') {
    return (
      <Container className="mt-4 sm:mt-6 lg:mt-10">
        <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </Container>
    );
  }

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Container className="mt-4 sm:mt-6 lg:mt-10">
        <Title
          text="Оформление заказа"
          className="font-extrabold mb-4 sm:mb-6 lg:mb-8 text-fontColor text-xl sm:text-2xl lg:text-[36px]"
        />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10">
              {/* Основная часть */}
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-10 flex-1 mb-6 sm:mb-8 lg:mb-20">
                <CheckoutCart
                  items={items}
                  removeCartItem={removeCartItem}
                  onClickCountButton={onClickCountButton}
                  loading={loading}
                />

                <WhiteBlock className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 lg:mb-5">Контактные данные</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                    {!isMinskDelivery && (
                      <>
                        <FormInput name="firstName" label="Имя" required />
                        <FormInput name="lastName" label="Фамилия" required />
                        <div className="col-span-1 sm:col-span-2">
                          <FormInput name="email" label="Эл. почта" required />
                        </div>
                      </>
                    )}
                    <div className={cn("col-span-1", !isMinskDelivery && "sm:col-span-2")}>
                      <FormInput name="phone" label="Телефон" required />
                    </div>
                  </div>
                </WhiteBlock>

                <WhiteBlock className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 lg:mb-5">Адрес доставки</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                    {!isMinskDelivery && (
                      <>
                        <div className="col-span-1 sm:col-span-2">
                          <label className="text-sm font-medium mb-2 block">Область</label>
                          <Select
                            value={selectedRegion}
                            onValueChange={(value) => {
                              form.setValue('region', value);
                              form.setValue('city', '');
                            }}
                          >
                            <SelectTrigger className="h-11 sm:h-12">
                              <SelectValue placeholder="Выберите область" />
                            </SelectTrigger>
                            <SelectContent>
                              {REGIONS.map((region) => (
                                <SelectItem key={region.id} value={region.id}>
                                  {region.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="col-span-1 sm:col-span-2">
                          <label className="text-sm font-medium mb-2 block">Город</label>
                          <Select
                            value={form.watch('city')}
                            onValueChange={(value) => form.setValue('city', value)}
                          >
                            <SelectTrigger className="h-11 sm:h-12">
                              <SelectValue placeholder="Выберите город" />
                            </SelectTrigger>
                            <SelectContent>
                              {CITIES[selectedRegion as keyof typeof CITIES]?.map((city) => (
                                <SelectItem key={city.id} value={city.name}>
                                  {city.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {!isMinskDelivery && (
                      <div className="col-span-1 sm:col-span-2">
                        <FormInput name="postIndex" label="Почтовый индекс" required />
                      </div>
                    )}
                    <div className="col-span-1 sm:col-span-2">
                      <FormInput name="address" label="Адрес" required />
                    </div>
                  </div>
                </WhiteBlock>

                <WhiteBlock className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 lg:mb-5">Способ доставки</h3>
                  <RadioGroup
                    defaultValue="belpost"
                    onValueChange={(value) => form.setValue('deliveryMethod', value as 'belpost' | 'europost' | 'minsk')}
                    className="flex flex-col space-y-3 sm:space-y-4 lg:space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="minsk" id="minsk" />
                      <Label htmlFor="minsk" className="text-sm sm:text-base lg:text-base font-medium">
                        Доставка по Минску (бесплатно)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="belpost" id="belpost" />
                      <Label htmlFor="belpost" className="text-sm sm:text-base lg:text-base font-medium">
                        Белпочта (5 BYN)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="europost" id="europost" />
                      <Label htmlFor="europost" className="text-sm sm:text-base lg:text-base font-medium">
                        Европочта (7 BYN)
                      </Label>
                    </div>
                  </RadioGroup>
                </WhiteBlock>

                <WhiteBlock className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 lg:mb-5">Комментарий к заказу</h3>
                  <FormInput name="comment" label="Комментарий" placeholder="Дополнительные пожелания..." />
                </WhiteBlock>
              </div>

              {/* Боковая панель - на мобильных показывается вверху */}
              <div className="w-full lg:w-[400px] xl:w-[450px] order-first lg:order-last">
                <div className="lg:sticky lg:top-4">
                  <CheckoutSidebar
                    totalAmount={totalAmount}
                    loading={loading || submitting}
                    deliveryCost={deliveryCost}
                  />
                </div>
              </div>
            </div>
          </form>
        </FormProvider>

        <AuthModal
          open={openAuthModal}
          onClose={() => setOpenAuthModal(false)}
        />
      </Container>
    </Suspense>
  );
}
