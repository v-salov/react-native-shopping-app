import React from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  TextInput
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { CheckBox } from "native-base"
import Swipeable from "react-native-gesture-handler/Swipeable"
import moment from "moment"
import { AppButton } from "../components/app-button"
import Colors from "../constants/colors"

export const CardScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { cardId } = route.params

  const { name, date } = useSelector(state =>
    state.card.cards.find(c => c.id === cardId)
  )

  const cardProducts = useSelector(state => {
    return state.cardProduct.cardProducts.filter(({ idCard }) => idCard === cardId)
  })

  const onRemoveProductFromCard = id => {
    Alert.alert(
      "Удаление продукта",
      "Вы действительно желаете продукт из карточки?",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Вы отменили удаление"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => dispatch(removeProductFromCard(id, card.id))
        }
      ],
      { cancelable: false }
    )
  }

  const onEditCardProduct = (e, id) => {
    const value = e.nativeEvent.text
    console.log(value, id)
  }

  const renderLeftActions = () => {
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
        renderLeftActions={renderLeftActions}
        onSwipeableLeftWillOpen={() => onRemoveProductFromCard(product.id)}
        overshootLeft={false}
      >
        <View style={styles.product}>
          <CheckBox style={{ margin: 0 }} checked={product.done} />
          <Text style={styles.prod}>{product.name}</Text>
          <TextInput style={styles.prod} onEndEditing={(e)=>onEditCardProduct(e,product.id)}>
            {product.count}
          </TextInput>
          <Text style={styles.prod}>{product.price} грн.</Text>
          <Text style={styles.prod}>{product.price * product.count} грн.</Text>
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

      <AppButton
        onPress={() => navigation.navigate("CreateProduct", { id: cardId })}
      />
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
    padding: 10,
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
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 1.5,
    // elevation: 1
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
  }
})
