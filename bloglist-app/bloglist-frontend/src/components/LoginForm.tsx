import React, { useState } from 'react'
import { useNotification } from '../hooks'
import blogService from '../services/blogs'
import loginService from '../services/login'
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const setNotification = useNotification()
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(`username ${username} password ${password}`)
    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setNotification({ message: 'login succesful', color: 'green' }, 5)
    } catch (exception) {
      setNotification({ message: 'wrong username/password', color: 'red' }, 5)
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          {' '}
          username
          <input
            id="username"
            type="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
