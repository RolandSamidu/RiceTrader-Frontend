import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/naviagations';

// Define the navigation prop type for the Login screen
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = () => {
  //   if (!email || !password) {
  //     Alert.alert('Error', 'Please fill out all fields');
  //     return;
  //   }

  //   // Here you would typically send the data to your backend for authentication
  //   console.log({ email, password });

  //   // Navigate to the Dashboard screen after successful login
  //   navigation.navigate('Dashboard');
  // };

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Login</Text>

      <Text style={tw`text-black-500`}>Email</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 rounded mb-4`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={tw`text-black-500`}>Password</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 rounded mb-4`}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={tw`bg-blue-500 p-2 rounded mb-4`}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={tw`text-white text-center`}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={tw`text-blue-500 text-center`}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
