import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({
  allowedRoles,
}: {
  allowedRoles: ('User' | 'Admin')[];
}) => {
  const location = useLocation();
  const { isAuthenticated, roles } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  if (roles.some((role) => allowedRoles.includes(role))) {
    return <Outlet />;
  }
  return <Navigate to='/login' state={{ from: location }} replace />;
};

export default RequireAuth;
