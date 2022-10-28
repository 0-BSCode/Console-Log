import { useState, useEffect } from "react";
import { gql, useLazyQuery, QueryResult } from "@apollo/client";
import { PartialUser } from "types/user";

interface QueryResults {
  user: PartialUser;
}

const query = gql`
  query GetCurrentUserQuery {
    user: current_user {
      id
      email
      username
      image
    }
  }
`;

export interface CurrentUserHookResult {
  get: () => PartialUser;
  state: QueryResult<QueryResults>;
  set: () => void;
}

const useCurrentUser = (): CurrentUserHookResult => {
  const [currentUser, setCurrentUser] = useState<PartialUser>(undefined);

  const [getUserQuery, getUserQueryState] = useLazyQuery<QueryResults>(query, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setCurrentUser(data.user);
    },
    onError: (e) => {
      setCurrentUser(undefined);
      console.error(e.message);
    },
  });

  useEffect(() => {
    getUserQuery();
  }, []);

  return {
    get: () => currentUser,
    state: getUserQueryState,
    set: () => getUserQuery(),
  };
};

export default useCurrentUser;
