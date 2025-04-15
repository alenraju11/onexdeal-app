// mobile/src/services/chat.js
import { db, auth } from './firebaseConfig';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

export const startChat = async (otherUserId, adId) => {
  const me = auth.currentUser.uid;
  const chatId = [me, otherUserId].sort().join('_');
  const chatRef = collection(db, 'chats');
  const q = query(chatRef, where('id', '==', chatId));
  const snap = await getDocs(q);
  if (snap.empty) {
    await addDoc(chatRef, { id: chatId, users: [me, otherUserId], adId, lastMessage: '', lastTimestamp: serverTimestamp() });
  }
  return chatId;
};

export const sendMessage = async (chatId, text) => {
  const me = auth.currentUser.uid;
  const msgRef = collection(db, `chats/${chatId}/messages`);
  await addDoc(msgRef, { text, sender: me, timestamp: serverTimestamp() });
};

export const subscribeMessages = (chatId, callback) => {
  const msgRef = collection(db, `chats/${chatId}/messages`);
  const q = query(msgRef, orderBy('timestamp', 'asc'));
  return onSnapshot(q, snap => {
    const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(msgs);
  });
};
