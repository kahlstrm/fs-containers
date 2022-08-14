import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { createComment } from '../services/blogs'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
const Blog = ({ blog, userId }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(blog.comments)
  const dispatch = useDispatch()
  const addLike = (blog) => {
    dispatch(likeBlog(blog))
  }
  const remove = (blog) => {
    dispatch(deleteBlog(blog))
  }

  const handleLike = () => {
    addLike({ ...blog, likes: likes })
    setLikes(likes + 1)
  }
  const handleRemove = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`))
      remove(blog)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const sendComment = (event) => {
    event.preventDefault()
    createComment(comment, blog.id, comments, setComments)
    setComment('')
  }
  if (!blog) {
    return null
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
          <button onClick={handleLike} className="likeButton">
            like
          </button>
        </div>
        <div>{blog.user ? blog.user.name : null}</div>
        {blog.user === userId || blog.user.id === userId ? (
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
Blog.propTypes = {
  blog: PropTypes.object,
  userId: PropTypes.string,
}

export default Blog
