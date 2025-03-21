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
  ImageBackground,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PostsScreen = ({ navigation }: any) => {

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
      if (!id) {
        console.warn('No user ID found in AsyncStorage');
        return;
      }
      const response = await axios.get(
        `http://192.168.8.102:5000/api/posts/byUser/${id}`,
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
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  //@ts-ignore
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

      await axios.put(
          //@ts-ignore
        `http://192.168.8.102:5000/api/posts/update/${selectedPost._id}`,
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

  const renderItem = ({item}:any) => (
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
        <View style={tw`flex-row gap-2`}>
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
   </View>
  );

  return (
    <ImageBackground
    source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
    style={tw`flex-1`}
  >
      <View style={tw`flex-1`}>
        <View style={tw`p-4 bg-black bg-opacity-60`}>
          <Text style={tw`text-white text-2xl font-bold`}>My Posts</Text>
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
        {/* Modal for editing post */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={tw`flex-1 justify-center items-center bg-black opacity-80`}>
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
              <View style={tw`flex-row justify-center gap-4`}>
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                  color="#FF6B6B"/>
                <Button title="Save" onPress={handleUpdate} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default PostsScreen;
