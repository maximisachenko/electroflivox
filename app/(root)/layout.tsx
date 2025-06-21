import type { Metadata } from 'next';
import { Header } from '@/shared/components/shared/header';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Flivox | Main Page',
};

export const dynamic = 'force-dynamic';

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className={`min-h-screen`}>
      <Suspense fallback={<div>Загрузка заголовка...</div>}>
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
