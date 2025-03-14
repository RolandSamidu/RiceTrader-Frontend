import React from 'react';
import { View, Button } from 'react-native';
import tw from 'twrnc';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <View style={tw`w-full px-8 pt-8`}>
        <View style={tw`mb-4`}>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
        <View style={tw`mb-4`}>
          <Button
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
        <View style={tw`mb-4`}>
          <Button
            title="Information"
            onPress={() => navigation.navigate('Information')}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
