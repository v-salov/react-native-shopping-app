import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { addCard, editCard } from "../store/actions/card"
import Colors from "../constants/colors"

export const CreateCardScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const cards = useSelector(state => state.card.cards)
  const { id } = route.params
  let card = cards.find(c => c.id === cardId)
  const cardName = card ? card.name : ""
  const [name, setName] = useState(cardName)

  const saveHandler = () => {
    if (!card) {
      card = {
        id: Math.random().toString(),
        name,
        date: new Date(),
      }
      dispatch(addCard(card))
      navigation.replace("CreateProduct", { id: card.id })
    } else {
      card = {
        ...card,
        date: new Date(),
        name
      }
      dispatch(editCard(card))
      navigation.replace("Card", { cardId: card.id })
    }
  }

  return (
    <ScrollView style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Text style={styles.title}>
            {card ? "Изменение" : "Добавление"} покупки
          </Text>
          <Item
            style={{
              marginBottom: 10,
              borderBottomColor: Colors.separatorColor
            }}
          >
            <Input
              placeholder="Введите название покупки"
              value={name}
              onChangeText={setName}
              style={{
                color: "white",
                fontFamily: "roboto-regular"
              }}
            />
          </Item>
          <Button
            title={cardId ? "Изменить покупку" : "Создать покупку"}
            color={Colors.buttonColor}
            onPress={saveHandler}
            disabled={!name}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: Colors.mainBackgroundColor
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "roboto-regular",
    marginVertical: 10,
    color: "white"
  },
  name: {
    padding: 10,
    marginBottom: 10
  }
})
