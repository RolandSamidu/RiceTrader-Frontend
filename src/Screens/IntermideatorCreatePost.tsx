import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.8.102:5000';

const IntermideatorCreatePost = ({ navigation }: any) => {
  const [breed, setBreed] = useState('');
  const [kilogram, setKilogram] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
//   const [image, setImage] = useState(null);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get auth token when component mounts
  useEffect(() => {
    const getToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('token');
        if (userToken) {
          setToken(userToken);
        } else {
          // Redirect to login if no token found
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    getToken();
  }, []);

  // Save post to backend API
  const savePost = async () => {
    if (!breed || !kilogram || !expectedPrice) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    console.log('Attempting to save post to:', `${API_URL}/api/posts/create`);
    console.log('Post data:', { breed, expectedPrice, kilogram, location, description });
    console.log('Auth token available:', !!token);

    try {
      console.log('Sending request...');
      const response = await axios.post(
        `${API_URL}/api/posts/create`,
        {
          breed,
          expectedPrice,
          kilogram,
          location,
          description,
          image: null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Response received:', response.status, response.data);
      setIsLoading(false);

      if (response.status === 201) {
        Alert.alert('Success', 'Post created successfully');
        navigation.navigate('Posts');
      }
    } catch (error:any) {
      setIsLoading(false);
      console.error('Full error:', error);
      console.error('Response data:', error.response?.data);
      console.error('Status code:', error.response?.status);
      if (error.response?.status === 401) {
        Alert.alert('Authentication Error', 'Your session has expired. Please login again.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', `Failed to create post: ${error.message}`);
      }
    }
  };

  return (
    <ImageBackground
      source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
      style={tw`flex-1`}
    >
      <View style={tw`p-4 mb-10 bg-black bg-opacity-60`}>
        <Text style={tw`text-white text-2xl font-bold`}>Create a post</Text>
      </View>

      <ScrollView style={tw`flex-1`}>
        <View style={tw`p-4`}>
          <View style={tw`bg-slate-300 rounded mb-4`}>
            <Picker
              style={tw`text-slate-600`}
              dropdownIconColor="black"
              selectedValue={breed}
              onValueChange={(itemValue) => setBreed(itemValue)}
            >
              <Picker.Item label="Select rice breed" value="" />
              <Picker.Item label="SAMBA" value="SAMBA" />
              <Picker.Item label="Kiri" value="Kiri" />
              <Picker.Item label="Nadu" value="Nadu" />
              <Picker.Item label="Basmati" value="Basmati" />
            </Picker>
          </View>
          <View style={tw`mb-4`}>
            <TextInput
              style={tw`bg-slate-300 rounded-md p-2.5`}
              value={kilogram}
              onChangeText={setKilogram}
              placeholder="Enter quantity in kg"
              placeholderTextColor="#544a4a"
              keyboardType="numeric"
            />
          </View>

          <View style={tw`mb-4`}>
            <TextInput
              style={tw`bg-slate-300 rounded-md p-2.5`}
              value={expectedPrice}
              onChangeText={setExpectedPrice}
              placeholder="Enter price per kg"
              placeholderTextColor="#544a4a"
              keyboardType="numeric"
            />
          </View>
          <View style={tw`mb-4`}>
            <TextInput
              style={tw`bg-slate-300 rounded-md p-2.5`}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter location"
              placeholderTextColor="#544a4a"
            />
          </View>

          <TouchableOpacity
            style={tw`mb-4 bg-slate-300 rounded-md p-2.5 flex-row items-center justify-between`}
          >
            <Text style={tw`text-slate-600`}>Add Image</Text>
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>

          <View style={tw`mb-4`}>
            <TextInput
              style={tw`bg-slate-300 rounded-md p-2.5 h-32`}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              placeholderTextColor="#544a4a"
              multiline
            />
          </View>
        </View>
        <View style={tw`flex-1 justify-end p-5 mb-12`}>
          <TouchableOpacity
            style={[tw`py-2 px-6 mb-5 w-80 mx-auto`, styles.button]}
            onPress={savePost}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={tw`font-bold text-center text-2xl`}>Upload</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
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
});

export default IntermideatorCreatePost;

