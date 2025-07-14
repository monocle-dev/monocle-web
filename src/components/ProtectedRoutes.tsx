import { useContext } from 'react';
import CurrentUserContext from '../context/current-user-context';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const context = useContext(CurrentUserContext);
  const currentUser = context?.currentUser;

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
