import { useState, type ReactNode } from 'react';
import CurrentUserContext from './current-user-context';
import type { User } from '../interfaces/Auth';

const CurrentUserContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const context = {
    currentUser,
    setCurrentUser,
  };

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
