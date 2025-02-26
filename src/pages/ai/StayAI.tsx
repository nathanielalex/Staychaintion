import { useState } from "react";
import axios from "axios";
import { Send, Bot } from "lucide-react";

export default function ChatBot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat", { message: input });
      const aiMessage = { role: "ai", content: response.data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <Bot className="mr-2" />
        <h2 className="text-lg font-semibold">StayAI Chatbot</h2>
      </div>
      <div className="p-4 h-64 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-lg max-w-xs ${msg.role === "user" ? "ml-auto bg-blue-500 text-white" : "bg-gray-200"}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="border-t flex items-center p-2">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none text-white"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="ml-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          <Send />
        </button>
      </div>
    </div>
  );
}
