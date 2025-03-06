import { prisma } from '@/prisma/prisma-client';
import { ChooseProductModal } from '@/shared/components/shared/modals';
import { notFound } from 'next/navigation';

export default async function ProductModalPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      services: {
        include: {
          service: true, // Включаем полные данные об услуге
        },
      },
      variations: true,
    },
  });

  if (!product) {
    return notFound();
  }

  console.log(product.services);

  return (
    <ChooseProductModal
      product={{
        ...product,
        services: product.services?.map((s) => s.service) ?? [],
      }}
    />
  );
}
