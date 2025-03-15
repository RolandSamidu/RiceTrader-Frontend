
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActivitiesScreen from '../Screens/ActivitiesScreen';
import NotificationScreen from '../Screens/NotificationScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import DashboardScreen from '../Screens/DashboardScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
