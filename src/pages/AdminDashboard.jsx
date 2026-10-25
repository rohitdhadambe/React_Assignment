import { useState } from 'react'
import Header from '../components/Header.jsx'
import SearchBar from '../components/SearchBar.jsx'
import StudentTable from '../components/StudentTable.jsx'
import Modal from '../components/Modal.jsx'
import UserDetailsCard from '../components/UserDetailsCard.jsx'
import { getStudents } from '../services/userService.js'

// Static data: read once when the file loads, not on every render
const students = getStudents()

function AdminDashboard() {
  const [nameQuery, setNameQuery] = useState('')
  const [subjectQuery, setSubjectQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Derived from state on every render, so it never goes out of sync
  const name = nameQuery.trim().toLowerCase()
  const subject = subjectQuery.trim().toLowerCase()
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(name) &&
      (!subject || student.subjects.some((s) => s.toLowerCase().includes(subject))),
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="mx-auto max-w-5xl p-4">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">Students</h1>

        <SearchBar
          nameQuery={nameQuery}
          subjectQuery={subjectQuery}
          onNameChange={setNameQuery}
          onSubjectChange={setSubjectQuery}
        />

        <p className="mt-4 mb-2 text-sm text-gray-500">
          Showing {filteredStudents.length} of {students.length} students
        </p>

        <StudentTable students={filteredStudents} onViewDetails={setSelectedStudent} />
      </main>

      {selectedStudent && (
        <Modal title="Student Details" onClose={() => setSelectedStudent(null)}>
          <UserDetailsCard user={selectedStudent} />
        </Modal>
      )}
    </div>
  )
}

export default AdminDashboard
