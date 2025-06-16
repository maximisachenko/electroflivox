import { Prisma } from '@prisma/client';
import { services, categories } from './const';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin Test',
        email: 'admin@test.ru',
        password: hashSync('admin', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.service.createMany({
    data: services,
  });

  const iphone16 = await prisma.product.create({
    data: {
      name: 'iPhone 16',
      imageUrl: '/iphone16.png',
      guarantee: 2,
      manufacturer: 'Apple',
      description:
        '6.1" OLED, A18 Bionic, 2 камеры (48 МП + 12 МП), Face ID, 5G, iOS 18',
      categoryId: 1,
      services: {
        create: [
          { service: { connect: { id: 4 } } },
          { service: { connect: { id: 5 } } },
        ],
      },
    },
  });

  const iphone16pro = await prisma.product.create({
    data: {
      name: 'iPhone 16 Pro',
      imageUrl: '/iphone16pro.png',
      guarantee: 2,
      manufacturer: 'Apple',
      description:
        '6.1" OLED 120 Гц, A18 Pro, 3 камеры (48 МП + 12 МП + 12 МП), LiDAR, Titanium, iOS 18',
      categoryId: 1,
      services: {
        create: [
          { service: { connect: { id: 4 } } },
          { service: { connect: { id: 5 } } },
        ],
      },
    },
  });

  const iphone16promax = await prisma.product.create({
    data: {
      name: 'iPhone 16 Pro Max',
      imageUrl: '/iphone16promax.png',
      guarantee: 2,
      manufacturer: 'Apple',
      description:
        '6.7" OLED 120 Гц, A18 Pro, 3 камеры (48 МП + 12 МП + 12 МП), LiDAR, Titanium, iOS 18',
      categoryId: 1,
      services: {
        create: [
          { service: { connect: { id: 4 } } },
          { service: { connect: { id: 5 } } },
        ],
      },
    },
  });

  const iphone15 = await prisma.product.create({
    data: {
      name: 'iPhone 15',
      imageUrl: '/iphone15.png',
      guarantee: 2,
      manufacturer: 'Apple',
      description:
        '6.1" OLED, A16 Bionic, 2 камеры (48 МП + 12 МП), Face ID, 5G, iOS 17',
      categoryId: 1,
      services: {
        create: [
          { service: { connect: { id: 4 } } },
          { service: { connect: { id: 5 } } },
        ],
      },
    },
  });

  const iphone15pro = await prisma.product.create({
    data: {
      name: 'iPhone 15 Pro',
      imageUrl: '/iphone15pro.png',
      guarantee: 2,
      manufacturer: 'Apple',
      description:
        '6.1" OLED, A17 Pro, 3 камеры (48 МП + 12 МП + 12 МП), Face ID, 5G, iOS 17',
      categoryId: 1,
      services: {
        create: [
          { service: { connect: { id: 4 } } },
          { service: { connect: { id: 5 } } },
        ],
      },
    },
  });

  const iphone15promax = await prisma.product.create({
    data: {
      name: 'iPhone 15 Pro Max',
      imageUrl: '/iphone15promax.png',
      guarantee: 2,
      manufacturer: 'Apple',
      description:
        '6.7" OLED, A17 Pro, 3 камеры (48 МП + 12 МП + 12 МП), Face ID, 5G, iOS 17',
      categoryId: 1,
      services: {
        create: [
          { service: { connect: { id: 4 } } },
          { service: { connect: { id: 5 } } },
        ],
      },
    },
  });

  const iphone14 = await prisma.product.create({
    data: {
      name: 'iPhone 14',
      imageUrl: '/iphone14.png',
      guarantee: 1,
      manufacturer: 'Apple',
      description:
        '6.1" OLED, A15 Bionic, 2 камеры (12 МП + 12 МП), Face ID, 5G, iOS 16',
      categoryId: 1,
      services: {
        create: [
          { service: { connect: { id: 4 } } },
          { service: { connect: { id: 5 } } },
        ],
      },
    },
  });

  const iphone14pro = await prisma.product.create({
    data: {
      name: 'iPhone 14 Pro',
      imageUrl: '/iphone14pro.png',
      guarantee: 1,
      manufacturer: 'Apple',
      description:
        '6.1" OLED, A16 Pro, 3 камеры (48 МП + 12 МП + 12 МП), Face ID, 5G, iOS 16',
      categoryId: 1,
      services: {
        create: [
          { service: { connect: { id: 4 } } },
          { service: { connect: { id: 5 } } },
        ],
      },
    },
  });

  const iphone14promax = await prisma.product.create({
    data: {
      name: 'iPhone 14 Pro Max',
      imageUrl: '/iphone14promax.png',
      guarantee: 1,
      manufacturer: 'Apple',
      description:
        '6.7" OLED, A16 Pro, 3 камеры (48 МП + 12 МП + 12 МП), Face ID, 5G, iOS 16',
      categoryId: 1,
      services: {
        create: [
          { service: { connect: { id: 4 } } },
          { service: { connect: { id: 5 } } },
        ],
      },
    },
  });

  const lg65zoll4koled = await prisma.product.create({
    data: {
      name: 'LG 65Zoll 4K OLED',
      imageUrl: '/lg65zoll4koled.png',
      guarantee: 5,
      manufacturer: 'LG',
      description:
        '65 дюймов, OLED экран, 4K, HDR support, Dolby Vision, Dolby Atmos, Google Assistant и Alexa, webOS 22',
      categoryId: 2,
      services: {
        create: [{ service: { connect: { id: 2 } } }],
      },
    },
  });

  const lgoled55c47la = await prisma.product.create({
    data: {
      name: 'LG LED 55C47LA',
      imageUrl: '/lgoled55c47la.png',
      guarantee: 5,
      manufacturer: 'LG',
      description:
        '55 дюймов, LED экран, 4K, HDR support, Dolby Vision, Ai Tools, webOS 22, Smart TV',
      categoryId: 2,
      services: {
        create: [{ service: { connect: { id: 2 } } }],
      },
    },
  });

  const asusvivobook17 = await prisma.product.create({
    data: {
      name: 'Asus Vivobook 17',
      imageUrl: '/asusvivobook17.png',
      guarantee: 1,
      manufacturer: 'Asus',
      description:
        '17.3" FHD, Intel Core i7, 16GB RAM, 1TB SSD, NVIDIA GeForce RTX 3050Ti, Windows 11, 100% sRGB',
      categoryId: 3,
      services: {
        create: [
          { service: { connect: { id: 1 } } },
          { service: { connect: { id: 3 } } },
        ],
      },
    },
  });

  const asusvivobook15laptop = await prisma.product.create({
    data: {
      name: 'Asus Vivobook 15 Laptop',
      imageUrl: '/asusvivobook15laptop.png',
      guarantee: 1,
      manufacturer: 'Asus',
      description:
        '15.6" FHD, Intel Core i5, 8GB RAM, 512GB SSD, NVIDIA GeForce GTX 1650Ti, Windows 11, 100% sRGB',
      categoryId: 3,
      services: {
        create: [
          { service: { connect: { id: 1 } } },
          { service: { connect: { id: 3 } } },
        ],
      },
    },
  });

  const gamingpci713700kfrtx4070 = await prisma.product.create({
    data: {
      name: 'Gaming PC i-713700KF RTX-4070',
      imageUrl: '/gamingpci713700kfrtx4070.png',
      guarantee: 2,
      manufacturer: 'Gaming PC',
      description:
        '15.6" FHD, Intel Core i7, 16GB RAM, 1TB SSD, NVIDIA GeForce RTX 3070Ti, без ОС, 100% sRGB',
      categoryId: 4,
      services: {
        create: [{ service: { connect: { id: 1 } } }],
      },
    },
  });

  const gamingpcjolavanillei914900krtx5080 = await prisma.product.create({
    data: {
      name: 'Gaming PC Jola Vanilla i9-14900KF RTX-5080',
      imageUrl: '/gamingpcjolavanillei914900krtx5080.png',
      guarantee: 2,
      manufacturer: 'Gaming PC',
      description:
        '15.6" FHD, Intel Core i9, 16GB RAM, 1TB SSD, NVIDIA GeForce RTX 5080, без ОС, 100% sRGB',
      categoryId: 4,
      services: {
        create: [{ service: { connect: { id: 1 } } }],
      },
    },
  });

  const jblgo2 = await prisma.product.create({
    data: {
      name: 'JBL Go 2',
      imageUrl: '/jblgo2.png',
      guarantee: 1,
      manufacturer: 'JBL',
      description:
        'Bluetooth функция, водоотталкивающая (IPX7), до 5 часов работы, встроенный микрофон для звонков',
      categoryId: 5,
    },
  });

  const jblflip5 = await prisma.product.create({
    data: {
      name: 'JBL Flip 5',
      imageUrl: '/jblflip5.png',
      guarantee: 1,
      manufacturer: 'JBL',
      description:
        'Bluetooth функция, водоотталкивающая (IPX7), до 10 часов работы, встроенный микрофон для звонков',
      categoryId: 5,
    },
  });

  const acernitroe240qs = await prisma.product.create({
    data: {
      name: 'ACER Nitro E240QS',
      imageUrl: '/acernitroe240qs.png',
      guarantee: 1,
      manufacturer: 'ACER',
      description:
        '23.8-дюймов, 2560x1440 (QHD), 75 Гц, технология IPS, поддержка AMD FreeSync для плавного изображения',
      categoryId: 6,
    },
  });

  const xiaomi27a = await prisma.product.create({
    data: {
      name: 'Xiaomi 27A',
      imageUrl: '/xiaomi27a.png',
      guarantee: 1,
      manufacturer: 'Xiaomi',
      description:
        '27 дюймов, 1920x1080 (FHD), 144 Гц, технология IPS, поддержка AMD FreeSync для плавного изображения',
      categoryId: 6,
    },
  });

  // iPhone 16 Colors
  const iphone16blue = await prisma.variation.create({
    data: {
      productId: iphone16.id,
      price: 4800,
      color: 'Blue',
    },
  });

  const iphone16red = await prisma.variation.create({
    data: {
      productId: iphone16.id,
      price: 4800,
      color: 'Red',
    },
  });

  const iphone16green = await prisma.variation.create({
    data: {
      productId: iphone16.id,
      price: 4800,
      color: 'Green',
    },
  });

  // iPhone 16 Pro Colors
  const iphone16prowhitetitanium = await prisma.variation.create({
    data: {
      productId: iphone16pro.id,
      price: 5600,
      color: 'White Titanium',
    },
  });

  const iphone16problacktitanium = await prisma.variation.create({
    data: {
      productId: iphone16pro.id,
      price: 5600,
      color: 'Black Titanium',
    },
  });

  // iPhone 16 Pro Max Colors
  const iphone16promaxwhitetitanium = await prisma.variation.create({
    data: {
      productId: iphone16promax.id,
      price: 6200,
      color: 'White Titanium',
    },
  });

  const iphone16promaxblacktitanium = await prisma.variation.create({
    data: {
      productId: iphone16promax.id,
      price: 6200,
      color: 'Black Titanium',
    },
  });

  // iPhone 15 Colors
  const iphone15blue = await prisma.variation.create({
    data: {
      productId: iphone15.id,
      price: 3900,
      color: 'Blue',
    },
  });

  const iphone15red = await prisma.variation.create({
    data: {
      productId: iphone15.id,
      price: 3900,
      color: 'Red',
    },
  });

  const iphone15green = await prisma.variation.create({
    data: {
      productId: iphone15.id,
      price: 3900,
      color: 'Green',
    },
  });

  // iPhone 15 Pro Colors
  const iphone15prowhitetitanium = await prisma.variation.create({
    data: {
      productId: iphone15pro.id,
      price: 4700,
      color: 'White Titanium',
    },
  });

  const iphone15problacktitanium = await prisma.variation.create({
    data: {
      productId: iphone15pro.id,
      price: 4700,
      color: 'Black Titanium',
    },
  });

  // iPhone 15 Pro Max Colors
  const iphone15promaxwhitetitanium = await prisma.variation.create({
    data: {
      productId: iphone15promax.id,
      price: 5300,
      color: 'White Titanium',
    },
  });

  const iphone15promaxblacktitanium = await prisma.variation.create({
    data: {
      productId: iphone15promax.id,
      price: 5300,
      color: 'Black Titanium',
    },
  });

  // iPhone 14 Colors
  const iphone14blue = await prisma.variation.create({
    data: {
      productId: iphone14.id,
      price: 3200,
      color: 'Blue',
    },
  });

  const iphone14red = await prisma.variation.create({
    data: {
      productId: iphone14.id,
      price: 3200,
      color: 'Red',
    },
  });

  const iphone14green = await prisma.variation.create({
    data: {
      productId: iphone14.id,
      price: 3200,
      color: 'Green',
    },
  });

  // iPhone 14 Pro Colors
  const iphone14prowhitetitanium = await prisma.variation.create({
    data: {
      productId: iphone14pro.id,
      price: 4000,
      color: 'White Titanium',
    },
  });

  const iphone14problacktitanium = await prisma.variation.create({
    data: {
      productId: iphone14pro.id,
      price: 4000,
      color: 'Black Titanium',
    },
  });

  // iPhone 14 Pro Max Colors
  const iphone14promaxwhitetitanium = await prisma.variation.create({
    data: {
      productId: iphone14promax.id,
      price: 4500,
      color: 'White Titanium',
    },
  });

  const iphone14promaxblacktitanium = await prisma.variation.create({
    data: {
      productId: iphone14promax.id,
      price: 4500,
      color: 'Black Titanium',
    },
  });

  // LG 65Zoll 4K OLED Colors
  const lg65zoll4koledblack = await prisma.variation.create({
    data: {
      productId: lg65zoll4koled.id,
      price: 7000,
      color: 'Black',
    },
  });

  // LG LED 55C47LA Colors
  const lgoled55c47lablack = await prisma.variation.create({
    data: {
      productId: lgoled55c47la.id,
      price: 3500,
      color: 'Black',
    },
  });

  // Asus Vivobook 17 Colors
  const asusvivobook17white = await prisma.variation.create({
    data: {
      productId: asusvivobook17.id,
      price: 2500,
      color: 'White',
    },
  });

  // Asus Vivobook 15 Laptop Colors
  const asusvivobook15laptopblack = await prisma.variation.create({
    data: {
      productId: asusvivobook15laptop.id,
      price: 2100,
      color: 'Black',
    },
  });

  // Gaming PC Jola Vanilla i9-14900KF RTX-5080 Colors
  const gamingpcjolavanillei914900krtx5080white = await prisma.variation.create(
    {
      data: {
        productId: gamingpcjolavanillei914900krtx5080.id,
        price: 8000,
        color: 'White',
      },
    }
  );

  // Gaming PC i-713700KF RTX-4070 Colors
  const gamingpci713700kfrtx4070black = await prisma.variation.create({
    data: {
      productId: gamingpci713700kfrtx4070.id,
      price: 6000,
      color: 'Black',
    },
  });

  // JBL Go 2 Colors
  const jblgo2red = await prisma.variation.create({
    data: {
      productId: jblgo2.id,
      price: 150,
      color: 'Red',
    },
  });

  // JBL Flip 5 Colors
  const jblflip5black = await prisma.variation.create({
    data: {
      productId: jblflip5.id,
      price: 350,
      color: 'Black',
    },
  });

  // ACER Nitro E240QS Colors
  const acernitroe240qsblack = await prisma.variation.create({
    data: {
      productId: acernitroe240qs.id,
      price: 700,
      color: 'Black',
    },
  });

  // Xiaomi 27A Colors
  const xiaomi27agray = await prisma.variation.create({
    data: {
      productId: xiaomi27a.id,
      price: 600,
      color: 'Gray',
    },
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '111111',
      },

      {
        userId: 2,
        totalAmount: 0,
        token: '222222',
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Variation" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Service" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

{
  /* Enums */
}
