// screens/DashboardScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
// import { RootStackParamList } from '../types/naviagations';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useNavigation } from '@react-navigation/native';
// import BottomTabNavigator from '../Components/BottomTabNavigator';
// import { UserContext } from '../context/UserContext';

const DashboardScreen = () => {
//   const { user }:any = useContext(UserContext);

//  type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

//   const navigation = useNavigation<RegisterScreenNavigationProp>();

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <View style={tw`flex-row items-center mb-4`}>
        <Image
        //   source={{ uri: user?.profilePicture }}
          style={tw`w-12 h-12 rounded-full mr-2`}
        />
        <View>
          <Text style={tw`text-lg font-bold`}>User</Text>
          <Text style={tw`text-sm text-gray-500`}>Farmer</Text>
        </View>
      </View>

      <TouchableOpacity
        style={tw`bg-blue-500 p-4 rounded mb-4`}
        // onPress={() => navigation.navigate('Price')}
      >
        <Text style={tw`text-white text-center`}>Price</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`bg-green-500 p-4 rounded mb-4`}
        // onPress={() => navigation.navigate('Post')}
      >
        <Text style={tw`text-white text-center`}>Post</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`bg-purple-500 p-4 rounded mb-4`}
        // onPress={() => navigation.navigate('Chat')}
      >
        <Text style={tw`text-white text-center`}>Chat</Text>
      </TouchableOpacity>

      {/* <BottomTabNavigator/> */}
    </View>
  );
};

export default DashboardScreen;
