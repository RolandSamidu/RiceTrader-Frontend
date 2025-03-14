import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import * as ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/naviagations';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileType, setProfileType] = useState('Farmer');
  const [profilePicture, setProfilePicture] = useState(null);

  type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleImagePicker = () => {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    //@ts-ignore
    ImagePicker.launchImageLibrary(options, (response:any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        setProfilePicture(response.assets[0].uri);
      }
    });
  };

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !profileType) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    // Here you would typically send the data to your backend
    console.log({
      firstName,
      lastName,
      email,
      password,
      profileType,
      profilePicture,
    });

    // Navigate to the login page or home page after registration
    navigation.navigate('Login');
  };

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Register</Text>

      <Text style={tw`text-black-500`}>First Name</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 rounded mb-4`}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={tw`text-black-500`}>Last Name</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 rounded mb-4`}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={tw`text-black-500`}>Email</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 rounded mb-4`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={tw`text-black-500`}>Password</Text>
      <TextInput
        style={tw`border border-gray-300 p-2 rounded mb-4`}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={tw`text-black-500`}>User Type</Text>
      <View style={tw`border border-gray-300 rounded mb-4`}>
        <Picker
          selectedValue={profileType}
          onValueChange={(itemValue:any) => setProfileType(itemValue)}
        >
          <Picker.Item label="Farmer" value="Farmer" />
          <Picker.Item label="Intermediate" value="Intermediate" />
          <Picker.Item label="Rice Producer" value="Rice Producer" />
        </Picker>
      </View>

      <TouchableOpacity
        style={tw`bg-blue-500 p-2 rounded mb-4`}
        onPress={handleImagePicker}
      >
        <Text style={tw`text-white text-center`}>Upload Profile Picture</Text>
      </TouchableOpacity>

      {profilePicture && (
        <Image
          source={{ uri: profilePicture }}
          style={tw`w-20 h-20 rounded-full mb-4`}
        />
      )}

      <TouchableOpacity
        style={tw`bg-green-500 p-2 rounded`}
        onPress={handleRegister}
      >
        <Text style={tw`text-white text-center`}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
