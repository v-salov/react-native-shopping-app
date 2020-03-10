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

const Stack = createStackNavigator()

export default function() {
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
  return (
    <AppearanceProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerStyle: {
            borderWidth: 1,
            borderBottomColor: 'rgba(255, 255, 255, 0.38)'
          },
        }}>
          <Stack.Screen
            name="Home"
            component={MainScreen}
            options={{ title: 'Покупки' }}
          />
          <Stack.Screen
            name="Card"
            component={CardScreen}
            options={{ title: 'Список покупок' }}
          />
          <Stack.Screen
            name="CreateCard"
            component={CreateCardScreen}
            options={{ title: 'Создание карточки' }}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{ title: 'Добавление продукта' }}
          />
          <Stack.Screen
            name="CreateProduct"
            component={CreateProductScreen}
            options={{ title: 'Создание продукта' }}
          />
          <Stack.Screen
            name="Test"
            component={TestScreen}
            options={{
              title: 'ТЕСТ'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  )
}
