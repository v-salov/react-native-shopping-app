import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

export const AppTextBold = props => {
  const { colors } = useTheme()
  return (
    <Text
      style={{
        ...styles.default,
        backgroundColor: colors.text,
        ...props.style
      }}
    >
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'roboto-bold',
    fontSize: 16
  }
})
