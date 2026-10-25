import { useState } from 'react'
import { AuthContext } from './useAuth.js'
import { authenticateUser } from '../services/authService.js'
import { getUserById } from '../services/userService.js'

const STORAGE_KEY = 'loggedInUserId'

// Only the id is saved; the full user is looked up from the JSON again,
// so editing sessionStorage can't change someone's role or details.
function getSavedUser() {
  const savedId = sessionStorage.getItem(STORAGE_KEY)
  return savedId ? getUserById(Number(savedId)) : null
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getSavedUser)

  async function login(email, password) {
    const user = await authenticateUser(email, password)
    if (!user) return false

    sessionStorage.setItem(STORAGE_KEY, String(user.id))
    setCurrentUser(user)
    return true
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY)
    setCurrentUser(null)
  }

  return <AuthContext value={{ currentUser, login, logout }}>{children}</AuthContext>
}
