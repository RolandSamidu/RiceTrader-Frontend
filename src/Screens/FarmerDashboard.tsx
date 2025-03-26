import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, ImageBackground, Image, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/naviagations';
import BottomTabNavigator from '../Components/BottomTabNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

type DashboardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FarmerDashboard'
>;

interface UserProfile {
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

const FarmerDashboard = () => {
  const navigation = useNavigation<DashboardNavigationProp>();
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const role = await AsyncStorage.getItem('role');
        if (role !== 'Farmer') {
          Alert.alert('Unauthorized', 'You are not allowed here!');
          navigation.replace('Login');
          return;
        }

        const token = await AsyncStorage.getItem('token');
        if (!token) {
          navigation.replace('Login');
          return;
        }

        setUserName(role || 'User');
        
        // Fetch user profile data
        const response = await axios.get('http://192.168.8.102:5000/api/profile/profile', {
          headers: { Authorization: token },
        });

        setUserProfile(response.data);
        if (response.data.profilePicture) {
          setProfileImage(`http://192.168.8.102:5000${response.data.profilePicture}`);
        }
      } catch (err: any) {
        console.error('Failed to fetch profile:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
      style={tw`flex-1`}>
      {/* Header with Logout Button */}
      <View
        style={tw`flex-row justify-between items-center p-4 bg-black bg-opacity-60`}>
        <Text style={tw`text-white text-2xl font-bold`}>Farmer Dashboard</Text>
        <TouchableOpacity
          onPress={handleLogout}
          style={tw`bg-red-500 p-3 rounded-full shadow-lg`}>
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={tw`flex-1 p-4 justify-center`}>
        {/* Welcome Section with Profile Image */}
        <View style={tw`mb-10 items-center`}>
          <View style={tw`flex flex-row items-center gap-4 p-4 justify-center`}>{/* Profile Image */}
          {profileImage && (
            <View style={tw`relative`}>
              <Image
                source={{ uri: `${profileImage}?${Date.now()}` }} // Cache busting
                style={tw`w-16 h-16 rounded-full border-4 border-white`}
              />
            </View>
          )}
          <Text style={tw`text-3xl font-bold text-center`}>
            Welcome, {userProfile?.firstName || userName}!
          </Text></View>
          <Text style={tw`text-lg text-center`}>
            Manage your selling activities with ease.
          </Text>
        </View>

        {/* Navigation Options */}
        <View style={tw`flex-row justify-around flex-wrap`}>
          <TouchableOpacity
            style={tw`bg-white bg-opacity-90 w-40 p-5 rounded-2xl items-center mb-4 shadow-lg`}
            onPress={() => navigation.navigate('Price')}>
            <Image
              source={require('../Images/price.png')}
              style={tw`w-28 h-20 mb-4`}
            />
            <Text style={tw`text-lg font-semibold text-gray-800`}>
              Market Prices
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-white bg-opacity-90 w-40 p-5 rounded-2xl items-center mb-4 shadow-lg`}
            onPress={() => navigation.navigate('Posts')}>
            <Image
              source={require('../Images/post.png')}
              style={tw`w-28 h-20 mb-4`}
            />
            <Text style={tw`text-lg font-semibold text-gray-800`}>Posts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-white bg-opacity-90 w-40 p-5 rounded-2xl items-center mb-4 shadow-lg`}
            onPress={() => navigation.navigate('Posts')}>
            <Image
              source={require('../Images/chat.png')}
              style={tw`w-28 h-20 mb-4`}
            />
            <Text style={tw`text-lg font-semibold text-gray-800`}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomTabNavigator homeUrl="FarmerDashboard" />
    </ImageBackground>
  );
};

export default FarmerDashboard;