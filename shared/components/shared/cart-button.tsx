'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '@/shared/store';

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const [items, setItems] = useState<{ length: number }>({ length: 0 });
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = useCartStore.subscribe((state) => {
      setItems({ length: state.items.length });
      setTotalAmount(state.totalAmount);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <CartDrawer>
      <Button
        disabled={loading}
        className={cn('group relative', loading && 'w-[105px]', className)}
      >
        {loading ? (
          <span className="animate-pulse">Загрузка...</span>
        ) : (
          <>
            <b>{totalAmount} BYN</b>
            <span className="h-full w-[1px] bg-white/30 mx-3" />
            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
              <ShoppingCart size={16} />
              <b>{items.length}</b>
            </div>
            <ArrowRight
              size={16}
              className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </>
        )}
      </Button>
    </CartDrawer>
  );
};
