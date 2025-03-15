import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import LoginScreen from '../Screens/LoginScreen';

import {RootStackParamList} from '../types/naviagations';
import InfoScreen from '../Screens/InfoScreen';
import DashboardScreen from '../Screens/DashboardScreen';
import FarmerDashboard from '../Screens/FarmerDashboard';
import IntermideatorDashboard from '../Screens/IntermideatorDashboard';


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if AscStorage is available and contains the token or user data
    const storageData = localStorage.getItem('AscStorage'); // Or AsyncStorage.getItem() if you're using AsyncStorage
    if (storageData) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // If the authentication state is still being determined, return a loading screen or null
  if (isAuthenticated === null) {
    return null; // You can also return a loading spinner here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Dashboard' : 'Login'}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="FarmerDashboard" component={FarmerDashboard} />
        <Stack.Screen
          name="IntermideatorDashboard"
          component={IntermideatorDashboard}
        />
        {/* <Stack.Screen
          name="RicemakerDashboard"
          component={RicemakerDashboard}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
