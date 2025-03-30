import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const FarmerPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState(''); // State to store the bid amount

  useEffect(() => {
    // Fetch posts for Farmer role
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${Config.API_BASE_URL}/api/posts/byrole/Farmer`,
        );
        setPosts(response.data);
      } catch (err) {
        //@ts-ignore
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
 //@ts-ignore
  const placeBid = async postId => {
     //@ts-ignore
    if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= 0) {
      Alert.alert('Invalid Bid', 'Please enter a valid bid amount.');
      return;
    }

    try {
      // Get the token from local storage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found!');
        return;
      }

      const bidData = {
        postId: postId,
        amount: parseFloat(bidAmount),
      };

      // Place bid using the second API
      await axios.post(`${Config.API_BASE_URL}/api/bids/place`, bidData, {
        headers: {
          Authorization: `${token}`,
        },
      });

      Alert.alert('Success', 'Bid placed successfully');
      setBidAmount(''); // Clear the bid input field
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
       //@ts-ignore
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <Card style={{marginBottom: 10}}>
            <Card.Title
             //@ts-ignore
              title={`Breed: ${item.breed}`}
               //@ts-ignore
              subtitle={`Location: ${item.location}`}
            />
            <Card.Content>
            {/* @ts-ignore */}
              <Text>Description: {item.description}</Text>
              {/* @ts-ignore */}
              <Text>Expected Price: {item.expectedPrice}</Text>
              {/* @ts-ignore */}
              <Text>Kilogram: {item.kilogram}</Text>

              {/* User input for bid amount */}
              <TextInput
                style={styles.input}
                placeholder="Enter your bid amount"
                keyboardType="numeric"
                value={bidAmount}
                onChangeText={setBidAmount} // Update the state when the user types
              />
            </Card.Content>
            {/* @ts-ignore */}
            <Card.Cover source={{uri: item.image}} />
            <Card.Actions>
              {/* @ts-ignore */}
              <Button title="Place Bid" onPress={() => placeBid(item._id)} />
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});

export default FarmerPostsPage;
