'use client';

import React from 'react';
import Image from 'next/image';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store';
import { shallow } from 'zustand/shallow';
import { Title } from './title';
import clsx from 'clsx';
import { useCart } from '@/shared/hooks/use-cart';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { items, totalAmount, updateItemQuantity, removeCartItem } = useCart();
  const [rederecting, setRedeirecting] = React.useState(false);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between bg-cardBackground w-full sm:max-w-md">
        {items.length > 0 && (
          <SheetHeader className="px-4 sm:px-6">
            <SheetTitle className="text-base sm:text-lg">
              В корзине{' '}
              <span className="font-bold">
                {items.length}{' '}
                {items.length === 1
                  ? 'товар'
                  : items.length >= 2 && items.length <= 4
                    ? 'товара'
                    : 'товаров'}
              </span>
            </SheetTitle>
          </SheetHeader>
        )}

        <div
          className={clsx(
            'flex flex-col h-full px-4 sm:px-6',
            items.length === 0 && 'justify-center'
          )}
        >
          {!totalAmount && (
            <>
              <div className="flex flex-col items-center justify-center max-w-xs mx-auto">
                <Image
                  src="/empty_box.png"
                  alt="Пустая корзина"
                  width={100}
                  height={100}
                  className="sm:w-[120px] sm:h-[120px]"
                />
                <Title
                  size="sm"
                  text="Корзина пустая"
                  className="text-center font-bold my-3 text-base sm:text-lg"
                />
                <p className="text-center text-neutral-500 mb-5 text-sm sm:text-base">
                  Добавьте хотя бы один товар, чтобы совершить заказ
                </p>

                <SheetClose>
                  <Button className="w-full max-w-56 h-10 sm:h-12 text-sm sm:text-base" size="lg">
                    <ArrowLeft className="w-4 sm:w-5 mr-2" />
                    Вернуться назад
                  </Button>
                </SheetClose>
              </div>
            </>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-4 sm:-mx-6 mt-5 overflow-auto flex-1 scrollbar">
                {items.map((item) => (
                  <div className="mb-2" key={item.id}>
                    <CartDrawerItem
                      id={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      price={item.price}
                      imageUrl={item.imageUrl}
                      details={
                        item.color && item.guarantee
                          ? getCartItemDetails(
                            item.services,
                            item.color,
                            item.guarantee
                          )
                          : ''
                      }
                      onClickCountButton={(type) =>
                        onClickCountButton(item.id, item.quantity, type)
                      }
                      onClickRemoveButton={() => removeCartItem(item.id)}
                      disabled={item.disabled}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="-mx-4 sm:-mx-6 bg-white p-4 sm:p-8">
                <div className="w-full">
                  <div className="flex mb-3 sm:mb-4">
                    <span className="flex flex-1 text-base sm:text-lg text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>
                    <span className="font-bold text-base sm:text-lg">{totalAmount} BYN</span>
                  </div>

                  <Link href="/checkout">
                    <Button
                      onClick={() => setRedeirecting(true)}
                      loading={rederecting}
                      type="submit"
                      className="w-full h-10 sm:h-12 text-sm sm:text-base"
                    >
                      Оформить заказ
                      <ArrowRight className="w-4 sm:w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
