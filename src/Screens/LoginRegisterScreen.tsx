import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginRegisterScreen = ({ navigation }:any) => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-2xl font-bold text-gray-900 mb-6">Login or Register</Text>
      <View className="w-full px-8">
        <View className="mb-4">
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
        <View className="mb-4">
          <Button
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
        <View className="mb-4">
          <Button
            title="Information"
            onPress={() => navigation.navigate('Information')}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginRegisterScreen;