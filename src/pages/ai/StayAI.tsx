"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { SparklesCore } from "@/components/landing/sparkles";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll otomatis ke bawah saat ada pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Tambahkan pesan user ke state
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Kirim pesan ke backend Flask
      const response = await axios.post("http://127.0.0.1:8000/chat", {
        message: inputMessage,
      });

      // Tambahkan respon dari bot ke state
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.response || "I'm sorry, I couldn't process that.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "Error: Unable to connect to the AI service.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Ambient background with moving particles */}
      <div className="absolute inset-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#4285F4"
        />
      </div>

      <div className="relative max-w-4xl mx-auto p-4 min-h-screen flex flex-col">
        {/* Chat Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-600 text-white p-4 rounded-t-xl shadow-lg"
        >
          <div className="flex items-center space-x-3">
            <Bot className="w-6 h-6" />
            <div>
              <h1 className="font-semibold">StayAI</h1>
              <p className="text-sm text-blue-100">Ask me anything about our services</p>
            </div>
          </div>
        </motion.div>

        {/* Chat Messages */}
        <div className="flex-1 bg-white/80 backdrop-blur-sm p-4 overflow-y-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <Avatar
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      message.sender === "bot" ? "bg-blue-100" : "bg-blue-600"
                    }`}
                  >
                    {message.sender === "bot" ? (
                      <Bot className="w-6 h-6 text-blue-600" />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </Avatar>

                  <div
                    className={`rounded-2xl p-4 ${
                      message.sender === "user" ? "bg-blue-600 text-white" : "bg-blue-50 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">{message.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center space-x-2"
              >
                <Avatar className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-full">
                  <Bot className="w-6 h-6 text-blue-600" />
                </Avatar>
                <div className="bg-blue-50 rounded-full px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm p-4 rounded-b-xl border-t"
        >
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
