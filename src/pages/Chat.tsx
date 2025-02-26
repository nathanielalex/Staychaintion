import type React from 'react';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/chat/Sidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import { useAuth } from '@/utility/use-auth-client';
import { Principal } from '@dfinity/principal';

import { Chat_backend } from '@/declarations/Chat_backend';
import { UserProfile } from '@/declarations/Chat_backend/Chat_backend.did';
// ganti export name jadi Chat_backend
const Chat: React.FC = () => {
  const { principal } = useAuth();
  const [selectedContact, setSelectedContact] = useState<Principal | null>(
    null,
  );
  const [contacts, setContacts] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //iya nanti pass ke lain-lain
  const fetchContacts = async (currUser: Principal) => {
    try {
      setLoading(true);
      setError(null);
      // const actor = getChatActor();
      if (currUser != null) {
        const result = await Chat_backend.getAllChats(currUser);
        if ('ok' in result) {
          setContacts(result.ok); // Set the list of contacts if 'ok' is present
        } else if ('err' in result) {
          setError('Failed to load contacts'); // Handle the error if 'err' is present
        }
      }
      // const result = await actor.getAllChats('current-user-principal-id'); // Replace with actual user principal
    } catch (err) {
      setError('An error occurred while fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (principal) {
      // Check if principal is not null
      fetchContacts(principal);
    }
  }, [principal]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        onSelectContact={setSelectedContact}
        currUser={principal}
        contacts={contacts}
      />
      <ChatWindow selectedContact={selectedContact} currUser={principal} />
    </div>
  );
};

export default Chat;
