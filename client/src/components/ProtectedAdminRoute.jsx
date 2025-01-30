import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function ProtectedAdminRoute({ children }) {
  const { loading, data } = useQuery(QUERY_USER);

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data?.user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedAdminRoute; 