import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  // Image,
  // Platform,
  Alert,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const CreatePostScreen = () => {
  const [riceType, setRiceType] = useState('');
  const [kg, setKg] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [description, setDescription] = useState('');
  // const [imageUri, setImageUri] = useState(null);
  const [location] = useState('');

  const navigation = useNavigation();

  // Request permissions for image picking
  // const requestPermissions = async () => {
  //   if (Platform.OS !== 'web') {
  //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== 'granted') {
  //       Alert.alert('Sorry, we need camera roll permissions to make this work!');
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  // Pick image from device
  // const pickImage = async () => {
  //   const permissionGranted = await requestPermissions();
  //   if (!permissionGranted) {return;}

  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   //@ts-ignore
  //   if (!result.cancelled && result.assets && result.assets[0]) {
  //       //@ts-ignore
  //     setImageUri(result.assets[0].uri);
  //   }
  // };

  // Save post to storage
  const savePost = async () => {
    if (!riceType || !kg || !expectedPrice) {
      Alert.alert('Please fill in all required fields');
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
        riceType,
        kg,
        expectedPrice,
        description,
        // imageUri,
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
      Alert.alert('Failed to save post. Please try again.');
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
          selectedValue={riceType}
          onValueChange={(itemValue:any) => setRiceType(itemValue)}
        >
          <Picker.Item label="Select rice type" value="" />
              <Picker.Item label="SAMBA" value="SAMBA" />
              <Picker.Item label="Kiri" value="Kiri" />
              <Picker.Item label="Nadu" value="Nadu" />
              <Picker.Item label="Basmati" value="Basmati" />
        </Picker>
      </View>
        <View style={tw`mb-4`}>
          <TextInput
            style={tw`bg-slate-300 rounded-md p-2.5`}
            value={kg}
            onChangeText={setKg}
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

        {/* <TouchableOpacity
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
        )} */}

        <TouchableOpacity
          style={tw`mb-4 bg-slate-300 rounded-md p-2.5 flex-row items-center justify-between`}
        >
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
              >
            <Text style={tw`font-bold text-center text-2xl`}>Upload</Text>
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
