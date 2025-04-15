// web/src/components/AdCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdCard = ({ ad }) => (
  <div className="ad-card">
    <Link to={`/ad/${ad.id}`}>
      <img src={ad.imageUrl} alt={ad.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
      <h3>{ad.title}</h3>
      <p>₹{ad.price}</p>
      <p>{ad.location}</p>
    </Link>
  </div>
);

export default AdCard;
