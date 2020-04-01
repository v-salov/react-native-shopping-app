import React, {useEffect} from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AppText } from './ui/text/app-text'
import { AppNumInput } from './ui/app-num-input'
import { AppNum } from './ui/text/app-num'
import { useSelector, useDispatch } from 'react-redux'
import {
  editProductInCard,
  removeProductFromCard
} from '../store/actions/cardProduct'
import { Ionicons } from '@expo/vector-icons'
import { useTheme, useNavigation } from '@react-navigation/native'

export const CardProducts = ({ product }) => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const products = useSelector(state => state.product.products)
  const selectedValue = products.find(pr => pr.id === product.idProduct)
  let tempRef


  const onRemoveProductFromCard = id => {
    Alert.alert(
      'Удаление продукта',
      'Вы действительно желаете продукт из карточки?',
      [
        {
          text: 'Отмена',
          onPress: () => tempRef.close(),

          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => dispatch(removeProductFromCard(id))
        }
      ],
      { cancelable: false }
    )
  }

  const onEditProduct = (value, product, op) => {
    let newPr
    if (op === 'count') newPr = { ...product, count: +value }
    else if (op === 'price') newPr = { ...product, price: +value }
    else if (op === 'done') newPr = { ...product, done: value }

    dispatch(editProductInCard(newPr))
  }

  const ref = r => {
    tempRef = r
  }

  const close = () => {
    tempRef.close()
  }

  const renderLeftActions = () => {
    return (
      <View style={[styles.action, { backgroundColor: colors.primary }]}>
        <Ionicons name="ios-checkmark-circle-outline" size={32} color="white" />
      </View>
    )
  }

  const renderRightActions = () => {
    return (
      <View style={[styles.action, { backgroundColor: colors.buttonDanger }]}>
        <Ionicons name="ios-trash" size={32} color="white" />
      </View>
    )
  }

  const CardProductRecord = () => (
    <View style={[styles.product, { backgroundColor: colors.cardProduct }]}>
      {product.done && (
        <View
          style={[
            styles.dot,
            { backgroundColor: colors.primary, borderColor: colors.primary }
          ]}
        ></View>
      )}
      <View
        style={[
          {
            width: '45%',
            backgroundColor: colors.cardProduct,
            color: colors.text
          }
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Create', {
              screen: 'AddProduct',
              params: {
                id: product.id,
                idCard: product.idCard
              }
            })
          }
        >
          <AppText>{selectedValue?.name}</AppText>
        </TouchableOpacity>
      </View>
      <View>
        <AppNumInput
          style={{ backgroundColor: colors.cardProducts }}
          keyboardType="numeric"
          onEndEditing={e =>
            onEditProduct(e.nativeEvent.text, product, 'count')
          }
        >
          {product.count}
        </AppNumInput>
        <AppText>{product.measure}</AppText>
      </View>
      <View>
        <AppNumInput
          style={{ backgroundColor: colors.cardProducts }}
          keyboardType="numeric"
          onEndEditing={e =>
            onEditProduct(e.nativeEvent.text, product, 'price')
          }
        >
          {product.price}
        </AppNumInput>
        <AppText>₴</AppText>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <AppNum>{product.price * product.count}</AppNum>
        <AppText>₴</AppText>
      </View>
    </View>
  )

  return (
    <Swipeable
      ref={ref}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableLeftWillOpen={() => {
        onEditProduct(!product.done, product, 'done')
      }}
      onSwipeableLeftOpen={close}
      onSwipeableRightWillOpen={() => onRemoveProductFromCard(product.id)}
      overshootRight={false}
      overshootLeft={false}
    >
      <CardProductRecord />
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 10,
    borderRadius: 4
  },
  dot: {
    position: 'absolute',
    top: '50%',
    left: 5,
    width: 10,
    height: 10,
    borderWidth: 1,
    borderRadius: 50,
    zIndex: 1
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50
  },

  actionText: {
    fontFamily: 'roboto-regular',
    fontSize: 16
  }
})
