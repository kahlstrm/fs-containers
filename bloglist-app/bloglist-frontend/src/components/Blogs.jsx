import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/messageReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ blogs }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const handleBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blog))
      dispatch(
        setNotification(
          {
            message: `a new blog ${blog.title} by ${blog.author} added`,
            color: 'green',
          },
          5
        )
      )
    } catch (erreur) {
      console.log(erreur)
      dispatch(
        setNotification(
          {
            message: 'adding blog failed, title and url are required fields.',
            color: 'red',
          },
          5
        )
      )
    }
  }
  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={handleBlog} />
    </Togglable>
  )

  return (
    <>
      {blogForm()}
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {' '}
              {blog.title} {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
export default Blogs
