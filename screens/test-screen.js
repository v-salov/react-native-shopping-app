import React, {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';

export default () => {
  const [listViewData, setListViewData] = useState([
    'Привет', 'Как дела?'
    ])
  return (
    <SwipeListView
      data={listViewData}
      renderItem={ (data, rowMap) => (
        <View style={styles.rowFront} key={data.item}>
          <Text>I am {data.item} in a SwipeListView</Text>
        </View>
      )}
      keyExtractor={data=>data.item}

      renderHiddenItem={ (data, rowMap) => (
        <View style={styles.rowBack}>
          <Text>Left</Text>
          <Text>Right</Text>
        </View>
      )}
      leftOpenValue={75}
      rightOpenValue={-75}
    />
  )

}
const styles = StyleSheet.create({
  rowFront: {

  },
  rowBack: {

  }
})
