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
import { AppButtonPlus } from "../components/ui/app-button-plus"
import Colors from "../constants/colors"
import {useTheme} from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';

import { editProductInCard, removeProductFromCard } from "../store/actions/cardProduct"

export const CardScreen = ({ navigation, route }) => {
  const {colors} = useTheme()
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

  const onEditProduct = (value, product, op) => {
    let newPr
    if (op === "count") newPr = {...product, count: +value}
    else if (op === "price") newPr = {...product, price: +value}
  }

  const onEditName = (p, product) => {
    const newPr = { ...product, price: p.price, measure:p.measure, idProduct: p.id }
    dispatch(editProductInCard(newPr))
  }

  const renderRightActions = () => {
    return (
      <View style={[styles.action, {backgroundColor: colors.buttonDanger}]}>
        <Ionicons name="ios-trash" size={32} color="white" />
      </View>
    )
  }

  const renderProducts = product => {
    const selectedValue = products.find(pr => pr.id === product.idProduct)
    return (
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableRightWillOpen={() => onRemoveProductFromCard(product.id)}
        overshootRight={false}
      >
        <View style={[styles.product, {backgroundColor: colors.cardProduct}]}>
          <Picker
            selectedValue={selectedValue}
            style={styles.pickerStyle}
            mode="dropdown"
            onValueChange={p => onEditName(p, product)}
          >
            {products.map(p => (
              <Picker.Item
                label={p.name}
                value={p}
                key={p.id}
              ></Picker.Item>
            ))}
          </Picker>
          <TextInput
            style={styles.prod}
            keyboardType="numeric"
            onEndEditing={e => onEditProduct(e.nativeEvent.text, product, 'count')}
          >
            {product.count}
          </TextInput>
          <TextInput
            style={styles.prod}
            keyboardType="numeric"
            onEndEditing={e => onEditProduct(e.nativeEvent.text, product, 'price')}

          >
            {product.price}
          </TextInput>
          <View style={{justifyContent: 'center'}}>
          <Text style={styles.prod}>{product.price * product.count} грн</Text>
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
    padding: 5
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
  action: {
    justifyContent: "center",
    alignItems: "center",
    width: 50
  },

  actionText: {
    fontFamily: "roboto-regular",
    fontSize: 16
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
