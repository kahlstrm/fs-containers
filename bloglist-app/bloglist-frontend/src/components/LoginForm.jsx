import { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/messageReducer'
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`username ${username} password ${password}`)
    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log(user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(
        setNotification({ message: 'login succesful', color: 'green' }, 5)
      )
    } catch (exception) {
      dispatch(
        setNotification({ message: 'wrong username/password', color: 'red' }, 5)
      )
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
