"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteCategoryButton({ categoryId }: { categoryId: number }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await fetch(`/api/admin/categories/${categoryId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Не удалось удалить категорию");
            }

            router.refresh();
        } catch (error) {
            console.error("Ошибка при удалении категории:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    size="sm"
                    className="w-full sm:w-auto"
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Удалить
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[95vw] max-w-md mx-auto">
                <AlertDialogHeader className="space-y-3">
                    <AlertDialogTitle className="text-lg sm:text-xl">
                        Подтвердите удаление
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm sm:text-base leading-relaxed">
                        Вы действительно хотите удалить эту категорию? Это действие нельзя отменить,
                        и категория будет полностью удалена из базы данных.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                    <AlertDialogCancel className="w-full sm:w-auto">
                        Отменить
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Удаление...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Удалить категорию
                            </>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
} 