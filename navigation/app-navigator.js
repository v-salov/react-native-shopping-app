import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { MainScreen } from "../screens/main-screen"
import { CardScreen } from "../screens/card-screen"
import { CreateCardScreen } from "../screens/create-card-screen"
import { AddProductScreen } from "../screens/add-product-screen"
import Colors from "../constants/colors"

const Stack = createStackNavigator()

function getHeaderTitle(route) {
  // Access the tab navigator's state using `route.state`
  const routeName = route.state
    ? // Get the currently active route name in the tab navigator
      route.state.routes[route.state.index].name
    : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
      // In our case, it's "Feed" as that's the first screen inside the navigator
      route.params?.screen || "CreateCard"

  switch (routeName) {
    case "CreateCard":
      return "Создание новой покупки"
    case "Profile":
      return "My profile"
  }
}

const configOptions = {
  headerStyle: {
    backgroundColor: Colors.mainBackgroundColor
  },
  headerTintColor: Colors.mainColor,
  headerTitleStyle: {
    fontFamily: "roboto-bold",
    textAlign: "center"
  }
}

export default function() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Покупки"
          component={MainScreen}
          options={configOptions}
        />
        <Stack.Screen
          name="Card"
          component={CardScreen}
          options={configOptions}
        />
        <Stack.Screen
          name="CreateCard"
          component={CreateCardScreen}
          options={configOptions}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProductScreen}
          options={configOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
