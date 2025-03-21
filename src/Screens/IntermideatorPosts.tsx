/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTabNavigator from '../Components/BottomTabNavigator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IntermideatorPosts = ({ navigation }: any) => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('Farmer');

  useEffect(() => {
    fetchPosts(activeTab);
  }, [activeTab]);

  const fetchPosts = async (role:any) => {
    try {
      const response = await axios.get(
        `http://192.168.8.102:5000/api/posts/byRole/${role}`,
      );
      if (response.data && Array.isArray(response.data)) {
        //@ts-ignore
        setPosts([...response.data]);
      } else {
        console.warn('Invalid data format received:', response.data);
        setPosts([]);
      }
      console.log('data', response?.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to load posts. Please check your connection.');
      setPosts([]);
    }
  };

  //@ts-ignore
  const handleDelete = async postId => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(
        `http://192.168.8.102:5000/api/posts/delete/${postId}`,
        {
          headers: {Authorization: token},
        },
      );
      Alert.alert('Success', 'Post deleted successfully');
      fetchPosts(activeTab);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  const renderItem = ({ item }: any) => (
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
        </View>
      </View>
      <View style={tw`flex-row justify-between items-center mt-2`}>
        <Text style={tw`text-gray-500`}>{item.date} {item.time}</Text>
          {activeTab === 'Intermediate' &&
            <View style={tw`flex-row gap-2`}>
              {/* <TouchableOpacity
                onPress={() => handleEdit(item)}
                style={tw`bg-blue-500 px-3 py-1 rounded-lg`}>
                <Text style={tw`text-white`}>Edit</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => handleDelete(item._id)}
                style={tw`bg-red-500 px-3 py-1 rounded-lg`}>
                <Text style={tw`text-white`}>Delete</Text>
              </TouchableOpacity>
            </View>
          }
      </View>
    </View>
  );

  // Tab switching component
  const TabBar = () => (
    <View style={tw`flex-row bg-gray-800 p-2`}>
      <TouchableOpacity
        style={tw`flex-1 py-2 ${activeTab === 'Intermediate' ? 'bg-blue-600' : 'bg-transparent'} rounded-lg mx-1 items-center`}
        onPress={() => setActiveTab('Intermediate')}
      >
        <Text style={tw`text-white font-medium`}>My Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={tw`flex-1 py-2 ${activeTab === 'Farmer' ? 'bg-blue-600' : 'bg-transparent'} rounded-lg mx-1 items-center`}
        onPress={() => setActiveTab('Farmer')}
      >
        <Text style={tw`text-white font-medium`}>Farmer Posts</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
      style={tw`flex-1`}
    >
      <View style={tw`flex-1`}>
        {/* <View style={tw`p-4 bg-black bg-opacity-60`}>
          <Text style={tw`text-white text-2xl font-bold`}>{activeTab} Posts</Text>
        </View> */}

        <TabBar />

        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item: { id: any; }) => item.id}
          // eslint-disable-next-line react/no-unstable-nested-components
          ListEmptyComponent={() => (
            <View style={tw`flex-1 items-center justify-center mt-10`}>
              <Text style={tw`text-gray-700 text-lg`}>No posts available</Text>
            </View>
          )}
        />
        {activeTab === 'Intermediate' &&
        <TouchableOpacity
          style={tw`absolute bottom-6 right-6 bg-gray-800 w-14 h-14 rounded-full justify-center items-center shadow-lg`}
          onPress={() => navigation.navigate('CreatePost')}
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>}
      </View>

      {/* Bottom Navigation */}
      <BottomTabNavigator homeUrl="IntermideatorDashboard" />
    </ImageBackground>
  );
};

export default IntermideatorPosts;
