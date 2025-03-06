import { prisma } from './prisma-client';

export const categories = [
  {
    name: 'Смартфоны',
  },

  {
    name: 'Телевизоры',
  },

  {
    name: 'Ноутбуки',
  },

  {
    name: 'Компьютеры',
  },

  {
    name: 'Аудиотехника',
  },

  {
    name: 'Мониторы',
  },
];

export const services = [
  {
    name: 'Установка ОС',
    price: 99,
    imageUrl: '/serviceos.png',
  },

  {
    name: 'Установка и настройка',
    price: 100,
    imageUrl: '/helpwithsetup.png',
  },

  {
    name: 'Чехол',
    price: 100,
    imageUrl: '/notebookchechol.png',
  },

  {
    name: 'Защитное стекло',
    price: 100,
    imageUrl: '/defendglass.png',
  },

  {
    name: 'Силиконовый чехол',
    price: 100,
    imageUrl: '/chechol.png',
  },
  {
    name: 'Срочная доставка',
    price: 600,
    imageUrl: '/dostavka.png',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));
