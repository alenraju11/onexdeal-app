// web/src/screens/Profile.jsx
import React, { useEffect, useState } from 'react';
import { auth } from '../services/firebaseConfig';
import { fetchAds } from '../services/ads';
import AdCard from '../components/AdCard';

const Profile = () => {
  const [myAds, setMyAds] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchAds().then(ads => setMyAds(ads.filter(ad => ad.userId === user.uid)));
    }
  }, [user]);

  return (
    <div style={{ padding: 20 }}>
      <h2>{user.displayName}'s Profile</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
        {myAds.map(ad => <AdCard key={ad.id} ad={ad} />)}
      </div>
    </div>
  );
};

export default Profile;
