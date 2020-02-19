import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { CheckBox} from "native-base";
import {removeProductFromCard} from '../store/actions/card'
import Swipeable from "react-native-gesture-handler/Swipeable";
import moment from "moment";

import { AppHeaderIcon } from "../components/app-header-icon";
import { AppButton } from "../components/app-button";
import { AppHeaderMaterialIcon } from "../components/app-header-material-icon";

export const CardScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  
  const {cardId} = route.params;
  const cardProducts = useSelector(state => {
    return state.product.cardProducts.filter(({idCard}) => idCard === cardId)
  })

  console.log('CARDPRODUCTS in CARD', card)

  const renderLeftActions = () => {
    return (
      <View style={styles.leftAction}>
        <Text
          style={{ color: "#fff", fontFamily: "roboto-regular", fontSize: 17 }}
        >
          DEL
        </Text>
      </View>
    );
  };

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
    );
  };

  const renderProducts = product => {
    return (
      <Swipeable
        renderLeftActions={renderLeftActions}
        onSwipeableLeftWillOpen={() => onRemoveProductFromCard(product.idTemp)}
        overshootLeft={false}
      >
        <TouchableOpacity activeOpacity={0.9}  onPress={() => navigation.navigate("CreateProduct", { id: cardId, cardProduct: product })}>
        <View style={styles.product}>
          <CheckBox style={{ margin: 0 }} checked={product.done} />
          <Text style={styles.prodName}>{product.name}</Text>
          <Text>
            {product.count} {product.measure}
          </Text>
          <Text>{product.price} грн.</Text>
          <Text>{product.price * product.count} грн.</Text>
        </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cardName}</Text>
      <Text style={{ textAlign: "center", marginBottom: 10 }}>
        {moment(date).format("DD.MM.YY, h:mm:ss")}
      </Text>

      {cardProducts.length ? (
        <FlatList
          data={cardProducts}
          renderItem={({ item }) => renderProducts(item)}
          keyExtractor={item => item.idTemp}
        />
      ) : (
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Добавить товары
        </Text>
      )}

      <AppButton
        onPress={() => navigation.navigate("CreateProduct", { id: cardId })}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4",
    padding: 5
  },
  title: {
    textAlign: "center",
    fontFamily: "roboto-bold",
    fontSize: 18
  },
  date: {},
  headerTable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  headerProduct: {},

  product: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.8,
    elevation: 2
  },
  prodName: {
    fontFamily: "roboto-bold",
    fontSize: 17,
    fontWeight: "500",
    color: "#454D65",
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
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 38,
    top: 6
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
});
