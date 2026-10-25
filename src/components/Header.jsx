import { useAuth } from '../context/useAuth.js'

function Header() {
  const { currentUser, logout } = useAuth()

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <span className="text-lg font-bold text-gray-800">School User Data</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {currentUser.name}{' '}
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium capitalize text-blue-700">
              {currentUser.userType}
            </span>
          </span>
          <button
            onClick={logout}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
