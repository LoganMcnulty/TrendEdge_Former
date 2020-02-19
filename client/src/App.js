import React from 'react';
import { UserProvider } from 'contexts/UserContext';
import Template from 'templates';
import Routes from 'routes';

export default function App() {
  
  // wait until sector healths finish calcing to pass to Routes
  // if (!sectorHealthDataPass) {
  //   return null;
  // }

  return (
    <UserProvider>
      <Template>
        <Routes />
      </Template>
    </UserProvider>
  );
}
