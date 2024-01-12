import { View, Text, Animated, StatusBar } from 'react-native'
import React from 'react'

const Notification = () => {
  const position = new Animated.ValueXY({x:0,y:0})
  Animated.timing(position, {
    toValue: {x: 200, y: 500}
  }).stop()
  return (
    <View style={{}}>
      <Text>Notification</Text>

      <Animated.View style={{
        marginTop: 40,
        height: 80,
        width: 80,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: 'red',
         transform: [{
          translateX: position.x
         }]
      }}>

      <Text>Notification</Text>
      </Animated.View>
    </View>
  )
}

export default Notification