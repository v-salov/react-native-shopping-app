import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

export const AppNum = props => {
  const { colors } = useTheme()
  return (
    <Text
      style={{
        ...styles.default,
        color: colors.text,
        ...props.style
      }}
    >
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'eczar-regular',
    fontSize: 20,
    textAlign: 'center'
  }
})
