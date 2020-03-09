import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {useTheme} from '@react-navigation/native'

export const AppCard = props => {
  const {colors} = useTheme()
  return (
    <LinearGradient colors={['rgba(255, 255, 255, 0.16)', '#121212']}>
      <View
        style={{
          ...styles.default,
          ...props.style
        }}
      >
        <Text>

        </Text>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  default: {
    borderRadius: 4
  }
})
