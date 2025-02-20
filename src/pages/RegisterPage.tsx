import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backend } from '@/declarations/backend';

interface RegisterPageProps {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterPage({ setIsRegistered }: RegisterPageProps) {
  const [name, setName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Replace router with useNavigate

  // Handle input changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Basic form validation
    if (!name) {
      setError('Please fill in your name');
      return;
    }

    if (!dateOfBirth) {
      setError('Please provide your date of birth');
      return;
    }

    // Simulate a successful registration
    console.log('Form submitted:', name, dateOfBirth);
    await backend.registerProfile(name, dateOfBirth);
    setIsRegistered(true);
    // Redirect to a success page or home page
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#FF5A5F]">
          Sign up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1 mt-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="w-full px-3 py-2 border border-[#EBEBEB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
              required
            />
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium mb-1 mt-1"
            >
              Date of Birth
            </label>
            <input
              type="date" // Use "date" type for proper date input
              id="dateOfBirth"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
              className="w-full px-3 py-2 border border-[#EBEBEB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
              required
            />
          </div>
          {error && <p className="text-[#FF5A5F] text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#FF5A5F] text-white py-2 px-4 rounded-md hover:bg-[#FF4146] transition duration-300"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
