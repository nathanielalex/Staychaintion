import type React from "react"
import { useState } from "react"
import Sidebar from "@/components/chat/Sidebar"
import ChatWindow from "@/components/chat/ChatWindow"

const Chat: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<string | null>(null)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onSelectContact={setSelectedContact} />
      <ChatWindow selectedContact={selectedContact} />
    </div>
  )
}

export default Chat

