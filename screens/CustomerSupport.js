import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, Image, ImageBackground,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
const jobTitles = [
    { title: 'TITLE 1', text: "Lorem Ipsum is simply dummy text of the...", number: "01", currentLevel: false, isCurrentLevel: false },
    { title: 'TITLE 2', text: "Lorem Ipsum is simply dummy text  of the...", number: "02", currentLevel: false, isCurrentLevel: false },
    { title: 'TITLE 3', text: "Lorem Ipsum is simply dummy text of the...", number: "03", currentLevel: false, isCurrentLevel: false },
    { title: 'TITLE 4', text: "Lorem Ipsum is simply dummy text of the...", number: "04", currentLevel: true, isCurrentLevel: false },
    { title: 'TITLE 5', text: "Lorem Ipsum is simply dummy text of the...", number: "05", currentLevel: false, isCurrentLevel: true },
    { title: 'TITLE 6 ', text: "Lorem Ipsum is simply dummy text of the...", number: "06", currentLevel: false, isCurrentLevel: true },

];

const center = {
    x: width / 2,
    y: height / 2,
};

const circleRadius = 40; // Radius of the job title circles
const pathRadius = 140; // Radius of the entire path
// Space between the circles along the y-axis

export default function CustomerSupport() {
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
                        friction: 50,
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
            transform: [{ translateY: 150 }],
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
        const numberPositionStyle = isEven ? { right: 60 } : { left: 80 };
        const titlePositionStyle = isEven ? {} : { left: 130 };
        const textPositionStyle = isEven ? {} : { left: 15 };
        const isIndexThree = index === 3;
        const circleStyle = isIndexThree ? { backgroundColor: '#EDB749' } : {};
        const titleTextStyle = isIndexThree ? { color: 'white' } : {};
        const circleStyle1 = item.isCurrentLevel ? { backgroundColor: '#E7E7E7' } : {};
        const numberContainerStyle = isIndexThree ? { backgroundColor: 'white' } : {};
        const textPosition = isEven ? { textAlign: 'left' } : { textAlign: 'right' };
        const numberStyle = {
            fontSize: 12,
            color: index === 3 ? '#EDB749' : 'white',
        };;
       

        const currentLevelText = animationComplete && item.currentLevel ? (
            <View style={{justifyContent:"center",alignItems:"center"}}>
                <Text style={[styles.currentLevelText, isEven ? { left: 120 } : { left: -195 }]}>
                    Current Level
                </Text>
                <View style={{flexDirection:"row"}}>
                    <View style={[{ width: 50, height: 2, backgroundColor: 'black', position: "absolute", top: 18 }, isEven ? { left: 115 } : { left: -164 }]}>
        
                    </View>
                    <View style={[{ width: 6, height: 6,borderRadius:50, backgroundColor: 'black', position: "absolute", top:16  }, isEven ? { left: 162 } : { left: -164 }]}></View>
                    </View>
            </View>
        ) : null;

        return (
            <Animated.View
                key={item.title}
                style={[
                    styles.circle,
                    styles.jobTitle,
                    {
                        left: isEven ? x - 100 : x - 55,

                        top: center.y - circleRadius - 190,
                        transform: [{ translateY }],
                    },
                    circleStyle,
                    circleStyle1
                ]}
            >
                {currentLevelText}
                
                <Text style={[styles.jobTitleText, titlePositionStyle, titleTextStyle]}>{item.title}</Text>
                <Text style={[styles.textStyle,textPositionStyle,textPosition ]}>{item.text}</Text>

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

            <ImageBackground resizeMode='contain' source={require('../assets/Group2.png')} style={styles.backgroundImage}>
                <View style={{}}>
                    <Image source={require('../assets/V1.png')} style={{ height: 35, width: 35, top: 23, left: 80 }} />
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "700", left: 127, top: -13 ,}}>JUNIOR</Text>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "700", left: 127, top: -19, }}>ACCOUNTANT</Text>
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
        left: 30,
        height: 95,
        width: 330,
        top: 12,
        justifyContent: 'center',
        zIndex:3,
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
        width: 230,
        height: 65,
        borderRadius: 50,
        shadowColor: 'black', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        alignItems:"center",
        justifyContent:"center"

    },
    titleText: {
        fontWeight: 'bold',
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
        alignItems:"center",
        justifyContent:"center"

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
        fontSize: 11,
        top: 13,
        left: 58,
        color: "#EDB749",
        fontWeight: "700",
        position: "absolute",
        
    },
    textStyle: {
        fontSize: 9,
        color: "#464B5F",
        top: 30,
        left: 60,
        position: "absolute",
        width: 150,
        fontWeight: "400"
    },
    numberContainer: {
        left: -80, top: 0, backgroundColor: "#EDB749", padding: 6,
        borderRadius: 200,
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center"
    },
    currentLevelText: {
        position: "absolute",
        fontSize: 12,
        color: 'black',
        top: -5,
        left: 135,
        fontWeight: "600"
    },
});
