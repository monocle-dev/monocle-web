import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import Logo from '../components/Logo';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Logo />
              <span className="text-xl font-bold text-white">Monocle</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <FaExclamationTriangle className="text-white text-4xl" />
          </div>

          <h1 className="text-6xl font-bold text-white mb-4">404</h1>

          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-400 mb-8 leading-relaxed">
            Sorry, the page you are looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="space-y-4">
            <Link
              to="/"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <FaHome className="text-lg" />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/projects"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <FaSearch className="text-lg" />
              <span>Browse Projects</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
