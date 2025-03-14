import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import LoginScreen from '../Screens/LoginScreen';

import { RootStackParamList } from '../types/naviagations';
import InfoScreen from '../Screens/InfoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppRouter = () => {
        return (
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Info" component={InfoScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        );
      };
export default AppRouter;
