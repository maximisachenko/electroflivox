"use client";

import { Order, Product, Service, Variation } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Info } from "lucide-react";

interface OrderDetailsModalProps {
    order: Order;
    products: (Product & {
        variations: Variation[];
        services: {
            service: Service;
        }[];
    })[];
    services: Service[];
}

export function OrderDetailsModal({ order, products, services }: OrderDetailsModalProps) {
    const items = JSON.parse(order.items as string);

    const getProductName = (productId: number) => {
        const product = products.find(p => p.id === productId);
        return product?.name || 'Товар не найден';
    };

    const getVariationDetails = (productId: number, variationId: number) => {
        const product = products.find(p => p.id === productId);
        const variation = product?.variations.find(v => v.id === variationId);

        if (!variation) return '';

        const details = [];
        if (variation.color) details.push(`Цвет: ${variation.color}`);
        if (variation.gb) details.push(`Память: ${variation.gb}`);
        if (variation.ram) details.push(`RAM: ${variation.ram}`);
        if (variation.cpu) details.push(`CPU: ${variation.cpu}`);
        if (variation.gpu) details.push(`GPU: ${variation.gpu}`);
        if (variation.ssd) details.push(`SSD: ${variation.ssd}`);
        if (variation.hdd) details.push(`HDD: ${variation.hdd}`);
        if (variation.ssdSize) details.push(`Размер SSD: ${variation.ssdSize}`);
        if (variation.hddSize) details.push(`Размер HDD: ${variation.hddSize}`);

        return details.join(', ');
    };

    const getServiceName = (serviceId: number) => {
        const service = services.find(s => s.id === serviceId);
        return service?.name || 'Услуга не найдена';
    };

    const getDeliveryMethod = (method: string) => {
        const methods: Record<string, string> = {
            belpost: "Белпочта",
            pickup: "Самовывоз"
        };
        return methods[method] || method;
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Info className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Детали заказа #{order.id}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-2">Информация о клиенте</h3>
                        <div className="space-y-1 text-sm">
                            <div>ФИО: {order.fullName}</div>
                            <div>Email: {order.email}</div>
                            <div>Телефон: {order.phone}</div>
                            <div>Адрес: {order.address}</div>
                            {order.comment && (
                                <div>Комментарий: {order.comment}</div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Товары в заказе</h3>
                        <div className="space-y-2">
                            {items.map((item: any, index: number) => (
                                <div key={index} className="text-sm border-b pb-2">
                                    <div className="font-medium">
                                        {item.quantity}x - {getProductName(item.productId)}
                                    </div>
                                    <div className="text-gray-600 mt-1">
                                        {getVariationDetails(item.productId, item.variationId)}
                                    </div>
                                    <div className="text-gray-600 mt-1">
                                        Цена: {item.price} BYN
                                    </div>
                                    {item.services?.length > 0 && (
                                        <div className="text-gray-500 mt-1">
                                            Услуги:
                                            {item.services.map((s: any, i: number) => (
                                                <div key={i} className="ml-2">
                                                    • {getServiceName(s.serviceId)} - {s.price} BYN
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Итоги заказа</h3>
                        <div className="space-y-1 text-sm">
                            <div>Общая сумма: {order.totalAmount.toFixed(2)} BYN</div>
                            <div>Способ доставки: {getDeliveryMethod(order.deliveryMethod)}</div>
                            <div>Статус: {order.status}</div>
                            <div>Дата: {new Date(order.createdAt).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
} 