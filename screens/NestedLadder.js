import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const jobTitles = ['MANAGER', 'SENIOR ACCOUNTANT', 'CHIEF FINANCIAL OFFICIER', 'TEAM LEAD', 'CONTROLLER', 'JUNIOR ACCOUNTANT'];

const center = { x: width / 2, y: height / 2 };
const circleRadius = 40;
const pathRadius = 150;

const NestedLadder = ({ route }) => {
	const { level, number } = route.params;

	const animValues = useRef(jobTitles.map(() => new Animated.Value(0))).current;
	const [animationComplete, setAnimationComplete] = useState(false);
	const navigation = useNavigation();

	useEffect(() => {
		const startAnimation = () => {
			Animated.stagger(
				200,
				animValues.slice(0, number).map((animValue) =>
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
	}, [animValues, number]);

	const handleJobTitlePress = (title) => {
		if (title === 'MANAGER') {
			navigation.navigate('DesiredLadderScreen'); // Replace with your actual screen name
		}
	};

	const renderLine = (index) => {
		if (index < number) {
			const angle = (index * (360 / number)) - 90;
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
							zIndex: -1,
						},
					]}
				/>
			);
		} else {
			return null;
		}
	};

	const renderJobTitles = () => {
		return jobTitles.slice(0, number).map((title, index) => {
			const angle = (index * (360 / number)) * (Math.PI / 180) - (Math.PI / 2);
			const x = pathRadius * Math.cos(angle) + center.x - circleRadius;
			const y = pathRadius * Math.sin(angle) + center.y - circleRadius;

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
							top: center.y - circleRadius + 12,
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
		});
	};

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Image source={require('../assets/icon1.png')} style={{ height: 33, width: 35, top: 18, left: 24 }} />
				<Icon name="notifications" size={20} color="black" style={{ width: 18, height: 20, top: 22, right: 24 }} />
			</View>
			<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
				<Text style={{ fontWeight: '400', fontSize: 14 }}>YOUR OPTIONS FROM</Text>
				<Text style={{ fontWeight: '700', fontSize: 25 }}>JUNIOR ACCOUNTANT</Text>
			</View>
			<Text style={{ left: 170, fontSize: 14, fontWeight: 400 }}>Level {level}</Text>

			{animationComplete && jobTitles.map((_, index) => renderLine(index))}
			{renderJobTitles()}

			<View style={styles.centerCircle}>
				<Image source={require('../assets/Circle.png')} style={{ width: 130, height: 130, borderRadius: 70 }} />
				<Text style={styles.titleText}>ACCOUNTANT</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
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
		color: 'white',
		position: 'absolute',
	},
	jobTitleText: {
		fontSize: 10,
		textAlign: 'center',
		color: 'white',
	},
	line: {
		position: 'absolute',
		height: 2,
		width: pathRadius - 29,
		backgroundColor: 'black',
		top: center.y + 10,
		left: center.x,
		marginLeft: -1,
	},
});

export default NestedLadder;
