// web/src/services/ads.js
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

export const postAd = async ({ title, description, price, location, imageFile }) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  // 1) upload image
  const imgRef = ref(storage, `ads/${user.uid}/${Date.now()}_${imageFile.name}`);
  const snap = await uploadBytes(imgRef, imageFile);
  const imageUrl = await getDownloadURL(snap.ref);

  // 2) save ad doc
  const ad = {
    title,
    description,
    price: Number(price),
    location,
    imageUrl,
    userId: user.uid,
    createdAt: serverTimestamp(),
  };
  await addDoc(collection(db, 'ads'), ad);
};

export const fetchAds = async (locationFilter) => {
  let q = query(collection(db, 'ads'), orderBy('createdAt', 'desc'));
  if (locationFilter) {
    q = query(collection(db, 'ads'), where('location', '==', locationFilter), orderBy('createdAt', 'desc'));
  }
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
