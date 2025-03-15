import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';


const PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  // const navigation = useNavigation();

  // Load posts from storage when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadPosts = async () => {
        try {
          const storedPosts = await AsyncStorage.getItem('farm_posts');
          if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
          }
        } catch (error) {
          console.error('Error loading posts:', error);
        }
      };

      loadPosts();
    }, [])
  );

  // Delete post
  // const handleDelete = async (id:any) => {
  //   try {
  //       //@ts-ignore
  //     const updatedPosts = posts.filter(post => post.id !== id);
  //     await AsyncStorage.setItem('farm_posts', JSON.stringify(updatedPosts));
  //     setPosts(updatedPosts);
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //   }
  // };

  // Navigate to edit screen
  // const handleEdit = (post:any) => {
  //   //@ts-ignore
  //   navigation.navigate('EditPost', { post });
  // };

  // Navigate to create post screen
  // const navigateToCreatePost = () => {
  //       //@ts-ignore
  //   navigation.navigate('CreatePost');
  // };

    //@ts-ignore
  const renderItem = ({ item }) => (
    <View style={tw`bg-white mb-4 p-4 rounded-lg shadow-sm`}>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <Text style={tw`text-gray-500`}>{item.date} {item.time}</Text>
        <View style={tw`flex-row`}>
          <TouchableOpacity
            style={tw`mr-2`}
            // onPress={() => handleEdit(item)}
          >
            <Text style={tw`text-blue-500`}>EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={() => handleDelete(item.id)}
          >
            <Text style={tw`text-red-500`}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`flex-row`}>
        <Image
          source={{ uri: item.imageUri || 'https://via.placeholder.com/100' }}
          style={tw`w-20 h-20 rounded-lg mr-4`}
        />
        <View style={tw`flex-1`}>
          <Text style={tw`font-semibold`}>Bread - {item.breadType}</Text>
          <Text>Kg - {item.kg}</Text>
          <Text>expect price - {item.expectedPrice}/kg</Text>
          <Text>description - {item.description}</Text>
          <Text style={tw`text-gray-500 mt-1`}>BID: {item.bidCount || 4}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View style={tw`px-4 py-2 bg-white border-b border-gray-200`}>
        <Text style={tw`text-sm text-gray-500`}>The Farmer</Text>
        <Text style={tw`text-xl font-semibold`}>POST</Text>
      </View>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item: { id: any; }) => item.id}
        contentContainerStyle={tw`p-4`}
      />

      <TouchableOpacity
        style={tw`absolute bottom-6 right-6 bg-gray-800 w-14 h-14 rounded-full justify-center items-center shadow-lg`}
        // onPress={navigateToCreatePost}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default PostsScreen;
