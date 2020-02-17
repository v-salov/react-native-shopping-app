import React, { useState } from "react";
import { View, Text, Button } from 'react-native'
import { Form, Item, Input, Picker, Label } from 'native-base'
import { HeaderButtons, Item as I } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/app-header-icon";
import { useSelector, useDispatch } from "react-redux";

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

  const saveHandler = () => {
    const product ={
      name, 
      price: +price, 
      category,
      measure
    }
    dispatch(createProduct(product))
    navigation.goBack()
  }

  return (
    <Form style={{padding: 10}}>
     
        <Item floatingLabel>
          <Label>Название продукта</Label>
          <Input value={name} onChangeText={ p => setName(p)}/>
        </Item>

        <Item floatingLabel>
        <Label>Цена</Label>
          <Input 
          value={price} 
          onChangeText={ p => setPrice(p) }
          keyboardType="numeric"/>
        </Item>
    

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
      }}>
        <Text style={{ fontFamily: 'roboto-regular', fontSize: 16 }}>Выберите категорию: </Text>
        <Picker
          mode="dropdown"
          note
          selectedValue={category}
          onValueChange={(c) => setCategory(c)}
        >
          {categories.map(c => <Picker.Item label={c.name} value={c.name} key={c.id} />)}
        </Picker>
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
      }}>
        <Text style={{ fontFamily: 'roboto-regular', fontSize: 16 }}>Выберите ед. измерения: </Text>
        <Picker
          mode="dropdown"
          note
          selectedValue={measure}
          onValueChange={(m) => setMeasure(m)}
        >
          {measures.map(m => <Picker.Item label={m.name} value={m.name} key={m.id} />)}
        </Picker>
      </View>

      <Button
          title='Создать продукт'
          color={Colors.tintColor}
          onPress={saveHandler}
          disabled={!(name, category, measure, price)}
        />


    </Form>
  )
}

CreateProductScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Создание продукта',
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <I
        title='Toggle Drawer'
        iconName='md-arrow-back'
        onPress={() => navigation.goBack()}
      />
    </HeaderButtons>
  )
})
