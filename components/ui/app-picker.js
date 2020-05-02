import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import Colors from '../../constants/colors'
import { AppText } from './text/app-text'
import { useNavigation } from '@react-navigation/native'

export const AppPicker = ({ value, data }) => {
  const navigation = useNavigation()
  const [text, setText] = useState(value)
  const show = () => {
    navigation.navigate('Modal', {
      data,
      setItem: v => {
        setText(v)
      }
    })
  }
  return (
    <TouchableOpacity
      onPress={show}
      style={{
        width: '50%',
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: 'grey'
      }}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  default: {
    color: '#FFF',
    backgroundColor: Colors.color2
  }
})
