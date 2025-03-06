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
      <SheetContent className="flex flex-col justify-between bg-cardBackground">
        {items.length > 0 && (
          <SheetHeader>
            <SheetTitle>
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
            'flex flex-col h-full',
            items.length === 0 && 'justify-center'
          )}
        >
          {!totalAmount && (
            <>
              <div className="flex flex-col items-center justify-center w-72 mx-auto">
                <Image
                  src="/empty_box.png"
                  alt="Empty cart"
                  width={120}
                  height={120}
                />
                <Title
                  size="sm"
                  text="Корзина пустая"
                  className="text-center font-bold my-2"
                />
                <p className="text-center text-neutral-500 mb-5">
                  Добавьте хотя бы один товар, чтобы совершить заказ
                </p>

                <SheetClose>
                  <Button className="w-56 h-12 text-base" size="lg">
                    <ArrowLeft className="w-5 mr-2" />
                    Вернуться назад
                  </Button>
                </SheetClose>
              </div>
            </>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto flex-1 scrollbar">
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

              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>
                    <span className="font-bold text-lg">{totalAmount} BYN</span>
                  </div>

                  <Link href="/checkout">
                    <Button
                      onClick={() => setRedeirecting(true)}
                      loading={rederecting}
                      type="submit"
                      className="w-full h-12 text-base"
                    >
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
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
