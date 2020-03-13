import React, {useState, useRef} from 'react'
import { Text, View, TextInput, Button, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { AppTextInput } from '../components'
export default ({ navigation }) => {
  const { register, setValue, handleSubmit, errors } = useForm()
  const [text, setText] = useState('')
const value = useRef()
  const onEdit = e => {
    console.log(value.current)
  }
  
  return (
    <View>
      <AppTextInput
        ref={value}
        onChangeText={onEdit}
        
        style={{
          borderWidth: text.length<3 ? 1 : 0,
          borderBottomColor: text.length<3 ? 'red' : 'black'
        }}
      />
    </View>
  )
}
