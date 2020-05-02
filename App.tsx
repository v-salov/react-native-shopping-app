import { AppLoading } from "expo"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Provider } from "react-redux"
import AppNavigator from "./navigation/app-navigator"
import { PersistGate } from "redux-persist/integration/react"
import {
  handleFinishLoading,
  handleLoadingError,
  loadResourcesAsync
} from "./bootstrap"
import { store, persistor } from "./store"
import { useTheme } from "@react-navigation/native"
import {ThemeColorsType} from "./navigation/app-navigator";


export default function App(props: { skipLoadingScreen: boolean }) {
  const { colors } = useTheme()
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false)

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    )
  } else {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={{ flex: 1, backgroundColor: colors.background }}>
            <AppNavigator />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}
