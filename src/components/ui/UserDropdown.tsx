import React, { useState, useRef, useEffect } from 'react';
import { FaCog, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import type { User as UserType } from '../../interfaces/User';
import UserManagementModal from './UserManagementModal';

interface UserDropdownProps {
  currentUser: UserType;
  onUserUpdate: (user: UserType) => void;
  onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  currentUser,
  onUserUpdate,
  onLogout,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleOpenSettings = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleQuickLogout = () => {
    setIsDropdownOpen(false);
    onLogout();
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
        >
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            {getInitials(currentUser.name)}
          </div>
          <span className="hidden md:block text-sm font-medium">
            {currentUser.name}
          </span>
          <FaChevronDown
            className={`w-3 h-3 transition-transform duration-200 ${
              isDropdownOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700/50 z-50">
            <div className="py-1">
              <div className="px-4 py-3 border-b border-gray-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {getInitials(currentUser.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={handleOpenSettings}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
                >
                  <FaCog className="w-4 h-4 mr-3" />
                  Account Settings
                </button>

                <button
                  onClick={handleQuickLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
                >
                  <FaSignOutAlt className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <UserManagementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUser={currentUser}
        onUserUpdate={onUserUpdate}
        onLogout={onLogout}
      />
    </>
  );
};

export default UserDropdown;
