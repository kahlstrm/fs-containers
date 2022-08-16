import React, { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { setNotification } from './reducers/messageReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import { user as userType } from './types'
import LoginForm from './components/LoginForm'
import { Users } from './components/Users'
import Blogs from './components/Blogs'
import UserPage from './components/UserPage'
import { useAppDispatch, useAppSelector } from './hooks'
const App = () => {
  const { user, blogs, users } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    const existingUser = JSON.parse(
      window.localStorage.getItem('loggedBlogUser')
    )
    if (existingUser) {
      try {
        userType.parse(existingUser)
        dispatch(setUser(existingUser))
        blogService.setToken(existingUser.token)
      } catch (e) {
        window.localStorage.removeItem('loggedBlogUser')
      }
    }
  }, [dispatch])
  const logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(setUser(null))
    dispatch(
      setNotification({ message: 'you logged yourself out', color: 'green' }, 5)
    )
  }

  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')
  const userPage = matchUser
    ? users.find((n) => n.id === Number(matchUser.params.id))
    : null
  const blogPage = matchBlog
    ? blogs.find((n) => n.id === Number(matchBlog.params.id))
    : null
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
        {blogPage && (
          <Route
            path="/blogs/:id"
            element={<Blog blog={blogPage} userId={user.id} />}
          />
        )}
        <Route path="/users/:id" element={<UserPage user={userPage} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/" element={<Blogs blogs={blogs} />} />
      </Routes>
    </div>
  )
}

export default App
