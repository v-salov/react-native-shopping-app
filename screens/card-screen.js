import React from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
  Picker
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import Swipeable from "react-native-gesture-handler/Swipeable"
import moment from "moment"
import { AppButton } from "../components/ui/app-button-plus"
import Colors from "../constants/colors"

import { editProductInCard, removeProductFromCard } from "../store/actions/cardProduct"

export const CardScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { cardId } = route.params

  const { name, date } = useSelector(state =>
    state.card.cards.find(c => c.id === cardId)
  )

  const cardProducts = useSelector(state => {
    return state.cardProduct.cardProducts.filter(
      ({ idCard }) => idCard === cardId
    )
  })

  const products = useSelector(state => state.product.products)

  const onRemoveProductFromCard = id => {
    Alert.alert(
      "Удаление продукта",
      "Вы действительно желаете продукт из карточки?",
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => dispatch(removeProductFromCard(id))
        }
      ],
      { cancelable: false }
    )
  }

  const onEditCount = (e, product) => {
    const count = +e.nativeEvent.text
    const newPr = { ...product, count }
    dispatch(editProductInCard(newPr))
  }

  const onEditPrice = (e, product) => {
    const price = +e.nativeEvent.text
    const newPr = { ...product, price }
    dispatch(editProductInCard(newPr))
  }

  const onEditName = (name, product) => {
    const newPr = { ...product, name}
    dispatch(editProductInCard(newPr))
  }

  const renderRightActions = () => {
    return (
      <View style={styles.leftAction}>
        <Text
          style={{
            color: "#fff",
            fontFamily: "roboto-regular",
            fontSize: 17
          }}
        >
          DEL
        </Text>
      </View>
    )
  }

  const renderProducts = product => {
    return (
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableRightWillOpen={() => onRemoveProductFromCard(product.id)}
        overshootRight={false}
      >
        <View style={styles.product}>
          <Picker
            selectedValue={product.name}
            style={styles.pickerStyle}
            mode="dropdown"
            onValueChange={name => onEditName(name, product)}
          >
            {products.map(p => (
              <Picker.Item
                label={p.name}
                value={p.name}
                key={p.id}
              ></Picker.Item>
            ))}
          </Picker>
          <TextInput
            style={styles.prod}
            keyboardType="numeric"
            onEndEditing={e => onEditCount(e, product)}
          >
            {product.count}
          </TextInput>
          <TextInput
            style={styles.prod}
            keyboardType="numeric"
            onEndEditing={e => onEditPrice(e, product)}
          >
            {product.price}
          </TextInput>
          <View style={{justifyContent: 'center'}}>
          <Text style={styles.prod}>{product.price * product.count} грн.</Text>
          </View>
        </View>
      </Swipeable>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={{ textAlign: "center", marginBottom: 10 }}>
        {moment(date).format("DD.MM.YY, h:mm:ss")}
      </Text>

      {cardProducts.length ? (
        <FlatList
          data={cardProducts}
          renderItem={({ item }) => renderProducts(item)}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <Text style={styles.title}>Добавить товары</Text>
      )}

      <AppButtonPlus
        onPress={() => navigation.navigate("AddProduct", { idCard:cardId })}
      />
      <View style={styles.totalPrice}>
        <Text style={styles.totalPriceText}>
          {cardProducts.reduce((total, item) => {
            return total + item.count * item.price
          }, 0)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 5
  },
  separator: {
    backgroundColor: Colors.separatorColor,
    height: StyleSheet.hairlineWidth
  },

  title: {
    textAlign: "center",
    fontFamily: "roboto-bold",
    fontSize: 18,
    color: "white"
  },
  date: {
    color: "white"
  },
  headerTable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  headerProduct: {},

  product: {
    backgroundColor: Colors.color4,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10
  },
  prod: {
    fontFamily: "roboto-regular",
    fontSize: 17,
    fontWeight: "500",
    color: "#FFF",
    textAlign: "center"
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(110,110,110,0.1)",
    borderRadius: 4,
    height: 30,
    minWidth: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  leftAction: {
    backgroundColor: "red",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50
  },
  rightAction: {
    backgroundColor: "#57ff1f",
    borderRadius: 5,
    height: 37,
    top: 7
  },
  actionText: {
    padding: 10,
    color: "#fff",
    fontFamily: "roboto-regular"
  },
  totalPrice: {
    position: "absolute",
    bottom: 10,
    left: 20
  },
  totalPriceText: {
    color: "white"
  },
  pickerStyle: {
    width: "33%",
    color: "white",
    backgroundColor: Colors.color4
  }
})
