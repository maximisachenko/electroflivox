import { Container } from '@/shared/components/shared/container';
import { Header } from '@/shared/components/shared/header';
import { Suspense } from 'react';

export default function AboutPage() {
    return (
        <>
            <Suspense fallback={<div>Загрузка...</div>}>
                <Header />
                <Container className="py-8 lg:py-16">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-2xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center">О компании Flivox</h1>

                        <div className="space-y-6 lg:space-y-8">
                            <section className="bg-white rounded-lg p-4 lg:p-8 shadow-sm">
                                <h2 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4">Кто мы такие?</h2>
                                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                                    Flivox - это ваш надежный источник для покупки электроники и электротехнических товаров.
                                    Мы предлагаем широкий ассортимент продукции от ведущих мировых брендов, чтобы удовлетворить
                                    потребности как профессионалов, так и любителей.
                                </p>
                            </section>

                            <section className="bg-white rounded-lg p-4 lg:p-8 shadow-sm">
                                <h2 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4">Наша продукция</h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 text-gray-600 text-sm lg:text-base">
                                    <li className="flex items-center gap-2 lg:gap-3">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                        Мобильные телефоны
                                    </li>
                                    <li className="flex items-center gap-2 lg:gap-3">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                        Телевизоры
                                    </li>
                                    <li className="flex items-center gap-2 lg:gap-3">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                        Ноутбуки
                                    </li>
                                    <li className="flex items-center gap-2 lg:gap-3">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                        Компьютеры
                                    </li>
                                    <li className="flex items-center gap-2 lg:gap-3">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                        Аудиотехника
                                    </li>
                                    <li className="flex items-center gap-2 lg:gap-3">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                        Мониторы
                                    </li>
                                </ul>
                            </section>

                            <section className="bg-white rounded-lg p-4 lg:p-8 shadow-sm">
                                <h2 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4">Почему стоит выбрать Flivox?</h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-500 font-semibold text-sm lg:text-base">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-1 text-sm lg:text-base">Качество продукции</h3>
                                            <p className="text-gray-600 text-xs lg:text-sm">Мы работаем только с проверенными поставщиками</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-500 font-semibold text-sm lg:text-base">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-1 text-sm lg:text-base">Широкий ассортимент</h3>
                                            <p className="text-gray-600 text-xs lg:text-sm">Большой выбор товаров для любых потребностей</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-500 font-semibold text-sm lg:text-base">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-1 text-sm lg:text-base">Доступные цены</h3>
                                            <p className="text-gray-600 text-xs lg:text-sm">Регулярные акции и скидки для наших клиентов</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-500 font-semibold text-sm lg:text-base">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-1 text-sm lg:text-base">Быстрая доставка</h3>
                                            <p className="text-gray-600 text-xs lg:text-sm">Доставляем заказы по всей Беларуси</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-white rounded-lg p-4 lg:p-8 shadow-sm">
                                <h2 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4">Контактная информация</h2>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 text-sm lg:text-base">
                                    <span className="font-medium">Email:</span>
                                    <a href="mailto:support@flivox.com" className="text-blue-500 hover:underline break-all">
                                        support@flivox.com
                                    </a>
                                </div>
                            </section>
                        </div>
                    </div>
                </Container>
            </Suspense>
        </>
    );
} 