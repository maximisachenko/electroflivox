import React from 'react';
import { useCartStore } from '../store/cart';
import { CreateCartItemValues } from '../services/dto/cart-dto';
import { CartStateItem } from '../lib/get-cart-details';
import { useSession } from 'next-auth/react';

type ReturnProps = {
  totalAmount: number;
  loading: boolean;
  items: CartStateItem[];
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const { data: session, status } = useSession();
  const [lastUserId, setLastUserId] = React.useState<string | undefined>(
    undefined
  );

  const {
    totalAmount,
    fetchCartItems,
    items,
    updateItemQuantity,
    removeCartItem,
    addCartItem,
    loading,
    resetCart,
  } = useCartStore();

  // Отслеживаем смену пользователя
  React.useEffect(() => {
    const currentUserId = session?.user?.id;

    // Если пользователь изменился, сбрасываем корзину
    if (lastUserId !== undefined && lastUserId !== currentUserId) {
      resetCart();
    }

    setLastUserId(currentUserId);
  }, [session?.user?.id, lastUserId, resetCart]);

  React.useEffect(() => {
    // Загружаем корзину после готовности сессии
    if (status !== 'loading') {
      fetchCartItems();
    }
  }, [fetchCartItems, status]);

  return {
    totalAmount,
    loading,
    items,
    updateItemQuantity,
    removeCartItem,
    addCartItem,
  };
};
