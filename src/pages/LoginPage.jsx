import { useState } from 'react'
import { validateLogin } from '../utils/validation.js'
import { useAuth } from '../context/useAuth.js'

const inputBaseClass =
  'w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500'

// Red border when the field has an error, gray otherwise
function inputClass(hasError) {
  return `${inputBaseClass} ${hasError ? 'border-red-500' : 'border-gray-300'}`
}

function LoginPage() {
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setLoginError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateLogin(formData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    const success = await login(formData.email, formData.password)
    setIsSubmitting(false)

    if (!success) {
      setLoginError('Invalid email or password')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-800">School User Data</h1>
        <p className="mb-6 text-sm text-gray-500">Sign in to continue</p>

        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby="email-error"
            className={inputClass(errors.email)}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            aria-invalid={Boolean(errors.password)}
            aria-describedby="password-error"
            className={inputClass(errors.password)}
          />
          {errors.password && (
            <p id="password-error" className="mt-1 text-sm text-red-600">
              {errors.password}
            </p>
          )}
        </div>

        {loginError && (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {loginError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
