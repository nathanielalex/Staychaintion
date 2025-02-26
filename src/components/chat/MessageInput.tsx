'use client';

import type React from 'react';
import { useState } from 'react';
import { Principal } from '@dfinity/principal';
import { Chat_backend } from '@/declarations/Chat_backend';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  selectedContact: Principal | null;
  currUser: Principal | null;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  currUser,
  selectedContact,
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      if (currUser != null && selectedContact != null) {
        await Chat_backend.sendMessage(currUser, selectedContact, message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white border-t border-gray-300"
    >
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
