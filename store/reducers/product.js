import {CHANGE_ID, CREATE_PRODUCT} from "../types"

const initialState = {
  products: [
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
  ],
  categories: [
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
  ],
  measures: [
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
  ],
  loading: false,
  idTemp: null
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    case CHANGE_ID:
      return {
        ...state,
        idTemp: action.payload
      }
    default:
      return state
  }
}
