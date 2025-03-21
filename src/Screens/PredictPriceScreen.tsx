import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';
import tw from 'twrnc';

const PredictPriceScreen = () => {
  const [date, setDate] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    if (!date) {
      Alert.alert('Error', 'Please enter a date in YYYY-MM-DD format');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.10:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({date}),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data);
      } else {
        Alert.alert('Error', data.error || 'Failed to get prediction');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../Images/75560505eb0c78d33055db774546a8c0.jpeg')}
      style={styles.backgroundImage}>
      <View style={tw`flex-1 p-4 justify-center`}>
        <Text style={tw`text-2xl font-bold text-center mb-4`}>
          Predict Rice Prices
        </Text>

        <TextInput
          style={tw`bg-slate-300 p-2 rounded mb-4`}
          placeholder="Enter Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
        />

        <TouchableOpacity
          style={[tw`py-2 px-6 mb-5 w-80 mx-auto`, styles.button]}
          onPress={handlePredict}>
          <Text style={tw`font-bold text-center text-2xl`}>Predict</Text>
        </TouchableOpacity>

        {prediction && (
          <View style={tw`bg-white p-4 rounded shadow-lg mt-4`}>
            <Text style={tw`text-lg font-bold text-center`}>
              Predicted Prices
            </Text>
            {Object.keys(prediction).map(
              key =>
                key !== 'date' && (
                  <Text key={key} style={tw`text-center text-lg mt-1`}>
                    {/* @ts-ignore */}
                    {key}: {prediction[key].toFixed(2)} LKR
                  </Text>
                ),
            )}
          </View>
        )}
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

export default PredictPriceScreen;
