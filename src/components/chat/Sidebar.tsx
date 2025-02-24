import type React from "react"
import ContactList from "@/components/chat/ContactList"

interface SidebarProps {
  onSelectContact: (contact: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectContact }) => {
  return (
    <div className="w-1/4 bg-white border-r border-gray-300">
      <div className="p-4 bg-gray-200">
        <h1 className="text-2xl font-bold">Chats</h1>
      </div>
      <ContactList onSelectContact={onSelectContact} />
    </div>
  )
}

export default Sidebar

