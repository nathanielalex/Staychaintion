import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:4944/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages([...newMessages, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { sender: "bot", text: "Error: AI service unavailable." }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-300">
      <h2 className="text-lg font-bold mb-2">Staychaintion AI Chat</h2>
      <div className="h-64 overflow-y-auto border p-2 rounded-md">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 ${msg.sender === "user" ? "text-right text-blue-600" : "text-gray-700"}`}>
            <span className={`px-3 py-1 rounded-lg ${msg.sender === "user" ? "bg-blue-100" : "bg-gray-200"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-md">
          <IoSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
