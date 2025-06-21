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
      <Container className="mt-6 lg:mt-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-0">
          <Title
            text="Вся техника"
            size="lg"
            className="font-extrabold text-fontColor"
          />
          {/* Кнопка фильтров на мобильных */}
          <div className="lg:hidden">
            <Filters />
          </div>
        </div>
      </Container>

      <Suspense fallback={<div>Загрузка...</div>}>
        <TopBar categories={categories} />
      </Suspense>

      <Container className="pb-14 mt-6 lg:mt-9">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[80px]">
          {/* Фильтрация - только на десктопе */}
          <div className="hidden lg:block lg:w-[250px]">
            <div className="bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none shadow-sm lg:shadow-none">
              <Filters />
            </div>
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-8 lg:gap-16">
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
