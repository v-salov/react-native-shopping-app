import React, { useState } from "react"

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Picker,
  CheckBox,
  TouchableOpacity
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { addCard, addProductToCard } from "../store/actions/card"
import Colors from "../constants/colors"

export const AddProductScreen = ({ navigation, route }) => {
  const { idCard } = route.params

  const products = useSelector(state => state.product.products)
  const [product, setProduct] = useState(products[0])
  const [count, setCount] = useState(1)
  const [price, setPrice] = useState(product.price)

  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>Добавление товара</Text>

      <View style={styles.productContainer}>
        <Picker
          selectedValue={product}
          onValueChange={p => setProduct(p)}
          mode="dropdown"
          style={styles.name}
        >
          {products.map((pr, i) => (
            <Picker.Item label={pr.name} value={pr} key={i} />
          ))}
        </Picker>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            keyboardType="numeric"
            onChange={e => setCount(+e.nativeEvent.text || 1)}
            style={styles.count}
          >
            {count}
          </TextInput>
          <Text style={styles.price}>{product.measure} </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <TextInput style={styles.price} >{price}</TextInput>
          <Text> грн.</Text>
        </View>
      </View>

      <Text style={styles.price}>Цена за единицу: {price} грн.</Text>
      <Text style={styles.price}>Общая сумма {price * count}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: Colors.mainBackgroundColor
  },
  title: {
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
    fontFamily: "roboto-regular",
    marginVertical: 10
  },
  name: {
    width: "50%",
    fontFamily: "roboto-regular",
    color: "#FFF",
    backgroundColor: Colors.color4
  },
  count: {
    backgroundColor: Colors.color4,
    color: "#fff"
  },
  price: {
    color: "#FFF"
  },
  editProducts: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  productContainer: {
    backgroundColor: Colors.color4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 15
  }
})
