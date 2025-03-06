import { CartItemDTO } from '../services/dto/cart-dto';

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const servicesPrice = item.services.reduce(
    (acc, service) => acc + service.price,
    0
  );

  return (servicesPrice + item.variation.price) * item.quantity;
};
