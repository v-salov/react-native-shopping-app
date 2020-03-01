import { AppLoading } from 'expo'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import AppNavigator from './navigation/app-navigator'
import { PersistGate } from 'redux-persist/integration/react'
import {
  handleFinishLoading,
  handleLoadingError,
  loadResourcesAsync
} from './bootstrap'
import { store, persistor } from './store'
import { useTheme } from '@react-navigation/native'

export default function App(props) {
  const { colors } = useTheme()
  const [isLoadingComplete, setLoadingComplete] = useState(false)

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
          <View style={styles.container}>
            <AppNavigator />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  }
})
