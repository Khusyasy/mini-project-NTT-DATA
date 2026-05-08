import { useAuthStore } from '../stores/auth'

function HomePage() {
  const user = useAuthStore(state => state.user)

  return (
    <div className="flex justify-between items-center">
      <div className="text-2xl">
        Welcome user: {user?.firstName} {user?.lastName}
      </div>
    </div>
  )
}

export default HomePage
