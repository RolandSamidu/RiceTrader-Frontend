import React from 'react';
import { View, Text, Button, ScrollView, StatusBar } from 'react-native';


function HomeScreen({ navigation }:any) {

    return (
      <ScrollView className="bg-gray-100 flex-1">
        <StatusBar barStyle="dark-content" />
        <View className="p-5 bg-white shadow-sm">
          <Text className="text-2xl font-bold text-gray-900">Rice Trader</Text>
        </View>
        <View className="p-5">
          <Button
            title="Start"
            onPress={() => navigation.navigate('LoginRegister')}
          />
        </View>
      </ScrollView>
    );
  }

export default HomeScreen;
