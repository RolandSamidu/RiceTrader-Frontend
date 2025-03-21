import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import axios from 'axios';

const PostsScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [updatedBreed, setUpdatedBreed] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const response = await axios.get(
        `http://192.168.1.10:5000/api/posts/byuser/${id}`,
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
    setSelectedPost(post);
    setUpdatedBreed(post.breed);
    setUpdatedPrice(post.expectedPrice.toString());
    setUpdatedDescription(post.description);
    setModalVisible(true); // Open the modal
  };

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const updatedPost = {
        breed: updatedBreed,
        expectedPrice: parseFloat(updatedPrice),
        description: updatedDescription,
      };

      // Send the updated post to the backend
      await axios.put(
        `http://192.168.1.10:5000/api/posts/update/${selectedPost._id}`,
        updatedPost,
        {
          headers: {Authorization: `${token}`},
        },
      );

      Alert.alert('Success', 'Post updated successfully');
      setModalVisible(false); // Close the modal
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      Alert.alert('Error', 'Failed to update post');
    }
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

      {/* Modal for editing post */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={tw`flex-1 justify-center items-center bg-black opacity-50`}>
          <View style={tw`bg-white p-6 rounded-lg shadow-md`}>
            <Text style={tw`text-xl font-bold mb-4`}>Edit Post</Text>
            <TextInput
              style={tw`border border-gray-300 p-2 mb-4 rounded`}
              placeholder="Breed"
              value={updatedBreed}
              onChangeText={setUpdatedBreed}
            />
            <TextInput
              style={tw`border border-gray-300 p-2 mb-4 rounded`}
              placeholder="Expected Price"
              keyboardType="numeric"
              value={updatedPrice}
              onChangeText={setUpdatedPrice}
            />
            <TextInput
              style={tw`border border-gray-300 p-2 mb-4 rounded`}
              placeholder="Description"
              value={updatedDescription}
              onChangeText={setUpdatedDescription}
            />
            <View style={tw`flex-row justify-between`}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Save" onPress={handleUpdate} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PostsScreen;
