// web/src/screens/Home.jsx
import React, { useEffect, useState } from 'react';
import { fetchAds } from '../services/ads';
import AdCard from '../components/AdCard';

const Home = () => {
  const [ads, setAds] = useState([]);
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchAds(location).then(setAds);
  }, [location]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Browse Ads</h2>
      <select value={location} onChange={e => setLocation(e.target.value)}>
        <option value="">All Locations</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Bangalore">Bangalore</option>
      </select>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 20 }}>
        {ads.map(ad => <AdCard key={ad.id} ad={ad} />)}
      </div>
    </div>
  );
};

export default Home;
