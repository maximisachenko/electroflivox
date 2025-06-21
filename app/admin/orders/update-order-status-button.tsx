"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@prisma/client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";

const orderStatuses: OrderStatus[] = [
    "PENDING",
    "PROCESSING",
    "COLLECTING",
    "COLLECTED",
    "SHIPPED",
    "COMPLETED",
    "CANCELLED",
];

const statusLabels: Record<OrderStatus, string> = {
    PENDING: "Ожидает",
    PROCESSING: "В обработке",
    COLLECTING: "Собирается",
    COLLECTED: "Собран",
    SHIPPED: "Отправлен",
    COMPLETED: "Завершен",
    CANCELLED: "Отменен",
};

interface UpdateOrderStatusButtonProps {
    order: {
        id: number;
        status: OrderStatus;
    };
}

export function UpdateOrderStatusButton({ order }: UpdateOrderStatusButtonProps) {
    const [status, setStatus] = useState<OrderStatus>(order.status);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const onStatusChange = async (value: OrderStatus) => {
        try {
            setIsLoading(true);
            setStatus(value);

            const response = await fetch(`/api/admin/orders/${order.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: value,
                }),
            });

            if (!response.ok) {
                throw new Error("Не удалось обновить статус заказа");
            }

            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 2000);
            router.refresh();
        } catch (error) {
            console.error("[UPDATE_ORDER_STATUS]", error);
            // Возвращаем предыдущий статус при ошибке
            setStatus(order.status);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full space-y-2">
            <Select
                disabled={isLoading}
                onValueChange={onStatusChange}
                value={status}
            >
                <SelectTrigger className="w-full sm:w-[180px] lg:w-[200px] h-10 sm:h-11">
                    <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                    {orderStatuses.map((statusOption) => (
                        <SelectItem key={statusOption} value={statusOption}>
                            <span className="text-sm">
                                {statusLabels[statusOption]}
                            </span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Индикатор состояния */}
            <div className="flex items-center justify-center sm:justify-start">
                {isLoading && (
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Обновление...</span>
                    </div>
                )}
                {isSuccess && (
                    <div className="flex items-center gap-2 text-xs text-green-600">
                        <CheckCircle className="w-3 h-3" />
                        <span>Обновлено!</span>
                    </div>
                )}
            </div>
        </div>
    );
} 