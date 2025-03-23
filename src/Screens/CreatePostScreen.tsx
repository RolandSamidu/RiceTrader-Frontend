import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { Picker } from '@react-native-picker/picker';

const CreatePostScreen = ({navigation}:any) => {
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
        'http://192.168.8.178:5000/api/posts/create',
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
    <ImageBackground
      source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
      style={styles.backgroundImage}>
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
                    <Picker.Item label="Samba" value="Samba" />
                    <Picker.Item label="Kiri" value="Kiri" />
                    <Picker.Item label="Nadu" value="Nadu" />
                    <Picker.Item label="Basmati" value="Basmati" />
                  </Picker>
              </View>
            <View style={tw`mb-4`}>
            <TextInput
              style={tw`bg-slate-300 rounded-md p-2.5`}
              placeholder="Enter price per kg"
              placeholderTextColor="#544a4a"
              value={expectedPrice}
              onChangeText={setExpectedPrice}
              keyboardType="numeric"
            /></View>
            <View style={tw`mb-4`}>
            <TextInput
              style={tw`bg-slate-300 rounded-md p-2.5`}
              placeholder="Enter quantity in kg"
              placeholderTextColor="#544a4a"
              value={kilogram}
              onChangeText={setKilogram}
              keyboardType="numeric"
            /></View>
            <View style={tw`mb-4`}>
            <TextInput
              style={tw`bg-slate-300 rounded-md p-2.5`}
              placeholder="Enter location"
              placeholderTextColor="#544a4a"
              value={location}
              onChangeText={setLocation}
            /></View>
            <View style={tw`mb-4`}>
            <TextInput
              style={tw`bg-slate-300 rounded-md p-2.5`}
              placeholder="Description"
              placeholderTextColor="#544a4a"
              value={description}
              onChangeText={setDescription}
              multiline
            />
            </View>
            <TouchableOpacity
                  style={[tw`py-2 px-6 mb-5 w-80 mx-auto`, styles.button]}
                  onPress={handleSubmit}>
                  <Text style={tw`font-bold text-center text-2xl`}>Submit</Text>
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

export default CreatePostScreen;
