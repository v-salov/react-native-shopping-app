import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {AppInput, AppText, AppTextInput} from "../components";
import {AppButton} from "../components/ui/app-button";
import { createCard, editCard } from '../store/actions/card'
import {useTheme} from '@react-navigation/native'

export const CreateCardScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const {colors} = useTheme()
const [name, setName] = useState('')
  const saveHandler = () => {
    const card = {
      id: Math.random().toString(),
      name,
      date: new Date()
    }
    dispatch(createCard(card))
    navigation.replace('AddProduct', {idCard: card.id})
  }

  return (
    <ScrollView style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{paddingTop: 10}}>
          <AppText>
            Добавление покупки
          </AppText>
          <View
            style={{
              marginBottom: 10,

            }}
          >
            <AppTextInput
              placeholder="Введите название покупки"
              value={name}
              onChangeText={setName}

            />
          </View>
          <AppButton
            onPress={saveHandler}
          >Создать</AppButton>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({


  name: {
    padding: 10,
    marginBottom: 10
  }
})
