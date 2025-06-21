import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DeleteCategoryButton } from "./delete-category-button";

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: {
                    products: true,
                },
            },
        },
    });

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    Категории
                </h1>
                <Link href="/admin/categories/new">
                    <Button className="w-full sm:w-auto">
                        Добавить категорию
                    </Button>
                </Link>
            </div>

            {/* Мобильная версия - карточки */}
            <div className="block lg:hidden space-y-4">
                {categories.map((category) => (
                    <div key={category.id} className="bg-white rounded-lg shadow-sm border p-4 space-y-3">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg text-gray-900">
                                {category.name}
                            </h3>
                            <div className="text-sm text-gray-600">
                                <p>
                                    <span className="font-medium">Товаров:</span>
                                    <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                        {category._count.products}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t">
                            <Link href={`/admin/categories/${category.id}/edit`} className="flex-1">
                                <Button variant="outline" size="sm" className="w-full">
                                    Редактировать
                                </Button>
                            </Link>
                            <div className="flex-1">
                                <DeleteCategoryButton categoryId={category.id} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Десктопная версия - таблица */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="font-semibold text-gray-900">Название</TableHead>
                            <TableHead className="font-semibold text-gray-900">Количество товаров</TableHead>
                            <TableHead className="text-right font-semibold text-gray-900">Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id} className="hover:bg-gray-50 transition-colors">
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        {category._count.products}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/categories/${category.id}/edit`}>
                                            <Button variant="outline" size="sm">
                                                Редактировать
                                            </Button>
                                        </Link>
                                        <DeleteCategoryButton categoryId={category.id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {categories.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-500 text-lg mb-4">
                        Пока нет категорий
                    </div>
                    <Link href="/admin/categories/new">
                        <Button>
                            Создать первую категорию
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
} 