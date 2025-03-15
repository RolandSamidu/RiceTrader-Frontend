import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/naviagations';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the navigation prop type for the Login screen
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add a loading state

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data in AsyncStorage
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));

        // Navigate based on user role
        if (data.user.role === 'Farmer') {
          navigation.navigate('FarmerDashboard'); // Replace with your Farmer dashboard screen name
        } else if (data.user.role === 'Intermediate') {
          navigation.navigate('IntermediatorDashboard');
          } else if (data.user.role === 'Rice Producer') {
            navigation.navigate('RicemakerDashboard'); // Replace with your Admin dashboard screen name
          } else {
            navigation.navigate('Dashboard'); // Default dashboard
          }
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login.');
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

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
        style={tw`bg-blue-500 p-2 rounded mb-4 ${loading ? 'opacity-50' : ''}`}
        onPress={handleLogin}
        disabled={loading} // Disable button while loading
      >
        <Text style={tw`text-white text-center`}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={tw`text-blue-500 text-center`}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
