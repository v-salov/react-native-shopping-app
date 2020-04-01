import React from 'react'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppearanceProvider } from 'react-native-appearance'
import { useSelector } from 'react-redux'
import { MainScreen } from '../screens/main-screen'
import { CardScreen } from '../screens/card-screen'
import { CreateCardScreen } from '../screens/create-card-screen'
import { AddProductScreen } from '../screens/add-product-screen'
import { CreateProductScreen } from '../screens/create-product-screen'
import TestScreen from '../screens/test-screen'
import { getTheme } from '../theme'
import { ProductsModal } from '../modals/products-modal'

const MainStack = createStackNavigator()
const CreateStack = createStackNavigator()
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
    },
    headerTitleStyle: {
      fontFamily: 'roboto-bold'
    },
    headerTitleAlign: 'center'
  }

  const screenOptionsModal = {
    cardStyle: { backgroundColor: 'transparent' },
    cardOverlayEnabled: true,
    cardStyleInterpolator: ({ current: { progress } }) => ({
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.5, 0.9, 1],
          outputRange: [0, 0.25, 0.7, 1]
        })
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.75],
          extrapolate: 'clamp'
        })
      }
    })
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
        options={{headerShown: false}}
      />
    </CreateStack.Navigator>
  )

  return (
    <AppearanceProvider>
      <NavigationContainer theme={theme}>
        <RootStack.Navigator
          headerMode="none"
          initialRouteName="Main"
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
        </RootStack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  )
}
