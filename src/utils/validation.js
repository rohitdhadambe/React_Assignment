// something@something.something, with no spaces
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Returns an object like { email: 'message' }. An empty object means the form is valid.
export function validateLogin({ email, password }) {
  const errors = {}

  if (!email.trim()) {
    errors.email = 'Email is required'
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Enter a valid email address'
  }

  if (!password.trim()) {
    errors.password = 'Password is required'
  }

  return errors
}
