import { Container } from '@/shared/components/shared/container';
import { Header } from '@/shared/components/shared/header';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Flivox | Корзина',
  description: 'Flivox Checkout',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#ECF4F5]">
      <Container>
        <Header className="border-gray-200" hasSearch={false} hasCart={false} />
        {children}
      </Container>
    </main>
  );
}
