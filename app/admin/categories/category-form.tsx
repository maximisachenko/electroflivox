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

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
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
                throw new Error("Failed to save category");
            }

            router.push("/admin/categories");
            router.refresh();
        } catch (error) {
            console.error("Error saving category:", error);
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

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : category ? "Update Category" : "Create Category"}
                </Button>
            </form>
        </Form>
    );
} 