import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/actions/theme'
import { Dropdown } from 'react-native-material-dropdown'
import { categories } from '../data'
import {useTheme} from "@react-navigation/native";

export const MeasureModal = ({ navigation }) => {
  const  {colors} = useTheme()
  const dispatch = useDispatch()
  const isDark = useSelector(state => state.theme.isDark)



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '100%' }}>
        <Dropdown
          data={categories}
          value={categories[0].name}
          valueExtractor={({name})=>name}
          onChangeText={value => {
            console.log(value)
          }}
          fontSize={18}
          itemTextStyle={{fontFamily: 'roboto-light'}}
          baseColor={colors.primary}
          textColor='white'
          itemColor={'white'}
          selectedItemColor='white'
          pickerStyle={{backgroundColor: colors.background}}
        />
      </View>
    </View>
  )
}
