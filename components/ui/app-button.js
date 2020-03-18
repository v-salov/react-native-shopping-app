import React from 'react'
import { useTheme } from '@react-navigation/native'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import Colors from '../../constants/colors'
export const AppButton = p => {
  const {disabled, ...props} = p
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        { backgroundColor: colors.background,
          borderColor: disabled ? colors.buttonTextDisabled : colors.border
        },
        props.style
      ]}
      activeOpacity={0.7}
    >
      <Text
        style={{ ...styles.buttonText, color: disabled ? colors.buttonTextDisabled : colors.text, ...props.color }}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'roboto-regular'
  }
})
