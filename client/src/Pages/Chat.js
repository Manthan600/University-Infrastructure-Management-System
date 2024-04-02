import React, { useState } from 'react';
import Header from '../common/Header';
import './Chat.css'; // Import the CSS file for Chat component styling
import { Link } from 'react-router-dom';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, content: 'Sample message 1', sender: 'other' },
    { id: 2, content: 'Sample message 2', sender: 'other' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  
  

  return (
    <>
      <Header />
      <h2>Chat Section</h2>
      <h2>Not yet implemented</h2>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to='/faculty' className='btn btn-primary'>Back</Link>
      </div>


      <div className="boxx">
      <div className="chat-content">
        
  {messages.map(message => (
    <div key={message.id} className={`message`}>
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
          <button onClick={(e)=>{e.preventDefault()}}>Send</button> {/* Button to send the message */}
        </div>
      </div>
    </>
  );
}
