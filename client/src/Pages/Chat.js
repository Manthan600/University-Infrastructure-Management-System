import React, { useState } from 'react';
import Header from '../common/Header';
import './Chat.css'; // Import the CSS file for Chat component styling

export default function Chat() {
  const [messages, setMessages] = useState([
    // Initial messages
    { id: 1, content: 'Sample message 1', sender: 'other' },
    { id: 2, content: 'Sample message 2', sender: 'other' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return; // Check if message is not empty
  
    // Logic to send message
    const message = {
      id: messages.length + 1,
      content: newMessage,
      sender: 'me'
    };
    console.log("New Message:", message.content); // Debugging line to check message content
    setMessages([...messages, message.content]); // Add the new message to the messages state
    setNewMessage(''); // Clear the input field after sending
  };
  
  

  return (
    <>
      <Header />
      <h2>Chat Section</h2>
      <div className="box">
      <div className="chat-content">
  {/* Display chat messages here */}
  {messages.map(message => (
    <div key={message.id} className={`message ${message.sender === 'me' ? 'sent-by-me' : ''}`}>
      <p className="message-text">{message.content}</p>
    </div>
  ))}
</div>

        <div className="chat-input">
          {/* Input field for typing messages */}
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage} // Ensure input value is bound to newMessage state
            onChange={e => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button> {/* Button to send the message */}
        </div>
      </div>
    </>
  );
}
