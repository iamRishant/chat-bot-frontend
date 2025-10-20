import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const LiveChat = ({ isOpen, onClose, username }) => {
  const [socket, setSocket] = useState(null);
  const [liveMessages, setLiveMessages] = useState([]);
  const [liveInput, setLiveInput] = useState('');
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Initialize socket connection
      const newSocket = io(import.meta.env.VITE_BACKEND_SOCKET_API_URL); // Your backend URL
      setSocket(newSocket);

      // Join chat
      newSocket.emit('join_chat', { username });

      // Listen for messages
      newSocket.on('new_live_message', (message) => {
        setLiveMessages(prev => [...prev, message]);
      });

      newSocket.on('users_list', (users) => {
        setConnectedUsers(users);
      });

      newSocket.on('user_joined', (data) => {
        setLiveMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'system',
          text: data.message,
          timestamp: new Date()
        }]);
      });

      newSocket.on('user_left', (data) => {
        setLiveMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'system',
          text: data.message,
          timestamp: new Date()
        }]);
      });

      newSocket.on('user_typing', (data) => {
        setTypingUsers(prev => {
          if (!prev.find(user => user.userId === data.userId)) {
            return [...prev, data];
          }
          return prev;
        });
      });

      newSocket.on('user_stop_typing', (data) => {
        setTypingUsers(prev => prev.filter(user => user.userId !== data.userId));
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [isOpen, username]);

  useEffect(() => {
    scrollToBottom();
  }, [liveMessages, typingUsers]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendLiveMessage = (e) => {
    e.preventDefault();
    if (!liveInput.trim() || !socket) return;

    socket.emit('live_message', {
      text: liveInput
    });

    setLiveInput('');
    socket.emit('typing_stop');
  };

  const handleTyping = () => {
    if (socket) {
      socket.emit('typing_start');
    }
  };

  const handleInputChange = (e) => {
    setLiveInput(e.target.value);
    handleTyping();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-2xl shadow-2xl border flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div>
          <h3 className="font-bold">Live Chat</h3>
          <p className="text-xs text-green-100">
            {connectedUsers.length} users online
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-green-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-3">
          {liveMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === 'system' 
                  ? 'justify-center' 
                  : message.userId === socket?.id 
                    ? 'justify-end' 
                    : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                  message.type === 'system'
                    ? 'bg-yellow-100 text-yellow-800 text-xs italic'
                    : message.userId === socket?.id
                    ? 'bg-green-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
              >
                {message.type !== 'system' && message.userId !== socket?.id && (
                  <div className="text-xs font-medium text-green-600 mb-1">
                    {message.username}
                  </div>
                )}
                <div className="text-sm">{message.text}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.type === 'system'
                      ? 'text-yellow-600'
                      : message.userId === socket?.id
                      ? 'text-green-200'
                      : 'text-gray-500'
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicators */}
          {typingUsers.map((user) => (
            <div key={user.userId} className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-3 py-2">
                <div className="text-xs text-gray-500 mb-1">{user.username} is typing</div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          ))}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <form onSubmit={sendLiveMessage} className="p-3 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={liveInput}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            disabled={!liveInput.trim()}
            className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiveChat;