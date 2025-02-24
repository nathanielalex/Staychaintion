import type React from "react"

interface ContactListProps {
  onSelectContact: (contact: string) => void
}

const contacts = ["Alice", "Bob", "Charlie", "David", "Eve"]

const ContactList: React.FC<ContactListProps> = ({ onSelectContact }) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact} className="p-4 hover:bg-gray-100 cursor-pointer" onClick={() => onSelectContact(contact)}>
          {contact}
        </li>
      ))}
    </ul>
  )
}

export default ContactList

