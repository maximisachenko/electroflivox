export const REGIONS = [
  { id: 'minsk', name: 'Минская область' },
  { id: 'brest', name: 'Брестская область' },
  { id: 'vitebsk', name: 'Витебская область' },
  { id: 'gomel', name: 'Гомельская область' },
  { id: 'grodno', name: 'Гродненская область' },
  { id: 'mogilev', name: 'Могилевская область' },
] as const;

export const CITIES = {
  minsk: [
    { id: 'minsk', name: 'Минск' },
    { id: 'borisov', name: 'Борисов' },
    { id: 'soligorsk', name: 'Солигорск' },
    { id: 'slutsk', name: 'Слуцк' },
    { id: 'molodechno', name: 'Молодечно' },
  ],
  brest: [
    { id: 'brest', name: 'Брест' },
    { id: 'baranovichi', name: 'Барановичи' },
    { id: 'pinsk', name: 'Пинск' },
    { id: 'kobrin', name: 'Кобрин' },
  ],
  vitebsk: [
    { id: 'vitebsk', name: 'Витебск' },
    { id: 'orsha', name: 'Орша' },
    { id: 'novopolotsk', name: 'Новополоцк' },
    { id: 'polotsk', name: 'Полоцк' },
  ],
  gomel: [
    { id: 'gomel', name: 'Гомель' },
    { id: 'mozyr', name: 'Мозырь' },
    { id: 'zhlobin', name: 'Жлобин' },
    { id: 'svetlogorsk', name: 'Светлогорск' },
  ],
  grodno: [
    { id: 'grodno', name: 'Гродно' },
    { id: 'lida', name: 'Лида' },
    { id: 'slonim', name: 'Слоним' },
    { id: 'volkovysk', name: 'Волковыск' },
  ],
  mogilev: [
    { id: 'mogilev', name: 'Могилев' },
    { id: 'bobruisk', name: 'Бобруйск' },
    { id: 'osipovichi', name: 'Осиповичи' },
    { id: 'krichev', name: 'Кричев' },
  ],
} as const;
