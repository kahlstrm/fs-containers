import React, { RefObject, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import Togglable, { VisibilityHandle } from './Togglable'

export interface NewBlog {
  title: string
  author: string
  url: string
}
const Blogs = () => {
  const blogs = useAppSelector((state) => state.blogs)
  const dispatch = useAppDispatch()
  const blogFormRef = useRef<VisibilityHandle>() as RefObject<VisibilityHandle>

  const handleBlog = (blog: NewBlog) => {
    blogFormRef.current?.toggleVisibility()
    try {
      dispatch(createBlog(blog))
      // dispatch(
      //   setNotification(
      //     {
      //       message: `a new blog ${blog.title} by ${blog.author} added`,
      //       color: 'green',
      //     },
      //     5
      //   )
      // )
    } catch (erreur) {
      console.log(erreur)
      // setNotification(
      //   {
      //     message: 'adding blog failed, title and url are required fields.',
      //     color: 'red',
      //   },
      //   5
      // )
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
