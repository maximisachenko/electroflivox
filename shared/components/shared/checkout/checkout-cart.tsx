import React from 'react';
import { WhiteBlock } from '../white-block';
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details';
import { CheckoutItem } from '../checkout-item';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';

interface Props {
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => void;
  removeCartItem: (id: number) => void;
  className?: string;
  loading?: boolean;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  className,
  loading,
}) => {
  return (
    <div>
      <WhiteBlock title="1. Корзина" className="text-fontColor">
        <div className="flex flex-col gap-5">
          {loading
            ? [...Array(4)].map((_, index) => (
                <CheckoutItemSkeleton key={index} />
              ))
            : items.map((item) => (
                <CheckoutItem
                  key={item.id}
                  id={item.id}
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
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onClickCountButton={(type) =>
                    onClickCountButton(item.id, item.quantity, type)
                  }
                  onClickRemove={() => removeCartItem(item.id)}
                  disabled={item.disabled}
                />
              ))}
        </div>
      </WhiteBlock>
    </div>
  );
};
