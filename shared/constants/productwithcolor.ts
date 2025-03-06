export const mapProductColor = {
  1: 'Black',
  2: 'Silver',
  3: 'Gold',
} as const;

export const mapProductType = {
  1: 'Новинка',
  2: 'В наличии',
} as const;

export const productColors = [
  { name: 'White Titanium', value: '1' },
  { name: 'Natural Titanium', value: '2' },
  { name: 'Desert Titanium', value: '3' },
  { name: 'Black Titanium', value: '4' },
  { name: 'Blue', value: '5' },
  { name: 'Red', value: '6' },
  { name: 'Midnight', value: '7' },
  { name: 'Green', value: '8' },
  { name: 'Pink', value: '9' },
  { name: 'Starlight', value: '10' },
  { name: 'Light Blue', value: '11' },
  { name: 'Yellow', value: '12' },
  { name: 'Black', value: '13' },
  { name: 'Purple', value: '14' },
  { name: 'Orange', value: '15' },
  { name: 'White', value: '16' },
  { name: 'Gray', value: '17' },
  { name: 'Silver', value: '18' },
  { name: 'Gold', value: '19' },
  { name: 'Light Green', value: '20' },
  { name: 'Light Gray', value: '21' },
  { name: 'Dark Gray', value: '22' },
  { name: 'Beige', value: '23' },
  { name: 'Cyan', value: '24' },
  { name: 'Magenta', value: '25' },
  { name: 'Olive', value: '26' },
  { name: 'Teal', value: '27' },
  { name: 'Maroon', value: '28' },
  { name: 'Navy', value: '29' },
  { name: 'Lime', value: '30' },
] as const;

export type ProductColor = keyof typeof mapProductColor;
export type ProductFilter = keyof typeof mapProductType;
