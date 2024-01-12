import { View, Text, FlatList, TouchableOpacity, Image, Animated } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Wallet = () => {
  const insets = useSafeAreaInsets()
  const scrollY = new Animated.Value(0)
  const diffClap = Animated.diffClamp(scrollY, 0, 50)
  const translateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50]
  })
  return (
    <View style={{ paddingTop: insets.top,  }}>
      <Animated.View
        style={{
          transform: [
            {translateY: translateY}
          ],
          flexDirection: "row",
          justifyContent: "center",
          height: 50,
          backgroundColor: 'red',
          alignItems: "center",
        }}>
        <TouchableOpacity
          style={{ position: "absolute", left: 0 }}
          hitSlop={{ top: 30, right: 30, left: 30, bottom: 30 }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../assets/icon1.png')}
            resizeMode={"contain"}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
        <Text

          style={{
            color: 'black',
            fontSize: 18,
            width: 'auto'
          }}>{'Wallet'}</Text>
      </Animated.View>
      <FlatList
        onScroll={(e) => {
         scrollY.setValue(e.nativeEvent.contentOffset.y) 
        }}
        renderItem={({ }) => {
          return (
            <View style={{ height: 60 }}>

              <Text>Test</Text>
            </View>
          )
        }}
        data={[1, 2, 3, 4, 5, 5, 6, 3, 2, 2, 1, 2, 2, 2, 2]}
      />
    </View>
  )
}

export default Wallet