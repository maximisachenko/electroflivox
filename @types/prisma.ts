import { Product, Variation, Service } from '@prisma/client';

export type ProductWithColor = Product & {
  variations: Variation[];
  services: Service[];
};
