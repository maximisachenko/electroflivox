import { OrderStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

const statusStyles: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    COLLECTING: "bg-purple-100 text-purple-800",
    COLLECTED: "bg-indigo-100 text-indigo-800",
    SHIPPED: "bg-orange-100 text-orange-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
};

interface OrderStatusBadgeProps {
    status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                statusStyles[status]
            )}
        >
            {status}
        </span>
    );
} 