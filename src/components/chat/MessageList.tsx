import { useAuth } from '@/utility/use-auth-client';
import { Principal } from '@dfinity/principal';
import type React from 'react';

interface MessageListProps {
  messages: { content: string; sender: Principal | null }[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const { principal } = useAuth();
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`max-w-xs p-3 rounded-lg ${
            message.sender === principal
              ? 'bg-blue-500 text-white ml-auto'
              : 'bg-gray-300 text-black'
          }`}
        >
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default MessageList;