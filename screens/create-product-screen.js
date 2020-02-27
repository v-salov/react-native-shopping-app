import React, { useState } from "react"
import {
  View,
  Text,
  Button,
  Picker,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { AppContainer } from "../components/ui/app-container"

import { createProduct } from "../store/actions/product"
import Colors from "../constants/colors"

export const CreateProductScreen = ({ navigation }) => {
  const measures = useSelector(state => state.product.measures)
  const categories = useSelector(state => state.product.categories)
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [measure, setMeasure] = useState(measures[0])

  const save = () => {
    const product ={
      name,
      price: +price,
      category: category.name,
      measure: measure.name,
    }
    dispatch(createProduct(product))
    navigation.goBack()
  }

  return (
    <AppContainer style={{ alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10
        }}
      >
        <TextInput
          placeholder="Введите название продукта"
          value={name}
          onChangeText={setName}
          style={[styles.input, {flex: 1}]}
        />

        <TextInput
          placeholder="Цена"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
          style={[styles.input, { width: "15%" }]}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10
        }}
      >
        <Text style={styles.pickerText}>Категория: </Text>

        <Picker
          selectedValue={category}
          onValueChange={c => setCategory(c)}
          mode="dropdown"
          style={styles.pickerCategory}
        >
          {categories.map((c, i) => (
            <Picker.Item label={c.name} value={c} key={i} />
          ))}
        </Picker>
        <Text style={styles.pickerText}>ед: </Text>

        <Picker
          selectedValue={measure}
          onValueChange={m => setMeasure(m)}
          mode="dropdown"
          style={styles.pickerMeasure}
        >
          {measures.map((m, i) => (
            <Picker.Item label={m.name} value={m} key={i} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        onPress={save}
        activeOpacity={0.7}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Сохранить</Text>
      </TouchableOpacity>
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  input: {
    color: "#FFF",
    backgroundColor: Colors.color2,
    fontFamily: "roboto-regular",
    fontSize: 16,
    borderWidth: 1,
    borderBottomColor: Colors.color7,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  pickerText: {
    fontFamily: "roboto-regular",
    fontSize: 16,
    color: "#FFF"
  },
  pickerMeasure: {
    color: "#FFF",
    backgroundColor: Colors.color4,
    width: 50
  },
  pickerCategory: {
    color: "#FFF",
    backgroundColor: Colors.color4,
    width: 200,
    marginRight: 10
  },
  button: {
    width: "30%",
    borderWidth: 1,
    borderColor: Colors.color4,
    backgroundColor: Colors.color5,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: "white",
    textTransform: "uppercase",
    textAlign: "center"
  }
})
