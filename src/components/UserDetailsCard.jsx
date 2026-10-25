function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function UserDetailsCard({ user }) {
  const details = [
    { label: 'Email', value: user.email },
    { label: 'Standard', value: user.standard },
    { label: 'Language', value: user.language },
    { label: 'Address', value: user.address },
  ]

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          {getInitials(user.name)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium capitalize text-blue-700">
            {user.userType}
          </span>
        </div>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        {details.map((item) => (
          <div key={item.label}>
            <dt className="text-sm text-gray-500">{item.label}</dt>
            <dd className="font-medium break-words text-gray-800">{item.value ?? '—'}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <h3 className="mb-2 text-sm text-gray-500">Subjects</h3>
        {user.subjects.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {user.subjects.map((subject) => (
              <li
                key={subject}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
              >
                {subject}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-800">No subjects</p>
        )}
      </div>
    </div>
  )
}

export default UserDetailsCard
