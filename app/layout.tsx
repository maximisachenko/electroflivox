import { Nunito } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Providers } from '@/shared/components/shared/providers';
import { Metadata } from 'next';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

// Отключаем статическую генерацию глобально
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Flivox - Качественная техника',
  description: 'Интернет-магазин качественной техники',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/logo.svg',
  },
};

export default function GlobalRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
