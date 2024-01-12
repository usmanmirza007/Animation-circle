import { View, Text, Animated, PanResponder } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

const Options = () => {
  const [animationComplet, setAnimationComplete] = useState(false)

  const position = new Animated.ValueXY({ x: 0, y: 0 })
  const opacity = useRef(new Animated.Value(0)).current;  
  // useEffect(() => {
    // Animated.timing(position, {
    //   toValue: { x: 200, y: 500 },
    //   duration: 2000
    // }).start(() => {
    //   position.setValue({ x: 0, y: 0 });
    // })

  // }, [])
  const routate = position.x.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg']
  })
  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gesture) => {
      position.setValue({x: gesture.dx, y: gesture.dy})
    },
    // onPanResponderMove: Animated.event([
    //   null,
    //   {dx: position.x, dy: position.y}
    // ]),
    onPanResponderRelease: () => {
      position.setValue({x: 0, y: 0})
    }
  })
  // useEffect(() => {
  //   // Start the animation when the component mounts
  //   Animated.timing(opacity, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Text>Option</Text> */}

      <Animated.View {...pan.panHandlers} style={[{
        marginTop: 40,
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        transform: [
        {translateX: position.x},
        {translateY: position.y},
        {rotate: routate}
        ]
      }
        ]}>

        <Text>Notification</Text>
      </Animated.View>
    </View>
  )
}

export default Options