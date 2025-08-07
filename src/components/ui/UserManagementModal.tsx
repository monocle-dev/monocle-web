import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import {
  FaTimes,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaTrash,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import {
  authAdapter,
  type UpdateUserRequest,
} from '../../adapters/auth-adapters';
import type { User as UserType } from '../../interfaces/User';

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType;
  onUserUpdate: (user: UserType) => void;
  onLogout: () => void;
}

const UserManagementModal: React.FC<UserManagementModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserUpdate,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'account'>('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    current_password: '',
    new_password: '',
  });

  // Delete account state
  const [deleteForm, setDeleteForm] = useState({
    password: '',
    showConfirmation: false,
  });

  // Password visibility
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    delete: false,
  });

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();

    try {
      // Only send fields that have changed
      const updateData: UpdateUserRequest = {};

      if (profileForm.name !== currentUser.name) {
        updateData.name = profileForm.name;
      }

      if (profileForm.email !== currentUser.email) {
        updateData.email = profileForm.email;
      }

      // Handle password change
      if (profileForm.new_password) {
        if (!profileForm.current_password) {
          setError('Current password is required to change password');
          setLoading(false);
          return;
        }
        updateData.current_password = profileForm.current_password;
        updateData.new_password = profileForm.new_password;
      }

      // Check if there are changes
      if (Object.keys(updateData).length === 0) {
        setError('No changes to save');
        setLoading(false);
        return;
      }

      const result = await authAdapter.updateProfile(updateData);
      onUserUpdate(result.user);

      // Clear password fields
      setProfileForm((prev) => ({
        ...prev,
        current_password: '',
        new_password: '',
      }));

      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deleteForm.password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    resetMessages();

    try {
      await authAdapter.deleteAccount(deleteForm.password);
      onLogout();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    resetMessages();

    try {
      await authAdapter.logout();
      onLogout();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative overflow-hidden bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-700/50 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh]">
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <FaUser className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-white">
                  Account Settings
                </DialogTitle>
                <p className="text-sm text-gray-400">{currentUser.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 p-1 rounded transition-all duration-200"
              disabled={loading}
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          <div className="flex border-b border-gray-700/50">
            <button
              onClick={() => {
                setActiveTab('profile');
                resetMessages();
              }}
              className={`flex-1 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <FaCog className="w-4 h-4 inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => {
                setActiveTab('account');
                resetMessages();
              }}
              className={`flex-1 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'account'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <FaTrash className="w-4 h-4 inline mr-2" />
              Account
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-700/30 text-red-300 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-900/20 border border-green-700/30 text-green-300 rounded-lg">
                  {success}
                </div>
              )}

              {activeTab === 'profile' && (
                <form onSubmit={handleProfileUpdate} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                      required
                      disabled={loading}
                    />
                  </div>

                  <hr className="border-gray-700/50" />

                  <p className="text-sm text-gray-400 mb-3">
                    Change Password (optional)
                  </p>

                  <div>
                    <label
                      htmlFor="current_password"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        id="current_password"
                        type={showPasswords.current ? 'text' : 'password'}
                        value={profileForm.current_password}
                        onChange={(e) =>
                          setProfileForm((prev) => ({
                            ...prev,
                            current_password: e.target.value,
                          }))
                        }
                        className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 pr-10"
                        placeholder="Required only when changing password"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            current: !prev.current,
                          }))
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                        disabled={loading}
                      >
                        {showPasswords.current ? (
                          <FaEyeSlash className="w-4 h-4" />
                        ) : (
                          <FaEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="new_password"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="new_password"
                        type={showPasswords.new ? 'text' : 'password'}
                        value={profileForm.new_password}
                        onChange={(e) =>
                          setProfileForm((prev) => ({
                            ...prev,
                            new_password: e.target.value,
                          }))
                        }
                        className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 pr-10"
                        placeholder="Leave empty to keep current password"
                        minLength={8}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            new: !prev.new,
                          }))
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                        disabled={loading}
                      >
                        {showPasswords.new ? (
                          <FaEyeSlash className="w-4 h-4" />
                        ) : (
                          <FaEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {profileForm.new_password &&
                      profileForm.new_password.length < 8 && (
                        <p className="text-xs text-gray-400 mt-1">
                          Password must be at least 8 characters long
                        </p>
                      )}
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={loading}
                      className="px-4 py-2.5 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div className="border border-gray-700/50 rounded-lg p-4 bg-gray-800/30">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">
                      Logout
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">
                      Sign out of your account on this device.
                    </p>
                    <button
                      onClick={handleLogout}
                      disabled={loading}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>{loading ? 'Signing out...' : 'Sign Out'}</span>
                    </button>
                  </div>

                  <div className="border border-red-700/50 rounded-lg p-4 bg-red-900/10">
                    <h3 className="text-sm font-medium text-red-300 mb-2">
                      Delete Account
                    </h3>
                    <p className="text-sm text-red-400 mb-3">
                      Permanently delete your account and all associated data.
                      This action cannot be undone.
                    </p>

                    {!deleteForm.showConfirmation ? (
                      <button
                        onClick={() =>
                          setDeleteForm((prev) => ({
                            ...prev,
                            showConfirmation: true,
                          }))
                        }
                        disabled={loading}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaTrash className="w-4 h-4" />
                        <span>Delete Account</span>
                      </button>
                    ) : (
                      <form
                        onSubmit={handleDeleteAccount}
                        className="space-y-3"
                      >
                        <div>
                          <label
                            htmlFor="delete_password"
                            className="block text-sm font-medium text-red-300 mb-2"
                          >
                            Enter your password to confirm
                          </label>
                          <div className="relative">
                            <input
                              id="delete_password"
                              type={showPasswords.delete ? 'text' : 'password'}
                              value={deleteForm.password}
                              onChange={(e) =>
                                setDeleteForm((prev) => ({
                                  ...prev,
                                  password: e.target.value,
                                }))
                              }
                              className="w-full bg-gray-800/50 border border-red-600/50 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200 pr-10"
                              placeholder="Your current password"
                              required
                              disabled={loading}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowPasswords((prev) => ({
                                  ...prev,
                                  delete: !prev.delete,
                                }))
                              }
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                              disabled={loading}
                            >
                              {showPasswords.delete ? (
                                <FaEyeSlash className="w-4 h-4" />
                              ) : (
                                <FaEye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                          >
                            {loading ? 'Deleting...' : 'Delete My Account'}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteForm((prev) => ({
                                ...prev,
                                showConfirmation: false,
                                password: '',
                              }))
                            }
                            disabled={loading}
                            className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UserManagementModal;
