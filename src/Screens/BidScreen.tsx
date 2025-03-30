import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ImageBackground, ScrollView, Image, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigator from '../Components/BottomTabNavigator';
import Config from 'react-native-config';

const BidScreen = ({ route, navigation }:any) => {
  const { post } = route.params;
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [bids, setBids] = useState([]);
  const [loadingBids, setLoadingBids] = useState(false);

  // Fetch all bids for this post
  const fetchBids = async () => {
    setLoadingBids(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `${Config.API_BASE_URL}/api/bids/post/${post._id}`,
        {
          headers: {Authorization: token},
        }
      );
      setBids(response.data);
    } catch (error) {
      console.error('Error fetching bids:', error);
    } finally {
      setLoadingBids(false);
    }
  };

  // Load bids when the component mounts
  useEffect(() => {
    fetchBids();
  }, []);

  const handleBid = async () => {
    if (!bidAmount || isNaN(parseFloat(bidAmount))) {
      Alert.alert('Error', 'Please enter a valid bid amount');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const userRole = await AsyncStorage.getItem('role');
      const response = await axios.post(
        `${Config.API_BASE_URL}/api/bids/place`,
        {
          postId: post._id,
          amount: parseFloat(bidAmount),
        },
        {
          headers: {Authorization: token},
        },
      );
      console.log(response);
      Alert.alert('Success', 'Bid placed successfully!');
      // Refresh the bids after placing a new one
      fetchBids();
      // Clear the bid amount
      setBidAmount('');
      if (userRole === 'Intermediate') {
        // Don't navigate away, just stay on the page to see updated bids
        // navigation.navigate('IntermideatorPosts');
      } else if (userRole === 'Rice Producer') {
        // navigation.navigate('RiceMakerPosts');
      } else {
        // Default fallback
        // navigation.goBack();
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      Alert.alert('Error', 'Failed to place bid. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
      style={tw`flex-1`}
    >
      <View style={tw`p-4 bg-gray-800 mb-6`}>
          <Text style={tw`mx-auto text-white text-2xl font-bold`}>Place a Bid</Text>
      </View>
      <ScrollView>
        <View style={tw`p-4 m-4 bg-white rounded-xl`}>
          <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
            <View style={tw`flex-row`}>
              {post.image ? (
                       <Image
                         source={{ uri: `${Config.API_BASE_URL}${post.image}` }}
                  style={tw`w-24 h-24 rounded-lg mr-4`}
                />
              ) : (
                <Image
                  source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
                  style={tw`w-24 h-24 rounded-lg mr-4`}
                />
              )}
              <View style={tw`flex-1`}>
                <Text><Text style={tw`font-semibold`}>Breed: </Text>{post.breed}</Text>
                <Text><Text style={tw`font-semibold`}>Kg: </Text>{post.kilogram}</Text>
                <Text><Text style={tw`font-semibold`}>Expected price: </Text>{post.expectedPrice}/kg</Text>
                <Text><Text style={tw`font-semibold`}>Description: </Text>{post.description}</Text>
              </View>
            </View>
            <Text style={tw`text-gray-500 mt-2`}>{post.date} {post.time}</Text>
          </View>
          <View style={tw`mb-6`}>
            <Text style={tw`text-lg font-semibold mb-2`}>Your Bid Amount (per kg)</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3 text-lg`}
              placeholder="Enter your bid amount"
              keyboardType="numeric"
              value={bidAmount}
              onChangeText={setBidAmount}
            />
            <Text style={tw`text-gray-500 mt-1`}>
              Total bid: Rs.{bidAmount && !isNaN(parseFloat(bidAmount))
                ? (parseFloat(bidAmount) * parseFloat(post.kilogram)).toFixed(2)
                : '0.00'}
            </Text>
          </View>
          <TouchableOpacity
            style={tw`bg-blue-600 rounded-lg py-3 items-center ${loading ? 'opacity-70' : ''}`}
            onPress={handleBid}
            disabled={loading}
          >
            <Text style={tw`text-white font-bold text-lg`}>
              {loading ? 'Placing Bid...' : 'Place Bid'}
            </Text>
          </TouchableOpacity>
          <View style={tw`mt-4 p-3 bg-gray-100 rounded-lg`}>
            <Text style={tw`text-gray-700`}>
              <Text style={tw`font-semibold`}>Note: </Text>
              Once you place a bid, the farmer will be notified and can choose to accept or reject your offer.
            </Text>
          </View>

          {/* Bids Section */}
          <View style={tw`mt-6`}>
            <Text style={tw`text-xl font-bold mb-3`}>All Bids</Text>
            {loadingBids ? (
              <ActivityIndicator size="large" color="#4287f5" />
            ) : bids.length > 0 ? (
              bids.map((bid, index) => (
                //@ts-ignore
                <View key={bid._id || index} style={tw`bg-gray-50 p-3 rounded-lg mb-2 border border-gray-200`}>
                  <View style={tw`flex-row justify-between`}>
                    <Text style={tw`font-medium`}>
                      {/* @ts-ignore */}
                      {bid.bidder.firstName} {bid.bidder.lastName}
                    </Text>
                    {/* @ts-ignore */}
                    <Text style={tw`text-blue-600 font-bold`}>Rs. {bid.amount}/kg</Text>
                  </View>
                  <View style={tw`flex-row justify-between mt-1`}>
                    {/* @ts-ignore */}
                    <Text style={tw`text-gray-500`}>{bid.bidder.role}</Text>
                    {/* @ts-ignore */}
                    <Text style={tw`text-gray-500`}>Total: Rs. {(bid.amount * parseFloat(post.kilogram)).toFixed(2)}</Text>
                  </View>
                  <Text style={tw`text-gray-400 text-xs mt-1`}>
                    {/* @ts-ignore */}
                    {new Date(bid.createdAt).toLocaleDateString()} {new Date(bid.createdAt).toLocaleTimeString()}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={tw`text-gray-500 italic`}>No bids have been placed on this post yet.</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <BottomTabNavigator homeUrl="IntermideatorDashboard" />
    </ImageBackground>
  );
};

export default BidScreen;
