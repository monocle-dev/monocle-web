import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from './context/current-user-context';
import GuestRoutes from './components/GuestRoutes';
import Register from './pages/auth/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import Projects from './pages/projects/Projects';
import Landing from './pages/landing/Landing';

const App = () => {
  const currentUserContext = useContext(CurrentUserContext);
  const [loading, setLoading] = useState(true);

  if (!currentUserContext) {
    throw new Error('CurrentUserContext is not provided');
  }

  const { setCurrentUser } = currentUserContext;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData.user);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      }

      setLoading(false);
    };

    fetchCurrentUser();
  }, [setCurrentUser]);

  if (loading) {
    return null;
  }

  return (
    <Routes>
      <Route element={<GuestRoutes />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/projects" element={<Projects />} />
      </Route>
    </Routes>
  );
};

export default App;
