import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/naviagations';

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
      if (role !== 'Intermideator') {
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
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  return (
    <View style={tw`flex-1 p-4 justify-center items-center bg-white`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Welcome, {userName}</Text>
      <Text style={tw`text-gray-600 mb-4`}>
        This is the Intermideator Dashboard.
      </Text>
      <TouchableOpacity
        style={tw`bg-red-500 p-2 rounded`}
        onPress={handleLogout}>
        <Text style={tw`text-white text-center`}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IntermideatorDashboard;
