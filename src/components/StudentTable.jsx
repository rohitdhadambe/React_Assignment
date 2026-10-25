function StudentTable({ students, onViewDetails }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Email</th>
            <th className="px-4 py-3 font-semibold">Subjects</th>
            <th className="px-4 py-3 font-semibold">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                No students match your search.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{student.name}</td>
                <td className="px-4 py-3 text-gray-600">{student.email}</td>
                <td className="px-4 py-3 text-gray-600">{student.subjects.join(', ')}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onViewDetails(student)}
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable
