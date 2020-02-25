import React, { useState } from "react";
import { View, Text, Button } from 'react-native'
import { Form, Item, Input, Picker, Label } from 'native-base'
import { useSelector, useDispatch } from "react-redux";
import {AppContainer} from '../components/ui/app-container'
import { AppText } from "../components/ui/app-text";

import {createProduct} from '../store/actions/product'
import Colors from '../constants/colors'


export const CreateProductScreen = ({navigation}) => {
  const measures = useSelector(state => state.product.measures)
  const categories = useSelector(state => state.product.categories)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState(categories[0].name)
  const [measure, setMeasure] = useState(measures[0].name)
  console.log(measure)

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

   </AppContainer>
  )
}

