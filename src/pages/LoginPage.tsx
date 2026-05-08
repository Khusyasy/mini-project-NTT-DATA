import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { postAuthLogin } from '../services/api'
import { useAuthStore } from '../stores/auth'

import Input from '../components/shared/Input'
import Button from '../components/shared/Button'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const setUser = useAuthStore(state => state.setUser)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    try {
      const data = await postAuthLogin(username, password)

      if (data.accessToken) {
        setUser(data)
        navigate('/')
      } else {
        setError('Login failed')
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error')
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-100">
      <div className="bg-white rounded shadow space-y-2 p-4 w-80">
        <h1 className="text-2xl font-bold">Login</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form className="space-y-4" onSubmit={e => handleLogin(e)}>
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
