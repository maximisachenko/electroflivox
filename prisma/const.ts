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
    price: 20,
    imageUrl: '/serviceos.png',
  },

  {
    name: 'Установка и настройка',
    price: 40,
    imageUrl: '/helpwithsetup.png',
  },

  {
    name: 'Чехол',
    price: 10,
    imageUrl: '/notebookchechol.png',
  },

  {
    name: 'Защитное стекло',
    price: 10,
    imageUrl: '/defendglass.png',
  },

  {
    name: 'Силиконовый чехол',
    price: 5,
    imageUrl: '/chechol.png',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));
