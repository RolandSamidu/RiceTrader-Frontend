import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, Alert} from 'react-native';
import axios from 'axios';
import {Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FarmerPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts for Farmer role
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'http://192.168.1.10:5000/api/posts/byrole/Farmer',
        );
        setPosts(response.data);
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const placeBid = async postId => {
    try {
      // Get the token from local storage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found!');
        return;
      }

      const bidData = {
        postId: postId,
        amount: 4500,
      };

      // Place bid using the second API
      await axios.post('http://192.168.1.10:5000/api/bids/place', bidData, {
        headers: {
          Authorization: `${token}`,
        },
      });

      Alert.alert('Success', 'Bid placed successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to place bid');
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={{padding: 20}}>
      <FlatList
        data={posts}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <Card style={{marginBottom: 10}}>
            <Card.Title
              title={`Breed: ${item.breed}`}
              subtitle={`Location: ${item.location}`}
            />
            <Card.Content>
              <Text>Description: {item.description}</Text>
              <Text>Expected Price: {item.expectedPrice}</Text>
              <Text>Kilogram: {item.kilogram}</Text>
            </Card.Content>
            <Card.Cover source={{uri: item.image}} />
            <Card.Actions>
              <Button title="Place Bid" onPress={() => placeBid(item._id)} />
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
};

export default FarmerPostsPage;
