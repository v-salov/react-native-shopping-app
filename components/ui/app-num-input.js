import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

export const AppNumInput = props => {
  const { colors } = useTheme()

  return (
    <TextInput
      {...props}
      style={{
        ...styles.input,
        backgroundColor: colors.background,
        color: colors.text,
        ...props.style
      }}
    >
      {props.children}
    </TextInput>
  )
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'eczar-regular',
    fontSize: 20,
    textAlign: 'center'
  }
})
