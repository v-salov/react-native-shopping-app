import React, { useState } from "react"
import { View, Text, Button, Picker, StyleSheet } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { AppContainer } from "../components/ui/app-container"
import { AppText } from "../components/ui/app-text"

import { createProduct } from "../store/actions/product"
import Colors from "../constants/colors"
import { AppInput, AppPicker } from "../components/ui"

export const CreateProductScreen = ({ navigation }) => {
  const measures = useSelector(state => state.product.measures)
  const categories = useSelector(state => state.product.categories)
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState(categories[0].name)
  const [measure, setMeasure] = useState(measures[0].name)

  // const saveHandler = () => {
  //   const product ={
  //     name,
  //     price: +price,
  //     category,
  //     measure
  //   }
  //   dispatch(createProduct(product))
  //   navigation.goBack()
  // }

  return (
    <AppContainer>
      
      <AppInput
        placeholder="Введите название продукта"
        value={name}
        onChangeText={setName}
      />
     
      <AppInput
        placeholder="Введите количество"
        value={price}
        onChangeText={setPrice}
        style={{marginBottom:15}}
      />
      <AppPicker >

      </AppPicker>


    </AppContainer>
  )
}

const styles = StyleSheet.create({
  inp: {
    marginBottom: 10
  }
})
