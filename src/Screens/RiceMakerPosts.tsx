import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';

const PostsScreen = ({ navigation }: any) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      if (!id) {
        console.warn('No user ID found in AsyncStorage');
        return;
      }
      const response = await axios.get(
        `${Config.API_BASE_URL}/api/posts//byRole/Intermediate`,
      );
      if (response.data && Array.isArray(response.data)) {
        //@ts-ignore
        setPosts([ ...response.data]);
      } else {
        console.warn('Invalid data format received:', response.data);
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to load posts. Please check your connection.');
      setPosts([]);
    }
  };

  const renderItem = ({item}:any) => (
    <TouchableOpacity
      style={tw`bg-white mb-4 p-4 m-4 rounded-xl`}
      onPress={() => {navigation.navigate('Bid', { post: item });}
      }
      >
      <View style={tw`flex-row`}>
        {item.imageUri ? (
          <Image
            source={{ uri: item.imageUri }}
            style={tw`w-20 h-20 rounded-lg mr-4`}
          />
        ) : (
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
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
    source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
    style={tw`flex-1`}
  >
      <View style={tw`flex-1`}>
        <View style={tw`p-4 bg-black bg-opacity-60`}>
          <Text style={tw`text-white text-2xl font-bold`}>Intermediate Posts</Text>
        </View >
        <FlatList
          data={posts}
          renderItem={renderItem}
          //@ts-ignore
          keyExtractor={item => item._id}
        />
        <TouchableOpacity
          style={tw`absolute bottom-6 right-6 bg-gray-800 w-14 h-14 rounded-full justify-center items-center shadow-lg`}
          onPress={() => navigation.navigate('CreatePost')}
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default PostsScreen;
