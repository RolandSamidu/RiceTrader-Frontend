import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
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
     <ImageBackground
              source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
              style={styles.backgroundImage}
            >
      <View style={tw`flex-1 p-4`}>
        <Text style={tw`text-2xl font-bold mb-1 text-center`}>Welcome to the Sign In!</Text>
        <Text style={tw`text-black-500 text-center mb-6`}>Let's help you sell your harvest directly.</Text>

        <TextInput
          style={tw`bg-slate-300 p-2 rounded mb-4`}
          placeholder="Email"
          placeholderTextColor="#544a4a"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={tw`bg-slate-300 p-2 rounded mb-4`}
          placeholderTextColor="#544a4a"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={tw`flex-1 justify-end p-5 mb-12`}>
        <TouchableOpacity
            style={[tw`py-2 px-6 mb-5 w-80 mx-auto`, styles.button]}
              onPress={() => navigation.navigate('Dashboard')}
            >
            <Text style={tw`font-bold text-center text-2xl`}>Sign In</Text>
        </TouchableOpacity>
        <View style={tw`flex-row justify-center items-center`}>
                <Text style={tw`text-black-500`}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={[tw`ml-2`, styles.registerLink]}>Register</Text>
                </TouchableOpacity>
        </View>
      </View>

      </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#90EE90',
    borderRadius: 18,
  },
  registerLink: {
    color: '#1d1de2',
    // textDecorationLine: 'underline',
  },
});

export default LoginScreen;
