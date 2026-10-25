const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500'

function SearchBar({ nameQuery, subjectQuery, onNameChange, onSubjectChange }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div>
        <label htmlFor="search-name" className="mb-1 block text-sm font-medium text-gray-700">
          Search by name
        </label>
        <input
          id="search-name"
          type="search"
          placeholder="e.g. Aarav"
          value={nameQuery}
          onChange={(event) => onNameChange(event.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="search-subject" className="mb-1 block text-sm font-medium text-gray-700">
          Search by subject
        </label>
        <input
          id="search-subject"
          type="search"
          placeholder="e.g. Maths"
          value={subjectQuery}
          onChange={(event) => onSubjectChange(event.target.value)}
          className={inputClass}
        />
      </div>
    </div>
  )
}

export default SearchBar
