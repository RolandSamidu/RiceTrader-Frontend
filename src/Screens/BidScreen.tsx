import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ImageBackground, ScrollView, Image } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigator from '../Components/BottomTabNavigator';

const BidScreen = ({ route, navigation }:any) => {
  const { post } = route.params;
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);

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
        'http://192.168.8.102:5000/api/bids/place',
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
      if (userRole === 'Intermediate') {
        navigation.navigate('IntermideatorPosts');
      } else if (userRole === 'Rice Producer') {
        navigation.navigate('RiceMakerPosts');
      } else {
        // Default fallback
        navigation.goBack();
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
        </View >
      <ScrollView>
        <View style={tw`p-4 m-4 bg-white rounded-xl`}>
          {/* <TouchableOpacity
            style={tw`absolute top-2 left-2 z-10`}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity> */}
          <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
            <View style={tw`flex-row`}>
              {post.imageUri ? (
                <Image
                  source={{ uri: post.imageUri }}
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
        </View>
      </ScrollView>
      <BottomTabNavigator homeUrl="IntermideatorDashboard" />
    </ImageBackground>
  );
};

export default BidScreen;
