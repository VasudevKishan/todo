import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../app/auth/authSlice';
import { jwtDecode } from 'jwt-decode';

type Roles = 'User' | 'Admin';

interface jwtPayload {
  userInfo: {
    userId: string;
    username: string;
    roles: Roles[];
  };
}

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isAuthenticated = false;
  let status: Roles = 'User';

  if (token) {
    const decoded = jwtDecode<jwtPayload>(token);
    const { userId, username, roles } = decoded.userInfo;
    isAdmin = roles.includes('Admin');
    isAuthenticated = true;

    if (isAdmin) status = 'Admin';

    return { username, roles, userId, isAdmin, status, isAuthenticated };
  }
  return { username: '', roles: [], isAdmin, status, isAuthenticated: false };
};

export default useAuth;
