import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import Notification from './screens/Notification'
import Wallet from './screens/Wallet';
import CustomerSupport from './screens/CustomerSupport';
import SeniorAccountant from './screens/SeniorAccountant';
import JuniorAccountanntOptions from './screens/JuniorAccountantOptions';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkPath from './screens/WorkPath';
import JuniorAccountant from './screens/JuniorAccountant';
import Options from './screens/Options';
import DesiredLadder from './screens/DesiredLadder';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={OrderScreen} />
      </Stack.Navigator>
    
  );
}
const NotificationStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="WorkPath" component={WorkPath} />
        <Stack.Screen name = "SeniorAccountant" component={SeniorAccountant}/>
        <Stack.Screen name = "JuniorAccountant" component={JuniorAccountant}/>
        <Stack.Screen name = "JuniorAccountantOptions" component={JuniorAccountanntOptions}/>
        <Stack.Screen name = "DesiredLadder" component={DesiredLadder}/>
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