import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  ActivityIndicator,
  ScrollView,
  Modal,
} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';

const AllBidScreen = ({ route, navigation }:any) => {
  const { post } = route.params;
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [actionType, setActionType] = useState(null); // 'accept' or 'reject'
  const [notification, setNotification] = useState(null);
  const [notificationVisible, setNotificationVisible] = useState(false);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `${Config.API_BASE_URL}/api/bids/post/${post._id}`,
        {
          headers: { Authorization: token },
        }
      );

      if (response.data && Array.isArray(response.data)) {
        //@ts-ignore
        setBids(response.data);
      } else {
        console.warn('Invalid bids data format:', response.data);
        setBids([]);
      }
    } catch (error) {
      console.error('Error fetching bids:', error);
      Alert.alert('Error', 'Failed to load bids. Please check your connection.');
      setBids([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleBidAction = (bid:any, type:any) => {
    setSelectedBid(bid);
    setActionType(type);
    setConfirmModalVisible(true);
  };

  // const confirmBidAction = async () => {
  //   try {
  //     setConfirmModalVisible(false);
  //     const token = await AsyncStorage.getItem('token');

  //     const endpoint = actionType === 'accept'
  //     //@ts-ignore
  //       ? `http://192.168.8.178:5000/api/bids/${selectedBid._id}/accept`
  //       //@ts-ignore
  //       : `http://192.168.8.102:5000/api/bids/${selectedBid._id}/reject`;
  //     const response = await axios.put(
  //       endpoint,
  //       {},
  //       {
  //         headers: { Authorization: token },
  //       }
  //     );

  //     // Show notification if bid is accepted
  //     if (actionType === 'accept') {
  //       setNotification({
  //         //@ts-ignore
  //         bidder: `${selectedBid.bidder.firstName} ${selectedBid.bidder.lastName}`,
  //         //@ts-ignore
  //         amount: selectedBid.amount,
  //         message: 'Credit LKR 3000 from total amount',
  //         type: 'Credit'        });
  //       setNotificationVisible(true);
  //       // Update other bids to rejected status if one is accepted
  //       //@ts-ignore
  //       const otherBids = bids.filter(bid => bid._id !== selectedBid._id);
  //       if (otherBids.length > 0) {
  //         await Promise.all(
  //           //@ts-ignore
  //           otherBids.map(bid =>
  //             axios.put(
  //               //@ts-ignore
  //               `http://192.168.8.102:5000/api/bids/${bid._id}/reject`,
  //               {},
  //               { headers: { Authorization: token } }
  //             )
  //           )
  //         );
  //       }
  //     }

  //     const message = actionType === 'accept'
  //       ? 'Bid accepted successfully.'
  //       : 'Bid rejected successfully.';
  //     Alert.alert('Success', message);
  //     fetchBids();
  //   } catch (error) {
  //     console.error(`Error ${actionType}ing bid:`, error);
  //     Alert.alert('Error', `Failed to ${actionType} bid. Please try again.`);
  //   }
  // };
// const confirmBidAction = async () => {
//   if (!selectedBid) {
//     Alert.alert('Error', 'No bid selected.');
//     return;
//   }

//   try {
//     setConfirmModalVisible(false);
//     const token = await AsyncStorage.getItem('token');

//     const endpoint =
//       actionType === 'accept'
//         ? `http://192.168.8.178:5000/api/bids/accept/${selectedBid._id}`
//         : `http://192.168.8.178:5000/api/bids/reject/${selectedBid._id}`;

//     const response = await axios.put(
//       endpoint,
//       {},
//       {
//         headers: {Authorization: ` ${token}`},
//       },
//     );

//     // Show notification if bid is accepted
//     if (actionType === 'accept' && selectedBid.bidder) {
//       setNotification({
//         bidder: `${selectedBid.bidder.firstName} ${selectedBid.bidder.lastName}`,
//         amount: selectedBid.amount,
//         message: 'Credit LKR 3000 from total amount',
//         type: 'Credit',
//       });
//       setNotificationVisible(true);

//       // Update other bids to rejected status if one is accepted
//       const otherBids = bids.filter(bid => bid._id !== selectedBid._id);
//       if (otherBids.length > 0) {
//         await Promise.all(
//           otherBids.map(bid =>
//             axios.put(
//               `http://192.168.8.178:5000/api/bids/reject/${bid._id}`,
//               {},
//               {headers: {Authorization: `${token}`}},
//             ),
//           ),
//         );
//       }
//     }

//     const message =
//       actionType === 'accept'
//         ? 'Bid accepted successfully.'
//         : 'Bid rejected successfully.';
//     Alert.alert('Success', message);
//     fetchBids();
//   } catch (error) {
//     console.error(`Error ${actionType}ing bid:`, error);
//     Alert.alert('Error', `Failed to ${actionType} bid. Please try again.`);
//   }
  // };
  
  const confirmBidAction = async () => {
    if (!selectedBid) {
      Alert.alert('Error', 'No bid selected.');
      return;
    }

    try {
      setConfirmModalVisible(false);
      const token = await AsyncStorage.getItem('token');

      const endpoint =
        actionType === 'accept'
          ? `${Config.API_BASE_URL}/api/bids/accept/${selectedBid._id}`
          : `${Config.API_BASE_URL}/api/bids/reject/${selectedBid._id}`;

      const response = await axios.put(
        endpoint,
        {},
        {
          headers: {Authorization: ` ${token}`},
        },
      );

      // Show notification if bid is accepted
      if (actionType === 'accept' && selectedBid.bidder) {
        const notificationData = {
          bidder: `${selectedBid.bidder.firstName} ${selectedBid.bidder.lastName}`,
          amount: selectedBid.amount,
          message: 'Credit LKR 3000 from total amount',
          type: 'Credit',
        };

        // Save notification to AsyncStorage (for persistence)
        await AsyncStorage.setItem(
          'notification',
          JSON.stringify(notificationData),
        );

        // Navigate to Notification screen and pass notification data
        navigation.navigate('Notification', {
          notification: notificationData,
        });

        // Reject other bids
        const otherBids = bids.filter(bid => bid._id !== selectedBid._id);
        if (otherBids.length > 0) {
          await Promise.all(
            otherBids.map(bid =>
              axios.put(
                `${Config.API_BASE_URL}/api/bids/reject/${bid._id}`,
                {},
                {headers: {Authorization: `${token}`}},
              ),
            ),
          );
        }
      }

      const message =
        actionType === 'accept'
          ? 'Bid accepted successfully.'
          : 'Bid rejected successfully.';
      Alert.alert('Success', message);
      fetchBids();
    } catch (error) {
      console.error(`Error ${actionType}ing bid:`, error);
      Alert.alert('Error', `Failed to ${actionType} bid. Please try again.`);
    }
  };


  const getBidStatusColor = (status:any) => {
    switch(status) {
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const renderBidItem = ({ item }:any) => {
    const isPending = item.status === 'Pending';
    const statusStyle = getBidStatusColor(item.status);
    return (
      <View style={tw`bg-white mb-3 p-4 rounded-xl border border-gray-200`}>
        <View style={tw`flex-row justify-between items-center mb-2`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3`}>
              <Ionicons name="person" size={20} color="#3b82f6" />
            </View>
            <Text style={tw`font-bold text-lg`}>
              {item.bidder.firstName} {item.bidder.lastName}
            </Text>
          </View>
          <View style={tw`${statusStyle.split(' ')[0]} px-2 py-1 rounded-full`}>
            <Text style={tw`${statusStyle.split(' ')[1]} font-medium text-xs`}>
              {item.status}
            </Text>
          </View>
        </View>
        <View style={tw`mb-3 border-b border-gray-200 pb-3`}>
          <Text style={tw`text-2xl font-bold text-blue-600`}>Rs.{item.amount}/kg</Text>
          <Text style={tw`text-gray-500`}>
            Total value: Rs.{(item.amount * post.kilogram).toFixed(2)}
          </Text>
          <Text style={tw`text-gray-500 text-xs mt-1`}>
            Bid placed on {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}
          </Text>
        </View>
        {isPending && (
          <View style={tw`flex-row justify-end gap-2`}>
            <TouchableOpacity
              style={tw`bg-red-500 px-4 py-2 rounded-lg`}
              onPress={() => handleBidAction(item, 'reject')}
            >
              <Text style={tw`text-white font-bold`}>Reject</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`bg-green-500 px-4 py-2 rounded-lg`}
              onPress={() => handleBidAction(item, 'accept')}
            >
              <Text style={tw`text-white font-bold`}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
      style={tw`flex-1`}
    >
      <View style={tw`flex-1`}>
        <View style={tw`p-4 bg-gray-800`}>
          <TouchableOpacity
            style={tw`mb-2`}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-xl font-bold`}>Bids for Your Post</Text>
        </View>
        <ScrollView style={tw`p-4`}>
          {/* Post details card */}
          <View style={tw`bg-white p-4 rounded-xl mb-4 shadow`}>
            <Text style={tw`text-lg font-bold mb-2`}>Post Details</Text>
            <View style={tw`flex-row`}>
              {post.image ? (
                <Image
                source={{ uri: `${Config.API_BASE_URL}${post.image}` }}
                  style={tw`w-20 h-20 rounded-lg mr-4`}
                />
              ) : (
                <Image
                  source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
                  style={tw`w-20 h-20 rounded-lg mr-4`}
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
          {/* Bids section */}
          <Text style={tw`text-lg font-bold mb-2`}>Bids ({bids.length})</Text>
          {loading && !refreshing ? (
            <View style={tw`py-10 items-center`}>
              <ActivityIndicator size="large" color="#4f46e5" />
              <Text style={tw`mt-2 text-gray-600`}>Loading bids...</Text>
            </View>
          ) : bids.length === 0 ? (
            <View style={tw`bg-white p-8 rounded-xl items-center`}>
              <Ionicons name="cash-outline" size={50} color="#d1d5db" />
              <Text style={tw`mt-2 text-gray-500 text-center`}>
                No bids yet. Check back later.
              </Text>
            </View>
          ) : (
            <FlatList
              data={bids}
              renderItem={renderBidItem}
              //@ts-ignore
              keyExtractor={(item) => item._id}
              scrollEnabled={false}
            />
          )}
        </ScrollView>
        {/* Confirmation Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={confirmModalVisible}
          onRequestClose={() => setConfirmModalVisible(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`bg-white p-6 rounded-lg shadow-lg w-4/5`}>
              <Text style={tw`text-xl font-bold mb-4`}>
                {actionType === 'accept' ? 'Accept Bid' : 'Reject Bid'}
              </Text>
              <Text style={tw`mb-6`}>
                {actionType === 'accept'
                  ? 'Are you sure you want to accept this bid? Other bids will be automatically rejected.'
                  : 'Are you sure you want to reject this bid?'}
              </Text>
              {selectedBid && (
                <View style={tw`mb-4 p-3 bg-gray-100 rounded-lg`}>
                  <Text style={tw`font-medium`}>
                    {/* @ts-ignore */}
                    Bid Amount: Rs.{selectedBid.amount}/kg
                  </Text>
                  <Text>
                    {/* @ts-ignore */}
                    From: {selectedBid.bidder.firstName} {selectedBid.bidder.lastName}
                  </Text>
                </View>
              )}
              <View style={tw`flex-row justify-end gap-2`}>
                <TouchableOpacity
                  style={tw`bg-gray-300 px-4 py-2 rounded-lg`}
                  onPress={() => setConfirmModalVisible(false)}
                >
                  <Text style={tw`font-medium`}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`${actionType === 'accept' ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 rounded-lg`}
                  onPress={confirmBidAction}
                >
                  <Text style={tw`text-white font-medium`}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Notification Modal for Credit */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={notificationVisible}
          onRequestClose={() => setNotificationVisible(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`bg-white p-6 rounded-lg shadow-lg w-4/5`}>
              <View style={tw`flex-row items-center mb-4`}>
                <View style={tw`w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-3`}>
                  <Ionicons name="cash" size={20} color="#10b981" />
                </View>
                <Text style={tw`text-xl font-bold`}>Credit Notification</Text>
              </View>
              {notification && (
                <View style={tw`mb-4`}>
                  <Text style={tw`mb-2`}>
                    {/* @ts-ignore */}
                    You have accepted the bid from <Text style={tw`font-bold`}>{notification.bidder}</Text>
                  </Text>
                  <View style={tw`bg-green-50 p-3 rounded-lg mb-2`}>
                    {/* @ts-ignore */}
                    <Text style={tw`text-green-800 font-medium`}>{notification.message}</Text>
                    <Text style={tw`text-gray-600 mt-1`}>LKR 3,000 has been credited from the total amount.</Text>
                  </View>
                  <Text style={tw`text-gray-600`}>
                    Final amount to be paid:
                    {/* @ts-ignore */}
                    {notification.amount && post.kilogram && (
                      //@ts-ignore
                      <Text style={tw`font-bold`}> ₹{(notification.amount * post.kilogram - 3000).toFixed(2)}</Text>
                    )}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                style={tw`bg-blue-500 py-3 rounded-lg items-center mt-2`}
                onPress={() => setNotificationVisible(false)}
              >
                <Text style={tw`text-white font-medium`}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default AllBidScreen;
