import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import LoginScreen from '../Screens/LoginScreen';
import { RootStackParamList } from '../types/naviagations';
import InfoScreen from '../Screens/InfoScreen';
import FarmerDashboard from '../Screens/FarmerDashboard';
import IntermideatorDashboard from '../Screens/IntermideatorDashboard';
import RicemakerDashboard from '../Screens/RicemakerDashboard';
import NotificationScreen from '../Screens/NotificationScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import ActivitiesScreen from '../Screens/ActivitiesScreen';
import PostsScreen from '../Screens/PostsScreen';
import PredictPriceScreen from '../Screens/PredictPriceScreen';
import CreatePostScreen from '../Screens/CreatePostScreen';
import IntermideatorPosts from '../Screens/IntermideatorPosts';
import RiceMakerPosts from '../Screens/RiceMakerPosts';
import IntermideatorCreate from '../Screens/IntermideatorCreatePost';
import FarmerPostsPage from '../Screens/BidingFarmer';
import BidScreen from '../Screens/BidScreen';
import AllBidScreen from '../Screens/AllBidScreen';


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
              <Stack.Screen
                name="FarmerDashboard"
                component={FarmerDashboard}
              />
              <Stack.Screen
                name="IntermideatorDashboard"
                component={IntermideatorDashboard}
              />
              <Stack.Screen
                name="RiceMakerDashboard"
                component={RicemakerDashboard}
              />
              <Stack.Screen name="Price" component={PredictPriceScreen} />

              <Stack.Screen
                name="Notification"
                component={NotificationScreen}
              />
              <Stack.Screen name="Activities" component={ActivitiesScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Posts" component={PostsScreen} />
              <Stack.Screen name="CreatePost" component={CreatePostScreen} />
              <Stack.Screen
                name="IntermideatorCreatePost"
                component={IntermideatorCreate}
              />
              <Stack.Screen
                name="IntermideatorPosts"
                component={IntermideatorPosts}
              />
              <Stack.Screen name="RiceMakerPosts" component={RiceMakerPosts} />
              <Stack.Screen
                name="FarmerPostsPage"
                component={FarmerPostsPage}
              />
              <Stack.Screen
                name="FarmerCreatePost"
                component={CreatePostScreen}
              />
              {/* <Stack.Screen name="Chat" component={ChatScreen} /> */}
              <Stack.Screen name="Bid" component={BidScreen} />
              <Stack.Screen
                name="AllBids"
                component={AllBidScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        );
      };
export default AppRouter;
