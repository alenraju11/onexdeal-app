import React, { useEffect, useState } from 'react';
import { db } from '../services/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function AdManagement() {
  const [ads, setAds] = useState([]);

  const fetchAds = async () => {
    const snap = await getDocs(collection(db, 'ads'));
    setAds(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => { fetchAds(); }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'ads', id));
    fetchAds();
  };

  return (
    <div>
      <h1>Manage Ads</h1>
      <ul>
        {ads.map(ad => (
          <li key={ad.id}>
            <strong>{ad.title}</strong> by {ad.userId}
            <button onClick={() => handleDelete(ad.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
