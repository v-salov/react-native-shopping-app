import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  FlatList, Switch
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import {Ionicons} from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {toggleTheme} from '../store/actions/theme'
import { AppButtonPlus } from '../components/ui/app-button-plus'
import moment from 'moment'
  FlatList,
  TextInput,
  Alert
} from "react-native"
import { renameCard, removeCard } from "../store/actions/card"
import { removeCardProductById } from "../store/actions/cardProduct"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { AppButtonPlus } from "../components/ui/app-button-plus"
import Colors from "../constants/colors"

import moment from "moment"

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
    navigation.navigate("Card", {
      cardId: card.id,
      name: card.name,
      date: card.date,
    })
  }

  const onRename = (id, name) => {
    dispatch(renameCard(id, name))
  }

  const onRemoveCard = () => {
    Alert.alert(
      "Удаление карточки",
      "Вы действительно желаете удалить карточку?",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Вы отменили удаление"),
          style: "cancel"
        },
        {
          text: "OK",
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
    <View style={styles.rightAction}>
      <Text style={styles.actionText}>EDIT</Text>
    </View>
  )

  const handlerRightActions = () => {
    return (
      <View style={[styles.rightAction, { backgroundColor: colors.buttonDanger }]}>
                <Ionicons name="ios-trash" size={32} color="white" />
      </View>
    )
  }

  const CardItem = ({ card }) => (
    <Swipeable
      renderLeftActions={handlerLeftActions}
      renderRightActions={handlerRightActions}
      onSwipeableLeftWillOpen={()=>onRemoveCard(card.id)}
      onSwipeableRightWillOpen={() => onEditCard(card)}
      overshootLeft={false}
      overshootRight={false}
    >
      <TouchableOpacity activeOpacity={1} onPress={() => openCardHandler(card)}>
        <View
          style={{ backgroundColor: colors.background, alignItems: 'center' }}
        >
          <View style={styles.card}>
            <View>
              <Text style={styles.name}>{card.name}</Text>
              <Text style={styles.timestamp}>
                {moment(card.timestamp).format("DD.MM.YY, h:mm:ss")}
              </Text>
            </View>
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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
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
        <Text style={styles.noItems}>Покупок пока нет</Text>
      )}
      <AppButtonPlus onPress={() => navigation.navigate('CreateCard')} />
    </View>
  )
}

const styles = StyleSheet.create({
  noItems: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },

  name: {
    fontFamily: 'roboto-bold',
    fontSize: 17,
    textAlign: 'center'
  },
  timestamp: {
    fontSize: 14,
    marginTop: 4
  },



  leftAction: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 50
  },
  actionText: {
    color: "#fff",
    fontFamily: "roboto-regular",
    fontSize: 17
  },
  rightAction: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: 50
  }
})
