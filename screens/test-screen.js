import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import { AnimatedCircularProgress } from 'react-native-circular-progress'

export default ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={50}
        width={10}
        fill={100}
        tintColor="#00e0ff"
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875"
      />
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

{
  /* <CircularProgress
        percent={0}
        radius={100}
        bgRingWidth={10}
        progressRingWidth={20}
        ringColor={'#3498db'}
        ringBgColor={'grey'}
        textFontSize={40}
        clockwise={true}
        bgColor={'white'}
        startDegrees={0}
      ></CircularProgress> */
}
