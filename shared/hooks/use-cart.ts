import React from 'react';
import { useCartStore } from '../store/cart';
import { CreateCartItemValues } from '../services/dto/cart-dto';
import { CartStateItem } from '../lib/get-cart-details';

type ReturnProps = {
  totalAmount: number;
  loading: boolean;
  items: CartStateItem[];
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const {
    totalAmount,
    fetchCartItems,
    items,
    updateItemQuantity,
    removeCartItem,
    addCartItem,
    loading,
  } = useCartStore();

  React.useEffect(() => {
    if (items.length === 0) {
      fetchCartItems();
    }
  }, [fetchCartItems]);

  return {
    totalAmount,
    loading,
    items,
    updateItemQuantity,
    removeCartItem,
    addCartItem,
  };
};
