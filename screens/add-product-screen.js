import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView
} from "react-native"
import { Picker, CheckBox, Input, Label, Item } from "native-base"
import { useDispatch, useSelector } from "react-redux"
import { HeaderButtons, Item as I } from "react-navigation-header-buttons"
import { addCard, addProductToCard } from "../store/actions/card"
import Colors from "../constants/colors"
import { AppHeaderIcon } from "../components/app-header-icon"
import { TouchableOpacity } from "react-native-gesture-handler"

export const AddProductScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.product.products)
  const id = navigation.getParam("id")
  const cardProduct = navigation.getParam("cardProduct")
  const tempProduct = cardProduct
    ? products.find(p => p.id === cardProduct.id)
    : products[0]

  const [product, setProduct] = useState(tempProduct)
  const [count, setCount] = useState(
    cardProduct ? cardProduct.count.toString() : "1"
  )
  const [done, setDone] = useState(cardProduct ? cardProduct.done : false)

  const saveHandler = () => {
    const productCard = {
      id: product.id,
      count: +count,
      done
    }
    const idTemp = cardProduct ? cardProduct.idTemp : null
    dispatch(addProductToCard(productCard, id, idTemp))
    navigation.replace("Card", { cardId: id })
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          {cardProduct ? "Изменение" : "Добавление"} товара
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginBottom: 15
          }}
        >
          <Picker
            selectedValue={product}
            onValueChange={product => setProduct(product)}
            style={{ width: "50%" }}
          >
            {products.map((pr, i) => (
              <Picker.Item label={pr.name} value={pr} key={i} />
            ))}
          </Picker>

          <TouchableOpacity
            onPress={() => navigation.navigate("AddProduct")}
            style={{
              backgroundColor: Colors.tintColor,
              width: 25,
              height: 25,
              borderRadius: 5,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 5
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "roboto-bold",
                fontSize: 17,
                color: "#fff"
              }}
            >
              +
            </Text>
          </TouchableOpacity>

          <Item floatingLabel>
            <Label>Количество {product && product.measure}</Label>
            <Input
              keyboardType="numeric"
              value={count}
              onChangeText={c => setCount(c)}
            />
          </Item>
          <View>
            <Text>{product.price} грн.</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text>Избранное: </Text>
          <CheckBox
            style={{ margin: 0 }}
            checked={done}
            onPress={() => setDone(!done)}
          />
        </View>

        <Button
          title={cardProduct ? "Изменить" : "Создать"}
          color={Colors.tintColor}
          onPress={saveHandler}
          disabled={!(product && count)}
        />
      </View>
      <View>
        <Text>Цена за единицу: {product.price} грн.</Text>
        <Text>Общая сумма {count && product.price * count}</Text>
      </View>
    </ScrollView>
  )
}

AddProductScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: `${
    navigation.getParam("cardProduct") ? "Изменить" : "Добавить"
  } товары`,
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <I
        title="Toggle Drawer"
        iconName="md-arrow-back"
        onPress={() => navigation.goBack()}
      />
    </HeaderButtons>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "roboto-regular",
    marginVertical: 10
  },
  name: {
    padding: 10,
    marginBottom: 10
  },
  editProducts: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
