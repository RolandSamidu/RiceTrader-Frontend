import React from 'react';
import { View, ScrollView, StatusBar, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

function WelcomeScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={tw`flex-1 justify-center`}>
        <StatusBar barStyle="dark-content" />
        <View style={tw`flex-1 justify-center p-5 mb-8`}>
            <Text style={tw`text-black font-bold text-center text-3xl`}>The Platform to sell your harvest</Text>
            <Text style={tw`text-gray-800 leading-1 text-center text-lg mt-3`}>A platform enabling farmers to sell their harvest directly ensuring fair pricing and promoting efficient,transparent and profitable agricultural trade.</Text>
        </View>
        <View style={tw`flex-1 justify-end p-5 mb-8`}>
          <TouchableOpacity
            style={[tw`py-2 px-6`, styles.button]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={tw`text-black font-bold text-center text-2xl`}>Start</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#90EE90',
    borderRadius: 18,
  },
});


export default WelcomeScreen;
