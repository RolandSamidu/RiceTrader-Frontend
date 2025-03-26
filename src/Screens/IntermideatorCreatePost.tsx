import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import Config from 'react-native-config';

const IntermideatorCreate = ({navigation}:any) => {
  const [breed, setBreed] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [kilogram, setKilogram] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Error', 'No authorization token found. Please log in.');
      return;
    }

    const postData = {
      breed,
      expectedPrice: Number(expectedPrice),
      kilogram: Number(kilogram),
      location,
      description,
    };

    try {
      const response = await fetch(
        `${Config.API_BASE_URL}/api/posts/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(postData),
        },
      );

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Post created successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-xl font-bold mb-4`}>Create a Post</Text>
      <TextInput
        style={tw`border p-2 mb-2`}
        placeholder="Breed"
        value={breed}
        onChangeText={setBreed}
      />
      <TextInput
        style={tw`border p-2 mb-2`}
        placeholder="Expected Price"
        value={expectedPrice}
        onChangeText={setExpectedPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={tw`border p-2 mb-2`}
        placeholder="Kilogram"
        value={kilogram}
        onChangeText={setKilogram}
        keyboardType="numeric"
      />
      <TextInput
        style={tw`border p-2 mb-2`}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={tw`border p-2 mb-4`}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity
        style={tw`bg-blue-500 p-3 rounded`}
        onPress={handleSubmit}>
        <Text style={tw`text-white text-center`}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IntermideatorCreate;
