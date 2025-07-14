import { createContext } from 'react';
import type { User } from '../interfaces/User';

export interface CurrentUserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

export default CurrentUserContext;
