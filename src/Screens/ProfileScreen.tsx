import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Platform,
  Alert,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';

// Define interface for user profile
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture?: string;
}

const ProfileScreen = () => {
  // State variables
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Request storage permission for Android
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        const isReadGranted = granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED;
        const isWriteGranted = granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED;

        if (isReadGranted && isWriteGranted) {
          return true;
        } else {
          Alert.alert(
            'Permission Required', 
            'Storage access is needed to pick images. Please go to app settings and grant permissions.',
            [
              { 
                text: 'Open Settings', 
                onPress: () => Linking.openSettings()
              },
              { 
                text: 'Cancel', 
                style: 'cancel' 
              }
            ]
          );
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Fetch user profile from backend
  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get('http://192.168.8.102:5000/api/profile', {
        headers: { Authorization: token },
      });

      setUser(response.data);
      // Set profile image if exists
      if (response.data.profilePicture) {
        setProfileImage(`http://192.168.8.102:5000${response.data.profilePicture}`);
      }
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      console.error(err.message);
    }
  };

  // Pick image from device library
  const pickImage = async () => {
    // Request storage permissions
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) return;

    // Launch image picker
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 800,
      maxWidth: 800,
      quality: 0.8,
      selectionLimit: 1,
    }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Image Selection Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        
        // Create form data for upload
        const formData = new FormData();
        formData.append('profilePicture', {
          uri: selectedImage.uri,
          type: selectedImage.type || 'image/jpeg',
          name: selectedImage.fileName || `profile_${Date.now()}.jpg`
        });

        await uploadProfileImage(formData);
      }
    });
  };

  // Upload profile image to backend
  const uploadProfileImage = async (formData: FormData) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');
  
      const response = await axios.put(
        'http://192.168.8.102:5000/api/profile/image',
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.data.profilePicture) {
        const fullImageUrl = `http://192.168.8.102:5000${response.data.profilePicture}`;
        
        // Force cache update
        setProfileImage(null); // Clear first
        setTimeout(() => {
          setProfileImage(fullImageUrl);
          //@ts-ignore
          setUser(prev => ({ ...prev, profilePicture: response.data.profilePicture }));
        }, 100);
        
        Alert.alert('Success', 'Profile image updated!');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to update image');
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await axios.put(
        'http://192.168.8.102:5000/api/profile/profile',
        editedUser,
        {
          headers: { Authorization: token },
        }
      );

      // Update local state with new user data
      setUser(response.data.user);
      setIsEditModalVisible(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (err: any) {
      console.error('Update failed', err.message);
      Alert.alert('Update Failed', 'Failed to update profile: ' + err.message);
    }
  };

  // Open edit profile modal
  const openEditModal = () => {
    if (user) {
      setEditedUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
      setIsEditModalVisible(true);
    }
  };

  // Loading state
  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Error state
  if (error || !user) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-red-500`}>Error loading profile: {error}</Text>
        <TouchableOpacity onPress={fetchUserProfile} style={tw`mt-4 bg-blue-500 p-2 rounded`}>
          <Text style={tw`text-white`}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
      style={tw`flex-1`}
      blurRadius={5}
    >
      <View style={tw`flex-1`}>
        {/* White Profile Details Section */}
        <View style={tw`bg-white rounded-b-3xl shadow-lg p-6 items-center`}>
          {/* Profile Image with Edit Icon */}
          <View style={tw`relative mb-4`}>
          <Image
              key={profileImage || 'default'}
              source={
                profileImage 
                  ? { uri: `${profileImage}?${Date.now()}` } 
                  : require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')
              }
              style={tw`w-32 h-32 rounded-full border-2 border-blue-500`}
            />
            <TouchableOpacity
              onPress={pickImage}
              style={tw`absolute bottom-0 right-0 bg-blue-500 rounded-full w-10 h-10 justify-center items-center`}
            >
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={tw`text-2xl font-bold mb-2 text-gray-800`}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={tw`text-base mb-1 text-gray-600`}>Email: {user.email}</Text>
          <Text style={tw`text-base mb-4 text-gray-600`}>Role: {user.role}</Text>
          <TouchableOpacity
            onPress={openEditModal}
            style={tw`bg-blue-500 px-4 py-2 rounded-lg`}
          >
            <Text style={tw`text-white font-bold`}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Edit Profile Modal */}
        <Modal
          visible={isEditModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={tw`flex-1 justify-center items-center bg-black/50`}>
            <View style={tw`bg-white w-4/5 p-6 rounded-lg`}>
              <Text style={tw`text-xl font-bold mb-4 text-center`}>Edit Profile</Text>
              <TextInput
                style={tw`border border-gray-300 p-2 rounded mb-4`}
                placeholder="First Name"
                value={editedUser.firstName}
                onChangeText={(text) => setEditedUser(prev => ({...prev, firstName: text}))}
              />
              <TextInput
                style={tw`border border-gray-300 p-2 rounded mb-4`}
                placeholder="Last Name"
                value={editedUser.lastName}
                onChangeText={(text) => setEditedUser(prev => ({...prev, lastName: text}))}
              />
              <TextInput
                style={tw`border border-gray-300 p-2 rounded mb-4`}
                placeholder="Email"
                value={editedUser.email}
                onChangeText={(text) => setEditedUser(prev => ({...prev, email: text}))}
                keyboardType="email-address"
              />

              <View style={tw`flex-row justify-between`}>
                <TouchableOpacity
                  onPress={() => setIsEditModalVisible(false)}
                  style={tw`bg-red-500 px-4 py-2 rounded-lg mr-2`}
                >
                  <Text style={tw`text-white font-bold`}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleUpdateProfile}
                  style={tw`bg-green-500 px-4 py-2 rounded-lg`}
                >
                  <Text style={tw`text-white font-bold`}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
