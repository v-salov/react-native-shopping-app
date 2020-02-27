import React from "react";
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native'
import Colors from "../../constants/colors";

export const AppButton = (props) => {
  return (
      <TouchableOpacity {...props} style={[styles.button, props.style]} activeOpacity={0.7}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "30%",
    borderWidth: 1,
    borderColor: Colors.color4,
    backgroundColor: Colors.color5,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: "white",
    textTransform: "uppercase",
    textAlign: "center"
  }
})
