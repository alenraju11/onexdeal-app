// mobile/src/screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AdCard from '../components/AdCard';
import { fetchAds } from '../services/ads';
import { auth } from '../services/firebaseConfig';

export default function ProfileScreen({ navigation }) {
  const [myAds, setMyAds] = useState([]);
  const userId = auth.currentUser.uid;

  useEffect(() => {
    fetchAds().then(ads => setMyAds(ads.filter(a => a.userId === userId)));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Ads</Text>
      <FlatList
        data={myAds}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <AdCard ad={item} onPress={() => navigation.navigate('AdDetails', { adId: item.id })} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, marginBottom: 10 },
});
