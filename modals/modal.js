import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native'

export const Modal = ({ navigation, route }) => {
  console.log(route.params?.data)
  const close = v => {
    navigation.goBack()
    route.params.setItem?.(v)
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={route.params?.data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => close(item.name)} style={styles.item}>
            <Text>{item.name}</Text>
          </TouchableOpacity>

        )}

      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    width: '50%',
    borderWidth: 1,
    backgroundColor: 'grey',
    borderColor: 'red'
  }
})
