// import React, { useState, useRef, useEffect } from 'react';
// import { GoogleGenAI } from "@google/genai";
// const ChatBot = () => {
//  const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);
//   const API = import.meta.env.VITE_GEMINI_API_KEY;
//   const ai = new GoogleGenAI({ apiKey: API });

//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async (message) => {
//     if (!message.trim()) return;

//     const userMessage = { text: message, sender: 'user', timestamp: new Date() };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: message,
//       });
      
//       const aiMessage = { 
//         text: response.text, 
//         sender: 'ai', 
//         timestamp: new Date() 
//       };
//       setMessages(prev => [...prev, aiMessage]);
//     } catch (error) {
//       console.error('Error:', error);
//       const errorMessage = { 
//         text: "Sorry, I encountered an error. Please try again.", 
//         sender: 'ai', 
//         timestamp: new Date(),
//         isError: true 
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     sendMessage(input);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   const clearChat = () => {
//     setMessages([]);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//               <span className="text-white font-bold text-lg">AI</span>
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-800">Hafiz Chat Bot</h1>
//               <p className="text-sm text-gray-500">Powered by Gemini 2.5 Flash</p>
//             </div>
//           </div>
//           <button
//             onClick={clearChat}
//             className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Clear Chat
//           </button>
//         </div>
//       </div>

//       {/* Chat Container */}
//       <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
//         {/* Messages Area */}
//         <div className="flex-1 bg-white rounded-2xl shadow-sm border p-4 mb-4 overflow-y-auto max-h-[70vh]">
//           {messages.length === 0 ? (
//             <div className="h-full flex items-center justify-center">
//               <div className="text-center text-gray-500">
//                 <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-700 mb-2">Start a conversation</h3>
//                 <p className="text-sm">Ask me anything and I'll do my best to help!</p>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-[80%] rounded-2xl px-4 py-3 ${
//                       message.sender === 'user'
//                         ? 'bg-blue-500 text-white rounded-br-none'
//                         : message.isError
//                         ? 'bg-red-100 text-red-800 border border-red-200'
//                         : 'bg-gray-100 text-gray-800 rounded-bl-none'
//                     }`}
//                   >
//                     <div className="whitespace-pre-wrap">{message.text}</div>
//                     <div
//                       className={`text-xs mt-2 ${
//                         message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
//                       }`}
//                     >
//                       {message.timestamp.toLocaleTimeString([], {
//                         hour: '2-digit',
//                         minute: '2-digit',
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {loading && (
//                 <div className="flex justify-start">
//                   <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none px-4 py-3 max-w-[80%]">
//                     <div className="flex space-x-2">
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>
//           )}
//         </div>

//         {/* Input Area */}
//         <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-4">
//           <div className="flex space-x-4">
//             <div className="flex-1">
//               <textarea
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Type your message here... (Press Enter to send)"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                 rows="2"
//                 disabled={loading}
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading || !input.trim()}
//               className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
//             >
//               {loading ? (
//                 <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
//                 </svg>
//               )}
//             </button>
//           </div>
//           <div className="mt-2 text-xs text-gray-500 text-center">
//             Gemini 2.5 Flash • Press Enter to send
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ChatBot



// Version 2
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useNavigate } from 'react-router-dom';
import LiveChat from '../Components/LiveChat';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  
  const API = import.meta.env.VITE_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: API });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    const savedUsername = localStorage.getItem('chatUsername');
    if (savedUsername) {
      setUsername(savedUsername);
    } else {
      const user = prompt('Please enter your name for the live chat:') || 'Anonymous';
      setUsername(user);
      localStorage.setItem('chatUsername', user);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    // Navigate to home
    navigate('/');
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = { text: message, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
      });
      
      const aiMessage = { 
        text: response.text, 
        sender: 'ai', 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, aiMessage]);
      if (messages.length === 0) {
        setTimeout(() => {
          setShowLiveChat(true);
        }, 1000);
      }

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        text: "Sorry, I encountered an error. Please try again.", 
        sender: 'ai', 
        timestamp: new Date(),
        isError: true 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Hafiz Chat Bot</h1>
              <p className="text-sm text-gray-500">Welcome, {username}!</p>
              {/* <p className="text-sm text-gray-500">Powered by Gemini 2.5 Flash</p> */}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Live Chat Toggle Button */}
            <button
              onClick={() => setShowLiveChat(!showLiveChat)}
              className="px-4 py-2 text-sm text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors font-medium flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Live Chat</span>
            </button>
            <button
              onClick={clearChat}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Chat
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors font-medium flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border p-4 mb-4 overflow-y-auto max-h-[70vh]">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Start a conversation</h3>
                <p className="text-sm">Ask me anything and I'll do my best to help!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : message.isError
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.text}</div>
                    <div
                      className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none px-4 py-3 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... (Press Enter to send)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="2"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
          {/* <div className="mt-2 text-xs text-gray-500 text-center">
            Gemini 2.5 Flash • Press Enter to send
          </div> */}
        </form>
      </div>
      <LiveChat
        isOpen={showLiveChat}
        onClose={()=>setShowLiveChat(false)}
        username={username}
        />
    </div>
  );
}

export default ChatBot;