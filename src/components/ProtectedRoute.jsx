import { Navigate } from 'react-router'
import { useAuth } from '../context/useAuth.js'
import { getHomePath } from '../utils/getHomePath.js'

function ProtectedRoute({ allowedRole, children }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  // Logged in but wrong role (e.g. a student opening /admin): send them to their own page
  if (currentUser.userType !== allowedRole) {
    return <Navigate to={getHomePath(currentUser)} replace />
  }

  return children
}

export default ProtectedRoute
