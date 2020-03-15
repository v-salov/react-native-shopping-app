import { useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextField } from 'react-native-material-textfield'
import { RaisedButton, Button, TextButton } from 'react-native-material-buttons'
import { useDispatch } from 'react-redux'
import { AppText, AppTextInput } from '../components'
import { AppButton } from '../components/ui/app-button'
import { createCard } from '../store/actions/card'

export const CreateCardScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const [name, setName] = useState('')

  const saveHandler = () => {
    const card = {
      id: Math.random().toString(),
      name,
      date: new Date()
    }
    dispatch(createCard(card))
    navigation.replace('AddProduct', { idCard: card.id })
  }

  return (
    <View style={styles.container}>
      <AppText style={{ fontSize: 20 }}>Добавление покупки</AppText>
      <TextField
        label="Product"
        value={name}
        onChangeText={setName}
        textColor={colors.text}
        containerStyle={{ width: '100%' }}
        baseColor={colors.textInput}
      />
      <AppButton disabled={name.length<3} onPress={saveHandler}>Ok</AppButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
