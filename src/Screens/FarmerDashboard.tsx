import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackNavigationProps } from '../types/naviagations';

const FarmerDashboard: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProps<'FarmerDashboard'>['navigation']>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-green-100`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Farmer Dashboard</Text>
      <Text style={tw`mb-4`}>Welcome, Farmer!</Text>

      <TouchableOpacity style={tw`bg-red-500 p-3 rounded`} onPress={handleLogout}>
        <Text style={tw`text-white`}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FarmerDashboard;