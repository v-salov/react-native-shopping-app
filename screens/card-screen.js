import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {useTheme} from '@react-navigation/native'
import moment from 'moment'

import {AppButtonPlus} from '../components/ui/app-button-plus'
import {AppNum, AppText, AppTextBold} from '../components'
import {CardProducts} from "../components/card-products";

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

  return (
    <View style={styles.container}>
      <AppTextBold>{name}</AppTextBold>
      <AppText style={{ textAlign: 'center', marginBottom: 10 }}>
        {moment(date).format('DD.MM.YY, h:mm:ss')}
      </AppText>

      {cardProducts.length ? (
        <FlatList
          data={cardProducts}
          renderItem={({ item }) => <CardProducts product={item}/>}
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
        onPress={() => navigation.navigate('Create', { screen:'AddProduct', params: {idCard: cardId} })}
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

  button: {
    borderWidth: 1,
    borderRadius: 4,
    height: 30,
    minWidth: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  totalPrice: {
    position: 'absolute',
    bottom: 10,
    left: 20
  }
})
