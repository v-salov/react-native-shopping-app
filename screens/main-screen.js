import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  FlatList,
  Switch, TextInput
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { toggleTheme } from '../store/actions/theme'
import { AppButtonPlus } from '../components/ui/app-button-plus'

import { renameCard, removeCard } from '../store/actions/card'
import { removeCardProductById } from '../store/actions/cardProduct'

import moment from 'moment'
import { AppText } from '../components/ui'

export const MainScreen = ({ navigation }) => {
  const loading = useSelector(state => state.product.loading)
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const cards = useSelector(state => state.card.cards)

  const isDark = useSelector(state => state.theme.isDark)
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Switch
          value={isDark}
          onValueChange={value => dispatch(toggleTheme(value))}
        />
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

  const CardItem = ({ card }) => (
    <Swipeable
      renderLeftActions={handlerLeftActions}
      renderRightActions={handlerRightActions}
      onSwipeableLeftWillOpen={() => onRemoveCard(card.id)}
      onSwipeableRightWillOpen={() => onRename(card.id, card.name)}
      overshootLeft={true}
      overshootRight={false}
    >
      <TouchableOpacity activeOpacity={1} onPress={() => openCardHandler(card)}>
        <View
          style={{ backgroundColor: colors.background, alignItems: 'center' }}
        >
          <View style={{padding: 5}}>
              <TextInput onEndEditing={e => {onRename(card.id, e.nativeEvent.text)}}>
                <AppText>{card.name}</AppText>
              </TextInput>
              <AppText style={{color: colors.date}}>
                {moment(card.timestamp).format('DD.MM.YY, h:mm:ss')}
              </AppText>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  )

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, marginTop: 10 }}>
      {cards.length ? (
        <FlatList
          data={cards}
          keyExtractor={post => post.id.toString()}
          ItemSeparatorComponent={() => (
            <View
              style={{
                backgroundColor: colors.separator,
                height: StyleSheet.hairlineWidth
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

  action: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50
  }
})
