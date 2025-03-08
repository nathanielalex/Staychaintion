import { User_backend } from '@/declarations/User_backend';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './use-auth-client';

interface RegistrationContextType {
  isRegistered: boolean;
  role: string | null;
  registerUser: () => void;
  unregisterUser: () => void;
  fetchRole: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const useRegistration = (): RegistrationContextType => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};

interface RegistrationProviderProps {
  children: ReactNode;
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const { principal } = useAuth();

  const registerUser = (): void => {
    setIsRegistered(true);
  };

  const unregisterUser = (): void => {
    setIsRegistered(false);
  };

  const fetchRole = async (): Promise<void> => {
    try {
      if(principal) {
        const response = await User_backend.getRole(principal)
        console.log('role: ', response)
        setRole(response);
      }
    } catch (error) {
      console.error('Failed to fetch role:', error);
    }
  };

  useEffect(() => {
    if (isRegistered) {
      fetchRole();
    }
  }, [isRegistered]);

  return (
    <RegistrationContext.Provider value={{ isRegistered, role, registerUser, unregisterUser, fetchRole }}>
      {children}
    </RegistrationContext.Provider>
  );
};
