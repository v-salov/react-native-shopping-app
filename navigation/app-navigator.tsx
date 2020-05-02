import React from 'react'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp,
  StackNavigationOptions
} from '@react-navigation/stack'
import { AppearanceProvider } from 'react-native-appearance'
import { useSelector } from 'react-redux'
import { MainScreen } from '../screens/main-screen'
import { CardScreen } from '../screens/card-screen'
import { CreateCardScreen } from '../screens/create-card-screen'
import { AddProductScreen } from '../screens/add-product-screen'
import { CreateProductScreen } from '../screens/create-product-screen'
import TestScreen from '../screens/test-screen'
import { useTheme } from '../theme'
import { ProductsModal } from '../modals/products-modal'
import { RootState } from '../store'
import { CreateStackParamList, MainStackParamList } from './params-lists'
import {Modal} from "../modals/modal";

const MainStack = createStackNavigator<MainStackParamList>()
const CreateStack = createStackNavigator<CreateStackParamList>()
const RootStack = createStackNavigator()

export default function Nav() {
  const { colors } = useTheme()
  const isDark = useSelector((state: RootState) => state.theme.isDark)
  const theme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          ...colors
        }
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          ...colors
        }
      }
  const screenOptions: StackNavigationOptions = {
    headerStyle: {
      borderWidth: 1,
      backgroundColor: colors.background
    },
    headerTitleStyle: {
      fontFamily: 'roboto-bold'
    },
    headerTitleAlign: 'center'
  }

  const MainStackScreen = () => (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen
        name="Home"
        component={MainScreen}
        options={{
          title: 'Покупки'
        }}
      />
      <MainStack.Screen
        name="Card"
        component={CardScreen}
        options={{ title: 'Список покупок' }}
      />
    </MainStack.Navigator>
  )

  const CreateStackScreen = () => (
    <CreateStack.Navigator screenOptions={screenOptions}>
      <CreateStack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{ title: 'Добавление продукта' }}
      />

      <CreateStack.Screen
        name="CreateCard"
        component={CreateCardScreen}
        options={{ title: 'Создание карточки' }}
      />

      <CreateStack.Screen
        name="CreateProduct"
        component={CreateProductScreen}
        options={{ title: 'Создание продукта' }}
      />

      <CreateStack.Screen
        name="Products"
        component={ProductsModal}
        options={{ headerShown: false }}
      />

    </CreateStack.Navigator>
  )

  return (

      <NavigationContainer theme={theme}>
        <RootStack.Navigator
          headerMode="none"
          initialRouteName="Test"
          screenOptions={screenOptions}
        >
          <RootStack.Screen
            name="Main"
            component={MainStackScreen}
            options={screenOptions}
          />

          <RootStack.Screen
            name="Create"
            component={CreateStackScreen}
            options={screenOptions}
          />

          <RootStack.Screen
            name="Test"
            component={TestScreen}
            options={{
              title: 'ТЕСТ'
            }}
          />
          <RootStack.Screen
            name="Modal"
            component={Modal}
            options={{
              title: 'Модальное окно'
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>

  )
}
