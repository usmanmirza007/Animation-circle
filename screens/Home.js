import { View, Text, StyleSheet, StatusBar, Image,TouchableOpacity,Dimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
const { width,height } = Dimensions.get('window')

const Home = ({navigation}) => {

  return (
    <View style={styles.mainContainer}>
      <StatusBar style="auto" />
      <View style={styles.square}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", top: 20, marginHorizontal: 20 }}>
          <Image source={require('../assets/icon1.png')}
            style={{ height: height/20, width: width/10, }}
          />
          <Icon name="notifications" size={25} color="black" />
        </View>
        <View style={{ alignItems: "center", justifyContent: "center", marginTop: 30 }}>
          <Text>CURRENT PATH</Text>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>ACCOUNTANT</Text>
        </View>
        </View>
        <View style={{top:-45}}>
        <TouchableOpacity style={{ backgroundColor:"white",borderWidth:1,width:80,height:80,alignItems:"center",justifyContent:"center",borderRadius:200,left:155,}}
        onPress={() => navigation.navigate('WorkPathScreen')} >

          <Icon name="arrow-down" size={30} color="black"  />
          
        </TouchableOpacity>
      </View>

      <View style={{alignItems:"center",justifyContent:"center"}}>
      <Image source={require('../assets/0.png')}
      resizeMode='contain'
            style={{ height: 250, width: 250, }}
          />
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#EDB749"
  },
  square: {
    width: width,
    height: 271,
    backgroundColor: "white",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  
})

export default Home
