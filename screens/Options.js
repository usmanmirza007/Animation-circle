
import { useRoute } from '@react-navigation/native';
import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');


const center = {
    x: width / 2,
    y: height / 2,
};

const circleRadius = 40;
const pathRadius = 150;


const Options = () => {
    const route = useRoute();
    const { number } = route.params;
  
    return (
     
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Image source={require('../assets/icon1.png')} style={{ height: 33, width: 35, top: 25, left: 24 }} />
                <Icon name="notifications" size={20} color="black" style={{ width: 18, height: 20, top: 30, right: 24 }} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 60 }}>

                <Text style={{fontWeight:"bold",fontSize:20}}>YOUR OPTIONS</Text>

                <Text style={{   }}>FROM ACCOUNT LEVEL {number}</Text>
            </View>

        </View>
      
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        // justifyContent: 'center',
        //alignItems: 'center',
    },
    circle: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDB749',
    },
    centerCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        top: center.y - 190,
        left: center.x - 50,
    },

    jobTitle: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    titleText: {
        fontWeight: 'bold',
        color: "white",
        position: "absolute"
    },
    jobTitleText: {
        fontSize: 10, // Adjust as needed
        textAlign: 'center',
        color: "white"
    },
    line: {
        position: 'absolute',
        height: 2,
        width: pathRadius - 29, // Set the width to the radius of the path
        backgroundColor: 'black',
        top: center.y,
        left: center.x,
        marginLeft: -1, // Adjust based on line thickness
    },
});

export default Options