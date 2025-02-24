import { useScrollToBottom } from '@/hooks/useScrollToBottom';
import { delay } from '@/lib/utils';
import { Property } from '@/types';
import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface PropertyFilterContextProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export const PropertyFilterContext = createContext<PropertyFilterContextProps>({
  filter: "",
  setFilter: (filter: string) => {}
});

interface PropertyFilterProviderProps {
  children: ReactNode;
}

export const PropertyFilterProvider: React.FC<PropertyFilterProviderProps> = ({ children }) => {

  const [filter, setFilter] = useState<string>('');

  return (
    <PropertyFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </PropertyFilterContext.Provider>
  );
};