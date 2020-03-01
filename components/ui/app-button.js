import React from "react";
import { useTheme } from '@react-navigation/native';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native'
import Colors from "../../constants/colors";
export const AppButton = (props) => {
  const { colors } = useTheme();

  return (
      <TouchableOpacity {...props} style={[styles.button, props.style]} activeOpacity={0.7}>
        <Text style={{color: colors.text}}>{props.children}</Text>
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
