import { useNavigate, Outlet } from 'react-router'
import { useEffect } from 'react'

import { useAuthStore } from '../stores/auth'
import NavBar from '../components/NavBar'

function DefaultLayout() {
  const { isLoggedIn } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) return null

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <NavBar />
      <div className="container min-h-[calc(100vh-64px)] p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default DefaultLayout
