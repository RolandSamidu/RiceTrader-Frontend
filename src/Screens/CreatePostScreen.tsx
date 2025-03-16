import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const CreatePostScreen = () => {
  const [breadType, setBreadType] = useState('');
  const [kg, setKg] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [location] = useState('');

  const navigation = useNavigation();

  // Request permissions for image picking
  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return false;
      }
    }
    return true;
  };

  // Pick image from device
  const pickImage = async () => {
    const permissionGranted = await requestPermissions();
    if (!permissionGranted) {return;}

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    //@ts-ignore
    if (!result.cancelled && result.assets && result.assets[0]) {
        //@ts-ignore
      setImageUri(result.assets[0].uri);
    }
  };

  // Save post to storage
  const savePost = async () => {
    if (!breadType || !kg || !expectedPrice) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Get current posts
      const storedPosts = await AsyncStorage.getItem('farm_posts');
      const currentPosts = storedPosts ? JSON.parse(storedPosts) : [];

      // Get current date and time
      const now = new Date();
      const dateString = `${now.getFullYear()} ${now.toLocaleString('default', { month: 'short' })} ${now.getDate().toString().padStart(2, '0')}`;
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      // Create new post
      const newPost = {
        id: Date.now().toString(),
        breadType,
        kg,
        expectedPrice,
        description,
        imageUri,
        location,
        date: dateString,
        time: timeString,
        bidCount: 4, // Default bid count
      };

      // Add new post to array
      const updatedPosts = [newPost, ...currentPosts];

      // Save to storage
      await AsyncStorage.setItem('farm_posts', JSON.stringify(updatedPosts));

      // Navigate back to posts screen
        //@ts-ignore
      navigation.navigate('Posts');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`p-4`}>
        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-gray-500`}>The Farmer</Text>
          <Text style={tw`text-xl font-semibold`}>POST</Text>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`mb-1 text-gray-600`}>Bread</Text>
          <View style={tw`border border-gray-300 rounded-md`}>
            <Picker
              selectedValue={breadType}
              onValueChange={(itemValue) => setBreadType(itemValue)}
              style={tw`h-12`}
            >
              <Picker.Item label="Select bread type" value="" />
              <Picker.Item label="SAMBA" value="SAMBA" />
              <Picker.Item label="Kiri" value="Kiri" />
              <Picker.Item label="Nadu" value="Nadu" />
              <Picker.Item label="Basmati" value="Basmati" />
            </Picker>
          </View>
        </View>
        <View style={tw`mb-4`}>
          <Text style={tw`mb-1 text-gray-600`}>Kg</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-2.5`}
            value={kg}
            onChangeText={setKg}
            placeholder="Enter quantity in kg"
            keyboardType="numeric"
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`mb-1 text-gray-600`}>Expected Price</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-2.5`}
            value={expectedPrice}
            onChangeText={setExpectedPrice}
            placeholder="Enter price per kg"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={tw`mb-4 border border-gray-300 rounded-md p-2.5 flex-row items-center justify-between`}
          onPress={pickImage}
        >
          <Text style={tw`text-gray-600`}>Image</Text>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>

        {imageUri && (
          <View style={tw`mb-4`}>
            <Image
              source={{ uri: imageUri }}
              style={tw`w-full h-40 rounded-md`}
              resizeMode="cover"
            />
          </View>
        )}

        <TouchableOpacity
          style={tw`mb-4 border border-gray-300 rounded-md p-2.5 flex-row items-center justify-between`}
        >
          <Text style={tw`text-gray-600`}>Location</Text>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>

        <View style={tw`mb-4`}>
          <Text style={tw`mb-1 text-gray-600`}>Description</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-2.5 h-32`}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
          />
        </View>

        <TouchableOpacity
          style={tw`bg-green-500 py-3 rounded-md items-center`}
          onPress={savePost}
        >
          <Text style={tw`text-white font-semibold text-lg`}>Upload</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreatePostScreen;

function alert(_arg0: string) {
    throw new Error('Function not implemented.');
}
