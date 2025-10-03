import React, { useState, useEffect, useRef } from "react";
import { sendMessage, getTeamMessages } from "./chatApi";
import Authnavbar from "../components/authnavbar";

const TeamChat = ({ team_id, user_id, user_name, team_name }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function loadMessages() {
      const data = await getTeamMessages(team_id);
      setMessages(data);
    }
    loadMessages();
  }, [team_id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/chat/ws/${team_id}`);
    socketRef.current = ws;

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };

    ws.onclose = () => console.log("WebSocket closed");

    return () => ws.close();
  }, [team_id]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const messageData = {
      team_id,
      sender_id: user_id,
      message: input.trim(),
      sender_name: user_name,
      timestamp: new Date().toISOString(),
    };

    await sendMessage(team_id, user_id, input.trim());
    socketRef.current.send(JSON.stringify(messageData));
    setMessages((prev) => [...prev, messageData]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      <Authnavbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md flex-shrink-0">
          <span className="font-bold text-lg">{team_name || `Team ${team_id}`}</span>
          <span className="text-sm opacity-80">{messages.length} messages</span>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender_id === user_id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-2xl shadow-md ${
                  msg.sender_id === user_id
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                }`}
              >
                <div className="font-semibold text-sm mb-1">{msg.sender_name || "Unknown"}</div>
                <p className="text-sm">{msg.message}</p>
                <div className="text-xs mt-1 opacity-60 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Bar */}
        <div className="flex items-center p-4 border-t border-gray-300 bg-white flex-shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow shadow-sm"
          />
          <button
            onClick={handleSend}
            className="ml-3 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-md transition-all disabled:bg-blue-300"
            disabled={!input.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l.643-.236a1 1 0 00.124-.31L10 9.778l5.556 7.128c.15.191.319.336.52.427l.643.236a1 1 0 001.169-1.409l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamChat;