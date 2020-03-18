import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/actions/theme'
import { Ionicons } from '@expo/vector-icons'
import { Dropdown } from 'react-native-material-dropdown'
import { useTheme } from '@react-navigation/native'
import { AppText } from '../components'

export default ({ navigation }) => {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const products = useSelector(state=>state.product.products)
  const cardProducts = useSelector(state=>state.cardProduct.cardProducts.filter(cp=>cp.idCard==='1'))
console.log(cardProducts)

  const onSelected = id => {
    console.log(id)
  }

  const Item = ({ id, name, onSelect }) => {
    return (
      <TouchableOpacity onPress={() => onSelect(id)}>
        <AppText>{name}</AppText>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background
      }}
    >
      <FlatList
        data={cardProducts}
        renderItem={({ item }) => (
          <Item name={item.name} id={item.id} onSelect={onSelected} />
        )}
      />
      <View>
        <AppText>{}</AppText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {}
})
