import React, { useState } from 'react';
import Logo from '../../components/Logo';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (formData.email === '' || formData.password === '') {
        throw new Error('Email and password are required');
      }

      await axios.post('/api/auth/login', formData);

      setFormData({ email: '', password: '' });
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
    <div className="min-h-screen bg-gray-800 p-4 sm:px-6 lg:px-8">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <form
            className="bg-gray-900 p-6 rounded-lg shadow-md space-y-6 border border-gray-700"
            onSubmit={handleSubmit}
          >
            <div className="text-center">
              <Logo className="mx-auto w-16 h-auto sm:w-20" />
              <div className="mt-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Welcome Back!
                </h1>
              </div>
            </div>

            <div className="space-y-4">
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

              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md p-3 font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
              >
                Log in
              </button>

              <p className="text-gray-400 text-sm text-center mt-4">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-blue-500 hover:underline font-medium"
                >
                  Sign up
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

export default Login;
