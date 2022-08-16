import React, { useState } from 'react'

import { addComment, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Blog as BlogType } from '../types'
import { useParams, useNavigate } from 'react-router-dom'
const Blog = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const blog = useAppSelector((state) =>
    state.blogs.find((b) => b.id === Number(id))
  )

  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState('')
  if (!blog) {
    return null
  }
  const { comments, likes } = blog
  const addLike = () => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }))
  }
  const remove = async (blog: BlogType) => {
    await dispatch(deleteBlog(blog))
  }

  const handleRemove = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      await remove(blog)
      navigate(-1)
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const sendComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await dispatch(addComment({ comment, blogId: blog.id }))
    setComment('')
  }

  return (
    <div style={blogStyle} className="blog">
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>
        <div>
          <a href={blog.url.includes('http') ? blog.url : `http://${blog.url}`}>
            {blog.url}
          </a>
        </div>
        <div>
          likes {likes}{' '}
          <button onClick={addLike} className="likeButton">
            like
          </button>
        </div>
        <div>{blog.user ? blog.user.name : null}</div>
        {blog.user?.id === user?.id ? (
          <button onClick={handleRemove}>remove</button>
        ) : null}
      </div>
      <div>
        <h2>comments</h2>
        <form onSubmit={sendComment}>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        <ul style={{ listStyleType: 'none' }}>
          {comments ? comments.map((n, a) => <li key={a}>{n}</li>) : null}
        </ul>
      </div>
    </div>
  )
}

export default Blog
