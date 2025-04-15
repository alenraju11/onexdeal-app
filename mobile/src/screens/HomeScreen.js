// mobile/src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Picker, StyleSheet } from 'react-native';
import AdCard from '../components/AdCard';
import { fetchAds } from '../services/ads';

export default function HomeScreen({ navigation }) {
  const [ads, setAds] = useState([]);
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchAds(location).then(setAds);
  }, [location]);

  return (
    <View style={{ flex: 1 }}>
      <Picker selectedValue={location} onValueChange={setLocation}>
        <Picker.Item label="All" value="" />
        <Picker.Item label="Delhi" value="Delhi" />
        <Picker.Item label="Mumbai" value="Mumbai" />
      </Picker>
      <FlatList
        data={ads}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <AdCard ad={item} onPress={() => navigation.navigate('AdDetails', { adId: item.id })} />
        )}
      />
    </View>
  );
}
