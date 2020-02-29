import React, { useState } from "react"
import { View, Text, StyleSheet, Alert } from "react-native"
import { CustomPicker } from 'react-native-custom-picker'


export default () => {
  const options = ['One', 'Two', 'Three', 'Four', 'Five']
  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <CustomPicker
          options={options}
          onValueChange={value => {
            console.log(value)
          }}
          containerStyle={{backgroundColor:'#FFF'}}
          style={{color: 'white', width: 100}}
          modalStyle={{backgroundColor: 'black', color: 'white'}}
          textStyle={{color:'white'}}
          backdropStyle={{color: 'white'}}
        />
      </View>
  )
}
