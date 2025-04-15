// web/src/screens/PostAd.jsx
import React, { useState } from 'react';
import { postAd } from '../services/ads';

const PostAd = () => {
  const [form, setForm] = useState({ title: '', description: '', price: '', location: '', imageFile: null });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleImage = e => setForm(f => ({ ...f, imageFile: e.target.files[0] }));

  const handleSubmit = async e => {
    e.preventDefault();
    await postAd(form);
    alert('Ad posted!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20, maxWidth: 500, margin: 'auto' }}>
      <h2>Post an Ad</h2>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input name="price" placeholder="Price" onChange={handleChange} required />
      <input name="location" placeholder="Location" onChange={handleChange} required />
      <input type="file" accept="image/*" onChange={handleImage} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostAd;
