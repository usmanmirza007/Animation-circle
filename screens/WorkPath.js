// WorkPath.js
import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
const jobTitles = [
    'MANAGER',
    'SENIOR ACCOUNTANT',
    'CHIEF FINANCIAL OFFICIER',
    'TEAM LEAD',
     'CONTROLLER',
     'JUNIOR ACCOUNTANT',
     
];

const center = {
    x: width / 2,
    y: height/3,
};

const circleRadius = 40;
const pathRadius = 150;

export default function WorkPath() {
    const animValues = useRef(jobTitles.map(() => new Animated.Value(0))).current;
    const [animationComplete, setAnimationComplete] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        // Function to start the animation
        const startAnimation = () => {
            Animated.stagger(
                200,
                animValues.map(animValue =>
                    Animated.spring(animValue, {
                        toValue: 1,
                        friction: 5,
                        useNativeDriver: true,
                    })
                )
            ).start(() => {

                setAnimationComplete(true);
            });
        };

        const timeout = setTimeout(() => {
            startAnimation();
        }, 500);


        return () => clearTimeout(timeout);
    }, []);
    const handleJobTitlePress = (title) => {
        // You can customize this logic based on your navigation structure
        if (title === 'JUNIOR ACCOUNTANT') {
            navigation.navigate('CurrentLadderScreen'); // Replace with your actual screen name
        }
 
    };

    const renderLine = (index) => {

        const angle = (index * (360 / jobTitles.length)) - 90;
        const rotateTransform = {
            transform: [
                { translateX: -pathRadius / 3 - 10 },
                { rotate: `${angle}deg` },
                { translateX: pathRadius / 3 },
            ],
        };

        return (
            <View
                key={`line_${index}`}
                style={[
                    styles.line,
                    rotateTransform,
                    {
                        zIndex: -3,
                    }
                ]}
            />
        );
    };

    return (

        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Image source={require('../assets/icon1.png')} style={{ height: 33, width: 35, top: 25, left: 24 }} />
                <Icon name="notifications" size={20} color="black" style={{ width: 18, height: 20, top: 30, right: 24 }} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 60 }}>

                <Text>SELECT</Text>

                <Text style={{ fontWeight: 'bold', fontSize: 20, }}>WORK PATH</Text>
            </View>
            <View >

            {animationComplete && jobTitles.map((_, index) => renderLine(index))}

            {jobTitles.map((title, index) => {

                const angle =
                    (index * (360 / jobTitles.length)) * (Math.PI / 180) - (Math.PI / 2);
                const x =
                    pathRadius * Math.cos(angle) + center.x - circleRadius;

                const y =
                    pathRadius * Math.sin(angle) + center.y - circleRadius;

                return (

                    <TouchableOpacity

                        key={title}
                        onPress={() => handleJobTitlePress(title)}
                        activeOpacity={0.8}
                        style={[
                            styles.circle,
                            styles.jobTitle,
                            {
                                left: center.x - circleRadius,
                                top: center.y - circleRadius,
                                transform: [
                                    {
                                        translateX: animValues[index].interpolate({

                                            inputRange: [0, 1],
                                            outputRange: [0, x - (center.x - circleRadius)],
                                        }),
                                    },
                                    {
                                        translateY: animValues[index].interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, y - (center.y - circleRadius)],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Text style={styles.jobTitleText}>{title}</Text>

                    </TouchableOpacity>

                );
            })}
            <View style={styles.centerCircle}>
                <Image source={require('../assets/Circle.png')} style={{ width: 130, height: 130, borderRadius: 70 }} />
                <Text style={styles.titleText}>ACCOUNTANT</Text>
            </View>
            </View>
        </View>
        
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor:"white"    },
    circle: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDB749',
        zIndex:-3
    },
    centerCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        top: center.y - 50,
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
