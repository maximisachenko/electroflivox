import { cn } from '@/shared/lib/utils';
import { CircleHelp } from 'lucide-react';
import React from 'react';

export const BackgroundInfo: React.FC = () => {
  const handleDownload = () => {
    const content = `Справочная информация магазина Flivox

Flivox - это ваш надежный источник для покупки электроники и электротехнических товаров. Мы предлагаем широкий ассортимент продукции от ведущих мировых брендов, чтобы удовлетворить потребности как профессионалов, так и любителей.

Наша продукция:
- Мобильные телефоны
- Телевизоры
- Ноутбуки
- Компьютеры
- Аудиотехника
- Мониторы

Почему стоит выбрать Flivox?
- Качество продукции
- Широкий ассортимент
- Доступные цены
- Быстрая доставка
- Поддержка клиентов

Контактная информация:
Email: support@flivox.com`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'flivox-info.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center gap-2">
      <CircleHelp
        size={36}
        className="text-gray-200 cursor-pointer hover:text-[#4a62ff] transition-colors"
        onClick={handleDownload}
      />
    </div>
  );
};
