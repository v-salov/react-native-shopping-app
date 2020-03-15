import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/actions/theme'
import { Ionicons } from '@expo/vector-icons'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const isDark = useSelector(state => state.theme.isDark)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          onStartShouldSetResponder={() => dispatch(toggleTheme(!isDark))}
        >
          {isDark ? (
            <Ionicons color="white" name="ios-sunny" size={24} />
          ) : (
            <Ionicons color="black" name="ios-moon" size={24} />
          )}
        </View>
      )
    })
  }, [isDark])

  return <View></View>
}
