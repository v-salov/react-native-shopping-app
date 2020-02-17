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
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { AppHeaderIcon } from "../components/app-header-icon"
import { addCard, editCard } from "../store/actions/card"
import Colors from "../constants/colors"

export const CreateCardScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const cards = useSelector(state => state.card.cards)
  const cardId = navigation.getParam("id")
  let card = cards.find(c => c.id === cardId)
  const cardName = card ? card.name : ''
  const [name, setName] = useState(cardName)

  const saveHandler = () => {
    if (!card) {
      card = {
        id: Math.random().toString(),
        name,
        timestamp: new Date(),
        cardProducts: [],
        price: 0
      }
      dispatch(addCard(card))
      navigation.replace("CreateProduct", { id: card.id })
    }
    else {card = {
      ...card,
      timestamp: new Date(),
      name
    }
    dispatch(editCard(card))
    navigation.replace('Card', { cardId: card.id })
  }}

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{card ? 'Изменение' : 'Добавление'} покупки</Text>
          <TextInput
            style={styles.name}
            placeholder="Введите имя покупки"
            value={name}
            onChangeText={setName}
          />
          <Button
            title={cardId ? "Изменить покупку" : "Создать покупку"}
            color={Colors.tintColor}
            onPress={saveHandler}
            disabled={!name}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

CreateCardScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: `${navigation.getParam('id') ? 'Изменить': 'Создать'} покупку`,
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Toggle Drawer"
        iconName="ios-menu"
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "roboto-regular",
    marginVertical: 10
  },
  name: {
    padding: 10,
    marginBottom: 10
  }
})
