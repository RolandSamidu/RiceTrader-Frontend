import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = ({route}: any) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loadNotification = async () => {
      if (route.params?.notification) {
        setNotification(route.params.notification);
      } else {
        const storedNotification = await AsyncStorage.getItem('notification');
        if (storedNotification) {
          setNotification(JSON.parse(storedNotification));
        }
      }
    };

    loadNotification();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification</Text>
      {notification ? (
        <View style={styles.notificationBox}>
          <Text>Bidder: {notification.bidder}</Text>
          <Text>Amount: LKR {notification.amount}</Text>
          <Text>Message: {notification.message}</Text>
          <Text>Type: {notification.type}</Text>
        </View>
      ) : (
        <Text>No notifications available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 10},
  notificationBox: {padding: 15, borderWidth: 1, borderRadius: 8},
});

export default NotificationScreen;
