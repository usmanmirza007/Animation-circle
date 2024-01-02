import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
const jobTitles = [
    { title: 'TITLE 1', text: "Lorem Ipsum is simply dummy text of the...", number: "01" },
    { title: 'TITLE 2', text: "Lorem Ipsum is simply dummy text  of the...", number: "02" },
    { title: 'TITLE 3', text: "Lorem Ipsum is simply dummy text of the...", number: "03" },
    { title: 'TITLE 4', text: "Lorem Ipsum is simply dummy text of the...", number: "04" },
    { title: 'TITLE 5', text: "Lorem Ipsum is simply dummy text of the...", number: "05" },
    { title: 'TITLE 6 ', text: "Lorem Ipsum is simply dummy text of the...", number: "06" },

];

const center = {
    x: width / 2,
    y: height / 2,
};

const circleRadius = 40; // Radius of the job title circles
const pathRadius = 140; // Radius of the entire path
// Space between the circles along the y-axis

export default function SeniorAccountant() {
    const animValues = useRef(jobTitles.map(() => new Animated.Value(0))).current;
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        // Function to start the animation
        const startAnimation = () => {
            Animated.stagger(
                200,
                animValues.map((animValue) =>
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

    const renderLine = (index) => {
        const translateY = animValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, pathRadius - circleRadius],
        });

        const rotateTransform = {
            transform: [{ translateY: pathRadius / 0.85 }],
        };

        const linePosition = {
            top: center.y - pathRadius / 3 + translateY,
            left: center.x,
        };

        return (
            <View
                key={`line_${index}`}
                style={[
                    styles.line,
                    rotateTransform,
                    linePosition,
                ]}
            />
        );
    };

    const renderCircle = (item, index) => {
        const x = center.x - circleRadius;
        const translateY = animValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, pathRadius - circleRadius + index * 77],
        });

        const isEven = index % 2 === 0;
        const marginStyle = isEven ? { left: center.x - circleRadius - 70 } : { right: center.x - circleRadius - 40 };
        const numberPositionStyle = isEven ? { right: 55 } : { left: 55 };
        const titlePositionStyle = isEven ? {} : { left: 80 };
        const textPositionStyle = isEven ? {} : { left: 15 };
        const isIndexThree = index === 3;
        const circleStyle = isIndexThree ? { backgroundColor: '#EDB749' } : {};
        const titleTextStyle = isIndexThree ? { color: 'white' } : {};
        const numberContainerStyle = isIndexThree ? { backgroundColor: 'white' } : {};

        const numberStyle = {
            fontSize: 12,
            color: index === 3 ? '#EDB749' : 'white',
        };;
        const firstSlice = item.text.slice(0, 21);
        const secondSlice = item.text.slice(21, 40);

        // Check if index is odd and add space if true
        const spacedText = index % 2 === 1 ? `${firstSlice}\n    ${secondSlice}` : `${firstSlice}${secondSlice}`;


        return (
            <Animated.View
                key={item.title}
                style={[
                    styles.circle,
                    styles.jobTitle,
                    {
                        left: isEven ? x - 80 : x - 20,

                        top: center.y - circleRadius - 185,
                        transform: [{ translateY }],
                    },
                    circleStyle
                ]}
            >
                <Text style={[styles.jobTitleText, titlePositionStyle, titleTextStyle]}>{item.title}</Text>
                <Text style={[styles.textStyle, textPositionStyle]}>{spacedText}</Text>

                <View style={[styles.numberContainer, numberPositionStyle, numberContainerStyle,]}>
                    <Text style={numberStyle}>{item.number}</Text>
                </View>
            </Animated.View>
        );
    };
    { animationComplete && jobTitles.map((_, index) => renderLine(index)) }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Image source={require('../assets/icon1.png')} style={{ height: 33, width: 35, top: 25, left: 24 }} />
                <Icon name="notifications" size={20} color="black" style={{ width: 18, height: 20, top: 30, right: 24 }} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                <Text style={{ fontWeight: "700", fontSize: 25 }}>CURRENT LADDER</Text>

            </View>

            {animationComplete && jobTitles.map((_, index) => renderLine(index))}




            <ImageBackground source={require('../assets/Group3.png')} style={styles.backgroundImage}>
                <View style={{alignItems:"center"}}>
                    <Text style={{color:"white", fontSize:16,fontWeight:"bold"}}>JUNIOR</Text>
                    <Text style={{color:"white", fontSize:16,fontWeight:"bold"}}>ACCOUNTANT</Text>
                </View>

            </ImageBackground>

            {jobTitles.map((item, index) => renderCircle(item, index))}

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: "white"

    },
    backgroundImage: {
        left: 50,
        height: 125,
        width: 290,
        top: 12,

        justifyContent: 'center',
    },
    circle: {
        position: 'absolute',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: "center",
        zIndex: -3

    },
    centerCircle: {
        width: 256,
        height: 75,
        borderRadius: 180,
        justifyContent: 'center',
        alignItems: 'center',
        top: center.y - 369,
        left: center.x - 178,
        flexDirection: 'row',
        zIndex: 3

    },
    jobTitle: {
        width: 170,
        height: 65,
        borderRadius: 50,
        shadowColor: 'black', // Add shadow properties
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,

    },
    titleText: {
        fontWeight: 'bold',
    },
    jobTitleText: {
        fontSize: 10,
        textAlign: 'center',
    },
    line: {
        position: 'absolute',
        height: pathRadius + 400,
        width: 2,
        backgroundColor: 'black',
        top: center.y - pathRadius / 3 - 10,
        left: center.x,
        marginTop: -1,
        zIndex: -3
    },
    titleText: {
        fontWeight: 'bold',
        color: "#EDB749",
        position: "absolute",

    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    accountantText: {
        fontWeight: 'bold',
        color: 'white',
    },
    jobTitleText: {
        fontSize: 10,
        top: 18,
        left: 55,
        color: "#EDB749",
        fontWeight: "700",
        position: "absolute",

    },
    textStyle: {
        fontSize: 10,
        color: "black",
        top: 32,
        left: 57,
        position: "absolute",
        width: 110,
        fontWeight: "400"

    },
    numberContainer: {
        right: 55, top: 2, backgroundColor: "#EDB749", padding: 6,
        borderRadius: 200,
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center"
    },
});
