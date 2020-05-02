import idGenerate from './core/idGenerator'
import {CardType, ProductType, CategoryType, MeasureType, CardProductType} from "./store/types";
//const idGenerate = () => `f${(~~(Math.random()*1e8)).toString(16)}`
export const products: Array<ProductType> = [
  {
    id: '1',
    name: 'Кефир',
    category: 'Молочные продукты',
    price: 30,
    measure: 'л'
  },
  {
    id: '2',
    name: 'Пиво',
    category: 'Алкоголь',
    price: 35,
    measure: 'л'
  },
  {
    id: '3',
    name: 'Мороженое',
    category: 'Молочные продукты',
    price: 20,
    measure: 'шт'
  },
  {
    id: '4',
    name: 'Колбаса',
    category: 'Мясо, колбасы',
    price: 35,
    measure: 'кг'
  }
]

export const categories: Array<CategoryType> = [
  {
    id: '01',
    name: 'Молочные продукты',
  },
  {
    id: '02',
    name: 'Алкоголь',
  },
  {
    id: '03',
    name: 'Мясо, колбасы',
  }
]

export const measures: Array<MeasureType> = [
  {
    id: 'm1',
    name: 'шт',
    fullName: 'Штука'
  },
  {
    id: 'm2',
    name: 'л',
    fullName: 'Литр'
  },
  {
    id: 'm3',
    name: 'кг',
    fullName: 'Киллограм'
  }
]

export const cards: Array<CardType> = [
  {
    id: '1',
    name: 'TEST 1',
    date: new Date(),
    done: true
  },
  {
    id: '2',
    name: 'TEST 2',
    date: new Date(),
    done: false
  }
]

export const cardProducts: Array<CardProductType> = [
  {
    id: idGenerate(),
    idCard: '1',
    name: 'Кефир',
    count: 1,
    price: 30,
    measure: 'л',
    done: false,
    idProduct: '1'
  },
  {
    id: idGenerate(),
    idCard: '2',
    name: 'Пиво',
    count: 2,
    price: 30,
    measure: 'бут',
    done: true,
    idProduct: '2'
  },
  {
    id: idGenerate(),
    idCard: '1',
    name: 'Мороженное',
    count: 3,
    price: 30,
    measure: 'шт',
    done: false,
    idProduct: '3'
  },
  {
    id: idGenerate(),
    idCard: '2',
    name: 'Колбаса',
    count: 4,
    price: 30,
    measure: 'шт',
    done: true,
    idProduct: '4'
  }
]

// export const getAsyncCards = () =>
//   new Promise((resolve, reject) => resolve(cards))
// export const getAsyncProducts = () =>
//   new Promise((resolve, reject) => resolve(products))
// export const getAsyncCategories = () =>
//   new Promise((resolve, reject) => resolve(categories))
// export const getAsyncMeasures = () =>
//   new Promise((resolve, reject) => resolve(measures))
