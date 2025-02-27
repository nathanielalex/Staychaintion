import type React from 'react';
import ContactList from '@/components/chat/ContactList';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Principal } from '@dfinity/principal';
import { UserProfile } from '@/declarations/Chat_backend/Chat_backend.did';

interface SidebarProps {
  onSelectContact: (contact: Principal) => void;
  currUser: Principal | null;
  contacts: UserProfile[];
}

const handleSubmit = () => {
  const navigate = useNavigate();
  navigate('/');
};

const Sidebar: React.FC<SidebarProps> = ({
  onSelectContact,
  currUser,
  contacts,
}) => {
  return (
    <div className="w-1/4 bg-white border-r border-gray-300">
      <div className="p-4 bg-gray-200">
        <h1 className="text-2xl font-bold">Chats</h1>
      </div>
      <ContactList
        onSelectContact={onSelectContact}
        currUser={currUser}
        contacts={contacts}
      />
      <Button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
      >
        Back to Home
      </Button>
    </div>
  );
};

export default Sidebar;