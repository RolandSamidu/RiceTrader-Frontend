import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTabNavigator from '../Components/BottomTabNavigator';
import axios from 'axios';

const IntermideatorPosts = ({ navigation }: any) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const role = await AsyncStorage.getItem('role');
      console.log('role',role);
      if (!role) {
        console.warn('No user role found in AsyncStorage');
        return;
      }
      const response = await axios.get(
        `http://192.168.8.102:5000/api/posts/byRole/${role}`,
      );
      if (response.data && Array.isArray(response.data)) {
        //@ts-ignore
        setPosts([ ...response.data]);
      } else {
        console.warn('Invalid data format received:', response.data);
        setPosts([]);
      }
      console.log('data',response?.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to load posts. Please check your connection.');
      setPosts([]);
    }
  };

  const renderItem = ({ item }:any) => (
    <View style={tw`bg-white mb-4 p-4 m-4 rounded-xl`}>
      <View style={tw`flex-row`}>
        {item.imageUri ? (
          <Image
            source={{ uri: item.imageUri }}
            style={tw`w-20 h-20 rounded-lg mr-4`}
          />
        ) : (
          // Use local image from Images folder for example post
          <Image
            source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
            style={tw`w-20 h-20 rounded-lg mr-4`}
          />
        )}
        <View style={tw`flex-1`}>
          <Text><Text style={tw`font-semibold`}>Breed - </Text>{item.breed}</Text>
          <Text><Text style={tw`font-semibold`}>Kg - </Text>{item.kilogram}</Text>
          <Text><Text style={tw`font-semibold`}>Expect price - </Text>{item.expectedPrice}/kg</Text>
          <Text><Text style={tw`font-semibold`}>Description - </Text>{item.description}</Text>
          <Text style={tw`text-gray-500 mt-1`}>BID count: {item.bidCount || 4}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
      style={tw`flex-1`}
    >
    <View style={tw`flex-1`}>
      <View style={tw`p-4 bg-black bg-opacity-60`}>
        <Text style={tw`text-white text-2xl font-bold`}>Farmers Posts</Text>
      </View>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item: { id: any; }) => item.id}
        // contentContainerStyle={tw`p-4`}
      />

      <TouchableOpacity
        style={tw`absolute bottom-6 right-6 bg-gray-800 w-14 h-14 rounded-full justify-center items-center shadow-lg`}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
     {/* Bottom Navigation */}
     <BottomTabNavigator homeUrl="IntermideatorDashboard"/>
    </ImageBackground>
  );
};

export default IntermideatorPosts;
