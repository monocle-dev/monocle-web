import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from './context/current-user-context';
import GuestRoutes from './components/GuestRoutes';
import Register from './pages/auth/Register';

const App = () => {
  const currentUserContext = useContext(CurrentUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          currentUserContext?.setCurrentUser(userData);
        } else {
          currentUserContext?.setCurrentUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      }

      setLoading(false);
    };

    fetchCurrentUser();
  }, [currentUserContext]);

  if (loading) {
    return null;
  }

  return (
    <Routes>
      <Route element={<GuestRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
