import {Asset} from "expo-asset";
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";

export async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in main-screen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'roboto-bold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
      'roboto-italic': require('./assets/fonts/RobotoCondensed-Italic.ttf'),
      'roboto-light': require('./assets/fonts/RobotoCondensed-Light.ttf'),
      'roboto-regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
      'eczar-regular': require('./assets/fonts/Eczar-Regular.ttf'),
      'eczar-bold': require('./assets/fonts/Eczar-Bold.ttf'),
      'eczar-medium': require('./assets/fonts/Eczar-Medium.ttf')
    }),
  ]);
}

export function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

export function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}
