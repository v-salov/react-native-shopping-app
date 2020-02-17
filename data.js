import idGenerate from "./core/idGenerator"
//const idGenerate = () => `f${(~~(Math.random()*1e8)).toString(16)}`
export const products = [
  {
    id: "1",
    name: "Кефир",
    category: "Молочные продукты",
    price: 30,
    measure: "л"
  },
  {
    id: "2",
    name: "Пиво",
    category: "Алкоголь",
    price: 35,
    measure: "л"
  },
  {
    id: "3",
    name: "Мороженое",
    category: "Молочные продукты",
    price: 20,
    measure: "шт"
  },
  {
    id: "4",
    name: "Колбаса",
    category: "Мясо, колбасы",
    price: 35,
    measure: "кг"
  }
]

export const categories = [
  {
    id: "01",
    name: "Молочные продукты"
  },
  {
    id: "02",
    name: "Алкоголь"
  },
  {
    id: "03",
    name: "Мясо, колбасы"
  }
]

export const measures = [
  {
    id: "m1",
    name: "шт",
    fullName: "Штука"
  },
  {
    id: "m2",
    name: "л",
    fullName: "Литр"
  },
  {
    id: "m3",
    name: "кг",
    fullName: "Киллограм"
  }
]

export const cards = [
  {
    id: '1',
    name: "TEST 1",
    date: new Date(),
    price: 1000
  },
  {
    id: '2',
    name: "TEST 2",
    date: new Date(),
    price: 1000
  }
]

const cardProducts = [
  {  id: idGenerate(), idCard: '1',  product: 'Кефир',  count: 1, price: 30, measure: 'л', done: true },
  {  id: idGenerate(), idCard: '2',  product: 'Пиво',  count: 2, price: 30, measure: 'бут', done: true },
  {  id: idGenerate(), idCard: '1',  product: 'Мороженное',  count: 3, price: 30, measure: 'шт', done: true },
  {  id: idGenerate(), idCard: '2',  product: 'Колбаса',  count: 4, price: 30, measure: 'шт', done: true },
  
]


export const getAsyncCards = () =>
  new Promise((resolve, reject) => resolve(cards))
export const getAsyncProducts = () =>
  new Promise((resolve, reject) => resolve(products))
export const getAsyncCategories = () =>
  new Promise((resolve, reject) => resolve(categories))
export const getAsyncMeasures = () =>
  new Promise((resolve, reject) => resolve(measures))
