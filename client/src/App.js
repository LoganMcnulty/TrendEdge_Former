import React from 'react';
import { UserProvider } from 'contexts/UserContext';
import Template from 'templates';
import Routes from 'routes';

export default function App() {

  return (
    <UserProvider>
      <Template>
        <Routes />
      </Template>
    </UserProvider>
  );
}
