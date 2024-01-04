import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from './screens/Home';
import WorkPath from './screens/WorkPath';
import CurrentLadder from './screens/CuurentLadder';
import NestedLadder from './screens/NestedLadder';
import DesiredLadder from './screens/DesiredLadder';

import Options from './screens/Options';
import Wallet from './screens/Wallet';
import CustomerSupport from './screens/CustomerSupport';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="WorkPathScreen" component={WorkPath} />
        <Stack.Screen name="CurrentLadderScreen" component={CurrentLadder} />
        <Stack.Screen name="NestedLadderScreen" component={NestedLadder} />
        <Stack.Screen name="DesiredLadderScreen" component={DesiredLadder} />
      </Stack.Navigator>
    
  );
}
const NotificationStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name = "Options" component={Options}/>
      </Stack.Navigator>
    
  );
}

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: 'blue'},
      tabBarInactiveTintColor: 'silver',
      tabBarActiveTintColor: '#f4a460',
      tabBarShowLabel:false,
      tabBarStyle:{
        borderTopRightRadius:30,
        borderTopLeftRadius:30, 
      }
    }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}  
      />
      <Tab.Screen
        name="Notification"
        component={NotificationStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="briefcase" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Support"
        component={CustomerSupport}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart-half" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
};
export default BottomTabNavigator;