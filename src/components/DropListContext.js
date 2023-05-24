import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DropListContext = createContext({
  isOpen: false,
  setIsOpen: () => { },
});

export const DropListProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [groups, setGroups] = useState([]);
  const [lists, setLists] = useState([]);

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/groups/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setGroups(response.data);
    } catch (error) {
      console.error('Error al obtener los grupos:', error);
    }
  };

  const fetchLists = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/lists/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setLists(response.data);
    } catch (error) {
      console.error('Error al obtener las listas:', error);
    }
  };

  const setGroupsLists = () => {
    fetchGroups();
    fetchLists();
  }

  useEffect(() => {
    fetchGroups();
    fetchLists();
  }, []);

  return (
    <DropListContext.Provider value={{ isOpen, setIsOpen, groups, lists, setGroupsLists }}>
      {children}
    </DropListContext.Provider>
  );
};