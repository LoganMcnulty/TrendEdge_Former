import { useState, useEffect } from 'react';
import auth from 'services/authService';

export default function useUser() {
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      const userData = auth.getCurrentUser();
      setUser(userData);
    } catch (ex) {}
  }, []);

  return [user];
}
