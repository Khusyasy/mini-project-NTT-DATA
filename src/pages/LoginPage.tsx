import { useState } from 'react'
import { useNavigate } from 'react-router'
import { postAuthLogin } from '../services/api'
import { useAuthStore } from '../stores/auth'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const setUser = useAuthStore(state => state.setUser)
  const navigate = useNavigate()

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

        <form className="space-y-2" onSubmit={e => handleLogin(e)}>
          <div className="space-y-1">
            <label className="block">Username</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
