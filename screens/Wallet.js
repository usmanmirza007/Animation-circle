import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const jobTitles = [
  'JUNIOR ACCOUNTANT',
  'SENIOR ACCOUNTANT',
  'MANAGER',
  'CONTROLLER',
];

const center = {
  x: width / 2,
  y: height / 2,
};

const circleRadius = 40; // Radius of the job title circles
const pathRadius = 130; // Radius of the entire path

export default function Wallet() {
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
    const angle = (index * (360 / jobTitles.length)) + 90; // Starting from the top
    const rotateTransform = {
      transform: [
        { translateY: -pathRadius / 3 - 10 }, // Adjust line to start from the center
        { rotate: `${angle}deg` },
        { translateY: pathRadius / 3 }, // Move rotated line outward to correct position
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
  };

  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.centerCircle]}>
        <Text style={styles.titleText}>ACCOUNTANT</Text>
      </View>
  
      {animationComplete &&
        jobTitles.map((_, index) => renderLine(index))}
      {jobTitles.map((title, index) => {
        const angle =
          (index * (360 / jobTitles.length)) * (Math.PI / 180) -
          Math.PI / 2; // Offset by 90 degrees to start from the top
        const x = center.x - circleRadius; // Circles should move only on the y-axis
        const translateY = animValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -pathRadius],
        });
  
        return (
          <Animated.View
            key={title}
            style={[
              styles.circle,
              styles.jobTitle,
              {
                left: x,
                transform: [{ translateY }],
              },
            ]}
          >
            <Text style={styles.jobTitleText}>{title}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
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
  },
  jobTitleText: {
    fontSize: 10, // Adjust as needed
    textAlign: 'center',
  },
  line: {
    position: 'absolute',
    height: pathRadius - 30, // Set the height to the radius of the path
    width: 2, // Adjust based on line thickness
    backgroundColor: 'black',
    top: center.y - pathRadius / 3 - 10,
    left: center.x,
    marginTop: -1, // Adjust based on line thickness
  },
});
