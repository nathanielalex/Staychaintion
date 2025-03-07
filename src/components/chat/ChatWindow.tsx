import type React from 'react';
import { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useAuth } from '@/utility/use-auth-client';
import { Principal } from '@dfinity/principal';

interface ChatWindowProps {
  selectedContact: Principal | null;
  currUser: Principal | null;
  selectedName: string;
}
//so add to state and put in backend
const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedContact,
  currUser,
  selectedName
}) => {
  // const { principal } = useAuth();
  const [messages, setMessages] = useState<
    { content: string; sender: Principal | null }[]
  >([]);

  const handleSendMessage = (text: string) => {
    setMessages([...messages, { content: text, sender: currUser }]);
    // setTimeout(() => {
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     { content: `Reply to: ${text}`, sender: 'contact' },
    //   ]);
    // }, 1000);
  };

  if (!selectedContact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <p className="text-2xl text-gray-500">
          Select a contact to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 bg-gray-200 border-b border-gray-300">
        {/* ini seharusnya nama usernya huhu */}
        {/* seharusnya fetch contact list di Chat */}
        <h2 className="text-xl font-semibold">{selectedName}</h2>
      </div>
      <MessageList messages={messages} />
      <MessageInput
        onSendMessage={handleSendMessage}
        currUser={currUser}
        selectedContact={selectedContact}
      />
    </div>
  );
};

export default ChatWindow;