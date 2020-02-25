import React from "react"
import { View, StyleSheet } from "react-native"
import Colors from "../../constants/colors"
export const AppContainer = props => {
  return (
    <View style={{...styles.container, ...props.style}}>{props.children}</View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackgroundColor
  }
})
