import React, {useState} from "react"
import { View,TouchableOpacity, StyleSheet } from "react-native"
import Colors from "../../constants/colors"
import {AppText} from "./text/app-text";

export const AppPicker = ({value, data, onChangeText, route, navigation}) => {
  const [text, setText] = useState(value)
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('Products')}>
      <AppText style={{textAlign: 'left'}}>{text}</AppText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  default: {
    color: "#FFF",
    backgroundColor: Colors.color2,
    
  }
})
