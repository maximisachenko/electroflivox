import { cn } from '@/shared/lib/utils';
import React from 'react';
import { WhiteBlock } from './white-block';
import { Button } from '../ui/button';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { CheckoutItemDetails } from './checkout-item-details';
import { Skeleton } from '../ui';

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
  deliveryCost: number;
}

const VAT = 2;

export const CheckoutSidebar: React.FC<Props> = ({
  className,
  totalAmount,
  loading,
  deliveryCost,
}) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + vatPrice + deliveryCost;

  return (
    <div className={cn(className)}>
      <WhiteBlock className="p-6 sticky top-4">
        <div className="flex flex-col gap-1 text-fontColor">
          <span className="text-xl">Итого</span>
          {loading ? (
            <Skeleton className="w-48 h-11" />
          ) : (
            <span className="h-11 text-[34px] font-extrabold">
              {totalPrice} BYN
            </span>
          )}
        </div>

        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Package size={18} className="mr-2 text-gray-400" />
              Стоимость корзины:
            </div>
          }
          value={
            loading ? <Skeleton className="w-24 h-6" /> : `${totalAmount} BYN`
          }
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Percent size={18} className="mr-2 text-gray-400" />
              Налоги:
            </div>
          }
          value={
            loading ? <Skeleton className="w-24 h-6" /> : `${vatPrice} BYN`
          }
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Truck size={18} className="mr-2 text-gray-400" />
              Доставка:
            </div>
          }
          value={
            loading ? (
              <Skeleton className="w-24 h-6" />
            ) : (
              `${deliveryCost} BYN`
            )
          }
        />

        <Button
          loading={loading}
          type="submit"
          className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        >
          Оформить заказ
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
