import React from 'react';
import { View, Button, ScrollView, StatusBar } from 'react-native';
import tw from 'twrnc';

function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={tw`bg-gray-100 flex-1`}>
      <StatusBar barStyle="dark-content" />
      <View style={tw`p-5`}>
        <Button
          title="Start"
          onPress={() => navigation.navigate('LoginRegister')}
        />
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
