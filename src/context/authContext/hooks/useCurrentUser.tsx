import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { PartialUser } from "types/user";

interface QueryResults {
  user: PartialUser;
}

const query = gql`
  query GetCurrentUserQuery {
    user: getCurrentUser {
      id
      email
      username
    }
  }
`;

export interface CurrentUserHookResult {
  get: () => PartialUser;
  set: () => void;
  reset: () => void;
}

const useCurrentUser = (): CurrentUserHookResult => {
  const [currentUser, setCurrentUser] = useState<PartialUser>();

  const { fetchMore } = useQuery<QueryResults>(query, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setCurrentUser(data.user);
    },
    onError: (e) => {
      setCurrentUser({});
      console.error(e.message);
    },
  });

  return {
    get: () => currentUser,
    set: () => fetchMore({}),
    reset: () => setCurrentUser(undefined),
  };
};

export default useCurrentUser;
