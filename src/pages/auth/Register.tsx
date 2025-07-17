import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import CurrentUserContext from '../../context/current-user-context';
import { authAdapter } from '../../adapters/auth-adapters';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const context = useContext(CurrentUserContext);
  const setCurrentUser = context?.setCurrentUser;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    try {
      const data = await authAdapter.register(formData);

      if (data.user && setCurrentUser) {
        setCurrentUser(data.user);
      }

      setFormData({ name: '', email: '', password: '' });
      setConfirmPassword('');

      navigate('/projects');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4 py-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md">
        <form
          className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md space-y-4 sm:space-y-6 border border-gray-700"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <Logo className="mx-auto w-12 h-auto sm:w-16" />
            <div className="mt-3 sm:mt-4">
              <h1 className="text-lg sm:text-2xl font-bold text-white mb-2">
                Create your account
              </h1>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div>
              <label
                className="block text-white font-medium mb-1 sm:mb-2 text-sm"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full bg-gray-700 text-white rounded-md p-2 sm:p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label
                className="block text-white font-medium mb-1 sm:mb-2 text-sm"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                className="w-full bg-gray-700 text-white rounded-md p-2 sm:p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                id="email"
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label
                className="block text-white font-medium mb-1 sm:mb-2 text-sm"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full bg-gray-700 text-white rounded-md p-2 sm:p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                id="password"
                name="password"
                type="password"
                minLength={8}
                placeholder="••••••••••••••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label
                className="block text-white font-medium mb-1 sm:mb-2 text-sm"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="w-full bg-gray-700 text-white rounded-md p-2 sm:p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                minLength={8}
                placeholder="••••••••••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white rounded-md p-2 sm:p-3 font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>

            <p className="text-gray-400 text-xs sm:text-sm text-center mt-3 sm:mt-4">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-500 hover:underline font-medium"
              >
                Log in
              </Link>
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-xs sm:text-sm text-center mt-3 sm:mt-4">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
