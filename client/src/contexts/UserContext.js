import React, { createContext } from 'react';
import useSector from 'hooks/useSector';
import useUser from 'hooks/useUser';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user] = useUser();
  const [sectorHealthDataPass] = useSector();
  return (
    <UserContext.Provider value={{ user, sectorHealthDataPass }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
