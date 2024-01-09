import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const jobTitles = [
	{ title: 'TITLE 1', text: "Lorem Ipsum is simply dummy text of the...", number: "03", currentLevel: false, isCurrentLevel: false },
	{ title: 'TITLE 2', text: "Lorem Ipsum is simply dummy text  of the...", number: "00", currentLevel: false, isCurrentLevel: false },
	{ title: 'TITLE 3', text: "Lorem Ipsum is simply dummy text of the...", number: "06 ", currentLevel: false, isCurrentLevel: false },
	{ title: 'TITLE 4', text: "Lorem Ipsum is simply dummy text of the...", number: "00", currentLevel: false, isCurrentLevel: false },
	{ title: 'TITLE 5', text: "Lorem Ipsum is simply dummy text of the...", number: "04", currentLevel: true, isCurrentLevel: true, },
	{ title: 'TITLE 6 ', text: "Lorem Ipsum is simply dummy text of the...", number: "01", currentLevel: false, isCurrentLevel: true },
	{ title: 'TITLE 7', text: "Lorem Ipsum is simply dummy text of the...", number: "03", currentLevel: false, isCurrentLevel: false },
	{ title: 'TITLE 8', text: "Lorem Ipsum is simply dummy text  of the...", number: "00", currentLevel: false, isCurrentLevel: false },
	{ title: 'TITLE 9', text: "Lorem Ipsum is simply dummy text of the...", number: "06 ", currentLevel: false, isCurrentLevel: false },

];


const center = {
	x: width / 2,
	y: height / 2,
};

const circleRadius = 40; // Radius of the job title circles
const pathRadius = 140; // Radius of the entire path
// Space between the circles along the y-axis

