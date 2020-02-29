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
import { editProductInCard } from "../store/actions/cardProduct"
import { AppText } from "../components/ui/app-text"
import Colors from "../constants/colors"
import { AppButton } from "../components/ui/app-button"
import { AppContainer } from "../components/ui/app-container"

export const AddProductScreen = ({ navigation, route }) => {
  const { idCard } = route.params
  const dispatch = useDispatch()

  const products = useSelector(state => state.product.products)
  const [product, setProduct] = useState(products[0])
  const [count, setCount] = useState(1)
  const [price, setPrice] = useState(product.price)

  const save = () => {
    const cardProduct = {
      idCard,
      idProduct: product.id,
      measure: product.measure,
      count,
      price,
      done: false
    }
    dispatch(editProductInCard(cardProduct))
    navigation.goBack()
  }

  return (
    <AppContainer style={styles.wrapper}>
      <Text style={styles.title}>Добавление товара</Text>

      <View style={styles.productContainer}>
        <Picker
          selectedValue={product}
          onValueChange={p => {setProduct(p); setPrice(p.price)}}
          mode="dropdown"
          style={styles.name}
        >
          {products.map((pr, i) => (
            <Picker.Item label={pr.name} value={pr} key={pr.id} />
          ))}
        </Picker>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateProduct")}
        >
          <AppText>+</AppText>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            keyboardType="numeric"
            onChange={e => setCount(+e.nativeEvent.text || 1)}
            style={styles.count}
          >
            {count}
          </TextInput>
          <Text style={styles.text}>{product.measure} </Text>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
        >
          <TextInput
            keyboardType="numeric"
            onChange={e => setPrice(+e.nativeEvent.text || 1)}
            style={styles.text}
          >
            {price}
          </TextInput>
          <Text style={styles.text}> грн.</Text>
        </View>
      </View>
      <View style={{ alignSelf: "flex-start" }}>
        <AppText>Цена за единицу: {price} грн.</AppText>
        <AppText>Общая сумма {price * count}</AppText>
      </View>

      <AppButton style={{ marginVertical: 10 }} onPress={save}>
        Сохранить
      </AppButton>
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: Colors.mainBackgroundColor,
    alignItems: "center"
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
    backgroundColor: Colors.color4,
    flex: 1
  },
  count: {
    backgroundColor: Colors.color4,
    color: "#fff"
  },
  text: {
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
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.color7,
    alignItems: "center",
    width: 25,
    marginRight: 10
  }
})
