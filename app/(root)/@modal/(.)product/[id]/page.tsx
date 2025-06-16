import { prisma } from '@/prisma/prisma-client';
import { ChooseProductModal } from '@/shared/components/shared/modals';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Product ${id}`,
  };
}

export default async function ProductModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: {
      id: parseInt(id, 10), // Преобразуем строку в число
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
