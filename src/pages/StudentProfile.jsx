import Header from '../components/Header.jsx'
import UserDetailsCard from '../components/UserDetailsCard.jsx'
import { useAuth } from '../context/useAuth.js'

function StudentProfile() {
  const { currentUser } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="mx-auto max-w-3xl p-4">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">My Details</h1>
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <UserDetailsCard user={currentUser} />
        </section>
      </main>
    </div>
  )
}

export default StudentProfile
