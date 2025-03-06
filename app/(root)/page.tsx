import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductsList,
} from '@/shared/components/shared';
import { findProducts, GetSearchParams } from '@/shared/lib/find-products';

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findProducts(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title
          text="Вся техника"
          size="lg"
          className="font-extrabold text-fontColor"
        />
      </Container>

      <TopBar categories={categories} />

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
    </>
  );
}
