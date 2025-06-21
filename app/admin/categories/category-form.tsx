"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
    name: z.string().min(1, "Название обязательно"),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
    category?: {
        id: number;
        name: string;
    };
}

export function CategoryForm({ category }: CategoryFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: category?.name || "",
        },
    });

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setIsLoading(true);

            const response = await fetch(
                category ? `/api/admin/categories/${category.id}` : "/api/admin/categories",
                {
                    method: category ? "PATCH" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                throw new Error("Не удалось сохранить категорию");
            }

            router.push("/admin/categories");
            router.refresh();
        } catch (error) {
            console.error("Ошибка при сохранении категории:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Заголовок с кнопкой возврата */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Link href="/admin/categories">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Назад к категориям
                    </Button>
                </Link>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {category ? 'Редактировать категорию' : 'Новая категория'}
                </h1>
            </div>

            {/* Форма */}
            <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm sm:text-base font-medium">
                                        Название категории
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isLoading}
                                            placeholder="Введите название категории"
                                            className="h-11 sm:h-12 text-base"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full sm:w-auto sm:min-w-[140px] h-11 sm:h-12"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Сохранение...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        {category ? 'Обновить' : 'Создать'}
                                    </>
                                )}
                            </Button>
                            <Link href="/admin/categories" className="w-full sm:w-auto">
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
        </div>
    );
} 