import type React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/utility/use-auth-client';
import { Principal } from '@dfinity/principal';
import { Chat_backend } from '@/declarations/Chat_backend';
import { UserProfile } from '@/declarations/Chat_backend/Chat_backend.did';

interface ContactListProps {
  onSelectContact: (contact: Principal) => void;
  currUser: Principal | null;
  contacts: UserProfile[];
}

// interface User {
//   id: Principal; // Principal is usually represented as a string in the frontend
//   fullName: string;
//   email: string;
//   dateOfBirth: string; // Optional field in case you don't use it
//   profilePictureUrl: string; // Optional field in case you don't use it
//   balance: number;
// }

// interface GetAllChatsResponse {
//   tag: 'ok';
//   val: User[]; // Array of User objects in case of success
// }

// interface GetAllChatsErrorResponse {
//   tag: 'err';
//   err: string; // Error message in case of failure
// }

// const contacts = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

const ContactList: React.FC<ContactListProps> = ({
  onSelectContact,
  currUser,
  contacts,
}) => {
  // const { principal } = useAuth();
  // const [contacts, setContacts] = useState<UserProfile[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  // const fetchContacts = async (currUser: Principal) => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     // const actor = getChatActor();
  //     if (currUser != null) {
  //       const result = await Chat_backend.getAllChats(currUser);
  //       if ('ok' in result) {
  //         setContacts(result.ok); // Set the list of contacts if 'ok' is present
  //       } else if ('err' in result) {
  //         setError('Failed to load contacts'); // Handle the error if 'err' is present
  //       }
  //     }
  //     // const result = await actor.getAllChats('current-user-principal-id'); // Replace with actual user principal
  //   } catch (err) {
  //     setError('An error occurred while fetching contacts');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (principal) {
  //     // Check if principal is not null
  //     fetchContacts(principal);
  //   }
  // }, [principal]);

  return (
    <ul>
      {contacts.map((contact) => (
        <li
          key={contact.id.toString()}
          className="p-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelectContact(contact.id)}
        >
          {contact.fullName}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;