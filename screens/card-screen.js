import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
  Picker
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'

import { AppButtonPlus } from '../components/ui/app-button-plus'
import Colors from '../constants/colors'
import {
  editProductInCard,
  removeProductFromCard
} from '../store/actions/cardProduct'
import { AppText, AppTextBold, AppTextInput } from '../components/ui'

export const CardScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const { cardId } = route.params

  const { name, date } = useSelector(state =>
    state.card.cards.find(c => c.id === cardId)
  )

  const cardProducts = useSelector(state => {
    return state.cardProduct.cardProducts.filter(
      ({ idCard }) => idCard === cardId
    )
  })

  const products = useSelector(state => state.product.products)

  const onRemoveProductFromCard = id => {
    Alert.alert(
      'Удаление продукта',
      'Вы действительно желаете продукт из карточки?',
      [
        {
          text: 'Отмена',
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
    dispatch(editProductInCard(newPr))
  }

  const onEditName = (p, product) => {
    const newPr = {
      ...product,
      price: p.price,
      measure: p.measure,
      idProduct: p.id
    }
    dispatch(editProductInCard(newPr))
  }

  const renderRightActions = () => {
    return (
      <View style={[styles.action, { backgroundColor: colors.buttonDanger }]}>
        <Ionicons name="ios-trash" size={32} color="white" />
      </View>
    )
  }

  const renderProducts = product => {
    const selectedValue = products.find(pr => pr.id === product.idProduct)
    return (
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableRightWillOpen={() => onRemoveProductFromCard(product.id)}
        overshootRight={false}
      >
        <View style={[styles.product, { backgroundColor: colors.cardProduct }]}>
          <Picker
            selectedValue={selectedValue}
            style={[
              {
                width: '40%',
                backgroundColor: colors.cardProduct,
                color: colors.text
              }
            ]}
            mode="dropdown"
            onValueChange={p => onEditName(p, product)}
          >
            {products.map(p => (
              <Picker.Item label={p.name} value={p} key={p.id}></Picker.Item>
            ))}
          </Picker>
          <AppTextInput
            style={{backgroundColor: colors.cardProducts}}
            keyboardType="numeric"
            onEndEditing={e =>
              onEditProduct(e.nativeEvent.text, product, 'count')
            }
          >
            {product.count}
          </AppTextInput>
          <AppTextInput
            style={{backgroundColor: colors.cardProducts}}
            keyboardType="numeric"
            onEndEditing={e =>
              onEditProduct(e.nativeEvent.text, product, 'price')
            }
          >
            {product.price}
          </AppTextInput>
          <View style={{ justifyContent: 'center' }}>
            <AppText>{product.price * product.count}</AppText>
            <AppText>грн</AppText>
          </View>
        </View>
      </Swipeable>
    )
  }

  return (
    <View style={styles.container}>
      <AppTextBold>{name}</AppTextBold>
      <AppText style={{ textAlign: 'center', marginBottom: 10 }}>
        {moment(date).format('DD.MM.YY, h:mm:ss')}
      </AppText>

      {cardProducts.length ? (
        <FlatList
          data={cardProducts}
          renderItem={({ item }) => renderProducts(item)}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
            <View
              style={{
                backgroundColor: colors.separator,
                height: StyleSheet.hairlineWidth
              }}
            />
          )}
        />
      ) : (
        <AppTextBold>Добавить товары</AppTextBold>
      )}

      <AppButtonPlus
        onPress={() => navigation.navigate('AddProduct', { idCard: cardId })}
      />
      <View style={styles.totalPrice}>
        <AppTextBold>
          {cardProducts.reduce((total, item) => {
            return total + item.count * item.price
          }, 0)}
        </AppTextBold>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  text: {
    textAlign: 'center',
    fontFamily: 'roboto-bold',
    fontSize: 18
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    height: 30,
    minWidth: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50
  },

  actionText: {
    fontFamily: 'roboto-regular',
    fontSize: 16
  },
  totalPrice: {
    position: 'absolute',
    bottom: 10,
    left: 20
  }
})
