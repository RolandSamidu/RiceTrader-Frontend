import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const PostsScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const response = await axios.get(
        `http://192.168.1.10:5000/api/posts/byuser/${id}`,
        // {
        //   headers: {Authorization: token},
        // },
      );
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async postId => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(
        `http://192.168.1.10:5000/api/posts/delete/${postId}`,
        {
          headers: {Authorization: token},
        },
      );
      Alert.alert('Success', 'Post deleted successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = post => {
    navigation.navigate('EditPost', {post});
  };

  const renderItem = ({item}) => (
    <View
      style={tw`bg-white mb-4 p-4 rounded-lg shadow-md border border-gray-300`}>
      <Text style={tw`text-gray-500 mb-2`}>
        {item.breed} - {item.location}
      </Text>
      <Text style={tw`text-lg font-semibold`}>
        Price: {item.expectedPrice}/kg
      </Text>
      <Text>Kilogram: {item.kilogram}</Text>
      <Text style={tw`text-gray-600`}>{item.description}</Text>
      <View style={tw`flex-row justify-between mt-2`}>
        <TouchableOpacity
          onPress={() => handleEdit(item)}
          style={tw`bg-blue-500 px-3 py-1 rounded-lg`}>
          <Text style={tw`text-white`}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item._id)}
          style={tw`bg-red-500 px-3 py-1 rounded-lg`}>
          <Text style={tw`text-white`}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 p-4 bg-gray-100`}>
      <Text style={tw`text-2xl font-bold mb-4`}>My Posts</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default PostsScreen;
