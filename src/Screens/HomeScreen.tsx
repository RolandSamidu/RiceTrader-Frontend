import React from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

const HomeScreen = ({ navigation }: any) => {
  return (
     <ImageBackground
          source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
          style={styles.backgroundImage}
        >
    <View style={tw`flex-1 justify-center items-center mx-auto`}>
      <View style={tw`w-full px-8 pt-8`}>
          <TouchableOpacity
            style={[tw`py-2 px-6 mb-5`, styles.button]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={tw`font-bold text-center text-2xl`}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tw`py-2 px-6 mb-5 w-80`, styles.button]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={tw`font-bold text-center text-2xl`}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tw`py-2 px-6`, styles.button]}
            onPress={() => navigation.navigate('Informationr')}
          >
            <Text style={tw`font-bold text-center text-2xl`}>Information</Text>
          </TouchableOpacity>
      </View>
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
  button: {
    backgroundColor: '#90EE90',
    borderRadius: 18,
  },
});

export default HomeScreen;
