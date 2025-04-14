const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// On user deletion, remove their ads and chats
exports.cleanupUserData = functions.auth.user().onDelete(async (user) => {
  const uid = user.uid;
  const db = admin.firestore();
  // Delete user's ads
  const adsSnap = await db.collection('ads').where('userId', '==', uid).get();
  const batch = db.batch();
  adsSnap.forEach(doc => batch.delete(doc.ref));
  // Delete user's chats
  const chatsSnap = await db.collection('chats').where('users', 'array-contains', uid).get();
  chatsSnap.forEach(chatDoc => {
    batch.delete(chatDoc.ref);
    // also delete subcollection messages
    const msgsRef = chatDoc.ref.collection('messages');
    msgsRef.get().then(ms => ms.forEach(m => batch.delete(m.ref)));
  });
  return batch.commit();
});

// Send push notification on new chat message
exports.onMessageCreate = functions.firestore
  .document('chats/{chatId}/messages/{msgId}')
  .onCreate(async (snap, context) => {
    const message = snap.data();
    const chatId = context.params.chatId;
    const [userA, userB] = chatId.split('_');
    const recipient = message.sender === userA ? userB : userA;
    const userDoc = await admin.firestore().collection('users').doc(recipient).get();
    const token = userDoc.data().fcmToken;
    if (token) {
      const payload = {
        notification: {
          title: 'New message',
          body: message.text,
        }
      };
      await admin.messaging().sendToDevice(token, payload);
    }
  });