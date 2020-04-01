import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {AppText} from "./ui/text/app-text";

export const AppListItem = ({item, onSelected}) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity  onPress={()=>onSelected(item.id)}>
        <AppText>{item.name}</AppText>
    </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: '100%'
  }
})
