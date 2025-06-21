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
        <WhiteBlock className={cn('p-4 sm:p-5 lg:p-6', className)}>
            <h3 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6">Итого</h3>
            <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-sm lg:text-base text-gray-600">Товары:</span>
                    <span className="text-sm lg:text-base font-medium">{totalAmount - deliveryCost} BYN</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm lg:text-base text-gray-600">Доставка:</span>
                    <span className="text-sm lg:text-base font-medium">{deliveryCost} BYN</span>
                </div>
                <div className="border-t pt-3 lg:pt-4 mt-3 lg:mt-4">
                    <div className="flex justify-between items-center font-semibold">
                        <span className="text-base lg:text-lg">Итого к оплате:</span>
                        <span className="text-lg lg:text-xl text-primary">{totalAmount} BYN</span>
                    </div>
                </div>
            </div>
            <Button
                type="submit"
                className="w-full h-12 lg:h-14 text-base lg:text-lg font-semibold"
                disabled={loading}
            >
                {loading ? 'Оформление...' : 'Оформить заказ'}
            </Button>
        </WhiteBlock>
    );
}; 