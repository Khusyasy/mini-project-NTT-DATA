import { useNavigate, Outlet } from 'react-router'
import { useEffect } from 'react'

import { useAuthStore } from '../stores/auth'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'

function DefaultLayout() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) return null

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <NavBar />
      <div className="flex min-h-[calc(100vh-64px)] w-full">
        <SideBar />
        <div className="container mx-auto flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
