import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(`username ${username} password ${password}`)
    try {
      dispatch(logIn({ username, password }))
      // dispatch(
      //   setNotification({ message: 'login succesful', color: 'green' }, 5)
      // )
    } catch (exception) {
      // dispatch(
      //   setNotification({ message: 'wrong username/password', color: 'red' }, 5)
      // )
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
