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
import { Plus, Trash } from "lucide-react";

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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isLoading} />
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
                            <FormLabel>Категория</FormLabel>
                            <Select
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue defaultValue={field.value} placeholder="Выберите категорию" />
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
                            <FormLabel>Производитель</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isLoading} />
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
                            <FormLabel>Гарантия (месяцев)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Описание</FormLabel>
                            <FormControl>
                                <Textarea {...field} disabled={isLoading} />
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
                            <FormLabel>URL изображения</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Вариации продукта</h3>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append({ price: "", color: "" })}
                            disabled={isLoading}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Добавить вариацию
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium">Вариация {index + 1}</h4>
                                {fields.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => remove(index)}
                                        disabled={isLoading}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>

                            <FormField
                                control={form.control}
                                name={`variations.${index}.price`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Цена (BYN)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} disabled={isLoading} />
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
                                        <FormLabel>Цвет</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}
                </div>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Сохранение..." : product ? "Обновить продукт" : "Создать продукт"}
                </Button>
            </form>
        </Form>
    );
} 