import React from "react"
import { TextInput, Text, StyleSheet, Picker } from "react-native"
import Colors from "../../constants/colors"

export const AppPicker = props => {
  return (
    <Picker
      style={[ styles.default, props.style ]}
      {...props}
    >
      {props.children}
    </Picker>
  )
}

const styles = StyleSheet.create({
  default: {
    color: "#FFF",
    backgroundColor: Colors.color2,
    
  }
})
