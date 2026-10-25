import users from '../data/users.json'
import { decryptPassword } from '../utils/crypto.js'
import { withoutPassword } from './userService.js'

// Returns the user (without the password) if the credentials match, otherwise null.
export async function authenticateUser(email, password) {
  const user = users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
  )
  if (!user) return null

  try {
    const storedPassword = await decryptPassword(user.password)
    if (storedPassword !== password) return null
  } catch {
    // Corrupted or tampered value in the JSON: treat it as a failed login
    return null
  }

  return withoutPassword(user)
}
