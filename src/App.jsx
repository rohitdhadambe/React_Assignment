import { Navigate, Route, Routes } from 'react-router'
import { useAuth } from './context/useAuth.js'
import { getHomePath } from './utils/getHomePath.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import StudentProfile from './pages/StudentProfile.jsx'

function App() {
  const { currentUser } = useAuth()
  const homePath = currentUser ? getHomePath(currentUser) : '/login'

  return (
    <Routes>
      <Route
        path="/login"
        element={currentUser ? <Navigate to={homePath} replace /> : <LoginPage />}
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentProfile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={homePath} replace />} />
    </Routes>
  )
}

export default App
