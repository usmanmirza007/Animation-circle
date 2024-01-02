import { View, Text, StyleSheet, ImageBackground, StatusBar, Image, Modal,TouchableOpacity,Dimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
const { width,height } = Dimensions.get('window')

const Notification = ({navigation}) => {

  return (
    <View style={styles.mainContainer}>
      <StatusBar style="auto" />
      <View style={styles.square}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginHorizontal: 20 }}>
          <Image source={require('../assets/icon1.png')}
            style={{ height: height/20, width: width/10, }}
          />
          <Icon name="notifications" size={25} color="black" />
        </View>
        <View style={{ alignItems: "center", justifyContent: "center", marginTop: 30 }}>
          <Text>CURRENT PATH</Text>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>ACCOUNTANT</Text>
        </View>
        <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}onPress={() => navigation.navigate('WorkPath')} >
          <View style={{backgroundColor:"white",top:80,borderRadius:160,width:90,height:90,padding:28,borderWidth:1}}>
          <Icon name="arrow-down" size={30} color="black"  />
          </View>
        </TouchableOpacity>
      </View>
      <View style ={{alignItems:"center",justifyContent:"center"}}>
      <Image source={require('../assets/0.png')}
            style={{ height: 330, width: 294,marginTop:80 }}
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
    height: height/3,
    backgroundColor: "white",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  
})

export default Notification
