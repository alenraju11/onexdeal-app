// mobile/src/services/ads.js
import { db, storage, auth } from './firebaseConfig';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const postAd = async ({ title, description, price, location, imageUri }) => {
  const user = auth.currentUser;
  // fetch blob from URI
  const resp = await fetch(imageUri);
  const blob = await resp.blob();
  const imgRef = ref(storage, `ads/${user.uid}/${Date.now()}.jpg`);
  const snap = await uploadBytes(imgRef, blob);
  const imageUrl = await getDownloadURL(snap.ref);

  const ad = { title, description, price: Number(price), location, imageUrl, userId: user.uid, createdAt: serverTimestamp() };
  await addDoc(collection(db, 'ads'), ad);
};

export const fetchAds = async (locationFilter) => {
  let q = query(collection(db, 'ads'), orderBy('createdAt', 'desc'));
  if (locationFilter) q = query(collection(db, 'ads'), where('location', '==', locationFilter), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
