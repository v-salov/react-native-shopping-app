import React from 'react'
import { Switch, View, Text } from 'react-native'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { useSelector, useDispatch } from 'react-redux'
import { MainScreen } from '../screens/main-screen'
import { CardScreen } from '../screens/card-screen'
import { CreateCardScreen } from '../screens/create-card-screen'
import { AddProductScreen } from '../screens/add-product-screen'
import { CreateProductScreen } from '../screens/create-product-screen'
import TestScreen from '../screens/test-screen'
import { getTheme } from '../theme'
import { MeasureModal } from '../modals/measure-modal'

const MainStack = createStackNavigator()
const RootStack = createStackNavigator()

export default function Nav() {
  const isDark = useSelector(state => state.theme.isDark)

  const theme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          ...getTheme(isDark)
        }
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          ...getTheme(isDark)
        }
      }
  const configOptions = {
    headerTitleStyle: {
      fontFamily: 'roboto-bold',
      textAlign: 'center'
    }
  }
  const screenOptions = {
    headerStyle: {
      borderWidth: 1,
      backgroundColor: theme.colors.background
    }
  }

  const MainStackScreen = () => (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen
        name="Home"
        component={MainScreen}
        options={{ title: 'Покупки' }}
      />
      <MainStack.Screen
        name="Card"
        component={CardScreen}
        options={{ title: 'Список покупок' }}
      />
      <MainStack.Screen
        name="CreateCard"
        component={CreateCardScreen}
        options={{ title: 'Создание карточки' }}
      />
      <MainStack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{ title: 'Добавление продукта' }}
      />
      <MainStack.Screen
        name="CreateProduct"
        component={CreateProductScreen}
        options={{ title: 'Создание продукта' }}
      />
    </MainStack.Navigator>
  )

  return (
    <AppearanceProvider>
      <NavigationContainer theme={theme}>
        <RootStack.Navigator
          initialRouteName="Main"
          mode="modal"
          screenOptions={screenOptions}
        >
          <RootStack.Screen
            headerMode="none"
            component={MainStackScreen}
            name="Main"
          />
          <RootStack.Screen
            name="Test"
            component={TestScreen}
            options={{
              title: 'ТЕСТ'
            }}
          />
          <RootStack.Screen name="Measure" component={MeasureModal} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  )
}
