import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import usersService from "../services/users";

export const User = () => {
  const { id: userId } = useParams();
  const { data: user, isLoading } = useQuery({
    queryKey: ["appUser", userId],
    queryFn: () => usersService.getUser(userId),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

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
