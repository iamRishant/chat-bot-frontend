// src/components/LiveChat.jsx
import React, { useState, useRef, useEffect } from 'react';

const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const ws = useRef(null); // Ref to hold the WebSocket instance
    const messagesEndRef = useRef(null);
    const userId = "user" + Math.random().toString(36).substring(7); // A simple, temporary user ID

    useEffect(() => {
        // Establish WebSocket connection
        ws.current = new WebSocket("ws://localhost:8080"); // Change this to your server's WebSocket URL

        ws.current.onopen = () => {
            console.log("WebSocket connection opened.");
        };

        // Listen for incoming messages from the server
        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prev => [...prev, message]);
        };

        ws.current.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            ws.current.close();
        };
    }, []); // Empty dependency array ensures this effect runs only once

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || !ws.current) return;

        const newMessage = {
            text: input,
            sender: userId,
            timestamp: new Date().toISOString()
        };

        // Send the message to the server via WebSocket
        ws.current.send(JSON.stringify(newMessage));
        
        setInput('');
    };

    return (
        <div className="flex-1 bg-white rounded-2xl shadow-sm border p-4 mb-4 flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Live Group Chat 💬</h2>
            <div className="flex-1 overflow-y-auto space-y-4 max-h-[60vh]">
                {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        Start the conversation!
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.sender === userId ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                    message.sender === userId
                                        ? 'bg-green-500 text-white rounded-br-none'
                                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                }`}
                            >
                                <div className="font-bold text-sm mb-1">{message.sender === userId ? 'You' : message.sender}</div>
                                <div className="whitespace-pre-wrap">{message.text}</div>
                                <div className="text-xs mt-2 text-gray-400">
                                    {new Date(message.timestamp).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex space-x-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a group message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-xl hover:from-blue-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default LiveChat;