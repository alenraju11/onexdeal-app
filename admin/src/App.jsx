import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import AdManagement from './screens/AdManagement';
import UserManagement from './screens/UserManagement';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="admin-container">
        <aside className="sidebar">
          <h2>OneXdeal Admin</h2>
          <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/ads">Manage Ads</Link>
            <Link to="/users">Manage Users</Link>
          </nav>
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ads" element={<AdManagement />} />
            <Route path="/users" element={<UserManagement />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
