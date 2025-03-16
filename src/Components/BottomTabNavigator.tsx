
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

const BottomTabNavigator = ({ navigation }: any) => {
  return (

   <View style={tw`flex-row justify-around items-center bg-white bg-opacity-70 rounded-lg p-3`}>
   <TouchableOpacity
    onPress={() => navigation.navigate('Home')}>
     <View style={tw`flex justify-center items-center`}>
       <Ionicons name="home" size={30}  />
       <Text >Home</Text>
     </View>
   </TouchableOpacity>
   <TouchableOpacity
    onPress={() => navigation.navigate('Activities')}>
     <View style={tw`flex justify-center items-center`}>
       <Ionicons name="bar-chart" size={30} />
       <Text>Activities</Text>
     </View>
   </TouchableOpacity>
   <TouchableOpacity
    onPress={() => navigation.navigate('Notification')}>
      <View style={tw`flex justify-center items-center`}>
       <Ionicons name="notifications" size={30} />
       <Text>Notification</Text>
     </View>
   </TouchableOpacity>
   <TouchableOpacity
    onPress={() => navigation.navigate('Profile')}>
      <View style={tw`flex justify-center items-center`}>
       <Ionicons name="person" size={30} />
       <Text>Account</Text>
     </View>
   </TouchableOpacity>
 </View>
  );
};

export default BottomTabNavigator;
