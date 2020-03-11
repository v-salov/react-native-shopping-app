import React, {useRef} from 'react'
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
import {
  AppNum,
  AppNumInput,
  AppText,
  AppTextBold,
  AppTextInput
} from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const CardScreen = ({ navigation, route }) => {
  const sw = useRef(null);
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
    else if (op === 'done') newPr = { ...product, done: value }

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
  const renderLeftActions = () => {
    return (
      <View ref={sw}
      style={[styles.action, { backgroundColor: colors.primary }]}
      >
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

  const renderProducts = product => {
    const selectedValue = products.find(pr => pr.id === product.idProduct)
    return (
      <Swipeable
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableLeftOpen={()=>{onEditProduct(!product.done, product, 'done')}}
        onSwipeableRightWillOpen={() => onRemoveProductFromCard(product.id)}
        overshootRight={false}
        overshootLeft={false}
      >
        <View  style={[styles.product, { backgroundColor: colors.cardProduct }]}>
          {product.done && <View
            style={[
              styles.dot,
              { backgroundColor: colors.primary, borderColor: colors.primary }
            ]}
          ></View>}
          <Picker
            selectedValue={selectedValue}
            style={[
              {
                width: '45%',
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
                height: 1
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
        <AppNum style={{ fontSize: 25 }}>
          Total:{' '}
          {cardProducts.reduce((total, item) => {
            return total + item.count * item.price
          }, 0)}{' '}
          ₴
        </AppNum>
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
    padding: 5,
    paddingLeft: 10,
    borderRadius: 4
  },
  dot: {
    position: 'absolute',
    top: '50%',
    width: 10,
    height: 10,
    borderWidth: 1,
    borderRadius: 50,
    zIndex: 1
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
