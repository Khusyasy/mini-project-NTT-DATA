import { NavLink } from 'react-router'
import { useAuthStore } from '../stores/auth'

function SideBar() {
  const logout = useAuthStore(state => state.logout)

  const routes = [
    { to: '/', label: 'Home', end: true },
    { to: '/products', label: 'Products', end: true },
    { to: '/products/add', label: 'Add Product' },
    {
      to: '/login',
      label: 'Logout',
      onClick: () => {
        logout()
      },
    },
  ]

  return (
    <div className="flex flex-col items-start justify-start w-32 bg-cyan-50">
      <div className="flex flex-col w-full">
        {routes.map(route => (
          <NavLink
            key={route.to}
            to={route.to}
            end={route.end}
            onClick={route.onClick}
            className={({ isActive }) =>
              `px-4 py-2 block w-full hover:bg-cyan-100 ${isActive ? 'text-cyan-600 underline' : ' hover:underline'}`
            }
          >
            {route.label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default SideBar
