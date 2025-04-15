// web/src/screens/Chat.jsx
import React, { useEffect, useState } from 'react';
import { fetchMessages, sendMessage } from '../services/chat';

const Chat = ({ chatRoomId }) => {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const unsubscribe = fetchMessages(chatRoomId, setMsgs);
    return unsubscribe;
  }, [chatRoomId]);

  const handleSend = async () => {
    if (!text) return;
    await sendMessage(chatRoomId, text);
    setText('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat</h2>
      <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10 }}>
        {msgs.map(m => (
          <div key={m.id} style={{ margin: '10px 0' }}>
            <b>{m.sender === auth.currentUser.uid ? 'You' : 'Them'}:</b> {m.text}
          </div>
        ))}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Type..." />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
