import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const User = () => {
  const { id: userId } = useParams();
  const user = useSelector((state) => state.users).find((u) => u.id === userId);
  console.log({ user });
  return (
    <div>
      <h2>{user?.name}</h2>
      <p>
        <strong>added blogs</strong>
      </p>
      <ul>
        {user?.blogs?.map((b) => {
          return <li key={b?.id}>{b?.title}</li>;
        })}
      </ul>
    </div>
  );
};
