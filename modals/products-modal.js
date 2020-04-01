import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { AppButtonPlus, AppText } from '../components'
import { AppListItem } from '../components/app-list-item'
import { useSelector, useDispatch } from 'react-redux'
import { changeId } from '../store/actions/product'
import { useTheme } from '@react-navigation/native'

export const ProductsModal = ({ navigation, route }) => {
  const { colors } = useTheme()
  const products = route.params?.products
  const dispatch = useDispatch()

  const onSelected = id => {
    dispatch(changeId(id))
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <AppListItem item={item} onSelected={onSelected} />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: 'rgb(200, 199, 204)',
              height: StyleSheet.hairlineWidth
            }}
          />
        )}
      />
      <AppButtonPlus onPress={() => navigation.navigate('CreateProduct')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
})
