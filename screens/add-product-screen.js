import React, { useState, useEffect } from 'react'

import {
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { editProductInCard } from '../store/actions/cardProduct'
import { AppText } from '../components/ui/text/app-text'
import Colors from '../constants/colors'
import { AppButton } from '../components/ui/app-button'
import { AppContainer } from '../components/ui/app-container'
import { AppNum, AppNumInput, AppTextInput } from '../components'
import { changeId } from '../store/actions/product'

export const AddProductScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { idCard, id } = route.params

  const idTemp = useSelector(state => state.product.idTemp)
  const products = useSelector(state => state.product.products)
  const cardProduct = useSelector(state =>
    state.cardProduct.cardProducts.find(cp => cp.id === id)
  )

  const productItem = products.find(p => p.id === cardProduct?.idProduct)
  const [product, setProduct] = useState(productItem || products[0])
  const [count, setCount] = useState(cardProduct?.count || 1)
  const [price, setPrice] = useState(cardProduct?.price || product.price)

  useEffect(() => {
    if (idTemp) {
      const changeProduct = products.find(p => p.id === idTemp)
      setProduct(changeProduct)
      setPrice(changeProduct.price)
    }
    return () => {
      if (!idTemp) dispatch(changeId(null))
    }
  }, [idTemp])

  const save = () => {
    const cardProduct = {
      id,
      idCard,
      idProduct: product.id,
      measure: product.measure,
      count,
      price,
      done: false
    }
    dispatch(editProductInCard(cardProduct))
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Добавление товара</AppText>

      <View style={styles.productContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Products', { products, idTemp: null })
          }
          style={{ width: '80%', marginRight: 10, borderWidth: 1 }}
        >
          <AppText>{product.name}</AppText>
        </TouchableOpacity>
        <AppButton
          style={{ width: 40 }}
          onPress={() => navigation.navigate('CreateProduct')}
        >
          <AppText>+</AppText>
        </AppButton>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AppNumInput
          keyboardType="numeric"
          onChange={e => setCount(+e.nativeEvent.text || 1)}
          style={styles.count}
        >
          {count}
        </AppNumInput>
        <AppText>{product.measure} </AppText>

        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}
        >
          <AppTextInput
            keyboardType="numeric"
            onChange={e => setPrice(+e.nativeEvent.text || 1)}
            style={styles.text}
          >
            {price}
          </AppTextInput>
          <Text style={styles.text}> грн.</Text>
        </View>
      </View>

      <View style={{ alignSelf: 'flex-start' }}>
        <AppText>Цена за единицу: {price} грн.</AppText>
        <AppText>Общая сумма {price * count}</AppText>
      </View>

      <AppButton style={{ marginVertical: 10 }} onPress={save}>
        Сохранить
      </AppButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'roboto-regular',
    marginVertical: 10
  },

  editProducts: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  productContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 15
  }
})
