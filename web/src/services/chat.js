// web/src/services/chat.js
import { db, auth } from './firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

export const startChat = async (otherUserId, adId) => {
  const me = auth.currentUser.uid;
  const chatId = [me, otherUserId].sort().join('_');
  const chatRef = collection(db, 'chats');
  // Ensure chat doc exists
  const q = query(chatRef, where('id', '==', chatId));
  const snap = await getDocs(q);
  if (snap.empty) {
    await addDoc(chatRef, {
      id: chatId,
      users: [me, otherUserId],
      adId,
      lastMessage: '',
      lastTimestamp: serverTimestamp(),
    });
  }
  return chatId;
};

export const sendMessage = async (chatId, text) => {
  const me = auth.currentUser.uid;
  const msgRef = collection(db, `chats/${chatId}/messages`);
  await addDoc(msgRef, {
    text,
    sender: me,
    timestamp: serverTimestamp(),
  });
  // update lastMessage on chat doc
  const chatDoc = db.collection('chats').doc(chatId);
  await chatDoc.update({
    lastMessage: text,
    lastTimestamp: serverTimestamp(),
  });
};

export const fetchMessages = async (chatId, callback) => {
  const msgRef = collection(db, `chats/${chatId}/messages`);
  const q = query(msgRef, orderBy('timestamp', 'asc'));
  return onSnapshot(q, snapshot => {
    const msgs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(msgs);
  });
};

export const fetchMyChats = async (callback) => {
  const me = auth.currentUser.uid;
  const chatRef = collection(db, 'chats');
  const q = query(chatRef, where('users', 'array-contains', me), orderBy('lastTimestamp', 'desc'));
  return onSnapshot(q, snap => {
    const chats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(chats);
  });
};
