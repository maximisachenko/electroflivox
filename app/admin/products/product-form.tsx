"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash, ArrowLeft, Save, Loader2, Package } from "lucide-react";
import Link from "next/link";

const variationSchema = z.object({
    price: z.string().min(1, "Цена обязательна"),
    color: z.string().min(1, "Цвет обязателен"),
});

const formSchema = z.object({
    name: z.string().min(1, "Название обязательно"),
    categoryId: z.string().min(1, "Категория обязательна"),
    manufacturer: z.string().min(1, "Производитель обязателен"),
    guarantee: z.string().min(1, "Гарантия обязательна"),
    description: z.string().optional(),
    imageUrl: z.string().min(1, "URL изображения обязателен"),
    variations: z.array(variationSchema).min(1, "Добавьте хотя бы одну вариацию"),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
    product?: {
        id: number;
        name: string;
        categoryId: number;
        manufacturer: string;
        guarantee: number;
        description?: string | null;
        imageUrl: string;
        variations: {
            id: number;
            price: number;
            color?: string | null;
            gb?: string | null;
            ram?: string | null;
            cpu?: string | null;
            gpu?: string | null;
            ssd?: string | null;
            hdd?: string | null;
            ssdSize?: string | null;
            hddSize?: string | null;
        }[];
    };
    categories: {
        id: number;
        name: string;
    }[];
}

export function ProductForm({ product, categories }: ProductFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: product?.name || "",
            categoryId: product?.categoryId.toString() || "",
            manufacturer: product?.manufacturer || "",
            guarantee: product?.guarantee.toString() || "",
            description: product?.description || "",
            imageUrl: product?.imageUrl || "",
            variations: product?.variations.map(v => ({
                price: v.price.toString(),
                color: v.color || "",
            })) || [{ price: "", color: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "variations",
    });

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setIsLoading(true);

            const response = await fetch(
                product ? `/api/admin/products/${product.id}` : "/api/admin/products",
                {
                    method: product ? "PATCH" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...data,
                        guarantee: parseInt(data.guarantee),
                        categoryId: parseInt(data.categoryId),
                        variations: data.variations.map(v => ({
                            ...v,
                            price: parseInt(v.price),
                        })),
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Не удалось сохранить продукт");
            }

            router.push("/admin/products");
            router.refresh();
        } catch (error) {
            console.error("Ошибка при сохранении продукта:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Заголовок с кнопкой возврата */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Link href="/admin/products">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Назад к товарам
                    </Button>
                </Link>
                <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                        {product ? 'Редактировать товар' : 'Новый товар'}
                    </h1>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Основная информация */}
                    <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-900">
                            Основная информация
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="lg:col-span-2">
                                        <FormLabel className="text-sm sm:text-base font-medium">
                                            Название товара
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="Введите название товара"
                                                className="h-11 sm:h-12 text-base"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm sm:text-base font-medium">
                                            Категория
                                        </FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-11 sm:h-12">
                                                    <SelectValue placeholder="Выберите категорию" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="manufacturer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm sm:text-base font-medium">
                                            Производитель
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="Например: Apple, Samsung"
                                                className="h-11 sm:h-12 text-base"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="guarantee"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm sm:text-base font-medium">
                                            Гарантия (месяцев)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="12"
                                                className="h-11 sm:h-12 text-base"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm sm:text-base font-medium">
                                            URL изображения
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="https://example.com/image.jpg"
                                                className="h-11 sm:h-12 text-base"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="lg:col-span-2">
                                        <FormLabel className="text-sm sm:text-base font-medium">
                                            Описание
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="Подробное описание товара..."
                                                className="min-h-[100px] text-base resize-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Вариации товара */}
                    <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                                Вариации товара
                            </h2>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => append({ price: "", color: "" })}
                                disabled={isLoading}
                                className="w-full sm:w-auto"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Добавить вариацию
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="border rounded-lg p-4 sm:p-6 bg-gray-50">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                                        <h4 className="font-medium text-gray-900">
                                            Вариация {index + 1}
                                        </h4>
                                        {fields.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => remove(index)}
                                                disabled={isLoading}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto"
                                            >
                                                <Trash className="h-4 w-4 mr-2" />
                                                Удалить
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name={`variations.${index}.price`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium">
                                                        Цена (BYN)
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            disabled={isLoading}
                                                            placeholder="1000"
                                                            className="h-11 text-base"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`variations.${index}.color`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium">
                                                        Цвет
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={isLoading}
                                                            placeholder="Черный, Белый, Синий"
                                                            className="h-11 text-base"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Кнопки управления */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-auto sm:min-w-[160px] h-11 sm:h-12"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Сохранение...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    {product ? "Обновить товар" : "Создать товар"}
                                </>
                            )}
                        </Button>
                        <Link href="/admin/products" className="w-full sm:w-auto">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full sm:w-auto sm:min-w-[100px] h-11 sm:h-12"
                                disabled={isLoading}
                            >
                                Отмена
                            </Button>
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
} 