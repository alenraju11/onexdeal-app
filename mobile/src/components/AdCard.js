// mobile/src/components/AdCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const AdCard = ({ ad, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: ad.imageUrl }} style={styles.image} />
    <Text style={styles.title}>{ad.title}</Text>
    <Text>₹{ad.price}</Text>
    <Text>{ad.location}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { margin: 10, padding: 10, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  image: { width: '100%', height: 150, borderRadius: 4 },
  title: { fontSize: 16, fontWeight: 'bold', marginVertical: 5 },
});

export default AdCard;
