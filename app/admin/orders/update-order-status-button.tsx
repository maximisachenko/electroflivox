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

            router.refresh();
        } catch (error) {
            console.error("[UPDATE_ORDER_STATUS]", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Select
            disabled={isLoading}
            onValueChange={onStatusChange}
            value={status}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Выберите статус" />
            </SelectTrigger>
            <SelectContent>
                {orderStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                        {statusLabels[status]}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
} 