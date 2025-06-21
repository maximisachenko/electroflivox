import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CategoryForm } from "../../category-form";

export default async function EditCategoryPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const category = await prisma.category.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!category) {
        notFound();
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Редактировать категорию</h1>
            <CategoryForm category={category} />
        </div>
    );
}