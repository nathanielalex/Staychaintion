import type React from "react"
import { useState } from "react"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"

interface ChatWindowProps {
  selectedContact: string | null
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedContact }) => {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "contact" }[]>([])

  const handleSendMessage = (text: string) => {
    setMessages([...messages, { text, sender: "user" }])
    // Simulate a response from the contact
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { text: `Reply to: ${text}`, sender: "contact" }])
    }, 1000)
  }

  if (!selectedContact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <p className="text-2xl text-gray-500">Select a contact to start chatting</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 bg-gray-200 border-b border-gray-300">
        <h2 className="text-xl font-semibold">{selectedContact}</h2>
      </div>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}

export default ChatWindow

