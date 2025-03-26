import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
import {Picker} from '@react-native-picker/picker';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/naviagations';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileType, setProfileType] = useState('Farmer');

  type LoginScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Login'
  >;
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      password,
      profilePicture: '',
      role: profileType,
    };

    try {
      const response = await fetch(
        'http://192.168.8.102:5000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Registration successful!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
      style={styles.backgroundImage}>
      <ScrollView style={tw`flex-1 p-4`}>
        <Text style={tw`text-2xl font-bold mb-1 text-center`}>
          Welcome to the registration!
        </Text>
        <Text style={tw`text-black-500 text-center mb-6`}>
          Let's help you sell your harvest directly.
        </Text>

        <TextInput
          style={tw`bg-slate-300 p-2 rounded mb-4`}
          placeholder="First Name"
          placeholderTextColor="#544a4a"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={tw`bg-slate-300 p-2 rounded mb-4`}
          placeholder="Last Name"
          placeholderTextColor="#544a4a"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={tw`bg-slate-300 p-2 rounded mb-4`}
          placeholder="Email"
          placeholderTextColor="#544a4a"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={tw`bg-slate-300 p-2 rounded mb-4`}
          placeholder="Password"
          placeholderTextColor="#544a4a"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={tw`bg-slate-300 rounded mb-4`}>
          <Picker
          style={tw`text-slate-600`}
                    dropdownIconColor="black"
            selectedValue={profileType}
            onValueChange={itemValue => setProfileType(itemValue)}>
            <Picker.Item label="Farmer" value="Farmer" />
            <Picker.Item label="Intermediate" value="Intermediate" />
            <Picker.Item label="Rice Producer" value="Rice Producer" />
          </Picker>
        </View>

        <View style={tw`flex-1 justify-end p-5 mb-12`}>
          <TouchableOpacity
            style={[tw`py-2 px-6 mb-5 w-80 mx-auto`, styles.button]}
            onPress={handleRegister}>
            <Text style={tw`font-bold text-center text-2xl`}>Register</Text>
          </TouchableOpacity>
          <View style={tw`flex-row justify-center items-center`}>
            <Text style={tw`text-black-500`}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[tw`ml-2`, styles.registerLink]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  registerLink: {
    color: '#1d1de2',
  },
});

export default RegisterScreen;
