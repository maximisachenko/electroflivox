import { OrderStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

const statusStyles: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    PROCESSING: "bg-blue-100 text-blue-800 border-blue-200",
    COLLECTING: "bg-purple-100 text-purple-800 border-purple-200",
    COLLECTED: "bg-indigo-100 text-indigo-800 border-indigo-200",
    SHIPPED: "bg-orange-100 text-orange-800 border-orange-200",
    COMPLETED: "bg-green-100 text-green-800 border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

const statusLabels: Record<OrderStatus, string> = {
    PENDING: "Ожидает",
    PROCESSING: "В обработке",
    COLLECTING: "Собирается",
    COLLECTED: "Собран",
    SHIPPED: "Отправлен",
    COMPLETED: "Завершен",
    CANCELLED: "Отменен",
};

interface OrderStatusBadgeProps {
    status: OrderStatus;
    className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center justify-center rounded-full border font-medium",
                "px-2 py-1 text-xs sm:px-2.5 sm:py-0.5 sm:text-xs",
                "min-w-[80px] sm:min-w-[90px] text-center",
                statusStyles[status],
                className
            )}
        >
            {statusLabels[status]}
        </span>
    );
} 