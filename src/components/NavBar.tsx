import { NavLink } from 'react-router'

function NavBar() {
  const routes = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/login', label: 'Login' },
  ]

  return (
    <header className="flex items-center justify-center w-full h-[64px] bg-cyan-50">
      <div className="flex justify-between items-center container p-4">
        <div className="text-3xl">MiniShop</div>
        <div className="flex gap-4">
          {routes.map(route => (
            <NavLink
              key={route.to}
              to={route.to}
              className={({ isActive }) =>
                isActive ? 'text-cyan-600 underline underline-offset-4' : ''
              }
            >
              {route.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}

export default NavBar
