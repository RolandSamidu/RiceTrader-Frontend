import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/naviagations';
import BottomTabNavigator from '../Components/BottomTabNavigator';

import Ionicons from 'react-native-vector-icons/Ionicons';

type DashboardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'IntermideatorDashboard'
>;

const IntermideatorDashboard = () => {
  const navigation = useNavigation<DashboardNavigationProp>();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const role = await AsyncStorage.getItem('role');
      if (role !== 'Intermediate') {
        Alert.alert('Unauthorized', 'You are not allowed here!');
        navigation.replace('Login');
      }

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.replace('Login');
      }

      setUserName(role || 'User');
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  return (
    <ImageBackground
      source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
      style={tw`flex-1`}>
      {/* Header with Logout Button */}
      <View
        style={tw`flex-row justify-between items-center p-4 bg-black bg-opacity-60`}>
        <Text style={tw`text-white text-2xl font-bold`}>
          Intermideator Dashboard
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          style={tw`bg-red-500 p-3 rounded-full shadow-lg`}>
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={tw`flex-1 p-4 justify-center`}>
        {/* Welcome Section */}
        <View style={tw`mb-16 items-center`}>
          <Text style={tw`text-3xl font-bold text-center`}>
            Welcome, {userName}!
          </Text>
          <Text style={tw`text-xl text-center mt-2`}>
            Manage your intermediary activities with ease.
          </Text>
        </View>

        {/* Navigation Options */}
        <View style={tw`flex-row justify-around flex-wrap`}>
          <TouchableOpacity
            style={tw`bg-white bg-opacity-90 w-40 p-5 rounded-2xl items-center mb-4 shadow-lg`}
            onPress={() => navigation.navigate('Price')}>
            <Image
              source={require('../Images/price.png')}
              style={tw`w-28 h-20 mb-4`}
            />
            <Text style={tw`text-lg font-semibold text-gray-800`}>
              Market Prices
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-white bg-opacity-90 w-40 p-5 rounded-2xl items-center mb-4 shadow-lg`}
            onPress={() => navigation.navigate('IntermideatorPosts')}>
            <Image
              source={require('../Images/post.png')}
              style={tw`w-28 h-20 mb-4`}
            />
            <Text style={tw`text-lg font-semibold text-gray-800`}>Posts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-white bg-opacity-90 w-40 p-5 rounded-2xl items-center mb-4 shadow-lg`}
            onPress={() => navigation.navigate('Posts')}>
            <Image
              source={require('../Images/chat.png')}
              style={tw`w-28 h-20 mb-4`}
            />
            <Text style={tw`text-lg font-semibold text-gray-800`}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomTabNavigator homeUrl="IntermideatorDashboard" />
    </ImageBackground>
  );
};

export default IntermideatorDashboard;
