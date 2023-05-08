import React, { createContext, useState } from 'react';

export const DropListContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
});

export const DropListProvider = ({ children }) => {
    
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropListContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DropListContext.Provider>
  );
};