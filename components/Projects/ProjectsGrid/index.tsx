export default function ProjectsGrid() {

  const createCard = () => {
    return (
      <div className="w-64 rounded-xl border-2 border-gray-200 h-64 shadow-md shadow-gray flex flex-col items-center justify-center dark:bg-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span className="mt-4 text-lg">Create New</span>
        
      </div>
    )
  }

  const projectCard = () => {
    return (
      <div>

      </div>
    )
  }
  return (
    <div className="flex flex-wrap gap-4">
      {createCard()}
    </div>
  )
}