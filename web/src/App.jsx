// web/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import PostAd from './screens/PostAd';
import Profile from './screens/Profile';
import Chat from './screens/Chat';
import { signInWithGoogle, logout } from './services/auth';

function App() {
  return (
    <BrowserRouter>
      <header style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={signInWithGoogle}>Login with Google</button>
        <button onClick={logout}>Logout</button>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostAd />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat/:chatRoomId" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
