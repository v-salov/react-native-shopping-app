import React from "react"
import {Switch, View, Text} from 'react-native'
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { AppearanceProvider, useColorScheme, Appearance} from 'react-native-appearance';
import {useSelector, useDispatch} from 'react-redux'
import { MainScreen } from "../screens/main-screen"
import { CardScreen } from "../screens/card-screen"
import { CreateCardScreen } from "../screens/create-card-screen"
import { AddProductScreen } from "../screens/add-product-screen"
import { CreateProductScreen } from "../screens/create-product-screen"
import TestScreen from '../screens/test-screen'
import {colors, themedColors} from '../theme'







const Stack = createStackNavigator()

export default function() {
  const mode = useSelector(state=> state.theme.mode)

  const theme = mode === 'dark' ? DarkTheme : DefaultTheme

  // const configOptions = {
  //   headerStyle: {
  //     backgroundColor: themedColors.primaryBackground.dark
  //   },
  //   headerTintColor: themedColors.primaryText.light,
  //   headerTitleStyle: {
  //     fontFamily: "roboto-bold",
  //     textAlign: "center"
  //   }
  // }
  return (
    <AppearanceProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName="Test" >
          <Stack.Screen
            name="Home"
            component={MainScreen}
            options={{title: 'Покупки'}}
          />
          <Stack.Screen
            name="Card"
            component={CardScreen}
            options={{title: 'Список покупок'}}
          />
          <Stack.Screen
            name="CreateCard"
            component={CreateCardScreen}
            options={{title:'Создание карточки'}}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{title:'Добавление продукта'}}

          />
          <Stack.Screen
            name="CreateProduct"
            component={CreateProductScreen}
            options={{title:'Создание продукта'}}

          />
          <Stack.Screen
            name="Test"
            component={TestScreen}
            options={{
              title: 'ТЕСТ',

            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  )
}
