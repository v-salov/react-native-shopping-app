import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  FlatList,
  Switch,
  TextInput,
  Alert
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import moment from 'moment'

import { toggleTheme } from '../store/actions/theme'
import { AppButtonPlus, AppNum, AppText } from '../components/'
import { renameCard, removeCard } from '../store/actions/card'
import { removeCardProductById } from '../store/actions/cardProduct'

export const MainScreen = ({ navigation }) => {
  const loading = useSelector(state => state.product.loading)
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const cards = useSelector(state => state.card.cards)
  const cardProducts = useSelector(state => state.cardProduct.cardProducts)
  const isDark = useSelector(state => state.theme.isDark)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 15}}
          onStartShouldSetResponder={() => dispatch(toggleTheme(!isDark))}
        >
          {isDark ? (
            <Ionicons color="white" name="ios-sunny" size={24} />
          ) : (
            <Ionicons color="black" name="ios-moon" size={24} />
          )}
        </View>
      )
    })
  }, [isDark])

  const openCardHandler = card => {
    navigation.navigate('Card', {
      cardId: card.id,
      name: card.name,
      date: card.date
    })
  }

  const onRename = (id, name) => {
    dispatch(renameCard(id, name))
  }

  const onRemoveCard = id => {
    Alert.alert(
      'Удаление карточки',
      'Вы действительно желаете удалить карточку?',
      [
        {
          text: 'Отмена',
          onPress: () => console.log('Вы отменили удаление'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(removeCard(id))
            dispatch(removeCardProductById(id))
          }
        }
      ],
      { cancelable: false }
    )
  }

  const handlerLeftActions = () => (
    <View style={styles.action}>
      <AppText>222</AppText>
    </View>
  )

  const handlerRightActions = () => {
    return (
      <View style={[styles.action, { backgroundColor: colors.buttonDanger }]}>
        <Ionicons name="ios-trash" size={32} color="white" />
      </View>
    )
  }

  const CardItem = ({ card }) => {
    const cardP = cardProducts.filter(cp => cp.idCard === card.id)
    const countDone = cardP.filter(cp => cp.done).length
    const percent = (countDone / cardP.length) * 100

    const total = cardP.reduce((t, item) => {
      return t + item.price * item.count
    }, 0)
    return (
      <Swipeable
        renderRightActions={handlerRightActions}
        onSwipeableRightWillOpen={() => onRemoveCard(card.id)}
        overshootLeft={false}
        overshootRight={false}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => openCardHandler(card)}
        >
          <View style={{ ...styles.card, backgroundColor: colors.cardProduct }}>

            <View style={{ padding: 5, width: "50%", alignItems: 'flex-start' }}>
              <TextInput
                onEndEditing={e => {
                  onRename(card.id, e.nativeEvent.text)
                }}
              >
                <AppText>{card.name}</AppText>
              </TextInput>
              <AppText style={{ color: colors.date }}>
                {moment(card.timestamp).format('DD.MM.YY, h:mm:ss')}
              </AppText>
            </View>

            <View>
              <AppNum style={{ color: colors.date, fontSize: 25 }}>₴</AppNum>
            </View>

            <View>
              <AppNum style={{fontSize:22}}>{total}</AppNum>
            </View>
            <View>
              <AnimatedCircularProgress
                size={60}
                width={10}
                fill={percent}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
              >
                {() => (
                  <AppNum style={{ color: colors.text, fontSize: 16 }}>
                    {10}/{25}
                  </AppNum>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
      </View>
    )
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.background, marginTop: 10 }}
    >
      {cards.length ? (
        <FlatList
          data={cards}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
            <View
              style={{
                backgroundColor: colors.separator,
                height: 1,

              }}
            />
          )}
          renderItem={({ item }) => (
            <CardItem
              card={item}
              onOpen={() => {
                console.log(11)
              }}
            />
          )}
        />
      ) : (
        <AppText style={styles.noItems}>Покупок пока нет</AppText>
      )}
      <AppButtonPlus onPress={() => navigation.navigate('CreateCard')} />
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noItems: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },

  action: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50
  }
})
