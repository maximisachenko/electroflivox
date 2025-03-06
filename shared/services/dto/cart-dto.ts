import { Cart, CartItem, Product, Service, Variation } from '@prisma/client';

export type CartItemDTO = CartItem & {
  variation: Variation & { product: Product };

  services: Service[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  variationId: number;
  services?: number[];
  quantity: number;
}
