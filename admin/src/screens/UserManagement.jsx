import React, { useEffect, useState } from 'react';
import { db } from '../services/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const snap = await getDocs(collection(db, 'users'));
    setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    fetchUsers();
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            <strong>{u.name}</strong> ({u.email})
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
