import { Cart } from '@prisma/client';
import { CartDTO } from '../services/dto/cart-dto';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  color: string | null;
  guarantee: number | null;
  disabled: boolean;
  services: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.variation.product.name,
    imageUrl: item.variation.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    color: item.variation.color,
    guarantee: item.variation.product.guarantee,
    disabled: false,
    services: item.services.map((service) => ({
      name: service.name,
      price: service.price,
    })),
  })) as CartStateItem[];

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
