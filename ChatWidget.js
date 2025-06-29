import React, { useState } from 'react';
import './ChatWidget.css';

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setMessages([...newMessages, { from: "bot", text: data.reply }]);
  };

  return (
    <div className="chat-container">
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        💬 Chat with MyPlanToday
      </button>
      {open && (
        <div className="chat-box">
          <div className="messages">
            {messages.map((msg, i) => (
              <div key={i} className={msg.from}>{msg.text}</div>
            ))}
          </div>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
