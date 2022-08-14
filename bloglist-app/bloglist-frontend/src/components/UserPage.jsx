import { Link } from 'react-router-dom'

const UserPage = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <>
      <h3>{user.username}</h3>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((n) => (
          <li key={n.id}>
            <Link to={`/blogs/${n.id}`}>{n.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserPage
