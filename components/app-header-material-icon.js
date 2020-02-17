import React from 'react'
import { Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../constants/colors'

export const AppHeaderMaterialIcon = props => (
  <HeaderButton
    {...props}
    iconSize={24}
    IconComponent={MaterialIcons}
    color={Platform.OS === 'android' ? '#fff' : Colors.mainColor}
  />
)
