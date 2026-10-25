import users from '../data/users.json'

export function withoutPassword(user) {
  const { password: _password, ...safeUser } = user
  return safeUser
}

export function getUserById(id) {
  const user = users.find((u) => u.id === id)
  return user ? withoutPassword(user) : null
}

export function getStudents() {
  return users.filter((u) => u.userType === 'student').map(withoutPassword)
}
