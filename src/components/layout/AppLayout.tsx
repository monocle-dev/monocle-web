import React, { useContext } from 'react';
import UserDropdown from '../ui/UserDropdown';
import CurrentUserContext from '../../context/current-user-context';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const currentUserContext = useContext(CurrentUserContext);

  if (!currentUserContext) {
    throw new Error('CurrentUserContext is not provided');
  }

  const { currentUser, setCurrentUser } = currentUserContext;

  const handleUserUpdate = (updatedUser: any) => {
    setCurrentUser(updatedUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="bg-gray-900/50 border-b border-gray-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Monocle</h1>
            </div>

            {currentUser && (
              <UserDropdown
                currentUser={currentUser}
                onUserUpdate={handleUserUpdate}
                onLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AppLayout;
