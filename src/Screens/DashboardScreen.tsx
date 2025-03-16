import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image } from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DashboardScreen = ({ navigation }: any) => {
  return (
    <ImageBackground
      source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')} // Replace with your image path
      style={styles.backgroundImage}
    >
      <View style={tw`flex-1 p-4 justify-center`}>
        {/* Welcome Section */}
        <View style={tw`mb-8 mx-auto`}>
          <Text style={tw`text-3xl font-bold  text-center`}>Welcome Yomal!</Text>
          <Text style={tw`text-xl text-gray-600  text-center`}>The Farmer</Text>
        </View>

        <View style={tw`w-full mx-auto`}>
        {/* Navigation Options */}
          <View style={tw`flex justify-between my-4 mx-auto`}>
            <TouchableOpacity style={[tw`items-center mb-4`, styles.navButton]}
             onPress={() => navigation.navigate('Dashboard')}>
              <Image
                source={require('../Images/price.png')}
                style={tw`w-48 h-34`}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[tw`items-center mb-4`, styles.navButton]}
              onPress={() => navigation.navigate('Posts')}>
              <Image
                source={require('../Images/post.png')}
                style={tw`w-48 h-34`}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[tw`items-center`, styles.navButton]}
              onPress={() => navigation.navigate('Dashboard')}>
              <Image
                source={require('../Images/chat.png')}
                style={tw`w-48 h-34`}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Bottom Navigation */}
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  navButton: {
    width: '40%',
  },
});

export default DashboardScreen;
