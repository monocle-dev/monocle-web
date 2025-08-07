import { useContext } from 'react';
import CurrentUserContext from '../context/current-user-context';
import { Navigate, Outlet } from 'react-router-dom';
import AppLayout from './layout/AppLayout';

const ProtectedRoutes = () => {
  const context = useContext(CurrentUserContext);
  const currentUser = context?.currentUser;

  return currentUser ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
