import { useAuthStore } from '../stores/auth'

function HomePage() {
  const { user, logout } = useAuthStore()

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-2xl">
          Welcome user: {user?.firstName} {user?.lastName}
        </div>
        <button onClick={logout} className="bg-gray-200 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </>
  )
}

export default HomePage
