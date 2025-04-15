// mobile/src/screens/ChatScreen.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { subscribeMessages, sendMessage } from '../services/chat';
import { auth } from '../services/firebaseConfig';

export default function ChatScreen({ route }) {
  const { chatId } = route.params;
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const unsub = subscribeMessages(chatId, setMsgs);
    return unsub;
  }, [chatId]);

  const handleSend = async () => {
    if (!text) return;
    await sendMessage(chatId, text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={msgs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={item.sender === auth.currentUser.uid ? styles.myMsg : styles.theirMsg}>
            {item.text}
          </Text>
        )}
      />
      <TextInput value={text} onChangeText={setText} style={styles.input} placeholder="Type..." />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 10 },
  myMsg: { alignSelf: 'flex-end', backgroundColor: '#dcf8c6', padding: 8, borderRadius: 4, marginVertical: 2 },
  theirMsg: { alignSelf: 'flex-start', backgroundColor: '#fff', padding: 8, borderRadius: 4, marginVertical: 2 },
});
