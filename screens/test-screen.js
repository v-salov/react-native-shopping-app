import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AppPicker } from '../components'

export const TestScreen = ({ navigation, route }) => {
  const data = [
    { name: 'Vadim', id: 1 },
    { name: 'Sanya', id: 2 }
  ]

  return (
    <View style={styles.container}>
      <AppPicker value={data[0].name} data={data} />
    </View>
  )
}
export default TestScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
