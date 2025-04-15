// mobile/src/screens/PostAdScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { postAd } from '../services/ads';

export default function PostAdScreen() {
  const [form, setForm] = useState({ title: '', description: '', price: '', location: '' });
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({ base64: false });
    if (!canceled) setImageUri(assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!imageUri) return Alert.alert('Please pick an image');
    await postAd({ ...form, imageUri });
    Alert.alert('Ad posted!');
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" onChangeText={t => setForm(f => ({ ...f, title: t }))} style={styles.input} />
      <TextInput placeholder="Description" onChangeText={t => setForm(f => ({ ...f, description: t }))} style={[styles.input, { height: 80 }]} multiline />
      <TextInput placeholder="Price" keyboardType="numeric" onChangeText={t => setForm(f => ({ ...f, price: t }))} style={styles.input} />
      <TextInput placeholder="Location" onChangeText={t => setForm(f => ({ ...f, location: t }))} style={styles.input} />
      <Button title="Pick Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, margin: 10 }} />}
      <Button title="Post Ad" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 4 },
});
