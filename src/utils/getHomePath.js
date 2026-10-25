export function getHomePath(user) {
  return user.userType === 'admin' ? '/admin' : '/student'
}
