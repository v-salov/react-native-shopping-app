import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  FlatList
} from "react-native"

import Swipeable from "react-native-gesture-handler/Swipeable"
import { AppButtonPlus } from "../components/ui/app-button-plus"
import Colors from "../constants/colors"

import moment from "moment"

export const MainScreen = ({ navigation }) => {
  const loading = useSelector(state => state.product.loading)
  const dispatch = useDispatch()

  const cards = useSelector(state => state.card.cards)

  const openCardHandler = card => {
    navigation.navigate("Card", {
      cardId: card.id,
      name: card.name,
      date: card.date,
    })
  }

  const onEditCard = card => {
    navigation.navigate("CreateCard", {
      cardId: card.id
    })
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
          onPress: () => dispatch(removeCard(card.id))
        }
      ],
      { cancelable: false }
    )
  }

  const handlerLeftActions = () => (
    <View style={styles.rightActions}>
      <Text style={styles.actionText}>
        EDIT
      </Text>
    </View>
  )

  const handlerRightActions = () => {
    return (<View
      style={styles.rightActions}
    >
      <Text
        style={{
          color: "#fff",
          fontFamily: "roboto-regular",
          fontSize: 17
        }}
      >
        DEL
      </Text>
    </View>)
  }

  const CardItem = ({ card }) => (
    <Swipeable
      renderLeftActions={handlerLeftActions}
      renderRightActions={handlerRightActions}
      onSwipeableLeftWillOpen={onRemoveCard}
      onSwipeableRightWillOpen={() => onEditCard(card)}
      overshootLeft={false}
      overshootRight={false}
    >
      <TouchableOpacity activeOpacity={1} onPress={() => openCardHandler(card)}>
        <View style={styles.wrapperItem}>
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
        <ActivityIndicator color={Colors.mainColor} />
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      {cards.length
        ? (
          <FlatList
            data={cards}
            keyExtractor={post => post.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <CardItem
                card={item}
                onOpen={() => {
                  console.log(11)
                }}
              />
            )}
          />
        )
        : <Text style={styles.noItems}>Покупок пока нет</Text>
      }
      <AppButtonPlus onPress={() => navigation.navigate("CreateCard")} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.mainBackgroundColor
  },
  noItems: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 18
  },
  wrapperItem: {
    backgroundColor: Colors.mainBackgroundColor
  },
  separator: {
    backgroundColor: Colors.separatorColor,
    height: StyleSheet.hairlineWidth
  },
  card: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5
  },

  name: {
    fontFamily: "roboto-bold",
    fontSize: 17,
    fontWeight: "500",
    color: Colors.mainColor,
    textAlign: "center"
  },
  timestamp: {
    fontSize: 14,
    color: "#C4C6CE",
    marginTop: 4
  },
  leftActions: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: 50
  },

  rightActions: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 50
  },

  actionText: {
    color: "#fff",
    fontFamily: "roboto-regular",
    fontSize: 17
  }
})
