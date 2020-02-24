import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Picker, CheckBox,
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
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Добавление товара</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems:'center',
            marginBottom: 15
          }}
        >
          <Picker
            selectedValue={product}
            onValueChange={p => setProduct(p)}
            style={{ width: "50%" }}
          >
            {products.map((pr, i) => (
              <Picker.Item label={pr.name} value={pr} key={i} />
            ))}
          </Picker>

          

         
            <TextInput
              keyboardType="numeric"
              onChange={e=>setCount(+e.nativeEvent.text || 1)}
            >
              {count}
            </TextInput>
          
          <View>
            <Text>{price} грн.</Text>
          </View>
        </View>

        {/* <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text>Избранное: </Text>
          <CheckBox
            style={{ margin: 0 }}
            checked={done}
            onPress={() => setDone(!done)}
          />
        </View> */}

        {/* <Button
          title="Create"
          color={Colors.tintColor}
          onPress={saveHandler}
          disabled={!(product && product.count)}
        /> */}
      </View>
      <View>
        <Text>Цена за единицу: {price} грн.</Text>
        <Text>Общая сумма {price * count}</Text>
      </View>
    </ScrollView>
  )
}



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
