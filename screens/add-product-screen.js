import React, {useState} from "react"

import {Picker, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native"
import {useDispatch, useSelector} from "react-redux"
import {editProductInCard} from "../store/actions/cardProduct"
import {AppText} from "../components/ui/text/app-text"
import Colors from "../constants/colors"
import {AppButton} from "../components/ui/app-button"
import {AppContainer} from "../components/ui/app-container"
import {AppNum, AppNumInput, AppTextInput} from "../components";

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
    <View style={styles.container}>
      <AppText style={styles.title}>Добавление товара</AppText>

      <View style={styles.productContainer}>
        <Picker
          selectedValue={product}
          onValueChange={p => setProduct(p)}
          mode="dropdown"
          style={{width: '80%', marginRight: 10}}
        >
          {products.map((pr, i) => (
            <Picker.Item label={pr.name} value={pr} key={pr.id} />
          ))}
        </Picker>
        <AppButton
          style={{width: 40}}
          onPress={() => navigation.navigate("CreateProduct")}
        >
          <AppText>+</AppText>
        </AppButton>


      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AppNumInput
          keyboardType="numeric"
          onChange={e => setCount(+e.nativeEvent.text || 1)}
          style={styles.count}
        >
          {count}
        </AppNumInput>
        <AppText>{product.measure} </AppText>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
        >
          <AppTextInput
            keyboardType="numeric"
            onChange={e => setPrice(+e.nativeEvent.text || 1)}
            style={styles.text}
          >
            {price}
          </AppTextInput>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "flex-start"
  },
  title: {
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
    fontFamily: "roboto-regular",
    marginVertical: 10
  },

  editProducts: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  productContainer: {
    width: '100%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 15
  },

})
