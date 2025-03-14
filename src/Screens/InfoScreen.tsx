import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const InfoScreen = () => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <View style={tw`w-full px-8 pt-8`}>
        <Text>Info Page</Text>
      </View>
    </View>
  );
};

export default InfoScreen;
