import type { User } from '../models/User'

export async function postAuthLogin(username: string, password: string) {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  })
  const json = await response.json()
  return json as User
}
