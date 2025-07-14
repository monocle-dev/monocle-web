import React, { useState } from 'react';
import Logo from '../../components/Logo';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Simulate an API call for login
      if (formData.email === '' || formData.password === '') {
        throw new Error('Email and password are required');
      }

      await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setFormData({ name: '', email: '', password: '' });
      setConfirmPassword('');
      setError('');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.error || 'An error occurred');
      } else if (err instanceof Error) {
        setError(err.message || 'An unexpected error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center h-full bg-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-md space-y-8">
          <form
            className="bg-gray-900 p-6 rounded-lg shadow-md space-y-6 border border-gray-700"
            onSubmit={handleSubmit}
          >
            <div className="text-center">
              <Logo className="mx-auto w-16 h-auto sm:w-20" />
              <div className="mt-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Create your account
                </h1>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className="block text-white font-medium mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full bg-gray-700 text-white rounded-md p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="block text-white font-medium mb-2"
                  htmlFor="email"
                >
                  Email address
                </label>
                <input
                  className="w-full bg-gray-700 text-white rounded-md p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="block text-white font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full bg-gray-700 text-white rounded-md p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="block text-white font-medium mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  className="w-full bg-gray-700 text-white rounded-md p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full bg-blue-500 text-white rounded-md p-3 font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
              >
                Log in
              </button>

              <p className="text-gray-400 text-sm text-center mt-4">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-blue-500 hover:underline font-medium"
                >
                  Register
                </Link>
              </p>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center mt-4">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
