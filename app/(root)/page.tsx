import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductsList,
} from '@/shared/components/shared';
import { findProducts, GetSearchParams } from '@/shared/lib/find-products';
import { ChatPopup } from '@/shared/components/shared/chat-popup/chat-popup';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const categories = await findProducts(resolvedSearchParams);

  return (
    <>
      <Container className="mt-10">
        <Title
          text="Вся техника"
          size="lg"
          className="font-extrabold text-fontColor"
        />
      </Container>

      <Suspense fallback={<div>Loading...</div>}>
        <TopBar categories={categories} />
      </Suspense>

      <Container className="pb-14 mt-9">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>

      <ChatPopup />
    </>
  );
}
