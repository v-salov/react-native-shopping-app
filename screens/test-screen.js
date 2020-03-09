import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, Switch } from 'react-native'
import { AppButton } from '../components/ui/app-button'
import { useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/actions/theme'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const isDark = useSelector(state => state.theme.isDark)
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Switch
          value={isDark}
          onValueChange={value => dispatch(toggleTheme(value))}
        />
      )
    })
  }, [isDark])
  const { colors } = useTheme()
  return (
    <View
  style={{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background
  }}
  />
  )
}
