import type React from "react"

interface MessageListProps {
  messages: { text: string; sender: "user" | "contact" }[]
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`max-w-xs p-3 rounded-lg ${
            message.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black"
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>
  )
}

export default MessageList

