import React, {useEffect, useState} from 'react'

import {StyleSheet, Text, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {editProductInCard} from '../store/actions/cardProduct'
import {AppText} from '../components/ui/text/app-text'
import {AppButton} from '../components/ui/app-button'
import {AppNumInput, AppTextInput} from '../components'
import {changeId} from '../store/actions/product'
import {CreateNavProps} from '../navigation/params-lists'
import {RootState} from '../store'
import {CardProductType, ProductType} from '../store/types'
import {TouchableOpacity} from "react-native-gesture-handler";

export const AddProductScreen = ({
  navigation,
  route
}: CreateNavProps<'AddProduct'>) => {
  const dispatch = useDispatch()
  const { idCard, id } = route.params
  const idTemp = useSelector<RootState, string | null>(
    state => state.product.idTemp
  )
  const products = useSelector<RootState, ProductType[]>(
    state => state.product.products
  )
  const cardProduct = useSelector<RootState, CardProductType>(
    state =>
      state.cardProduct.cardProducts.find(cp => cp.id === id) as CardProductType
  )

  const productItem = products.find(p => p.id === cardProduct?.idProduct)
  const [product, setProduct] = useState(productItem || products[0])
  const [count, setCount] = useState(cardProduct?.count || 1)
  const [price, setPrice] = useState(cardProduct?.price || product.price)

  useEffect(() => {
    if (idTemp) {
      const changeProduct = products.find(p => p.id === idTemp)
      if (changeProduct) {
        setProduct(changeProduct)
        setPrice(changeProduct.price)
      }
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
      <View style={styles.productContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Products', { products, idTemp: null })
          }
        >
          <AppText>{product.name}</AppText>
        </TouchableOpacity>
        <AppButton
          style={{ width: 45 }}
          onPress={() => navigation.navigate('CreateProduct')}
        >
          <AppText>+</AppText>
        </AppButton>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AppNumInput
          keyboardType="numeric"
          onChange={(e: { nativeEvent: { text: string | number } }) => setCount(+e.nativeEvent.text || 1)}
        >
          {count}
        </AppNumInput>
        <AppText>{product.measure} </AppText>

        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}
        >
          <AppTextInput
            keyboardType="numeric"
            onChange={(e: { nativeEvent: { text: string | number } }) => setPrice(+e.nativeEvent.text || 1)}
          >
            {price}
          </AppTextInput>
          <Text> грн.</Text>
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
