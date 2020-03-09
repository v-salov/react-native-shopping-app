import React from "react"
import { TextInput, Text, StyleSheet } from "react-native"
import Colors from "../../constants/colors"

export const AppInput = props => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={Colors.color1}
      style={[styles.input, props.style ]}

    ></TextInput>
  )
}

const styles = StyleSheet.create({
  input: {
    color: "#FFF",
    backgroundColor: Colors.color2,
    fontFamily: "roboto-regular",
    fontSize: 16,
    borderWidth: 1,
    borderBottomColor: Colors.color7,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 5
  }
})
