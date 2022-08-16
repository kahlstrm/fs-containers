import React, { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { logOut, setUser } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import { user as userType } from './types'
import LoginForm from './components/LoginForm'
import { Users } from './components/Users'
import Blogs from './components/Blogs'
import UserPage from './components/UserPage'
import { useAppDispatch, useAppSelector, useNotification } from './hooks'
const App = () => {
  const user = useAppSelector((state) => state.user)
  const setNotification = useNotification()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    let existingUser = window.localStorage.getItem('loggedBlogUser')
    if (existingUser) {
      const parsed = JSON.parse(existingUser)
      console.log(parsed)
      try {
        dispatch(setUser(userType.parse(parsed)))
        blogService.setToken(parsed.token)
      } catch (e) {
        window.localStorage.removeItem('loggedBlogUser')
      }
    }
  }, [dispatch])
  const logout = async () => {
    await dispatch(logOut())
    window.localStorage.removeItem('loggedBlogUser')
    setNotification({ message: 'you logged yourself out', color: 'green' }, 5)
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button type="button" onClick={logout}>
          logout
        </button>
      </p>
      <Routes>
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Blogs />} />
      </Routes>
    </div>
  )
}

export default App
