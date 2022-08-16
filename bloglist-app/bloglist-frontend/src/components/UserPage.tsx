import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import { useParams } from 'react-router-dom'
import React from 'react'

const UserPage = () => {
  const { id } = useParams()
  const user = useAppSelector((state) =>
    state.users.find((b) => b.id === Number(id))
  )
  const blogs = useAppSelector((state) =>
    state.blogs.filter((blog) => blog.user && blog.user.id === user?.id)
  )
  if (!user) {
    return <p>User not found</p>
  }
  return (
    <>
      <h3>{user.username}</h3>
      <h3>added blogs</h3>
      <ul>
        {blogs.map((n) => (
          <li key={n.id}>
            <Link to={`/blogs/${n.id}`}>{n.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserPage
