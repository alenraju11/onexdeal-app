import React, { useEffect, useState } from 'react';
import { db } from '../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function Dashboard() {
  const [counts, setCounts] = useState({ ads: 0, users: 0 });

  useEffect(() => {
    (async () => {
      const adsSnap = await getDocs(collection(db, 'ads'));
      const usersSnap = await getDocs(collection(db, 'users'));
      setCounts({ ads: adsSnap.size, users: usersSnap.size });
    })();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Ads: {counts.ads}</p>
      <p>Total Users: {counts.users}</p>
    </div>
  );
}
