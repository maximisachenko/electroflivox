import React from 'react';

export default function BackgroundInfo() {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Справочная информация магазина Flivox
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Flivox - это ваш надежный источник для покупки электроники и
        электротехнических товаров. Мы предлагаем широкий ассортимент продукции
        от ведущих мировых брендов, чтобы удовлетворить потребности как
        профессионалов, так и любителей.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mt-6">
        Наша продукция
      </h2>
      <p className="text-lg text-gray-600 mb-4">
        В нашем магазине вы найдете все необходимые товары для дома, офиса и
        промышленности:
      </p>
      <ul className="list-disc list-inside pl-5 mb-6 text-gray-700">
        <li>Мобильные телефоны</li>
        <li>Телевизоры</li>
        <li>Ноутбуки</li>
        <li>Компьютеры</li>
        <li>Аудиотехника</li>
        <li>Мониторы</li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-600 mt-6">
        Почему стоит выбрать Flivox?
      </h2>
      <ul className="list-disc list-inside pl-5 mb-6 text-gray-700">
        <li>
          <strong>Качество продукции:</strong> Мы работаем только с проверенными
          производителями и обеспечиваем качество каждой единицы товара.
        </li>
        <li>
          <strong>Широкий ассортимент:</strong> У нас есть товары на любой вкус
          и для любых нужд.
        </li>
        <li>
          <strong>Доступные цены:</strong> Мы предлагаем конкурентоспособные
          цены и различные акции.
        </li>
        <li>
          <strong>Быстрая доставка:</strong> Доставка товаров по всей стране в
          кратчайшие сроки.
        </li>
        <li>
          <strong>Поддержка клиентов:</strong> Мы всегда готовы помочь вам с
          выбором и решением любых вопросов по товарам.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-600 mt-6">
        Контактная информация
      </h2>
      <p className="text-lg text-gray-600 mb-4">
        Если у вас возникли вопросы, не стесняйтесь обращаться к нашей службе
        поддержки:
      </p>
      <ul className="list-disc list-inside pl-5 text-gray-700">
        <li>Email: support@flivox.com</li>
      </ul>
    </div>
  );
}
