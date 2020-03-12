import React, { useState } from 'react'
import { View, StyleSheet, Text,  } from 'react-native'
import {
  TextField,
  FilledTextField,
  OutlinedTextField
} from 'react-native-material-textfield'
import { RaisedTextButton, TextButton } from 'react-native-material-buttons'
import { useTheme } from '@react-navigation/native'
import {AppTextInput} from '../components'

export default ({ navigation }) => {
  const { colors } = useTheme()
  const [text, setText] = useState('222222')
  const formatText = (text) => {
    return text.replace(/[^.\d]/g, '');
  }
  return (
    <View style={styles.container}>
      {/* <View style={{ width: '50%' }}>
        <TextField
          keyboardType="phone-pad"
          value={text}
          onChangeText={setText}
          textColor={colors.text}
        />
      </View> */}
        
      <View>
      <AppTextInput value={text} onChangeText={setText}/>

      
      </View>

      <View>
        <RaisedTextButton
          title="touch"
          onPress={() => console.log(2222)}
          color="grey"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
