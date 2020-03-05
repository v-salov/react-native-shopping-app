import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
export const AppButtonPlus = props => {
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        { color: colors.text, backgroundColor: colors.button }
      ]}
      activeOpacity={0.7}
    >
      <Entypo name="plus" size={30} color={colors.text} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    borderRadius: 50,
    padding: 10
  }
})