export default function DesiredLadder() {
	const animValues = useRef(jobTitles.map(() => new Animated.Value(0))).current;
	const [animationComplete, setAnimationComplete] = useState(false);
	const navigation = useNavigation();

	const handleLevelClick = (index) => {
		// Calculate the level based on the index
		const totalLevels = jobTitles.length;
		const level = totalLevels - index;

		// Navigate to the JuniorAccountantOptions screen with level and number
		navigation.navigate('NestedLadderScreen', { level, number: jobTitles[index].number });

	};
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
			transform: [{ translateY: 0 }],
		};

		const linePosition = {
			top: center.y - pathRadius / 3 + translateY,
			left: center.x,
		};

		return (
			<View
				key={`line_${index}`}
				style={[
					{
						position: 'absolute',
						height: 85 * (index + 0.39),
						width: 2,
						backgroundColor: 'black',
						left: center.x,
						marginTop: -1,
					},
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
		const circleStyle = isIndexThree ? { backgroundColor: 'white' } : {};
		const titleTextStyle = isIndexThree ? { color: '#EDB749' } : {};
		const circleStyle1 = item.isCurrentLevel ? { backgroundColor: 'white' } : {};

		const numberContainerStyle = isIndexThree ? { backgroundColor: '#EDB749' } : {};
		const textPosition = isEven ? { textAlign: 'left' } : { textAlign: 'right' };
		const isIndexFour = index === 4;
		const circleStyle4 = isIndexFour ? { borderColor: '#6CC54D', borderWidth: 2 } : {};
		const titleTextStyle4 = isIndexFour ? { color: '#6CC54D' } : {};
		const numberContainerStyle4 = isIndexFour ? { backgroundColor: '#6CC54D' } : {};
		let numberStyle = {
			fontSize: 14,
			color: index === 3 ? '#EDB749' : 'white',
		};
		if (item.title === 'TITLE 2' || item.title === 'TITLE 4') {
			numberStyle.fontSize = 1; // Set the desired font size for TITLE 2 and TITLE 4
		}
		const smallCircleStyle = {
			position: 'absolute',
			alignItems: "center",
			justifyContent: "center",
			width: 8,
			height: 8,
			borderRadius: 200,
			backgroundColor: 'white',

		};

		const currentLevelText = animationComplete && item.currentLevel ? (
			<View style={{ justifyContent: "center", alignItems: "center" }}>

				<Text style={[styles.currentLevelText, isEven ? { left: 120 } : { left: -195 }]}>
					Jump Level from
				</Text>
				<Text style={[styles.currentLevelText1, isEven ? { left: 120 } : { left: -195 }]}>
					Root Ladder
				</Text>

				<View style={{ flexDirection: "row" }}>
					<View style={[{ width: 50, height: 2, backgroundColor: '#6CC54D', position: "absolute", top: 1, }, isEven ? { left: 115 } : { left: -164 }]}>

					</View>
					<View style={[{ width: 6, height: 6, borderRadius: 50, backgroundColor: '#6CC54D', position: "absolute", top: -1 }, isEven ? { left: 162 } : { left: -164 }]}></View>
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
						top: circleRadius - 100,
						transform: [{ translateY }],
					},
					circleStyle,
					circleStyle1,
					circleStyle4
				]}
			>
				{currentLevelText}
				<TouchableOpacity style={{ position: "absolute", alignItems: "center", justifyContent: "center", width: "100%", height: 65, borderRadius: 30 }}
					onPress={() => handleLevelClick(index)}
				>
					<Text style={[styles.jobTitleText, titlePositionStyle, titleTextStyle, titleTextStyle4]}>{item.title}</Text>
					<Text style={[styles.textStyle, textPositionStyle, textPosition]}>{item.text}</Text>

					<View style={[styles.numberContainer, numberPositionStyle, numberContainerStyle, numberContainerStyle4]}>
						<Text style={numberStyle} >{item.number}</Text>
						{(item.title === 'TITLE 2' || item.title === 'TITLE 4') &&
							<View style={smallCircleStyle} />
						}
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => handleLevelClick(index)}
					style={{ flexDirection: isEven ? 'row' : 'row-reverse', alignItems: 'center', padding: 10, }}>
					<View style={[styles.numberContainer1, numberContainerStyle]}>
						<Text style={[numberStyle, {}]} >{item.number > 0 || item.number < 9 ? '0' + item.number : item.number}</Text>
						{item.number == 0 &&
							<View style={{
								position: 'absolute',
								alignItems: "center",
								justifyContent: "center",
								width: 8,
								height: 8,
								borderRadius: 8,
								backgroundColor: item?.currentLevel ? 'white' : 'black',
							}} />
						}
					</View>
					<Text style={[{ color: "#EDB749", fontSize: 12, fontFamily: fontFamily.montserratBold, marginLeft: isEven ? 8 : 0, marginRight: isEven ? 0 : 5 }, titleTextStyle]}>{item.text}</Text>
				</TouchableOpacity>
			</Animated.View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
				<Image source={require('../assets/icon1.png')} style={{ height: 33, width: 35, top: 18, left: 24 }} />
				<Icon name="notifications" size={20} color="black" style={{ width: 18, height: 20, top: 22, right: 24 }} />
			</View>
			<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 48 }}>
				<Text style={{ fontWeight: "400", fontSize: 14 }}>YOUR</Text>
				<Text style={{ fontWeight: "700", fontSize: 25 }}>DESIRED LADDER</Text>
			</View>
			<ImageBackground resizeMode='contain' source={require('../assets/Group2.png')} style={styles.backgroundImage}>
				<View style={{}}>
					<Image source={require('../assets/V1.png')} style={{ height: 35, width: 35, top: 23, left: 80 }} />
					<Text style={{ color: "white", fontSize: 16, fontWeight: "700", left: 127, top: -13, }}>SENIOR</Text>
					<Text style={{ color: "white", fontSize: 16, fontWeight: "700", left: 127, top: -19, }}>ACCOUNTANT</Text>
				</View>
			</ImageBackground>

			<ScrollView contentContainerStyle={{ flexGrow: 1, height: height + 250 }}>
				{animationComplete && jobTitles.map((_, index) => renderLine(index))}
				{jobTitles.map((item, index) => renderCircle(item, index))}

			</ScrollView>

		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: "white"

	},
	numberContainer1: {
		backgroundColor: "#EDB749",
		// padding: 6,
		borderRadius: 35,
		width: 35,
		height: 35,
		alignItems: "center",
		justifyContent: "center"
	},
	backgroundImage: {
		left: 30,
		height: 95,
		width: 330,
		top: 12,
		justifyContent: 'center',
		zIndex: 1
	},
	circle: {
		position: 'absolute',
		backgroundColor: 'white',
		justifyContent: 'center',
		// alignItems: "center",

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
		// alignItems: "center",
		// justifyContent: "center"

	},
	titleText: {
		fontWeight: 'bold',
	},

	line: {
		position: 'absolute',
		height: pathRadius + 300,
		width: 2,
		backgroundColor: 'black',
		top: center.y - pathRadius / 3,
		left: center.x,
		marginTop: -1,

	},
	titleText: {
		fontWeight: 'bold',
		color: "#EDB749",
		position: "absolute",
		alignItems: "center",
		justifyContent: "center"

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
		fontSize: 12,
		left: 59,
		top: 15,
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
		fontSize: 10,
		color: 'black',
		top: -25,
		left: 135,
		fontWeight: "600"
	},
	currentLevelText1: {
		position: "absolute",
		fontSize: 10,
		color: 'black',
		top: -15,
		left: 135,
		fontWeight: "600"
	},
});
