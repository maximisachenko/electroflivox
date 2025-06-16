import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { WhiteBlock } from '@/shared/components/shared/white-block';

interface CheckoutSidebarProps {
    totalAmount: number;
    className?: string;
    loading?: boolean;
    deliveryCost: number;
}

export const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({
    totalAmount,
    className,
    loading,
    deliveryCost,
}) => {
    return (
        <WhiteBlock className={cn('p-6', className)}>
            <h3 className="text-lg font-semibold mb-4">Итого</h3>
            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                    <span>Товары:</span>
                    <span>{totalAmount - deliveryCost} BYN</span>
                </div>
                <div className="flex justify-between">
                    <span>Доставка:</span>
                    <span>{deliveryCost} BYN</span>
                </div>
                <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                        <span>Итого к оплате:</span>
                        <span>{totalAmount} BYN</span>
                    </div>
                </div>
            </div>
            <Button
                type="submit"
                className="w-full"
                disabled={loading}
            >
                {loading ? 'Оформление...' : 'Оформить заказ'}
            </Button>
        </WhiteBlock>
    );
}; 