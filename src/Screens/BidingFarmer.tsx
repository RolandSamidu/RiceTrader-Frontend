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
          'http://192.168.8.178:5000/api/posts/byrole/Farmer',
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
      await axios.post('http://192.168.8.178:5000/api/bids/place', bidData, {
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

              {/* User input for bid amount */}
              <TextInput
                style={styles.input}
                placeholder="Enter your bid amount"
                keyboardType="numeric"
                value={bidAmount}
                onChangeText={setBidAmount} // Update the state when the user types
              />
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
