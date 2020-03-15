import React from 'react'
import { TextInput, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'

export const AppTextInput = props => {
  const { colors } = useTheme()
  const { label = '', ...p } = props
  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundInput }]}
    >
      {label.length > 0 && (
        <Text style={[styles.label, { color: colors.textInput }]}>{label}</Text>
      )}
      <TextInput
        {...p}
        style={{
          ...styles.input,
          color: colors.text,
          ...p.style
        }}
      >
        {p.children}
      </TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  label: {
    top: 3,
    fontFamily: 'roboto-light',
  },
  input: {
    fontFamily: 'roboto-light',
    fontSize: 16,
    textAlign: 'left',
  }
})
