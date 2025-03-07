import type React from 'react';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/chat/Sidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import { useAuth } from '@/utility/use-auth-client';
import { Principal } from '@dfinity/principal';

import { Chat_backend } from '@/declarations/Chat_backend';
import { UserProfile } from '@/declarations/Chat_backend/Chat_backend.did';
import { useLocation } from 'react-router-dom';
// ganti export name jadi Chat_backend
const Chat: React.FC = () => {
  const { principal } = useAuth();
  const [selectedContact, setSelectedContact] = useState<Principal | null>(
    null,
  );
  const [selectedName, setSelectedName] = useState('');
  const [contacts, setContacts] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.owner) {
      setSelectedContact(location.state.owner);
    }
  }, [location.state]);

  const findUserProfile = () => {
    if (!selectedContact) {
      console.log('No selected contact');
      return null;
    }
    const userProfile = contacts.find(contact => contact.id.toText() === selectedContact.toText());
    if (userProfile) {
      console.log('Found user profile:', userProfile);
      setSelectedName(userProfile.fullName)
    } else {
      console.log('User profile not found');
    }
  };

  const fetchContacts = async (currUser: Principal) => {
    try {
      setLoading(true);
      setError(null);
      if (currUser != null) {
        const result = await Chat_backend.getAllChats(currUser);
        if ('ok' in result) {
          setContacts(result.ok); 
        } else if ('err' in result) {
          setError('Failed to load contacts');
        }
      }
    } catch (err) {
      setError('An error occurred while fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (principal) {
      fetchContacts(principal);
      findUserProfile();
    }
  }, [principal]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        onSelectContact={setSelectedContact}
        currUser={principal}
        contacts={contacts}
      />
      <ChatWindow selectedContact={selectedContact} currUser={principal} selectedName={selectedName}/>
    </div>
  );
};

export default Chat;