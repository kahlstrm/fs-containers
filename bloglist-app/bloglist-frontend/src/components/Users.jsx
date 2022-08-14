import { Link } from "react-router-dom"

export const Users = ({ users }) => (
  <div>
    <h3>Users</h3>
    <ul style={{ listStyleType: 'none' }}>
      {users.map((n) => {
        console.log(n)
        return (
          <li key={n.id}>
            <Link to={`${n.id}`}>{n.username}</Link>
            <span style={{ marginLeft: '5px' }}>{n.blogs.length} blogs</span>
          </li>
        )
      })}
    </ul>
  </div>
)
