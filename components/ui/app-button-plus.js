import React from "react";
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import {Entypo} from "@expo/vector-icons";
import Colors from "../../constants/colors";

export const AppButtonPlus = (props) => {
  return (
      <TouchableOpacity {...props} style={styles.button} activeOpacity={0.7}>
        <Entypo name='plus' size={30} color={'white'}/>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    borderRadius: 50,
    backgroundColor: Colors.buttonColor,
    padding: 10,
  }
})
