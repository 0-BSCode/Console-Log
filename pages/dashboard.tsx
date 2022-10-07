import React, { useContext } from "react";
import { UserContext } from "src/context/userContext";
import { NextPage } from "next";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { User } from "@prisma/client";

const AllUsersQuery = gql`
  query AllUsersQuery {
    users {
      id
      username
      email
      image
    }
  }
`;

const LogOutQuery = gql`
  query LogOut {
    logout {
      id
    }
  }
`;
const Dashboard: NextPage = () => {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);

  const { data, loading, error, fetchMore } = useQuery(AllUsersQuery, {
    onError: (e) => {
      console.error(`BAD: ${e.message}`);
      router.push("/");
    },
  });

  const [logOut, logOutQueryState] = useLazyQuery(LogOutQuery, {
    onCompleted: () => {
      router.push("/");
    },
  });

  const users: User[] = data?.users;

  if (loading) return <p>LOADING...</p>;

  return (
    <div>
      {currentUser && <h1>Welcome, {currentUser.username}</h1>}
      <ul>
        {users &&
          users.map((user: User) => (
            <li key={user.id}>
              <div>
                <p>{user.id}</p>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>{user.image}</p>
              </div>
            </li>
          ))}
      </ul>
      <button
        onClick={(e) => {
          e.preventDefault();
          logOut({});
        }}
      >
        LOG OUT
      </button>
    </div>
  );
};

export default Dashboard;
