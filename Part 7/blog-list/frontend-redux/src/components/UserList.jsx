import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const UserList = () => {
  const users = useSelector((state) => state.users);
  console.log({ users });

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u) => (
            <tr key={u.id}>
              {u.blogs.length > 0 ? (
                <td>
                  <Link to={"/users/" + u.id}>{u.name}</Link>
                </td>
              ) : (
                <td>{u.name}</td>
              )}
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
